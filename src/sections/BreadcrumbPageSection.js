import * as React from 'react';

function BreadcrumbPageSection(props) {
  return (
    <div className="gamfi-breadcrumbs-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="breadcrumbs-area sec-heading">
              <h2 className="title mb-0">{props.pageTitle}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BreadcrumbPageSection;
