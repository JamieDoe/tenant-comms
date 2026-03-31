import {
  loginWithEmail,
  registerWithEmail,
  signInWithGoogle,
  signInWithMicrosoft,
} from '@/lib/auth/auth.service';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { error, message } = await searchParams;

  return (
    <div>
      <h1>TenantComms</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}

      <form>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required />

        <button formAction={loginWithEmail}>Log in</button>
        <button formAction={registerWithEmail}>Sign up</button>
      </form>

      <hr />

      <form action={signInWithGoogle}>
        <button>Continue with Google</button>
      </form>

      <form action={signInWithMicrosoft}>
        <button>Continue with Microsoft</button>
      </form>
    </div>
  );
}
