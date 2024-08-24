import { createSlice } from '@reduxjs/toolkit';

const tinyMceSlice = createSlice({
  name: 'tinyMce',
  initialState: {
    loaded: false,
  },
  reducers: {
    setLoaded: (state) => {
      state.loaded = true;
    },
  },
});

export const { setLoaded } = tinyMceSlice.actions;

export default tinyMceSlice.reducer;
