import React, { ReactElement } from 'react';
import Image from 'next/image';
import { getStaticProps, SignUpStaticProps } from 'api/getStaticPropsSignUp';
import { SignUpContainer } from 'components/SignUpContainer';
import { Container } from 'components/Container';
import { PlanTable } from 'components/PlanTable';
import checkMark from 'images/checkMark.svg';
import styles from 'styles/pages/planform.module.scss';

const Planform: React.FC<SignUpStaticProps> = ({ signUpData, error }): ReactElement => (
  <SignUpContainer error={error || null} signUpData={signUpData || null}>
    <Container>
      <div className={styles.planformWrapper}>
        <div className={styles.stepHeader}>
          <span className={styles.stepIndicator}>
            STEP&nbsp;<b>2</b>&nbsp;OF<b>&nbsp;3</b>
          </span>
          <h1 className={styles.stepTitle}>Choose the plan that&apos;s right for you</h1>
        </div>
        <ul className={styles.checkMarkList}>
          <li className={styles.checkMarkListItem}>
            <Image alt='checkmark' className={styles.checkMark} src={checkMark}/>
            <span className={styles.listItemText}>Watch all you want. Ad-free.</span>
          </li>
          <li className={styles.checkMarkListItem}>
            <Image alt='checkmark' className={styles.checkMark} src={checkMark}/>
            <span className={styles.listItemText}>Recommendations just for you.</span>
          </li>
          <li className={styles.checkMarkListItem}>
            <Image alt='checkmark' className={styles.checkMark} src={checkMark}/>
            <span className={styles.listItemText}>Change or cancel your plan anytime.</span>
          </li>
        </ul>
        <PlanTable />
      </div>
    </Container>
  </SignUpContainer>
  );

export { getStaticProps };
export default Planform;
