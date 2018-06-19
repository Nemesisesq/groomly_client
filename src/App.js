import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import Opportunities from "./opportunities/opportunities.main";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from '@material-ui/icons/Menu'
import Grid from "@material-ui/core/es/Grid/Grid";



class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to Groomly</h1>
                </header>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <AppBar position="static">
                            <Toolbar>
                                <IconButton className={`${styles.menuButton}`} color="inherit" aria-label="Menu">
                                    <MenuIcon/>
                                </IconButton>
                                <Typography variant="title" color="inherit" >

                                </Typography>
                                <Button color="inherit">Login</Button>
                            </Toolbar>
                        </AppBar>
                    </Grid>
                    <Grid item xs={12}>
                        <Opportunities/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default App;


const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};