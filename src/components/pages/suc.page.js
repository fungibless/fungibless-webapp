import * as React from "react"
import PageSection from "../../sections/page-secion";
import BreadcrumbPageSection from '../../sections/breadcrumb/breadcrumb.section'

const SuperUrbanCatPage = () => {
    return (
        <React.Fragment>
            <BreadcrumbPageSection pageTitle="Super Urban Cat" />
            <PageSection className="pt-115 pb-85 md-pt-75 md-pb-42">
                <div>Comming Soon!</div>
            </PageSection>
        </React.Fragment>
    )
};

export default SuperUrbanCatPage