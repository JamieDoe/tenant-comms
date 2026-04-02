import React from 'npm:react@18.3.1'
import { Resend } from 'npm:resend@4.0.0'
import { renderAsync } from 'npm:@react-email/components@0.0.22'
import { ConfirmEmail } from './_templates/confirm-email.tsx'
import { ResetPassword } from './_templates/reset-password.tsx'

const resend = new Resend(Deno.env.get('RESEND_API_KEY') as string)

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('not allowed', { status: 400 })
  }

  try {
    const payload = await req.text()
    console.log('Function called! Payload length:', payload.length)

    const body = JSON.parse(payload)
    const user = body.user
    const { token_hash, redirect_to, email_action_type } = body.email_data

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? 'MISSING'
    console.log('SUPABASE_URL:', supabaseUrl)
    console.log('email_action_type:', email_action_type)
    console.log('user email:', user.email)
    console.log('token_hash:', token_hash)

    let subject: string
    let html: string

    switch (email_action_type) {
      case 'signup':
      case 'email':
      case 'email_change':
        subject = 'Welcome to TenantComms - Confirm your email'
        html = await renderAsync(
          React.createElement(ConfirmEmail, {
            supabase_url: supabaseUrl,
            token_hash,
            redirect_to,
            email_action_type,
          })
        )
        break

      case 'recovery':
        subject = 'Reset your TenantComms password'
        html = await renderAsync(
          React.createElement(ResetPassword, {
            supabase_url: supabaseUrl,
            token_hash,
            redirect_to,
            email_action_type,
          })
        )
        break

      default:
        subject = 'TenantComms'
        html = await renderAsync(
          React.createElement(ConfirmEmail, {
            supabase_url: supabaseUrl,
            token_hash,
            redirect_to,
            email_action_type,
          })
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
    console.error('Send email error:', error)
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

  return new Response(JSON.stringify({}), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
})