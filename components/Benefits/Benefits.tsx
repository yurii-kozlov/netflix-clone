import { ReactElement } from 'react';
import cn from 'classnames';
import { media } from 'api/media';
import { Container } from 'components/Container';
import styles from 'components/Benefits/Benefits.module.scss';

const { video1, video2 } = media.videos;
const { tv, mobile, moviePoster,downloading, mac, kids } = media.images;
const { sectionTV, sectionDownloading, sectionMac, sectionKids } = media.texts

export const Benefits = (): ReactElement => (
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
            <img alt="tv" className={styles.image} src={tv} />
            <div className={styles.videoWrapper}>
              <video
                className={styles.video}
                autoPlay
                loop
                muted
                playsInline
                >
                <source
                  src={video1}
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
            <img alt="mobile" className={styles.image} src={mobile} />
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
            <p className={styles.detailedDescription}>
              {sectionMac.description}
            </p>
          </div>
          <div className={styles.imageAndVideoWrapper} >
            <img alt="mac" className={styles.image} src={mac} />
            <div className={cn(styles.monitorVideoWrapper )}>
              <video
                className={styles.video}
                autoPlay
                loop
                muted
                playsInline
                >
                <source
                  src={video2}
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
              {sectionKids.text}
            </p>
          </div>
          <div className={styles.imagesWrapper} >
            <img alt="kids" className={styles.image} src={kids} />
          </div>
        </div>
      </Container>
    </div>
  </section>
  );
