import { configureStore } from '@reduxjs/toolkit';
import personalAccountReducer from 'features/personalAccount';

const store = configureStore({
  reducer: {
    accountInfo: personalAccountReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;
