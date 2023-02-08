import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import App from "./components/App";
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";

// import { applyMiddleware, createStore } from "redux";
import rootReducer from './reducers';
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import thunk from "redux-thunk";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from "react-notifications";

const firebaseConfig = {
  apiKey: "AIzaSyAAouWoJjoNMaV4lUg12NvnSwb5s1VMCnc",
  authDomain: "ecommerce-ba99c.firebaseapp.com",
  databaseURL: "https://ecommerce-ba99c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ecommerce-ba99c",
  storageBucket: "ecommerce-ba99c.appspot.com",
  messagingSenderId: "228968516287",
  appId: "1:228968516287:web:d814b71ac412d22263d40a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

// const store = createStore(rootReducer, applyMiddleware(thunk));
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

const persistor = persistStore(store);
persistor.persist();

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
        <NotificationContainer />
      </Router>
    </Provider>
  </React.StrictMode>
);