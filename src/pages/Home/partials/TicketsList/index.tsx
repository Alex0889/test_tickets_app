import {FC, useEffect, useState} from 'react';
import s from './TicketList.module.scss';
import Ticket from '../Ticket';
import {ITicket} from 'app/interfaces/ITicket';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import ShowMoreBtn from '../ShowMoreBtn';
import {filterTicketsByStops, sortTickets} from './helpers';
import {getTickets, ITicketsResponse} from "app/slices/tickets/thunks/getTickets";
import WithSkeleton from 'components/WithSkeleton';
import Loader from 'prebuild/components/Loader';

const TicketsList: FC = () => {
  const {
    tickets: {
      searchId,
      tickets: {tickets, isLoading, error},
      sort,
      filters,
    },
  } = useAppSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    tickets &&
    setSortedTickets(
      filterTicketsByStops(sortTickets(tickets, sort), filters),
    );
  }, [tickets, sort, filters]);

  useEffect(() => {
    const subscribe = async (searchId: string) => {
      try {
        const {payload} = await dispatch(getTickets(searchId));

        const {stop} = payload as ITicketsResponse;

        if (stop) {
          return;
        }

        subscribe(searchId);
      } catch (e) {
        subscribe(searchId);
      }
    };
    Boolean(searchId.searchId) && subscribe(searchId.searchId);
  }, [dispatch, searchId.searchId]);

  const [numOfTickets, setNumOfTickets] = useState<number>(5);
  const [sortedTickets, setSortedTickets] = useState<ITicket[]>([]);

  const showMoreHandler = () => {
    sortedTickets &&
    setNumOfTickets((prev) =>
      prev + 5 < sortedTickets.length ? prev + 5 : sortedTickets.length,
    );
  };

  return (
    <div className={s.root}>
      <WithSkeleton
        isLoading={searchId.isLoading || isLoading}
        error={error}
        isEmpty={tickets!.length === 0}
        loadingSlot={<Loader/>}
      >
        {sortedTickets &&
        sortedTickets
          .slice(0, numOfTickets)
          .map((ticket: ITicket, id: number) => (
            <Ticket key={`${ticket.price}_${id}`} ticket={ticket}/>
          ))}
        {sortedTickets.length >= numOfTickets ? (
          <ShowMoreBtn onClick={showMoreHandler}/>
        ) : null}
      </WithSkeleton>
    </div>
  );
};

export default TicketsList;
