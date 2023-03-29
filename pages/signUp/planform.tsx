import React, { ReactElement } from 'react';
import { getStaticProps, SignUpStaticProps } from 'api/getStaticPropsSignUp';
import { SignUpContainer } from 'components/SignUpContainer';

const Planform: React.FC<SignUpStaticProps> = ({ signUpData, error }): ReactElement => (
  <SignUpContainer error={error || null} signUpData={signUpData || null}>
    <div>
      <h1>hi this is planform page</h1>
    </div>
  </SignUpContainer>
  );

export { getStaticProps };
export default Planform;
