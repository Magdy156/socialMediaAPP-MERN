import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import authReducer from "./state/index";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  persistReducer,
  persistStore,
  FLUSH,
  PURGE,
  REHYDRATE,
  PERSIST,
  PAUSE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PURGE, REHYDRATE, PERSIST, PAUSE, REGISTER],
      },
    });
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
