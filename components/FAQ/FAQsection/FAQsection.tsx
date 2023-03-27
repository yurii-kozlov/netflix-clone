import React, { ReactElement, useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { faqSection } from 'types/faqSection';
import cross from 'images/cross.svg';
import styles from 'components/FAQ/FAQsection/FAQsection.module.scss';

type FAQsectionProps = {
  section: faqSection
}

export const FAQsection: React.FC<FAQsectionProps> = ({ section }): ReactElement => {
  const [isListVisisble, setIsListVisible] = useState<boolean>(false);

  const handleListVisibility = (): void => setIsListVisible(!isListVisisble);
  const {title, answer} = section;

  return (
    <li className={styles.listItem}>
      <button
        className={styles.buttonOpenClose}
        onClick={handleListVisibility}
        type="button"
      >
        <span className={styles.title}>
          {title}
        </span>
        <Image
          alt='cross'
          className={cn(styles.crossIcon, {[styles.crossIconClicked]: isListVisisble})}
          src={cross}
        />
      </button>
      <div className={cn(styles.answerBlock, {[styles.answerBlockvisible]: isListVisisble})}>
        <p className={styles.answerText}>
          {answer}
        </p>
      </div>
    </li>
    );
}
