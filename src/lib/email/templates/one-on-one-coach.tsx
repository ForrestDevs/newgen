import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { APP_NAME } from "@/config/constants";

export interface OneOnOneCoachTemplateProps {
  userEmail: string;
  notes: string;
  preferredDate1: string;
  preferredDate2?: string;
  preferredDate3?: string;
}

export const OneOnOneCoachTemplate = (props: OneOnOneCoachTemplateProps) => {
  return (
    <Html>
      <Head>
        <title>One-on-One Coach Request</title>
      </Head>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Text style={title}>One-on-One Coach Request</Text>
            <Text style={text}>
              Hello Coach,
              <br />
              <br />
              A user has requested a one-on-one session with the following
              details:
              <br />
              <br />
              User Email: {props.userEmail}
              <br />
              Notes: {props.notes}
              <br />
              Preferred Times:
              <br />- {props.preferredDate1}
              <br />- {props.preferredDate2}
              <br />- {props.preferredDate3}
              <br />
              <br />
              Please reach out to the user to schedule the session.
              <br />
              <br />
              Best regards,
              <br />
              {APP_NAME}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const title = {
  ...text,
  fontSize: "22px",
  fontWeight: "700",
  lineHeight: "32px",
};

const codePlaceholder = {
  backgroundColor: "#fbfbfb",
  border: "1px solid #f0f0f0",
  borderRadius: "4px",
  color: "#1c1c1c",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

// const anchor = {
//   textDecoration: "underline",
// };
