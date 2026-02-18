'use client';

import { createClient } from '@/utils/supabase/client';

const LoginPage = () => {
  async function handleLogin() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }
  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
