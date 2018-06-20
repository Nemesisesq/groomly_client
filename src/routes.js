import React from 'react'
import {Route} from "react-router-dom";
import Home from "./home/home.main";
import Opportunities from "./opportunities/opportunities.main";
export const routes = [
    {
        path: "/",
        component: Home,

    },
    {
        path: "/opportunities",
        component: Opportunities,
        exact: true,

    }
];

export const RouteWithSubRoutes = route => (
    <Route
        path={route.path}
        exact={route.exact}
        render={props => (
            // pass the sub-routes down to keep nesting
            <route.component {...props} routes={route.routes} />
        )}
    />
);