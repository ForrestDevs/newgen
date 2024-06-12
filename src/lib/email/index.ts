import "server-only";

import { env } from "@/lib/env.mjs";
import { createElement, type ComponentProps } from "react";
import { EmailVerificationTemplate } from "./templates/email-verification";
import { ResetPasswordTemplate } from "./templates/reset-password";
import { render } from "@react-email/render";
import { createTransport, type TransportOptions } from "nodemailer";

type NoInfer<T> = [T][T extends any ? 0 : never];

export enum EmailTemplate {
  EmailVerification = "EmailVerification",
  PasswordReset = "PasswordReset",
}
export type PropsMap = {
  [EmailTemplate.EmailVerification]: ComponentProps<
    typeof EmailVerificationTemplate
  >;
  [EmailTemplate.PasswordReset]: ComponentProps<typeof ResetPasswordTemplate>;
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
    default:
      throw new Error("Invalid email template");
  }
};

// export const sendMail = async <T extends EmailTemplate>(
//   to: string,
//   template: T,
//   props: PropsMap[NoInfer<T>]
// ) => {
//   if (env.NODE_ENV !== "production") {
//     console.log(
//       "📨 Email sent to:",
//       to,
//       "with template:",
//       template,
//       "and props:",
//       props
//     );
//     return;
//   }

//   try {
//     const { data, error } = await resend.emails.send({
//       from: "admin@newgenperformance.com",
//       to: to,
//       subject: getEmailTemplate(template, props).subject,
//       react: getEmailTemplate(template, props).body,
//     });

//     if (error) {
//       console.log("ERROR", error);
//       return Response.json({ error }, { status: 500 });
//     }
//     console.log("Email sent to:", Response.json(data));

//     return Response.json(data);
//   } catch (error) {
//     console.log("ERROR", error);
//     return Response.json({ error }, { status: 500 });
//   }
// };

const smtpConfig = {
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
};

const transporter = createTransport(smtpConfig as TransportOptions);

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
