import {ITicket} from "./interfaces/ITicket";
import {axios} from "./slices/tickets/thunks/ticketsApi";

interface ITicketsResponse {
  readonly tickets: ITicket[];
  readonly stop: boolean;
}

export const subscribe = async (searchId: string) => {
  let fetchedTickets = [] as ITicket[];
  let stop = false;

  const longPooling = async (searchId: string) => {
    try {
      const {data} = await axios.get<ITicketsResponse>(`/tickets`, {
        params: {
          searchId,
        },
      });

      if (data.tickets.length) {
        fetchedTickets = [...fetchedTickets, ...data.tickets];
      }

      if (data.stop) {
        stop = data.stop;
        return;
      }

      if (!stop) longPooling(searchId);
    } catch (e) {
      if (!stop) longPooling(searchId);
    }
  }

  await longPooling(searchId);
  return fetchedTickets;
}