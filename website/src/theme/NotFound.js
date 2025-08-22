import React from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import {PageMetadata} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import {useLocation} from '@docusaurus/router';
import notFoundNewLinks from './NotFoundLinksTable';


export default function NotFound() {
  const {pathname} = useLocation();
  const link = notFoundNewLinks[pathname];
  const message = link ? (
    <>
      This page has been moved to{" "} {link}
    </>
  ) : (
    <>Can't find what you look for? 🙁 <br/>
    Try searching for it on our New <a src="https://help.ayon.app/en/help">Help Center</a>.</>
  );
    
  return (
    <>
      <PageMetadata
        title={translate({
          id: 'theme.NotFound.title',
          message: 'Page Not Found',
        })}
      />
      <Layout>
        <main className="container margin-vert--xl">
          <div className="row">
            <div className="col col--6 col--offset-3">
              <h1 className="hero__title">
                <Translate
                  id="theme.NotFound.title"
                  description="The title of the 404 page">
                  Page Not Found
                </Translate>
              </h1>
              <p>
                  {message}
              </p>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
