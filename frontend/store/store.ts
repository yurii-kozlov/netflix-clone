import { configureStore } from '@reduxjs/toolkit';
import personalAccountReducer from 'features/personalAccount';
import authorizationReducer from 'features/authorization';
import moviePreviewReducer from 'features/moviePreview';

const store = configureStore({
  reducer: {
    accountInfo: personalAccountReducer,
    authorization: authorizationReducer,
    moviePreview: moviePreviewReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;
