import { VALIDATION } from '@/constants/app';
import type { CompleteProfileInput } from '@/types/profile';
import type { LoginFormValues, SignupFormValues } from '@/types/auth';

export function validateLogin(values: LoginFormValues): string | null {
  if (!values.email.trim() || !values.password) {
    return 'Email and password are required.';
  }

  return null;
}

export function validateSignup(values: SignupFormValues): string | null {
  if (!values.email.trim() || !values.password || !values.confirmPassword) {
    return 'All fields are required.';
  }

  if (values.password.length < VALIDATION.passwordMinLength) {
    return `Password must be at least ${VALIDATION.passwordMinLength} characters.`;
  }

  if (values.password !== values.confirmPassword) {
    return 'Passwords do not match.';
  }

  return null;
}

export function validateProfile(values: CompleteProfileInput): string | null {
  if (!values.fullName.trim() || !values.phoneNumber.trim() || !values.education.trim()) {
    return 'All profile fields are required.';
  }

  if (values.phoneNumber.trim().length < VALIDATION.phoneMinLength) {
    return 'Phone number is too short.';
  }

  if (
    Number.isNaN(values.yearsOfExperience) ||
    values.yearsOfExperience < VALIDATION.yearsOfExperienceMin ||
    values.yearsOfExperience > VALIDATION.yearsOfExperienceMax
  ) {
    return 'Years of experience is invalid.';
  }

  return null;
}