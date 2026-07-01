import express from 'express';
import { Webhook } from 'svix';
import { students, professors, userKeys } from './mongoClient.js';

const router = express.Router();
// Use configuration key, fall back to mock key (valid base64) for development testing
const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET || 'whsec_YTM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM=';

router.post('/clerk', async (req, res) => {
  const payload = req.rawBody;
  const headers = req.headers;

  const svixId = headers['svix-id'];
  const svixTimestamp = headers['svix-timestamp'];
  const svixSignature = headers['svix-signature'];

  if (!svixId || !svixTimestamp || !svixSignature) {
    return res.status(400).json({ error: 'Missing svix headers' });
  }

  let evt;
  try {
    const wh = new Webhook(CLERK_WEBHOOK_SECRET);
    evt = wh.verify(payload, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    });
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: 'Invalid webhook signature' });
  }

  const { type, data } = evt;
  console.log(`Received webhook event: ${type}`);

  try {
    if (type === 'user.updated') {
      const clerkUserId = data.id;
      const email = data.email_addresses?.[0]?.email_address || '';
      const name = `${data.first_name || ''} ${data.last_name || ''}`.trim() || email.split('@')[0];

      // Sync email/name updates to students
      await students.updateOne(
        { clerkUserId },
        { $set: { email, name, updatedAt: new Date() } }
      );

      // Sync email/name updates to professors
      await professors.updateOne(
        { clerkUserId },
        { $set: { email, name, updatedAt: new Date() } }
      );

      // Sync email/name updates to userKeys
      await userKeys.updateOne(
        { clerkUserId },
        { $set: { email, name } }
      );
      
      console.log(`Synced user updates for Clerk ID: ${clerkUserId}`);
    } else if (type === 'user.deleted') {
      const clerkUserId = data.id;
      
      // Delete user records across all databases
      const studentDelete = await students.deleteOne({ clerkUserId });
      const professorDelete = await professors.deleteOne({ clerkUserId });
      await userKeys.deleteOne({ clerkUserId });
      
      console.log(`Deleted user files for Clerk ID ${clerkUserId}. Student: ${studentDelete.deletedCount}, Professor: ${professorDelete.deletedCount}`);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error handling Clerk Webhook DB sync:', error);
    return res.status(500).json({ error: 'Internal DB sync failed' });
  }
});

export default router;
