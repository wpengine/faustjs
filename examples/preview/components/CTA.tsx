import React from 'react';
import styles from 'sass/components/CTA.module.scss';

interface Props {
  title: string;
  buttonText?: string;
  buttonURL?: string;
  children?: React.ReactNode;
  headingLevel?: number;
}

function CTA({
  title = 'Get in touch',
  buttonText,
  buttonURL,
  children,
  headingLevel = 1,
}: Props) {
  const Heading = `h${headingLevel}`;
  return (
    <section className={styles.cta}>
      <div className={styles.wrap}>
        <Heading className={styles.title}>{title}</Heading>
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
