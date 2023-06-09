import { AxiosError } from 'axios';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserService from 'services/UserService';
import AuthService from 'services/AuthService';
import { User } from 'types/models/User'
import { Plan } from 'types/Plan';
import { Movie } from 'types/MovieAPI';

export interface InitialState {
  user: User | null;
  isAuth: boolean;
  error: string | null;
  isLoading: boolean;
}

const initialState: InitialState = {
  user: {} as User,
  isAuth: false,
  error: null,
  isLoading: false
}

export const checkAuth = createAsyncThunk(
  'auth/check',
  async (_args, thunkAPI) => {
    try {
        const response = await AuthService.refresh();

        localStorage.setItem('token', response.data.accessToken);

        return response.data.user;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {

        return thunkAPI.rejectWithValue(error.response?.data.message)
      }

      throw new Error('Something went wrong');
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string, password: string}, thunkAPI) => {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);

      return response.data.user;
    } catch (error: unknown) {

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

      return response.data.user
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data.message)
      }

      throw new Error('Something went wrong');
    }
  }
);

export const subscriptionPlan = createAsyncThunk(
  'auth/plan',
  async ({ email, plan }: {email: string, plan: Plan}, thunkAPI) => {
    try {
        const response = await AuthService.setPlan(email, plan);

        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
          return thunkAPI.rejectWithValue(error.response?.data.message);
        }

        throw new Error('Something went wrong');
    }
  }
)

export const addMovieToWatchLaterList = createAsyncThunk(
  'auth/addingMovieToWatchLaterList',
  async ({ email, watchLaterMovie }: {email: string, watchLaterMovie: Movie}, thunkAPI) => {
    try {
        const response = await AuthService.addMovieToWatchLaterList(email, watchLaterMovie);

        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
          return thunkAPI.rejectWithValue(error.response?.data.message);
        }

        throw new Error('Something went wrong');
    }
  }
)

export const addMovieToLikedList = createAsyncThunk(
  'auth/addingMovieToLikedList',
  async ({ email, likedMovie }: {email: string, likedMovie: Movie}, thunkAPI) => {
    try {
        const response = await AuthService.addMovieToLikedList(email, likedMovie);

        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
          return thunkAPI.rejectWithValue(error.response?.data.message);
        }

        throw new Error('Something went wrong');
    }
  }
)

export const deleteMovieFromWatchList = createAsyncThunk(
  'auth/deletingMovieFromWatchList',
  async({email, movieTitle}: {email: string, movieTitle: string}, thunkAPI) => {
    try {
        const response = await UserService.deleteMovieFromWatchlist(email, movieTitle);

        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
          return thunkAPI.rejectWithValue(error.response?.data.message);
        }

        throw new Error('Something went wrong');
    }
  }
);

export const deleteMovieFromLikedList = createAsyncThunk(
  'auth/deletingMovieFromLikedList',
  async({email, movieTitle}: {email: string, movieTitle: string}, thunkAPI) => {
    try {
        const response = await UserService.deleteMovieFromLikedList(email, movieTitle);

        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
          return thunkAPI.rejectWithValue(error.response?.data.message);
        }

        throw new Error('Something went wrong');
    }
  }
);

export const clearWatchLaterList = createAsyncThunk(
  'auth/clearWatchLaterList',
  async({email}: {email: string}, thunkAPI) => {
    try {
        const response = await UserService.clearWatchLaterList(email);

        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
          return thunkAPI.rejectWithValue(error.response?.data.message);
        }

        throw new Error('Something went wrong');
    }
  }
)

export const clearLikedMoviesList = createAsyncThunk(
  'auth/clearLikedMoviesList',
  async({email}: {email: string}, thunkAPI) => {
    try {
        const response = await UserService.clearLikedMoviesList(email);

        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
          return thunkAPI.rejectWithValue(error.response?.data.message);
        }

        throw new Error('Something went wrong');
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (_args, thunkAPI) => {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');

      return { payload: {} as User};
    } catch (error: unknown) {

      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data.message)
      }

      throw new Error('Something went wrong');
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
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      .addCase(registration.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(registration.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      .addCase(subscriptionPlan.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      .addCase(subscriptionPlan.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(subscriptionPlan.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = {} as User;
        state.isAuth = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload as User;
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.error = 'The user is not authorized'
        state.isLoading = false;
      })
      .addCase(addMovieToWatchLaterList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMovieToWatchLaterList.fulfilled, (state, action) => {
        state.user?.watchLaterMovies.push(action.payload as Movie);
        state.isLoading = false;
      })
      .addCase(addMovieToWatchLaterList.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      .addCase(addMovieToLikedList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMovieToLikedList.fulfilled, (state, action) => {
        state.user?.likedMovies.push(action.payload as Movie);
        state.isLoading = false;
      })
      .addCase(addMovieToLikedList.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      .addCase(clearWatchLaterList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clearWatchLaterList.fulfilled, (state, action) => {
        if (state.user) {
          state.user.watchLaterMovies = action.payload as [];
        }
        state.isLoading = false;
      })
      .addCase(clearWatchLaterList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(clearLikedMoviesList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clearLikedMoviesList.fulfilled, (state, action) => {
        if (state.user) {
          state.user.likedMovies = action.payload as [];
        }
        state.isLoading = false;
      })
      .addCase(clearLikedMoviesList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteMovieFromWatchList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMovieFromWatchList.fulfilled, (state, action) => {
        if (state.user) {
          state.user.watchLaterMovies = state.user.watchLaterMovies
            .filter((movie) => movie.title !== action.payload);
        }

        state.isLoading = false;
      })
      .addCase(deleteMovieFromWatchList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteMovieFromLikedList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMovieFromLikedList.fulfilled, (state, action) => {
        if (state.user) {
          state.user.likedMovies= state.user.likedMovies
            .filter((movie) => movie.title !== action.payload);
        }

        state.isLoading = false;
      })
      .addCase(deleteMovieFromLikedList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
  }
});

export const { actions } = authSlice;
export default authSlice.reducer;
