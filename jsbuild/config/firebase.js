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

// firebase.initializeApp({
//   apiKey: "AIzaSyBAgMvaBW6R88R6fN4JuT9Jg9X9nO4ghRk",
//   authDomain: "quizilla-c8161.firebaseapp.com",
//   projectId: "quizilla-c8161"
// })

module.exports = firebase
// export const auth = firebase.auth()
// export const db = firebase.firestore() 


