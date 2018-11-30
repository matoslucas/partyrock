import React from 'react';
// import PropTypes from 'prop-types';
import firebase from '../components/Firebase'

class EventDeails extends React.Component {

    componentDidMount() {
        console.log(this.props)
        this.loadEventFromFireBase()
    }

    loadEventFromFireBase() {
        //console.log(firebase.database().ref('/events/'))
        const { match } = this.props
        
        //const _self = this


        firebase.database().ref('/events/'+match.params.id).once('value').then(function (snapshot) {
            console.log(snapshot.val() )
            //console.log(snapshot )
            if(snapshot.val()){

            }else{
                console.log('redirect')
            }
           
            //_self.setState({ eventListInfo: allEvents })
        });
       
        
    }


    render() {
        const { match } = this.props
        return 'detils' + match.params.id
    }
}

export default EventDeails