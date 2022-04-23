import React from 'react';
import { Router } from '@reach/router';
import Layout from '../components/layout';
import StakingPage from '../subpages/StakingPage';
import IndexPage from '../subpages/IndexPage';
import TypicalWageWorkersPage from '../subpages/TypicalWageWorkersPage';
import TokenomicsPage from '../subpages/TokenomicsPage';
import RoadmapPage from '../subpages/RoadmapPage';

function Index() {
  return (
    <Layout>
      <Router>
        <IndexPage path="/" />
        <StakingPage path="/staking" />
        <TypicalWageWorkersPage path="/tww" />
        <TokenomicsPage path="/tokenomics" />
        <RoadmapPage path="/roadmap" />
      </Router>
    </Layout>
  );
}

export default Index;
