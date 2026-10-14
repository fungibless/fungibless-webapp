import * as React from 'react';
import { Link } from 'gatsby';
import PageSection from '../components/PageSection';
import BreadcrumbPageSection from '../sections/BreadcrumbPageSection';

function NotFoundPage() {
  return (
    <>
      <BreadcrumbPageSection pageTitle="Page not found" />
      <PageSection className="pt-115 pb-85 md-pt-75 md-pb-42">
        <h4>Sorry, we couldn’t find what you were looking for.</h4>
        <Link to="/">Go home</Link>
      </PageSection>
    </>
  );
}

export default NotFoundPage;
