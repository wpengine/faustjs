import React from 'react';
import { useGeneralSettings } from '@wpengine/headless/react';
import { Header, Hero, Footer } from '../components';

export default function Page(): JSX.Element {
  const settings = useGeneralSettings();

  return (
    <>
      <Header title={settings?.title} description={settings?.description} />
      <main className="content content-page">
        <Hero title={`Oops! That page can’t be found.`} />
        <div className="wrap">
          <div>
            <div>
              <p>
                The page you were looking for does not exist or is no longer
                available.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer copyrightHolder={settings?.title} />
    </>
  );
}
