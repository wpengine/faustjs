import React from 'react';
import styles from 'scss/components/CTA.module.scss';
import Heading, { HeadingProps } from './Heading';

interface Props {
  title: string;
  buttonText?: string;
  buttonURL?: string;
  children?: React.ReactNode;
  headingLevel?: HeadingProps['level'];
}

function CTA({
  title = 'Get in touch',
  buttonText,
  buttonURL,
  children,
  headingLevel = 'h1',
}: Props): JSX.Element {
  return (
    <section className={styles.cta}>
      <div className={styles.wrap}>
        <Heading level={headingLevel} className={styles.title}>
          {title}
        </Heading>
        <div className={styles.intro}>
          <div className={styles.children}>{children}</div>
          {buttonText && buttonURL && (
            <div className={styles['button-wrap']}>
              <a href={buttonURL} className="button">
                {buttonText}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default CTA;
