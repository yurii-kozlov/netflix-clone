import React, { ReactElement } from 'react';
import { v4 as uuid_v4 } from 'uuid';
import Image from 'next/image';
import { LinksListItem } from 'types/LinksListItem';
import { socialNetworksLinks } from 'constants/socialNetworks';
import { Container } from 'components/Container';
import { MainFooterListItem } from 'components/MainFooter/MainFooterListItem';
import { BsInstagram, BsTwitter, BsYoutube, BsFacebook } from 'react-icons/bs';
import technoCossacks from 'images/cossacks.svg';
import styles from 'components/MainFooter/MainFooter.module.scss';

type MainFooterProps = {
  footerLinksList: LinksListItem[];
}

export const MainFooter: React.FC<MainFooterProps> = ({ footerLinksList }): ReactElement => {
  const {youtubeLink, twitterLink, instagramLink, facebookLink } = socialNetworksLinks;

  return (
    <footer className={styles.section}>
      <Container>
        <div className={styles.socialMediaBlock}>
          <a className={styles.link} href={facebookLink} target="_blank">
            <BsFacebook className={styles.logo} size={25}/>
          </a>
          <a className={styles.link} href={instagramLink} target="_blank">
            <BsInstagram className={styles.logo} size={30}/>
          </a>
          <a className={styles.link} href={twitterLink} target="_blank">
            <BsTwitter className={styles.logo} size={30}/>
          </a>
          <a className={styles.link} href={youtubeLink}target="_blank">
            <BsYoutube className={styles.logo} size={30}/>
          </a>
        </div>
        <ul className={styles.linksList}>
          {footerLinksList.map((linkItem) => (
            <MainFooterListItem key={uuid_v4()} linksListItem={linkItem} />
          ))}
        </ul>
        <p className={styles.authorInfo}>
          <span className={styles.detailedinfo}>
            Created by <b>&nbsp;TechnoCossacks</b>
            <Image alt="cossack" className={styles.logoCossacks} src={technoCossacks}/>
          </span>
          <span className={styles.detailedinfo}>Copyright &copy; 2023. All rights reserved</span>
        </p>
      </Container>
    </footer>
  );
};
