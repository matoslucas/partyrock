import React from 'react';
// import PropTypes from 'prop-types';
import { Facebook, FacebookApiException } from 'fb';
const fb = new Facebook({
    appId: '1030493450492419',
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v3.2'
})

class App extends React.Component {
    componentDidMount() {
        fb.api(
            '/525020984678881',
            'GET',
            {
                "fields":"id,name,attending_count,cover,description,interested_count,start_time",
                "access_token":"EAAOpOnQPWgMBABOeIRq8VZBZAGeBfdM9pQjfJJcovXv8zMZBifYCZAxfeZAjPBW2AaqE1UGr537P5ZALMBUTfVwTKA66nlLjtNiKea4EqrfLELLXFjEM6gd7ZBXm3FNdNHJQ8Ye0Ilb3qRQ3T9XP5u1FqEh5uuC2hq0jKZCOMfGMHjD29x9q2ZCMkgtGf6ZCCzflsZD"
            },
            function(res) {
                // Insert your code here
              console.log(res)
            }
          );
          
    }
    render() {
        return (
            <div>
                HOLA
            </div>
        )

    }
}

export default App