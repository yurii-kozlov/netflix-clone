import React, { ReactElement } from 'react';
import { v4 as uuid_v4 } from 'uuid';
import { LinksListItem } from 'types/LinksListItem';
import { socialNetworksLinks } from 'constants/socialNetworks';
import { Container } from 'components/Container';
import { MainFooterListItem } from 'components/MainFooter/MainFooterListItem';
import { BsInstagram, BsTwitter, BsYoutube, BsFacebook } from 'react-icons/bs';
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
          <a
            aria-label="Visit our Netflix page on Facebook"
            className={styles.link}
            href={facebookLink} target="_blank"
          >
            <BsFacebook className={styles.socialNetworklogo} color="#fff" size={25}/>
          </a>
          <a
            aria-label="Visit our Netflix page on Instagram"
            className={styles.link}
            href={instagramLink} target="_blank"
          >
            <BsInstagram className={styles.socialNetworklogo} color="#fff" size={30}/>
          </a>
          <a
            aria-label="Visit our Netflix page on Twitter"
            className={styles.link}
            href={twitterLink}
            target="_blank"
          >
            <BsTwitter className={styles.socialNetworklogo} color="#fff" size={30}/>
          </a>
          <a
            aria-label="Visit our Netflix page on Youtube"
            className={styles.link}
            href={youtubeLink}
            target="_blank"
          >
            <BsYoutube className={styles.socialNetworklogo} color="#fff" size={30}/>
          </a>
        </div>
        <ul className={styles.linksList}>
          {footerLinksList.map((linkItem) => (
            <MainFooterListItem key={uuid_v4()} linksListItem={linkItem} />
          ))}
        </ul>
        <p className={styles.authorInfo}>
          <span className={styles.detailedinfo}>
            Created by <b>&nbsp;Yurii Kozlov</b>
          </span>
          <span className={styles.detailedinfo}>Copyright &copy; 2023. All rights reserved</span>
        </p>
      </Container>
    </footer>
  );
};
