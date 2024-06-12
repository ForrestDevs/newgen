import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Please provide your password.").max(255),
});
export type SignupInput = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  password: z
    .string()
    .min(8, "Password is too short. Minimum 8 characters required.")
    .max(255),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const verifyEmailSchema = z.object({
  code: z.string().length(8),
});
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Invalid token"),
  password: z.string().min(8, "Password is too short").max(255),
});
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export const authResponseSchema = z.object({
  redirect: z.string(),
});

export const introSurveySchema = z.object({
  goal: z.string().min(1),
  performance: z.string().min(1),
});

export type IntroSurveyInput = z.infer<typeof introSurveySchema>;

export const profileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  birthday: z.date(),
  location: z.string().min(1),
  hockeyLevel: z.string().min(1),
});

export type ProfileInput = z.infer<typeof profileSchema>;
