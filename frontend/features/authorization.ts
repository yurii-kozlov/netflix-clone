import axios, { AxiosError } from 'axios';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from 'services/AuthService';
import { User } from 'types/models/User'
import { AuthResponse } from 'types/models/apiResponse/AuthResponse';

export interface InitialState {
  user: User | null;
  isAuth: boolean;
  error: string | null;
}

const initialState: InitialState = {
  user: {} as User,
  isAuth: false,
  error: null
}

export interface LoginError {
  message: string;
}

export const checkAuth = createAsyncThunk(
  'auth/check',
  async () => {
    try {
        const response = await axios.get<AuthResponse>(`${process.env.NEXT_PUBLIC_API_URL}/refresh`, {
          withCredentials: true
        });

        localStorage.setItem('token', response.data.accessToken);
        console.log(response);

        return response.data.user;
    } catch (error: any) {
      return console.log(error.response.data.message);
    }
  }
)


export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string, password: string}, thunkAPI) => {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      console.log(response);

      return response.data.user;
    } catch (error: unknown) {
      console.log(error.response.data.message);

      if (error instanceof AxiosError) {

        return thunkAPI.rejectWithValue(error.response?.data.message)
      }

      throw new Error('Something went wrong');
    }
  }
);

export const registration = createAsyncThunk(
  'auth/registration',
  async ({ email, password }: { email: string, password: string }, thunkAPI) => {
    try {
      const response = await AuthService.registration(email, password);
      localStorage.setItem('token', response.data.accessToken);
      console.log(response);

      return response.data.user
    } catch (error: any) {
      console.log(error.response.data.message);

      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');

      return { payload: {} as User};
    } catch (error: any) {
      return console.log(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuth = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = {} as User;
        state.isAuth = false;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload as User;
        state.isAuth = true;
      })
  }
});

export const { actions } = authSlice;
export default authSlice.reducer;
