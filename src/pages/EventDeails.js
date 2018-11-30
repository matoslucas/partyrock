import React from 'react';
// import PropTypes from 'prop-types';
import {
    Redirect,
  } from "react-router-dom";
import firebase from '../components/Firebase'

class EventDeails extends React.Component {

    constructor(props) {
        super(props)
        // Don't call this.setState() here!
        this.state = {
            data: {},
        }

        this.loadEventFromFireBase = this.loadEventFromFireBase.bind(this)
        // this.onClickHandler = this.onClickHandler.bind(this)
        // this.getMyEvents = this.getMyEvents.bind(this)
    }

    componentDidMount() {
        console.log(this.props)
        this.loadEventFromFireBase()
    }

    loadEventFromFireBase() {
        //console.log(firebase.database().ref('/events/'))
        const { match } = this.props
        
        const _self = this


        firebase.database().ref('/events/'+match.params.id).once('value').then(function (snapshot) {
            console.log(snapshot.val() )
                       
            _self.setState({ data: snapshot.val() })
        });
       
        
    }


    render() {
        const { match } = this.props
        const { data } = this.state
        if (!data) return <Redirect to="/" />;

        return 'detils' + match.params.id
    }
}

export default EventDeails