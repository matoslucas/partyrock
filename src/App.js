import React from 'react';
// import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
    Router,
    Route,
    // Link, 
    Switch,
} from "react-router-dom";

import createBrowserHistory from "history/createBrowserHistory";

import ReactGA from 'react-ga'

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
ReactGA.initialize('UA-130351229-1');
history.listen((location, action) => {
  ReactGA.pageview(location.pathname + location.search);
  console.log(action, location.pathname, location.state);
});

class App extends React.Component {

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Router history={history}>
                    <Switch>
                        <Route path="/lourinha" component={EventList} />
                        <Route path="/event/:id" component={EventDeails} />
                        <Route path="/test" component={Test} />
                        <Route path="/" component={Home} />
                    </Switch>
                </Router>
            </MuiThemeProvider>
        )

    }
}

export default App