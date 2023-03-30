import { GetStaticProps } from 'next';
import { instance } from 'api/api';
import { SignUp } from 'types/SignUp';

type SignUpSuccess = {
  signUpData: SignUp;
  error?: never;
};

type SignUpError = {
  signUpData?: never;
  error: string;
};

export type SignUpStaticProps = SignUpSuccess | SignUpError;

export const getStaticProps: GetStaticProps<SignUpStaticProps> = async () => {
  try {
    const { data } = await instance.get('/signUp');

    return {
      props: {
        signUpData: data,
      }
    }
  } catch (error) {

    return {
      props: {
        error: 'Failed to fetch data'
      }
    }
  }
}

