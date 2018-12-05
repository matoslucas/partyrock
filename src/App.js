import React,  { Component } from 'react';
// import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
    Router,
    Route,
    // Link, 
    Switch,
} from "react-router-dom";

import createBrowserHistory from "history/createBrowserHistory";

import withTracker from './withTracker';

import Home from './pages/Home'
import EventList from './pages/EventList'
import EventDeails from  './pages/EventDeails'
import Test from './pages/Test'


const theme = createMuiTheme({
    palette: {
        type: 'dark', // Switching the dark mode on is a single property value change.
    },
    typography: {
        useNextVariants: true,
    },
});

const history = createBrowserHistory()

class App extends Component {

    componentDidMount() {
   

    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Router history={history}>
                    <Switch>
                        <Route path="/lourinha" component={withTracker(EventList)} />
                        <Route path="/event/:id" component={withTracker(EventDeails)} />
                        <Route path="/test" component={withTracker(Test)} />
                        <Route path="/" component={withTracker(Home)} />
                    </Switch>
                </Router>
            </MuiThemeProvider>
        )

    }
}

export default App