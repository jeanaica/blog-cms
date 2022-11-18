import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import publicRoute from '../../lib/publicRoute';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const auth = getAuth();

  return (
    <div>
      <br />
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder={'Email'}
      />
      <input
        type={'password'}
        value={pass}
        onChange={e => setPass(e.target.value)}
        placeholder={'Password'}
      />
      <button
        onClick={async () => {
          await signInWithEmailAndPassword(auth, email, pass);
          window.location.href = '/';
        }}>
        Log in
      </button>
    </div>
  );
}

export const getServerSideProps = publicRoute();
