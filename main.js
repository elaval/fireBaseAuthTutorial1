initApp = function() {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var phoneNumber = user.phoneNumber;
            var providerData = user.providerData;
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
              document.getElementById('details').style.display = "block";

            });
          } else {
            // User is signed out.
            document.getElementById("foto").src="";
            document.getElementById('sign-in-status').textContent = 'Signed out';
            document.getElementById('account-details').textContent = 'null';
            document.getElementById('firebaseui-auth-container').style.display = "block";
            document.getElementById('sign-out').style.display = "none";
            document.getElementById('details').style.display = "none";

                      }
        }, function(error) {
          console.log(error);
        });
      };

      window.addEventListener('load', function() {
        initApp()
      });

function signout() {
  firebase.auth().signOut().then(function() {
    console.log('Signed Out');
  }, function(error) {
    console.error('Sign Out Error', error);
  });  
}