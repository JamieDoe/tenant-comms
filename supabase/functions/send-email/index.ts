import React from 'npm:react@18.3.1'
import { Resend } from 'npm:resend@4.0.0'
import { renderAsync } from 'npm:@react-email/components@0.0.22'
import { ConfirmEmail } from './_templates/confirm-email.tsx'
import { ResetPassword } from './_templates/reset-password.tsx'


Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('not allowed', { status: 405 })
  }

  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
  const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? 'MISSING'

  if (!RESEND_API_KEY || RESEND_API_KEY === 'MISSING') {
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

    const actionUrl = new URL(`${SUPABASE_URL}/auth/v1/verify`)
    actionUrl.searchParams.set('token', token_hash)
    actionUrl.searchParams.set('type', email_action_type)
    actionUrl.searchParams.set('redirect_to', redirect_to)
    const actionUrlHref = actionUrl.href

    let subject: string
    let html: string

    switch (email_action_type) {
      case 'signup':
      case 'email':
      case 'email_change':
        subject = 'Welcome to TenantComms - Confirm your email'
        html = await renderAsync(
          React.createElement(ConfirmEmail, { actionUrl: actionUrlHref })
        )
        break

      case 'recovery':
        subject = 'Reset your TenantComms password'
        html = await renderAsync(
          React.createElement(ResetPassword, { actionUrl: actionUrlHref })
        )
        break

      default:
        subject = 'TenantComms'
        html = await renderAsync(
          React.createElement(ConfirmEmail, { actionUrl: actionUrlHref })
        )
    }

    const { error } = await resend.emails.send({
      from: 'TenantComms <no-reply@tenantcomms.com>',
      to: [user.email],
      subject,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      throw error
    }

    console.log('Email sent successfully')
  } catch (error) {

    if (error instanceof Error) {
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

    console.error('Send email error:', error)
  }

  return new Response(JSON.stringify({}), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
})