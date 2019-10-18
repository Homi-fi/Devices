const firebase = require("firebase/app")
// require("firebase/auth");
require("firebase/firebase-firestore");
// import firebase from 'firebase'
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

firebase.initializeApp({
  apiKey: "AIzaSyD1mK15L0g7LPtM_SJqI6anuJ0lz6KKRs4",
  authDomain: "homi-fi-f7ccc.firebaseapp.com",
  projectId: "homi-fi-f7ccc"
})

module.exports = firebase
// export const auth = firebase.auth()
// export const db = firebase.firestore() 

