import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22';
import * as React from 'npm:react@18.3.1';

interface ConfirmEmailProps {
  supabase_url: string;
  token_hash: string;
  redirect_to: string;
  email_action_type: string;
}

export const ConfirmEmail = ({
  supabase_url,
  token_hash,
  redirect_to,
  email_action_type,
}: ConfirmEmailProps) => {
  const confirmUrl = `${supabase_url}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${redirect_to}`;

  return (
    <Html>
      <Head />
      <Preview>Welcome to TenantComms — Confirm your email</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={logo}>TenantComms</Text>
          <Text style={heading}>Welcome to TenantComms</Text>
          <Text style={paragraph}>
            You're one click away from streamlining your tenant communications.
            Confirm your email to get started.
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={confirmUrl}>
              Confirm your email
            </Button>
          </Section>
          <Text style={smallText}>
            This link expires in 1 hour. If you didn't create a TenantComms
            account, you can safely ignore this email.
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            TenantComms — Unified communications for letting agents
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#f5f3ee',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  padding: '40px 0',
};
const container = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  margin: '0 auto',
  maxWidth: '480px',
  padding: '40px',
};
const logo = {
  color: '#c4a44a',
  fontSize: '24px',
  fontWeight: '700' as const,
  textAlign: 'center' as const,
  margin: '0 0 32px 0',
};
const heading = {
  color: '#1a1a1a',
  fontSize: '22px',
  fontWeight: '600' as const,
  margin: '0 0 16px 0',
};
const paragraph = {
  color: '#555555',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 24px 0',
};
const buttonContainer = { textAlign: 'center' as const, margin: '0 0 32px 0' };
const button = {
  backgroundColor: '#c4a44a',
  borderRadius: '6px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: '600' as const,
  padding: '12px 32px',
  textDecoration: 'none',
};
const smallText = {
  color: '#999999',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0 0 24px 0',
};
const hr = { borderColor: '#e5e5e5', margin: '0 0 24px 0' };
const footer = {
  color: '#aaaaaa',
  fontSize: '12px',
  textAlign: 'center' as const,
  margin: '0',
};
