import {createSlice} from '@reduxjs/toolkit';
import {getSearchId} from './thunks/getSearchId';
import {ITicket} from "../../interfaces/ITicket";
import {getTickets} from "./thunks/getTickets";
import {SortTypes} from "../../enum/sortTypes";

interface TicketsState {
  readonly searchId: {
    readonly searchId: string;
    readonly isLoading: boolean;
    readonly error: string | undefined;
  };
  readonly tickets: {
    readonly tickets: ITicket[] | undefined;
    readonly stop: boolean;
    readonly isLoading: boolean;
    readonly error: string | undefined;
  },
  readonly sort: string;
  readonly filters: number[]
}

const initialState: TicketsState = {
  searchId: {
    searchId: '',
    isLoading: false,
    error: undefined
  },
  tickets: {
    tickets: [],
    stop: false,
    isLoading: false,
    error: undefined
  },
  sort: SortTypes.CHEEP,
  filters: []
}

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    changeSortCondition: (state, {payload}) => {
      state.sort = payload;
    },
    changeFilterConditions: (state, {payload}) => {
      state.filters = payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchId.pending, ({searchId}) => {
        searchId.isLoading = true;
      })
      .addCase(getSearchId.fulfilled, ({searchId}, {payload}) => {
        searchId.isLoading = false;
        searchId.searchId = payload;
      })
      .addCase(getSearchId.rejected, ({searchId}, {error}) => {
        searchId.isLoading = false;
        searchId.error = error.message;
      })

    builder
      .addCase(getTickets.pending, ({tickets}) => {
        tickets.isLoading = true;
      })
      .addCase(getTickets.fulfilled, ({tickets}, {payload}) => {
        tickets.isLoading = false;
        tickets.tickets && tickets.tickets.push(...payload!.tickets);
        tickets.stop = payload!.stop;
      })
      .addCase(getTickets.rejected, ({tickets}, {error}) => {
        tickets.isLoading = false;
        tickets.error = error.message;
      })
  }
});

export const {changeSortCondition, changeFilterConditions} = ticketsSlice.actions;

export default ticketsSlice.reducer;
