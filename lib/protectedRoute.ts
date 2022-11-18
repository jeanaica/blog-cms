import nookies from 'nookies';
import { GetServerSideProps } from 'next';
import { firebaseAdmin } from '../firebaseAdmin';

const protectedRoute: (
  inner?: GetServerSideProps
) => GetServerSideProps = inner => {
  return async context => {
    try {
      const cookies = nookies.get(context);
      const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

      // the user is authenticated!
      const { uid, email } = token;

      return {
        props: {
          message: `Your email is ${email} and your UID is ${uid}.`,
        },
      };
    } catch (err) {
      // either the `token` cookie didn't exist
      // or token verification failed
      // either way: redirect to the login page
      // `as never` prevents inference issues
      // with InferGetServerSidePropsType.
      // The props returned here don't matter because we've
      // already redirected the user.
      return { props: {} as never, redirect: { destination: '/login' } };
    }
  };
};

export default protectedRoute;
