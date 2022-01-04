import { ITicket } from 'app/interfaces/ITicket';
import { SortTypes } from 'app/enum/sortTypes';

export const sortTickets = (tickets: ITicket[], sort: string): ITicket[] => {
  switch (sort) {
    case SortTypes.CHEEP: {
      return sortByCondition((a, b) => a.price - b.price, tickets);
    }
    case SortTypes.FAST: {
      return sortByCondition(
        (a, b) => timeOfFlight(a) - timeOfFlight(b),
        tickets,
      );
    }
    case SortTypes.OPTIMAL: {
      const sorterByPrice = sortByCondition(
        (a, b) => a.price - b.price,
        tickets,
      );
      return sortByCondition(
        (a, b) => timeOfFlight(a) - timeOfFlight(b),
        sorterByPrice.slice(0, 20),
      );
    }
    default: {
      return tickets;
    }
  }
};

const sortByCondition = (
  condition: (a: ITicket, b: ITicket) => number,
  unsortedTickets: ITicket[],
) => [...unsortedTickets].sort(condition);

const timeOfFlight = (ticket: ITicket) =>
  ticket.segments.reduce((acc, item) => acc + item.duration, 0);

export const filterTicketsByStops = (tickets: ITicket[], filter: number[]) => {
  return tickets.filter((ticket) => {
    const { segments } = ticket;
    return segments.every(({ stops }) => filter.includes(stops.length + 1));
  });
};
