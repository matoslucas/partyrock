import React from 'react';
// import PropTypes from 'prop-types';
import firebase from '../components/Firebase'

import Grid from '@material-ui/core/Grid';
import EventCard from '../components/EventCard'
import ApiCalendar from 'react-google-calendar-api';

class Home extends React.Component {

    constructor(props) {
        super(props)
        // Don't call this.setState() here!
        this.state = {
            eventListInfo: [],
        }

        this.loadEventsFromFireBase = this.loadEventsFromFireBase.bind(this)
        // this.onClickHandler = this.onClickHandler.bind(this)
        // this.getMyEvents = this.getMyEvents.bind(this)
    }

    componentDidMount() {
        this.loadEventsFromFireBase()
       
    }

    loadEventsFromFireBase() {
        //console.log(firebase.database().ref('/events/'))

        const _self = this

        let allEvents = []

        firebase.database().ref('/events/').once('value').then(function (snapshot) {
            //console.log(snapshot.val() )
            //console.log(snapshot )
            snapshot.forEach(child => {
                // console.log(child.val())
                allEvents.push(child.val())
            })
            _self.setState({ eventListInfo: allEvents })
        });
        // console.log(allEvents)
        
    }

    saveEvent(data) {
        ApiCalendar.handleAuthClick();
        console.log('to calendar',data)
        
        
    }

    render() {
        const { eventListInfo } = this.state
        return (

            <Grid container justify="center" spacing={24}>

                {
                    Array.isArray(eventListInfo) ? eventListInfo.map((event, index) => {
                        //console.log(event)
                        return (<Grid item key={event.id}>
                                    <EventCard data={event} onSave={this.saveEvent} />
                                </Grid>)
                    }) : null
                }

            </Grid>
        )
    }
}

export default Home