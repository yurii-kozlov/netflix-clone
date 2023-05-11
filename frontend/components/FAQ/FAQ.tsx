import React, { ReactElement } from 'react';
import cn from 'classnames'
import { v4 as uuid_v4 } from 'uuid';
import { FAQsection as FAQblock } from 'types/intro/FAQsection';
import { Container } from 'components/Container';
import { FAQsection } from 'components/FAQ/FAQsection';
import { SubscriptionForm } from 'components/SubscriptionForm';
import styles from 'components/FAQ/FAQ.module.scss';

type FAQprops = {
  faq: FAQblock[]
}

export const FAQ: React.FC<FAQprops> = ({ faq }): ReactElement => (
  <section className={cn(styles.section, styles.sectionMarginBottom)}>
    <Container>
      <h2 className={styles.title}>Frequently Asked Questions</h2>
      <div>
        <ul className={styles.list}>
          {faq.map((section) => (
            <FAQsection key={uuid_v4()} section={section} />
          )
          )}
        </ul>
        <SubscriptionForm />
      </div>
    </Container>
  </section>
  );
