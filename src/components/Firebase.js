
import app from 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyA7oRD08VAYxE1xc6tC7oFEn6Famj52TKU",
    authDomain: "party-rock-tonight.firebaseapp.com",
    databaseURL: "https://party-rock-tonight.firebaseio.com",
    projectId: "party-rock-tonight",
    storageBucket: "party-rock-tonight.appspot.com",
    messagingSenderId: "414674366233"
}
const Firebase = app.initializeApp(config);

export default Firebase;