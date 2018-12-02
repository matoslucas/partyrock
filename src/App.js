import React from 'react';
// import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
    BrowserRouter as Router,
    Route,
    // Link, 
    Switch
} from "react-router-dom";

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


class App extends React.Component {

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Router>
                    <Switch>
                        <Route path="/lourinha" component={EventList} />
                        <Route path="/event/:id" component={EventDeails} />
                        <Route path="/test" component={Test} />
                        <Route component={Home} />
                    </Switch>
                </Router>
            </MuiThemeProvider>
        )

    }
}

export default App