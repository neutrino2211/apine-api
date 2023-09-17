// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase-admin/app";
import * as admin from "firebase-admin";
import { initialize } from "fireorm";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBbWUDNUtJ_lAOSRohbYo6MWNOCR2zMp5I",
//   authDomain: "apine-9ba64.firebaseapp.com",
//   projectId: "apine-9ba64",
//   storageBucket: "apine-9ba64.appspot.com",
//   messagingSenderId: "138219804557",
//   appId: "1:138219804557:web:8740033da591b72a110fc4",
//   measurementId: "G-RW9MKD2K8J"
// };

const creds = require("../apine.json")

const firebaseConfig = {
    credential: admin.credential.cert(creds)
};

// Initialize Firebase

export const app: any = (admin as any).default.initializeApp(firebaseConfig)


export const firestore = (admin as any).default.firestore()

initialize(firestore);
