import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import Opportunities from "./opportunities/opportunities.main";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from '@material-ui/icons/Menu'
import Grid from "@material-ui/core/Grid";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Home from "./home/home.main";
import Drawer from '@material-ui/core/Drawer'


const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    appFrame: {
        height: 600,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
    },
    'appBar-left': {
        marginLeft: drawerWidth,
    },
    'appBar-right': {
        marginRight: drawerWidth,
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
});


const routes = [
    {
        path: "/sandwiches",
        component: Sandwiches
    },
    {
        path: "/tacos",
        component: Tacos,
        routes: [
            {
                path: "/tacos/bus",
                component: Bus
            },
            {
                path: "/tacos/cart",
                component: Cart
            }
        ]
    }
];

class App extends Component {
    render() {

        const { classes } = this.props;

        const drawer = (
            <Drawer
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar} />
                <Link to="/">
                    <Button>Home</Button>
                </Link>
                <Link to="/opps">
                    <Button>Opportunities</Button>
                </Link>

            </Drawer>
        );

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to Groomlyyyyy</h1>
                </header>
                <Router>
                    <div className={classes.appFrame}>
                        <AppBar
                            position="absolute"
                            className={classes.appBar}
                        >
                            <Toolbar>
                                <Typography variant="title" color="inherit" noWrap>
                                    Permanent drawer
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        {drawer}
                        <main className={classes.content}>
                            <div className={classes.toolbar} />
                            <Route exact path="/" component={Home}/>
                            <Route path="/opps" component={Opportunities}/>
                        </main>
                    </div>
                </Router>
            </div>
        );
    }
}

export default withStyles(styles)(App);

