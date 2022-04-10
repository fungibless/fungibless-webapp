import * as React from "react"

const styles = {
    backgroundPosition: 'center bottom',
    backgroundColor: '#090a1a'
}

const PageSection = ({ className, children }) => {
    return (
        <div className={className} style={styles}>
            <div className="container">
                {children}
            </div>
        </div>
    )
}

export default PageSection