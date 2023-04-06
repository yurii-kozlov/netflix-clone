import React, { ReactElement } from 'react';
import Head from 'next/head';
import { getStaticProps, SignUpStaticProps } from 'api/getStaticPropsSignUp';
import { SignUpContainer } from 'components/SignUpContainer';
import { Container } from 'components/Container';
import { PlanTable } from 'components/PlanTable';

const Planform: React.FC<SignUpStaticProps> = ({ signUpData, error }): ReactElement => (
  <>
    <Head>
      <title>Netflix</title>
    </Head>
    <SignUpContainer error={error || null} signUpData={signUpData || null}>
      <Container>
        <PlanTable />
      </Container>
    </SignUpContainer>
  </>
  );

export { getStaticProps };
export default Planform;
