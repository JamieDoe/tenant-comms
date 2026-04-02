import React from 'npm:react@18.3.1'
import { Resend } from 'npm:resend@4.0.0'
import { renderAsync } from 'npm:@react-email/components@0.0.22'
import { ConfirmEmail } from './_templates/confirm-email.template.tsx'
import { ResetPassword } from './_templates/reset-password-email.template.tsx'
import { MagicLinkEmail } from './_templates/magic-link-email.template.tsx'

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('not allowed', { status: 405 })
  }

  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
  const SITE_URL = Deno.env.get('SITE_URL') ?? 'http://localhost:3000'

  if (!RESEND_API_KEY) {
    console.error('Missing RESEND_API_KEY environment variable')
    return new Response(
      JSON.stringify({
        error: {
          http_code: 500,
          message: 'Missing RESEND_API_KEY environment variable',
        },
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  const resend = new Resend(RESEND_API_KEY)

  try {
    const payload = await req.text()
    const body = JSON.parse(payload)
    const user = body.user
    const { token_hash, redirect_to, email_action_type } = body.email_data

    const baseUrl = redirect_to || SITE_URL
  const actionUrl = new URL(`${SITE_URL}/auth/confirm`)
actionUrl.searchParams.set('token_hash', token_hash)
actionUrl.searchParams.set('type', email_action_type)

// Extract the intended destination from redirect_to if it has one
const redirectUrl = new URL(redirect_to || SITE_URL)
const next = redirectUrl.searchParams.get('next') || '/dashboard'
actionUrl.searchParams.set('next', next)

const actionUrlHref = actionUrl.href

    let subject: string
    let html: string
    let from: string

    switch (email_action_type) {
      case 'signup':
      case 'email':
      case 'email_change':
        from = 'TenantComms <welcome@tenantcomms.com>'
        subject = 'Welcome to TenantComms - Confirm your email'
        html = await renderAsync(
          React.createElement(ConfirmEmail, { actionUrl: actionUrlHref })
        )
        break

      case 'recovery':
        from = 'TenantComms <support@tenantcomms.com>'
        subject = 'Reset your TenantComms password'
        html = await renderAsync(
          React.createElement(ResetPassword, { actionUrl: actionUrlHref })
        )
        break

        case 'magiclink':
        from = 'TenantComms <support@tenantcomms.com>'
        subject = 'Your TenantComms login link'
        html = await renderAsync(
          React.createElement(MagicLinkEmail, { actionUrl: actionUrlHref })
        )
        break

      default:
        from = 'TenantComms <support@tenantcomms.com>'
        subject = 'TenantComms'
        html = await renderAsync(
          React.createElement(ConfirmEmail, { actionUrl: actionUrlHref })
        )
    }

    const { error } = await resend.emails.send({
      from,
      to: [user.email],
      subject,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      throw error
    }

    console.log('Email sent successfully to:', user.email)
  } catch (error) {
    if (error instanceof Error) {
      console.error('Send email error:', error.message)
      return new Response(
        JSON.stringify({
          error: {
            http_code: 500,
            message: error.message,
          },
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    console.error('Unknown error:', error)
    return new Response(
      JSON.stringify({
        error: {
          http_code: 500,
          message: 'An unknown error occurred',
        },
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  return new Response(JSON.stringify({}), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
})