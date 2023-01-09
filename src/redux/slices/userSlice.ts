import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  favouriteFlies: Array<number>;
}

const initialState: UserState = {
  favouriteFlies: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleFlyIsFavourited: (state, action: PayloadAction<number>) => {
      const flyId = action.payload;
      if (state.favouriteFlies.includes(flyId)) {
        state.favouriteFlies = state.favouriteFlies.filter(x => x !== flyId);
        return;
      }
      state.favouriteFlies = [...state.favouriteFlies, action.payload];
    },
  },
});

export const { toggleFlyIsFavourited } = userSlice.actions;

export default userSlice.reducer;
