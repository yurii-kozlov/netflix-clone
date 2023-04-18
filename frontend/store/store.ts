import { configureStore } from '@reduxjs/toolkit';
import personalAccountReducer from 'features/personalAccount';
import authorizationReducer from 'features/authorization';

const store = configureStore({
  reducer: {
    accountInfo: personalAccountReducer,
    authorization: authorizationReducer
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;
