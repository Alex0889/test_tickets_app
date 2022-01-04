import { createAsyncThunk } from '@reduxjs/toolkit';
import { axios } from './ticketsApi';

export const getSearchId = createAsyncThunk('tickets/getSearchId', async () => {
  try {
    const {
      data: { searchId },
    } = await axios.get('/search');
    return searchId;
  } catch (e) {
    console.log(e);
  }
});
