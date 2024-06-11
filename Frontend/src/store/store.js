import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Fonction to build persisted reducer configuration based on rememberMe state
const getPersistConfig = (rememberMe) => ({
  key: "root",
  storage,
  version: 1,
  whitelist: rememberMe ? ["user"] : [],
});

// Retrieve the state of rememberMe in localStorage
const rememberMe = localStorage.getItem("rememberMe") === "true";

// combineReducers to add other slices in the future
const rootReducer = combineReducers({
  user: userSlice,
});

// Build persisted reducer configuration
const persistConfig = getPersistConfig(rememberMe);

// Configure persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Configure the persistStore
export const persistor = persistStore(store);

// Function to reconfigure persisted reducer
export const reconfigurePersistor = (rememberMe) => {
  persistor.pause();
  const newPersistConfig = getPersistConfig(rememberMe);
  const newPersistedReducer = persistReducer(newPersistConfig, rootReducer);
  store.replaceReducer(newPersistedReducer);
  persistor.persist();
};
