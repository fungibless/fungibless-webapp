import * as React from "react"
import Layout from "./layout"
import PageSection from "../sections/page-secion";
import BreadcrumbPageSection from '../sections/breadcrumb/breadcrumb.section'

const TokenomicsPage = () => {
    return (
        <Layout headerType="default-header">
            <BreadcrumbPageSection pageTitle="Super Urban Cat"/>
            <PageSection className="pt-115 pb-85 md-pt-75 md-pb-42">
                <div>Comming Soon!</div>
            </PageSection>
        </Layout>
    )
};

export default TokenomicsPage;