import "server-only";

import { env } from "@/lib/env.mjs";
import { createElement, type ComponentProps } from "react";
import { EmailVerificationTemplate } from "./templates/email-verification";
import { ResetPasswordTemplate } from "./templates/reset-password";
import { OneOnOneCoachTemplate } from "./templates/one-on-one-coach";
import { OneOnOneUserTemplate } from "./templates/one-on-one-user";
import { render } from "@react-email/render";
import { createTransport, type TransportOptions } from "nodemailer";

const smtpConfig = {
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
};

const transporter = createTransport(smtpConfig as TransportOptions);

type NoInfer<T> = [T][T extends any ? 0 : never];

export enum EmailTemplate {
  EmailVerification = "EmailVerification",
  PasswordReset = "PasswordReset",
  OneOnOneCoach = "OneOnOneCoach",
  OneOnOneUser = "OneOnOneUser",
}
export type PropsMap = {
  [EmailTemplate.EmailVerification]: ComponentProps<
    typeof EmailVerificationTemplate
  >;
  [EmailTemplate.PasswordReset]: ComponentProps<typeof ResetPasswordTemplate>;
  [EmailTemplate.OneOnOneCoach]: ComponentProps<typeof OneOnOneCoachTemplate>;
  [EmailTemplate.OneOnOneUser]: ComponentProps<typeof OneOnOneUserTemplate>;
};

export const sendMail = async <T extends EmailTemplate>(
  to: string,
  template: T,
  props: PropsMap[NoInfer<T>]
) => {
  if (env.NODE_ENV !== "production") {
    console.log(
      "📨 Email sent to:",
      to,
      "with template:",
      template,
      "and props:",
      props
    );
  }

  const { subject, body } = getEmailTemplate(template, props);

  const res = transporter.sendMail({
    from: "admin@newgenperformance.com",
    to,
    subject,
    html: body,
  });

  return res;
};

const getEmailTemplate = <T extends EmailTemplate>(
  template: T,
  props: PropsMap[NoInfer<T>]
) => {
  switch (template) {
    case EmailTemplate.EmailVerification:
      return {
        subject: "Verify your email address",
        body: render(
          createElement(
            EmailVerificationTemplate,
            props as PropsMap[EmailTemplate.EmailVerification]
          )
        ),
      };
    case EmailTemplate.PasswordReset:
      return {
        subject: "Reset your password",
        body: render(
          createElement(
            ResetPasswordTemplate,
            props as PropsMap[EmailTemplate.PasswordReset]
          )
        ),
      };
    case EmailTemplate.OneOnOneCoach:
      return {
        subject: "One-on-One Coach Request",
        body: render(
          createElement(
            OneOnOneCoachTemplate,
            props as PropsMap[EmailTemplate.OneOnOneCoach]
          )
        ),
      };
    case EmailTemplate.OneOnOneUser:
      return {
        subject: "Thank You for Your One-on-One Custom Plan Request",
        body: render(
          createElement(
            OneOnOneUserTemplate,
            props as PropsMap[EmailTemplate.OneOnOneUser]
          )
        ),
      };
    default:
      throw new Error("Invalid email template");
  }
};
