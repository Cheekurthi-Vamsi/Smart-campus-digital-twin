import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface UserSession {
  email: string;
  role: 'student' | 'professor';
  name: string;
  department?: string;
  batch?: string;
}

// Simulated authentication database for demo purposes when Supabase is not connected
const MOCK_STUDENTS = [
  {
    email: 'student@campustwin.edu',
    password: 'password',
    name: 'John Doe',
    role: 'student' as const,
    batch: '2025'
  },
  {
    email: 'student@campus.edu',
    password: 'password',
    name: 'John Doe',
    role: 'student' as const,
    batch: '2025'
  }
];

const MOCK_PROFESSORS = [
  {
    email: 'professor@campustwin.edu',
    password: 'password',
    name: 'Dr. Sarah Smith',
    role: 'professor' as const,
    department: 'Computer Science'
  },
  {
    email: 'professor@campus.edu',
    password: 'password',
    name: 'Dr. Sarah Smith',
    role: 'professor' as const,
    department: 'Computer Science'
  }
];

export async function loginWithMock(email: string, password: string, role: 'student' | 'professor'): Promise<{ data: UserSession | null; error: string | null }> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 800));

  const normalizedEmail = email.toLowerCase().trim();

  if (role === 'student') {
    const student = MOCK_STUDENTS.find(s => s.email === normalizedEmail);
    if (!student) {
      return { data: null, error: 'Student account not found.' };
    }
    if (student.password !== password) {
      return { data: null, error: 'Incorrect password.' };
    }
    return {
      data: {
        email: student.email,
        name: student.name,
        role: student.role,
        batch: student.batch
      },
      error: null
    };
  } else {
    const prof = MOCK_PROFESSORS.find(p => p.email === normalizedEmail);
    if (!prof) {
      return { data: null, error: 'Professor account not found.' };
    }
    if (prof.password !== password) {
      return { data: null, error: 'Incorrect password.' };
    }
    return {
      data: {
        email: prof.email,
        name: prof.name,
        role: prof.role,
        department: prof.department
      },
      error: null
    };
  }
}
