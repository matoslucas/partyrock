import React from 'react';
// import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import EventCard from './components/EventCard'


import {
    Facebook,
    //   FacebookApiException,
} from 'fb';
const fb = new Facebook({
    appId: '1030493450492419',
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v3.2'
})

const TOKEN = "EAAOpOnQPWgMBADDZCUGJTFUnTZBi5qak9fzwabg2XzkWgGESwo7fGIewXQZB7aeZCgZBCAZCJbBp9CnODPCcPKbtjBKTxJAc7wcG7rx6RUbb56RheXB56IjDWg5vBt6Ot5ky9YEaOvZBEcIDczHQZAGbbBThpJuUaK4DprUKOT7yDZAk4pdTOwApCuYDi8XNry4EZD"


const EventListInfo = []
class App extends React.Component {

    constructor(props) {
        super(props)
        // Don't call this.setState() here!
        this.state = {
            eventListInfo: [],
        }
        this.getEventInfo = this.getEventInfo.bind(this)
        this.getMyEvents = this.getMyEvents.bind(this)
    }

    componentDidMount() {
        this.getMyEvents()
    }

    getEventsbyList() {
        /**
         * Events list ids
         */
        const eventListIds = [
            "498384417331722",
            "525020984678881",
            "1117819265056393"
        ]

        eventListIds.forEach(id => {
            console.log(id)
            this.getEventInfo(id)
        })

        console.log(EventListInfo)
        EventListInfo.forEach(res => {
            console.log(res)
        })
    }

    getEventInfo(id) {

        const fiels = [
            "id",
            "name",
            "attending_count",
            "cover",
            "description",
            "interested_count",
            "start_time"
        ]

        // console.log(fiels.join(","))

        fb.api(
            '/' + id,
            'GET',
            {
                "fields": fiels.join(","),
                "access_token": TOKEN,
            },
            function (res) {
                // Insert your code here
                // console.log(res)
                if (!res.error) {
                    EventListInfo.push(res)
                }

            }
        );
    }

    getMyEvents() {
        const _self = this
        const fiels = [
            "id",
            "name",
            "attending_count",
            "cover",
            "description",
            "interested_count",
            "start_time"
        ]

        fb.api(
            '/me/events/',
            'GET',
            {
                "fields": fiels.join(","),
                "access_token": TOKEN,
            },
            function (res) {

                if (!res.error) {
                    //console.log(res)
                    EventListInfo.push(res)
                    _self.setState({ eventListInfo: res.data });
                }
            }
        )


    }

    render() {
        const { eventListInfo } = this.state
        return (
            <Grid container justify="center" spacing={24}>

                {
                    Array.isArray(eventListInfo) ? eventListInfo.map((event, index) => {
                        console.log(event)
                        return (<Grid item key={event.id}>
                            <EventCard data={event} />
                        </Grid>)
                    }) : null
                }

            </Grid>
        )

    }
}

export default App