import React from 'react'
import {Route} from "react-router-dom";
import Home from "./home/home.main";
import Opportunities from "./opportunities/opportunities.main";
import OpportunityDetail from  "./opportunities/opportunities.detail"
import Metrics from "./metrics/metrics.main";
import Values from "./values/values.main";
import ProjectReports from "./reports/reports.main";
import FatalAttributes from "./fatal.attributes/fatal.attributes.main";

export const routes = [
    {
        title: 'Home',
        path: "/",
        component: Home,


    },
    {
        title: 'Opportunities',
        path: "/opportunities",
        component: Opportunities,

    },
    {
        title: 'Opportunity',
        path: "/opportunity/{id}",
        component: OpportunityDetail,
        show:false

    },
    // {
    //     title: 'metrics',
    //     path: "/metrics",
    //     component: Metrics
    // },
    // {
    //     title: 'Values',
    //     path: '/values',
    //     component: Values
    // },
    // {
    //     title: "Reports",
    //     path: '/reports',
    //     component: ProjectReports
    // },
    // {
    //     title: 'Fatal Attributes',
    //     path: '/fatal_attributes',
    //     component: FatalAttributes,
    //
    // }
];

export const RouteWithSubRoutes = route => (
    <Route
        path={route.path}
        exact={route.exact}
        render={props => (
            // pass the sub-routes down to keep nesting
            <route.component {...props} routes={route.routes}/>
        )}
    />
);