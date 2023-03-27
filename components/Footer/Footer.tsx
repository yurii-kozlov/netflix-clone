import React, { ReactElement } from 'react';
import { v4 as uuid_v4 } from 'uuid';
import { FooterListItem as FooterListItemLink } from 'types/intro/FooterListItem';
import { Container } from 'components/Container';
import { FooterListItem } from 'components/Footer/FooterListItem';
import styles from 'components/Footer/Footer.module.scss';

type FooterProps = {
  footerLinksList: [FooterListItemLink]
}

export const Footer: React.FC<FooterProps> = ({ footerLinksList }): ReactElement => (
  <section className={styles.section}>
    <Container>
      <div className={styles.heading}>
        Questions? Call:&nbsp;
        <a className={styles.phoneNumber} href="tel:0800-509-417">0800-509-417</a>
      </div>
      <ul className={styles.linkList} >
        {footerLinksList.map((listItem) => (
          <FooterListItem key={uuid_v4()} listItem={listItem}/>
        ))}
      </ul>
      <p className={styles.country} >Netflix Ukraine</p>
    </Container>
  </section>
  );
