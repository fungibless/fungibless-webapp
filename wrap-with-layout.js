import React from 'react';
import Layout from './src/components/layout';

// Wrapping in `wrapPageElement` keeps Layout (and the wallet listeners it binds)
// mounted across page navigations.
// eslint-disable-next-line react/prop-types
function WrapWithLayout({ element }) {
  return <Layout>{element}</Layout>;
}

export default WrapWithLayout;
