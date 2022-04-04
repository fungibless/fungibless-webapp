import React from "react";
import { withPrefix, withAssetPrefix } from "gatsby"

import wrapWithProvider from "./wrap-with-provider"
export const wrapRootElement = wrapWithProvider

export function onRenderBody(
    { setHeadComponents, setPreBodyComponents, setPostBodyComponents }) {

    setHeadComponents([
        <script key="modernizr" src={withPrefix("js/modernizr-2.8.3.min.js")}></script>,
        <script key="jquery" src={withPrefix("js/jquery.min.js")}></script>,
        <script key="bootstrap" src={withPrefix("js/bootstrap.min.js")}></script>,
    ]);

    setPostBodyComponents([
        <script key="jquery.magnific-popup" src={withPrefix("js/jquery.magnific-popup.min.js")}></script>,
        <script key="imagesloaded" src={withPrefix("js/imagesloaded.pkgd.min.js")}></script>,
        <script key="wow" src={withPrefix("js/wow.min.js")}></script>,
        <script key="jquery.counterup" src={withPrefix("js/jquery.counterup.min.js")}></script>,
        <script key="waypoints" src={withPrefix("js/waypoints.min.js")}></script>,
        <script key="owl.carousel" src={withPrefix("js/owl.carousel.min.js")}></script>,
        <script key="plugins" src={withPrefix("js/plugins.js")}></script>,
        <script key="time-counter" src={withPrefix("js/time-counter.js")}></script>,
    ]);

}