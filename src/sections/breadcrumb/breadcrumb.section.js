import * as React from "react"
import steps_img from '../../assets/images/icons/steps.png'

const BreadcrumbPageSection = ({ pageTitle }) => {
    return (
        <div className="gamfi-breadcrumbs-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5">
                        <div className="breadcrumbs-area sec-heading">                           
                            <h2 className="title mb-0">{pageTitle}</h2>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    )
}

export default BreadcrumbPageSection;