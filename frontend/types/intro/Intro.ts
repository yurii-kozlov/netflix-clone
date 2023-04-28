import { FAQsection } from 'types/intro/FAQsection';
import { LinksListItem } from 'types/LinksListItem';
import { Media } from 'types/intro/Media';

export type Intro = {
  media: Media,
  faq: FAQsection[],
  footerLinksList: LinksListItem[]
}
