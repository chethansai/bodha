import { VALIDATION } from '@/constants/app';
import type { CompleteProfileInput } from '@/types/profile';
import type { LoginFormValues, SignupFormValues } from '@/types/auth';
import type { CreateJobInput } from '@/types/job';

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

export function validateJob(values: CreateJobInput): string | null {
  if (
    !values.title.trim() ||
    !values.companyName.trim() ||
    !values.location.trim() ||
    !values.experienceRequired.trim() ||
    !values.description.trim() ||
    !values.employmentType.trim() ||
    !values.salaryRange.trim() ||
    !values.slug.trim()
  ) {
    return 'All job fields are required.';
  }

  if (values.skills.length === 0 || values.skills.some((skill) => !skill.trim())) {
    return 'Add at least one valid skill.';
  }

  return null;
}