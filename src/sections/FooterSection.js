import * as React from "react"
import { Link } from "gatsby"

const FooterSection = () => {
    return (
        <div className="container">
            <div className="text-center mb-0">
                <div className="mb-37 md-mb-25">Copyright © 2022. All Rights Reserved by&nbsp;
                    <Link to="/"><span style={{ color: 'white', fontWeight: 'bold' }}>Fungibless</span></Link>
                </div>
            </div>
        </div>
    )
};

export default FooterSection