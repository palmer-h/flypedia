import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  snackbar: {
    isVisible: boolean;
    message: string;
  };
}

const initialState: UserState = {
  snackbar: {
    isVisible: false,
    message: '',
  },
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<string>) => {
      state.snackbar = {
        isVisible: true,
        message: action.payload,
      };
    },
    dismissSnackbar: state => {
      state.snackbar = {
        isVisible: false,
        message: '',
      };
    },
  },
});

export const { showSnackbar, dismissSnackbar } = uiSlice.actions;

export default uiSlice.reducer;
