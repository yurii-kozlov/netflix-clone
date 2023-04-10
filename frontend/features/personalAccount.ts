import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InitialState {
  email: string,
}

const initialState: InitialState = {
  email: ''
}

const personalAccoutSlice = createSlice({
  name: 'accountInfo',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    }
  },
});

export const { actions } = personalAccoutSlice;
export default personalAccoutSlice.reducer
