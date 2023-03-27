import { FAQsection } from 'types/intro/FAQsection';
import { FooterListItem } from 'types/intro/FooterListItem';
import { Media } from 'types/intro/Media';

export type Intro = {
  media: Media,
  faq: [FAQsection],
  footerLinksList: [FooterListItem]
}
