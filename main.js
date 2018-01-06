/*
Demo de funconalidad para manejo de identidad de usuarios via firebase
*/ 

/*
Para encapsular las funciones definimos un pseudo modulo TideApp
que define una serie de variable sy funciones internas

Exporta  
- TideApp.signout();
- TideApp.initApp();
*/
(function (global, factory) {
  (factory((global.TIDEApp = global.TIDEApp || {})));
}(this, function (exports) { 
  'use strict';

  // Initialize Firebase
  function initializeFirebase() {
    var config = {
      apiKey: "AIzaSyDocb5Vbpgeqq3mKiRuIAtuvox8HrwDVRk",
      authDomain: "tidedemo-96abf.firebaseapp.com",
    };
    firebase.initializeApp(config);
  }

  // FirebaseUI config.
  function configFireBaseUI() {
    var uiConfig = {
      signInSuccessUrl: 'http://127.0.0.1:8080',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      tosUrl: '<your-tos-url>'
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
  }

  function initApp() {
    // Local variables
    var displayName, email, emailVerified, photoURL, uid, phoneNumber, providerData

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        displayName = user.displayName;
        email = user.email;
        emailVerified = user.emailVerified;
        photoURL = user.photoURL;
        uid = user.uid;
        phoneNumber = user.phoneNumber;
        providerData = user.providerData;

        user.getIdToken().then(function(accessToken) {
          document.getElementById('sign-in-status').textContent = 'Signed in';
          document.getElementById('account-details').textContent = JSON.stringify({
            displayName: displayName,
            email: email,
            emailVerified: emailVerified,
            phoneNumber: phoneNumber,
            photoURL: photoURL,
            uid: uid,
            accessToken: accessToken,
            providerData: providerData
          }, null, '  ');

          document.getElementById("foto").src=photoURL;
          document.getElementById('firebaseui-auth-container').style.display = "none";
          document.getElementById('sign-out').style.display = "block";
          document.getElementById('sign-in').style.display = "none";
          document.getElementById('details').style.display = "block";

        });
      } else {
        // User is signed out.
        document.getElementById("foto").src="";
        document.getElementById('sign-in-status').textContent = 'Signed out';
        document.getElementById('account-details').textContent = 'null';
        document.getElementById('firebaseui-auth-container').style.display = "block";
        document.getElementById('sign-out').style.display = "none";
        document.getElementById('sign-in').style.display = "block";
        document.getElementById('details').style.display = "none";

                  }
    }, function(error) {
      console.log(error);
    });
  }
  
  function signOut() {
    firebase.auth().signOut().then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }   

  function signIn() {
    document.getElementById('firebaseui-auth-container').style.display = "block";
  }   


  initializeFirebase();
  configFireBaseUI();
  initApp();

  exports.signOut = signOut;
  exports.signIn = signIn;
}));








