import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, School, ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import { useAuth, useClerk, useUser } from '@clerk/react';
import lightBackground from './ui/light.png';
import darkBackground from './ui/dark.png';
import { UserSession } from '../lib/supabase';
import { getSessionStatus } from '../lib/api.ts';

interface LoginPortalProps {
  onLoginSuccess: (user: UserSession) => void;
  onBackToLanding: () => void;
  initialRole?: 'student' | 'professor' | null;
  onRoleSelect?: (role: 'student' | 'professor') => void;
}

export default function LoginPortal({ onLoginSuccess, onBackToLanding, initialRole, onRoleSelect }: LoginPortalProps) {
  const [role, setRole] = useState<'student' | 'professor' | null>(initialRole ?? null);
  const { isSignedIn, isLoaded, getToken } = useAuth();
  const { user: clerkUser } = useUser();
  const { openSignIn } = useClerk();
  const [clerkLoginProcessed, setClerkLoginProcessed] = useState(false);
  const authOpenedRef = React.useRef(false);

  useEffect(() => {
    if (initialRole) {
      setRole(initialRole);
      onRoleSelect?.(initialRole);
    }
  }, [initialRole, onRoleSelect]);

  useEffect(() => {
    if (!role || !isLoaded || isSignedIn || authOpenedRef.current) {
      return;
    }

    authOpenedRef.current = true;
    openSignIn();
  }, [role, isLoaded, isSignedIn, openSignIn]);

  useEffect(() => {
    if (!isSignedIn) {
      setClerkLoginProcessed(false);
      return;
    }

    if (!isLoaded || clerkLoginProcessed || !clerkUser) {
      return;
    }

    const verifyClerkSession = async () => {
      try {
        await getSessionStatus(getToken);
        const clerkEmail =
          clerkUser.primaryEmailAddress?.emailAddress ||
          clerkUser.emailAddresses?.[0]?.emailAddress ||
          '';
        const clerkName = clerkUser.fullName || clerkUser.firstName || clerkEmail.split('@')[0] || 'CampusTwin User';

        onLoginSuccess({
          email: clerkEmail,
          role: role || 'student',
          name: clerkName,
          ...(role === 'student' ? { batch: '2025' } : { department: 'Computer Science' }),
        });
        setClerkLoginProcessed(true);
      } catch (err) {
        console.error('Failed to verify Clerk session:', err);
      }
    };

    verifyClerkSession();
  }, [isLoaded, isSignedIn, clerkUser, clerkLoginProcessed, role, getToken, onLoginSuccess]);

  const handleRoleSelect = (selectedRole: 'student' | 'professor') => {
    authOpenedRef.current = false;
    setRole(selectedRole);
    onRoleSelect?.(selectedRole);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background blobs for login page */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={lightBackground}
          alt=""
          className="absolute inset-0 h-full w-full object-cover block dark:hidden transition-opacity duration-300 blur-[3px] scale-105 brightness-75"
        />
        <img
          src={darkBackground}
          alt=""
          className="absolute inset-0 h-full w-full object-cover hidden dark:block transition-opacity duration-300 blur-[3px] scale-105 brightness-75"
        />
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-[120px] dark:bg-primary/5" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-secondary/15 rounded-full blur-[140px] dark:bg-secondary/5" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-md w-full space-y-6 z-10"
      >
        {/* Back Button */}
        <div>
          <button
            onClick={onBackToLanding}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
        </div>

        {/* Brand / Logo */}
        <div className="text-center">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{
              background: 'linear-gradient(135deg, #00E5FF 0%, #7B61FF 100%)',
              boxShadow: '0 0 24px rgba(0, 229, 255, 0.3)',
            }}
          >
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
            Welcome to <span className="gradient-text">CampusTwin</span>
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-gray-400">
            {initialRole ? (role === 'student' ? 'Student portal access' : 'Professor portal access') : 'Choose whether you are a student or professor'}
          </p>
        </div>

        {!role ? (
          <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
            <div className="text-center mb-6">
              <p className="text-sm font-semibold text-slate-800 dark:text-white">Who are you?</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-gray-400">Choose your campus portal to continue.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => handleRoleSelect('student')}
                className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 text-left transition-all hover:-translate-y-0.5 hover:bg-white/80 dark:border-slate-800/70 dark:bg-slate-950/70 dark:hover:bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-primary/10 p-2 text-primary">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Student</p>
                    <p className="text-sm text-slate-500 dark:text-gray-400">Continue to the student portal</p>
                  </div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect('professor')}
                className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 text-left transition-all hover:-translate-y-0.5 hover:bg-white/80 dark:border-slate-800/70 dark:bg-slate-950/70 dark:hover:bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-secondary/10 p-2 text-secondary">
                    <School className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Professor</p>
                    <p className="text-sm text-slate-500 dark:text-gray-400">Continue to the professor portal</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
            {/* Top glowing line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            {isSignedIn && isLoaded && clerkUser ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-8 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center border border-green-500/20">
                  <Sparkles className="w-8 h-8 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Login Successful!</h3>
                <p className="text-sm text-slate-600 dark:text-gray-400">Loading your {role === 'student' ? 'student' : 'professor'} dashboard...</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-12 text-center space-y-4"
              >
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Opening {role === 'student' ? 'Student' : 'Professor'} Sign In</h3>
                <p className="text-sm text-slate-600 dark:text-gray-400">A sign-in window should appear shortly...</p>
              </motion.div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
