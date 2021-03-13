import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';


if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}


function App() {
    const [user, setUser] = useState({
      isSignedIn : false,
      name : '',
      email: '',
      photo: ''
    })


  const provider = new firebase.auth.GoogleAuthProvider();

  const handleSignIn = ()=> {
    firebase.auth().signInWithPopup(provider)
    .then(res=> {
      const {displayName, photoURL, email} = res.user;
      const singedInUser = {
        isSignedIn : true,
        name: displayName, 
        email: email,
        photo: photoURL
      }
      setUser(singedInUser)
      console.log(displayName, photoURL, email);
    })
    .catch(err => {
      console.log(err)
      console.log(err.message);
    })
  }
  const handleSignOut = () => {
    firebase.auth().signOut()
    .then(res => {
      const signedOutUser ={
        isSignedIn: false,
        name: '',
        email:'',
        photo: ''
      }
      setUser(signedOutUser)
    })
    .catch( err =>{
      
    })
  }

  return (
    <div className="App">
    { user.isSignedIn ? <button onClick={handleSignOut}> Sign out</button> :
      <button onClick={handleSignIn}> Sign in</button>
    }
      {
        user.isSignedIn && <div>
        <p>Welcome {user.name} </p>
        <p>Your email: {user.email}</p>
        <img src={user.photo} alt=""/>
        </div>
      }
 
    </div>
  );
}

export default App;
