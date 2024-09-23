//import * as firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
//import {PsychoApi} from './psychoapi';
import * as firebaseui from 'firebaseui';
export class Psychoapifirebase {//extends PsychoApi {
  constructor() {
    //super();
    this.firebaseConfig = {
      apiKey: 'AIzaSyArmFKZq8_OPM3FCBemMibVULgCXmN8_Dg',
      authDomain: 'psychoacoustic-eb37f.firebaseapp.com',
      databaseURL: 'https://psychoacoustic-eb37f.firebaseio.com',
      projectId: 'psychoacoustic-eb37f',
      storageBucket: 'psychoacoustic-eb37f.appspot.com',
      messagingSenderId: '101126416760',
      appId: '1:101126416760:web:28a5a0446d65fe4220808d',
      measurementId: 'G-2ZNBYLRN33'
    };
    // Initialize Firebase
    firebase.initializeApp(this.firebaseConfig);
    firebase.analytics();
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());
  }

  //call after attached (#firevaseui-auth-container);
  initialize() {
    let uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true;
        },
        uiShown: function() {
          // The widget is rendered.
          // Hide the loader.
          //document.getElementById('loader').style.display = 'none';
        }
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: 'popup',
      signInSuccessUrl: '#/account',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      tosUrl: '/termsandcondition.html',
      // Privacy policy url.
      privacyPolicyUrl: '/datapolicy.html'
    };

    this.ui.start('#firebaseui-auth-container', uiConfig);
  }
}
