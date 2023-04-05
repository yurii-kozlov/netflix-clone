import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InitialState {
  email: string,
  password: string
}

const initialState: InitialState = {
  email: '',
  password: ''
}

const personalAccoutSlice = createSlice({
  name: 'accountInfo',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    }
  },
});

export const { actions } = personalAccoutSlice;
export default personalAccoutSlice.reducer
