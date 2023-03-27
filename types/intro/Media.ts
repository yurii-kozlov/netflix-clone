import { BenefitSection } from 'types/intro/BenefitSection';

export interface Media {
  images: {
    netflixLogo: string,
    tv: string,
    mac: string,
    mobile: string,
    moviePoster: string,
    downloading: string,
    kids: string
  },
  videos: {
    videoTV: string,
    videoDevices: string
  },
  texts: {
    sectionTV: BenefitSection,
    sectionDownloading: BenefitSection,
    sectionMac: BenefitSection,
    sectionKids: BenefitSection
  }
}
