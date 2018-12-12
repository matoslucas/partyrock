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
            PartyRockEvents: [],
            GoogleCalendarEvents: [],
            sign: ApiCalendar.sign,
        }

        this.signUpdate = this.signUpdate.bind(this)
        this.loadEventsFromFireBase = this.loadEventsFromFireBase.bind(this)
        this.setGoogleCalendarEvents = this.setGoogleCalendarEvents.bind(this)
        this.saveEvent = this.saveEvent.bind(this)

        ApiCalendar.onLoad(() => {
            ApiCalendar.listenSign(this.signUpdate);
            if (ApiCalendar.sign){
                this.signUpdate(ApiCalendar.sign) 
            }else{
                ApiCalendar.handleAuthClick();
            }
           
        });

    }

    getGoogleCalendarUpcomingEvents() {
       
        ApiCalendar.listUpcomingEvents(300)
              .then(({result}: any) => {
                this.setGoogleCalendarEvents(result.items)
                
              })
        
    }

    componentDidMount() {
        this.loadEventsFromFireBase()
    }

    setGoogleCalendarEvents(GoogleCalendarEvents) {
        
        this.setState({
            GoogleCalendarEvents
        })
    }

    signUpdate(sign) {
        if(sign){
            this.getGoogleCalendarUpcomingEvents()
        }
        this.setState({
            sign
        })
    }

    loadEventsFromFireBase() {
        const _self = this

        let allEvents = []
        
        firebase.database().ref('/events/').orderByChild('/start_time').once('value').then(function (snapshot) {
            
            snapshot.forEach(child => {
                allEvents.push(child.val())
            })
            //console.log(allEvents)
            _self.setState({ PartyRockEvents: allEvents })
        });
    }

    saveEvent(data) {
        
        const { PartyRockEvents } = this.state
        const _self = this
                
        let eventData = {
            calendarId: "primary",
            end: {
                dateTime: data.end_time
            },
            start: {
                dateTime: data.start_time
            },
            description: data.description,
            summary: data.name,
            reminders: {
                useDefault: true
            }
          }

          if(data.place && data.place.location) {
                eventData.location = data.place.location.latitude +','+ data.place.location.longitude;
            }
  
        ApiCalendar.createEvent(eventData)
            .then((data: object) => {                
                const newValue = PartyRockEvents.map((event, index) => {
                    if(event.name === eventData.summary) {
                        event.GoogleCalendarLink = data.result.htmlLink
                    }
                    return event
                })
                _self.setState({PartyRockEvents: newValue})
            })
           .catch((error: any) => {
                console.log(error.body);
            });
    }

    handleItemClick(event, name) {
        if (name === 'sign-in') {
          ApiCalendar.handleAuthClick();
        } else if (name === 'sign-out') {
          ApiCalendar.handleSignoutClick();
        }
    }
    
    render() {
        const { PartyRockEvents, GoogleCalendarEvents, sign} = this.state
        return ( 
            <div>
                {/**
                  <button
                  onClick={(e) => this.handleItemClick(e, 'sign-in')}
                >
                sign-in
              </button>
              <button
                  onClick={(e) => this.handleItemClick(e, 'sign-out')}
              >
                sign-out
              </button>
                */}
               
                

            <Grid container justify="center" spacing={24}>

                {
                    Array.isArray(PartyRockEvents) ? PartyRockEvents.map((event, index) => {
                        //console.log(event)
                        let GoogleCalendarLink = event.GoogleCalendarLink
                        GoogleCalendarEvents.filter(gce => gce.summary === event.name).forEach(event=>{
                            GoogleCalendarLink = event.htmlLink
                        });
                        // console.log(GoogleCalendarLink)
                        return (<Grid item key={event.id}>
                                    <EventCard 
                                        data={event} 
                                        sign={sign}
                                        onSave={this.saveEvent} 
                                        GoogleCalendarLink={GoogleCalendarLink}
                                    />
                                </Grid>)
                    }) : null
                }

            </Grid>
            </div>
        )
    }
}

export default Home