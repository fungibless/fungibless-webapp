import * as React from "react"
import Section from "../section"

const SpinnerSection = () => {
    return (
        <Section id='spinner' className='loader_first'>
            <div className="circular-spinner"></div>
        </Section>
    )
}

export default SpinnerSection