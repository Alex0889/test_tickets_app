import { createAsyncThunk } from '@reduxjs/toolkit';
import {axios} from "./ticketsApi";
import {ITicket} from "../../../interfaces/ITicket";


export interface ITicketsResponse {
  readonly tickets: ITicket[];
  readonly stop: boolean;
}


export const getTickets = createAsyncThunk(
  'tickets/getTickets',
  async (searchId: string) => {

    try {
      const {data} =  await axios.get<ITicketsResponse>(`/tickets`, {
        params: {
          searchId,
        },
      });

      return data;
    } catch (e) {
      console.log(e);
    }
  },
);
