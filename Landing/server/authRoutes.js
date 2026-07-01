import express from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { z } from 'zod';
import { requireAuth } from '@clerk/clerk-sdk-node';
import { students, professors, userKeys } from './mongoClient.js';

const router = express.Router();
const SALT_ROUNDS = 12;

const studentRegisterSchema = z.object({
  fullName: z.string().min(3),
  rollNumber: z.string().min(3),
  collegePassword: z.string().min(8),
  department: z.string().min(2),
  year: z.string().min(1),
  section: z.string().optional(),
  securityQuestions: z.array(z.object({ question: z.string().min(5), answer: z.string().min(1) })).min(3).max(5),
});

const professorRegisterSchema = z.object({
  professorName: z.string().min(3),
  employeeId: z.string().min(3),
  department: z.string().min(2),
  designation: z.string().min(2),
});

function hashSecurityAnswers(questions) {
  return Promise.all(
    questions.map(async (item) => ({
      question: item.question,
      answerHash: await bcrypt.hash(item.answer, SALT_ROUNDS),
    }))
  );
}

router.post('/student/register', requireAuth(), async (req, res) => {
  try {
    const result = studentRegisterSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.flatten() });
    }

    const { fullName, rollNumber, collegePassword, department, year, section, securityQuestions } = result.data;
    const clerkUserId = req.auth.userId;

    const existing = await students.findOne({ clerkUserId });
    if (existing) {
      return res.status(409).json({ error: 'Student profile already exists.' });
    }

    const existingRoll = await students.findOne({ rollNumber });
    if (existingRoll) {
      return res.status(409).json({ error: 'Roll number already registered.' });
    }

    const hashedPassword = await bcrypt.hash(collegePassword, SALT_ROUNDS);
    const securityQuestionHashes = await hashSecurityAnswers(securityQuestions);

    const newStudent = {
      clerkUserId,
      role: 'student',
      name: fullName,
      email: req.auth.userInfo.primaryEmailAddress?.emailAddress || '',
      rollNumber,
      collegePassword: hashedPassword,
      department,
      year,
      section: section || '',
      securityQuestions: securityQuestionHashes,
      uniqueStudentId: crypto.randomUUID(),
      createdAt: new Date(),
      lastLogin: new Date(),
      status: 'active',
    };

    const insertResult = await students.insertOne(newStudent);
    return res.status(201).json({ success: true, studentId: insertResult.insertedId });
  } catch (error) {
    return res.status(500).json({ error: 'Registration failed.' });
  }
});

router.post('/professor/register', requireAuth(), async (req, res) => {
  try {
    const result = professorRegisterSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.flatten() });
    }

    const { professorName, employeeId, department, designation } = result.data;
    const clerkUserId = req.auth.userId;

    const existing = await professors.findOne({ clerkUserId });
    if (existing) {
      return res.status(409).json({ error: 'Professor profile already exists.' });
    }

    const existingEmployee = await professors.findOne({ employeeId });
    if (existingEmployee) {
      return res.status(409).json({ error: 'Employee ID already registered.' });
    }

    const newProfessor = {
      clerkUserId,
      role: 'professor',
      name: professorName,
      email: req.auth.userInfo.primaryEmailAddress?.emailAddress || '',
      employeeId,
      department,
      designation,
      uniqueProfessorId: crypto.randomUUID(),
      createdAt: new Date(),
      lastLogin: new Date(),
      status: 'active',
    };

    const insertResult = await professors.insertOne(newProfessor);
    return res.status(201).json({ success: true, professorId: insertResult.insertedId });
  } catch (error) {
    return res.status(500).json({ error: 'Registration failed.' });
  }
});

router.post('/student/verify-credentials', requireAuth(), async (req, res) => {
  try {
    const { rollNumber, collegePassword } = req.body;
    if (!rollNumber || !collegePassword) {
      return res.status(400).json({ error: 'Missing roll number or password.' });
    }

    const student = await students.findOne({ rollNumber });
    if (!student) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    const isMatch = await bcrypt.compare(collegePassword, student.collegePassword);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    await students.updateOne({ _id: student._id }, { $set: { lastLogin: new Date() } });
    return res.status(200).json({ success: true, student });
  } catch (error) {
    return res.status(500).json({ error: 'Credential verification failed.' });
  }
});

router.post('/student/forgot-password', async (req, res) => {
  try {
    const { rollNumber } = req.body;
    if (!rollNumber) {
      return res.status(400).json({ error: 'Roll number is required.' });
    }

    const student = await students.findOne({ rollNumber });
    if (!student) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    const questions = student.securityQuestions.map((item) => ({ question: item.question }));
    return res.status(200).json({ success: true, questions });
  } catch (error) {
    return res.status(500).json({ error: 'Forgot password failed.' });
  }
});

router.post('/student/verify-security-answers', async (req, res) => {
  try {
    const { rollNumber, answers } = req.body;
    if (!rollNumber || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'Missing roll number or answers.' });
    }

    const student = await students.findOne({ rollNumber });
    if (!student) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    const matchedCount = await Promise.all(
      student.securityQuestions.map(async (question, index) => {
        return await bcrypt.compare(answers[index] || '', question.answerHash);
      })
    );

    if (matchedCount.every(Boolean)) {
      return res.status(200).json({ success: true });
    }

    return res.status(401).json({ error: 'Security answers did not match.' });
  } catch (error) {
    return res.status(500).json({ error: 'Security verification failed.' });
  }
});

router.post('/student/reset-password', async (req, res) => {
  try {
    const { rollNumber, newPassword } = req.body;
    if (!rollNumber || !newPassword) {
      return res.status(400).json({ error: 'Missing roll number or new password.' });
    }

    const student = await students.findOne({ rollNumber });
    if (!student) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await students.updateOne({ _id: student._id }, { $set: { collegePassword: hashedPassword, lastLogin: new Date() } });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Password reset failed.' });
  }
});

router.get('/session-status', requireAuth(), async (req, res) => {
  try {
    const clerkUserId = req.auth.userId;
    const email = req.auth.userInfo?.primaryEmailAddress?.emailAddress || '';
    const name = req.auth.userInfo?.fullName || req.auth.userInfo?.firstName || email.split('@')[0] || 'CampusTwin User';

    let userKeyRecord = await userKeys.findOne({ clerkUserId });
    if (!userKeyRecord) {
      userKeyRecord = {
        clerkUserId,
        email,
        name,
        uniqueKey: crypto.randomUUID(),
        createdAt: new Date(),
        lastSeen: new Date()
      };
      await userKeys.insertOne(userKeyRecord);
    } else {
      await userKeys.updateOne(
        { clerkUserId },
        { $set: { lastSeen: new Date(), email, name } }
      );
      userKeyRecord = await userKeys.findOne({ clerkUserId });
    }

    return res.status(200).json({
      authenticated: true,
      userId: clerkUserId,
      email: email,
      uniqueKey: userKeyRecord?.uniqueKey
    });
  } catch (error) {
    console.error('Error handling session status and user key:', error);
    return res.status(500).json({ error: 'Failed to process session status' });
  }
});

export default router;
