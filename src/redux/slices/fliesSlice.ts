import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as flyApi from '~api/fly';
import { Fly } from '~api/fly';
import * as flyTypeApi from '~api/flyType';
import { FlyType } from '~api/flyType';

interface FliesState {
  flies: Array<Fly>;
  flyTypes: Array<FlyType>;
  metadata: {
    pageSize: number;
    pageNumber: number;
    totalItems: number;
    totalPages: number;
  };
}

const initialState: FliesState = {
  flies: [],
  flyTypes: [],
  metadata: {
    pageSize: 20,
    pageNumber: 1,
    totalItems: 0,
    totalPages: 0,
  },
};

export const fliesSlice = createSlice({
  name: 'flies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPageOfFlies.fulfilled, (state, action) => {
        state.flies = [...state.flies, ...action.payload.data];
        state.metadata = {
          ...action.payload.metadata,
          pageNumber: state.metadata.pageNumber + 1,
        };
      })
      .addCase(fetchFlyTypes.fulfilled, (state, action) => {
        state.flyTypes = action.payload;
      });
  },
});

export const fetchPageOfFlies = createAsyncThunk(
  'flies/fetchPageOfFlies',
  async (_arg, thunkApi) => {
    const state = thunkApi.getState();
    const res = await flyApi.index(
      state.flies.metadata.pageNumber,
      state.flies.metadata.pageSize,
    );
    // TODO: Handle error

    // TODO: Set 'isFavourite' at this point, based on list of fave Ids in async storage?
    return {
      data: res.data.results,
      metadata: res.data.metadata,
    };
  },
);

export const fetchFlyTypes = createAsyncThunk(
  'flies/fetchFlyTypes',
  async () => {
    const res = await flyTypeApi.index();
    // TODO: Handle error
    return res.data.results;
  },
);

export default fliesSlice.reducer;
