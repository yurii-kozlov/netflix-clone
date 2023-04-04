import React, { ReactElement } from 'react';
import { getStaticProps, SignUpStaticProps } from 'api/getStaticPropsSignUp';
import { SignUpContainer } from 'components/SignUpContainer';
import { Container } from 'components/Container';
import { PlanTable } from 'components/PlanTable';

const Planform: React.FC<SignUpStaticProps> = ({ signUpData, error }): ReactElement => (
  <SignUpContainer error={error || null} signUpData={signUpData || null}>
    <Container>
      <PlanTable />
    </Container>
  </SignUpContainer>
  );

export { getStaticProps };
export default Planform;
