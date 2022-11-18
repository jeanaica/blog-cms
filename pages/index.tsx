import React from 'react';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

import { auth } from '../firebaseClient';
import { signOut } from 'firebase/auth';
import protectedRoute from '../lib/protectedRoute';

export default function HomePage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();

  return (
    <div>
      <p>{props.message!}</p>
      <button
        onClick={async () => {
          await signOut(auth).then(() => {
            router.push('/login');
          });
        }}>
        Sign out
      </button>
    </div>
  );
}

export const getServerSideProps = protectedRoute();
