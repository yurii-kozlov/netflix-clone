import React, { ReactElement } from 'react';
import cn from 'classnames';
import { Media } from 'types/intro/Media';
import { Container } from 'components/Container';
import styles from 'components/Benefits/Benefits.module.scss';
import Image from 'next/image';

type BenefitsProps = {
  media: Media
}

export const Benefits: React.FC<BenefitsProps> = ({ media }): ReactElement => {
  const { videoTV, videoDevices } = media.videos;
  const { tv, mobile, moviePoster,downloading, mac, kids } = media.images;
  const { sectionTV, sectionDownloading, sectionMac, sectionKids } = media.texts

  return (
    <section className={styles.marginBottom}>
      <div className={cn(styles.section, styles.marginBottom)}>
        <Container>
          <div className={cn(styles.block, styles.marginBottom)}>
            <div className={styles.description}>
              <h2 className={styles.title}>{sectionTV.title}</h2>
              <p className={styles.detailedDescription}>
                {sectionTV.description}
              </p>
            </div>
            <div className={styles.imageAndVideoWrapper} >
              <Image alt="tv" className={styles.image} height={480} src={tv} width={640} />
              <div className={styles.videoWrapper}>
                <video
                  className={styles.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  >
                  <source
                    src={videoTV}
                    type='video/mp4'
                  />
                </video>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className={cn(styles.section, styles.marginBottom)}>
        <Container>
          <div className={styles.blockReverse}>
            <div className={styles.description}>
              <h2 className={styles.title}>{sectionDownloading.title}.</h2>
              <p className={styles.detailedDescription}>
                {sectionDownloading.description}
              </p>
            </div>
            <div className={styles.imagesWrapper} >
              <Image
                alt="mobile"
                className={styles.image}
                height={480}
                src={mobile}
                width={640}
              />
              <div className={styles.card} >
                <div className={styles.posterAndInfoWrapper}>
                  <img alt="moviePoster" className={styles.moviePoster} src={moviePoster}/>
                  <div className={styles.moviePosterDetails}>
                    <p className={styles.movieTitle}>Stranger Things</p>
                    <p className={styles.movieStatus}>Downloading...</p>
                  </div>
                </div>
                <img alt="downloading" className={styles.downloadingIcon} src={downloading} />
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className={cn(styles.section, styles.marginBottom)}>
        <Container>
          <div className={cn(styles.block, styles.marginBottom)}>
            <div className={styles.description}>
              <h2 className={styles.title}>{sectionMac.title}</h2>
              <p className={cn(styles.detailedDescription, styles.detailedDescriptionMac)}>
                {sectionMac.description}
              </p>
            </div>
            <div className={styles.imageAndVideoWrapper} >
              <Image alt="mac" className={styles.image} height={480} src={mac} width={640}/>
              <div className={cn(styles.monitorVideoWrapper )}>
                <video
                  className={styles.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  >
                  <source
                    src={videoDevices}
                    type='video/mp4'
                  />
                </video>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className={cn(styles.section, styles.marginBottom)}>
        <Container>
          <div className={styles.blockReverse}>
            <div className={styles.description}>
              <h2 className={styles.title}>{sectionKids.title}</h2>
              <p className={styles.detailedDescription}>
                {sectionKids.description}
              </p>
            </div>
            <div className={styles.imagesWrapper} >
              <Image alt="kids" className={styles.image} height={480} src={kids} width={640}/>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
