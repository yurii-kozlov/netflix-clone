import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Movie } from 'types/MovieAPI';

export interface InitialState {
  movieForPreview: Movie | null;
  isMoviePopupVisible: boolean;
}

const initialState: InitialState = {
  movieForPreview: null,
  isMoviePopupVisible: false
}

const moviePreviewSlice = createSlice({
  name: 'moviePreview',
  initialState,
  reducers: {
    openMoviePopup: (state, action: PayloadAction<Movie>) => {
      state.movieForPreview = action.payload;
      state.isMoviePopupVisible = true;
    },
    closeMoviePopup: (state) => {
      state.movieForPreview = null;
      state.isMoviePopupVisible = false;
    }
  }
});

export const { actions } = moviePreviewSlice;
export default moviePreviewSlice.reducer;
