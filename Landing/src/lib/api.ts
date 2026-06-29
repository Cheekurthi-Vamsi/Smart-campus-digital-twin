const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

export async function getSessionStatus(getToken: () => Promise<string | null>) {
  try {
    const token = await getToken();
    const response = await fetch(`${API_BASE_URL}/auth/session-status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`Session status check failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to get session status:', error);
    throw error;
  }
}

export async function registerStudent(
  getToken: () => Promise<string | null>,
  payload: {
    fullName: string;
    rollNumber: string;
    collegePassword: string;
    department: string;
    year: string;
    section?: string;
    securityQuestions: Array<{ question: string; answer: string }>;
  }
) {
  try {
    const token = await getToken();
    const response = await fetch(`${API_BASE_URL}/auth/student/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Registration failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Student registration failed:', error);
    throw error;
  }
}

export async function registerProfessor(
  getToken: () => Promise<string | null>,
  payload: {
    professorName: string;
    employeeId: string;
    department: string;
    designation: string;
  }
) {
  try {
    const token = await getToken();
    const response = await fetch(`${API_BASE_URL}/auth/professor/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Registration failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Professor registration failed:', error);
    throw error;
  }
}

export async function verifyStudentCredentials(
  rollNumber: string,
  collegePassword: string,
  getToken?: () => Promise<string | null>
) {
  try {
    const token = getToken ? await getToken() : null;
    const response = await fetch(`${API_BASE_URL}/auth/student/verify-credentials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ rollNumber, collegePassword }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Verification failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Credential verification failed:', error);
    throw error;
  }
}

export async function forgotPassword(rollNumber: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/student/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rollNumber }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Forgot password failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Forgot password failed:', error);
    throw error;
  }
}

export async function verifySecurityAnswers(
  rollNumber: string,
  answers: string[]
) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/student/verify-security-answers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rollNumber, answers }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Verification failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Security answer verification failed:', error);
    throw error;
  }
}

export async function resetPassword(rollNumber: string, newPassword: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/student/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rollNumber, newPassword }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Password reset failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Password reset failed:', error);
    throw error;
  }
}
