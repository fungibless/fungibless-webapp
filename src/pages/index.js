import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/Layout"
import StakingPage from "../components/pages/staking.page"
import IndexPage from "../components/pages/index.page"
import TypicalWageWorkersPage from "../components/pages/tww.page"
import SuperUrbanCatPage from "../components/pages/suc.page"
import TokenomicsPage from "../components/pages/tokenomics.page"
import RoadmapPage from "../components/pages/roadmap.page"


const Index = () => (
    <Layout headerType="transparent-header">
        <Router>
            <IndexPage path="/" />
            <StakingPage path="/staking" />
            <TypicalWageWorkersPage path="/tww"/>
            <SuperUrbanCatPage path="/suc"/>
            <TokenomicsPage path="/tokenomics"/>
            <RoadmapPage path="/roadmap"/>
        </Router>               
    </Layout>
)

export default Index