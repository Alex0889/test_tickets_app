import {FC} from 'react';
import s from './Ticket.module.scss';
import {
  generateDurationStr,
  generateStopsStr,
  generateTimeStr,
} from './helpers';
import {priceWithLocale} from './helpers';
import {ISegment} from "app/interfaces/ISegment";
import {ITicket} from "app/interfaces/ITicket";

interface TicketProps {
  readonly ticket: ITicket
}

const Ticket: FC<TicketProps> = (
  {
    ticket: {price, carrier, segments}
  }) => {

  const stopsValues = (stops: string[]) => {
    switch (stops.length) {
      case 1: {
        return '1 пересадка';
      }
      case 2: {
        return '2 пересадки';
      }
      case 3: {
        return '3 пересадки';
      }
      default: {
        return 'Без пересадок';
      }
    }
  }


  const segm = segments.map((segment: ISegment, id: number) => {
    const stops = stopsValues(segment.stops);
    const time = generateTimeStr(segment.date, segment.duration);
    const duration = generateDurationStr(segment.duration);
    const stopsString = generateStopsStr(segment.stops);

    return (
      <div key={`${segment.date}_${id}`} className={s.root__info}>
        <div className={s.root__info_top}>
          <span>
            {segment.origin} – {segment.destination}
          </span>
          <span>В пути</span>
          <span>{stops}</span>
        </div>
        <div className={s.root__info_bottom}>
          <span>{time}</span>
          <span>{duration}</span>
          <span>{stopsString}</span>
        </div>
      </div>
    );
  });

  return (
    <div className={s.root}>
      <div className={s.root__header}>
        <span className={s.root__price}>{priceWithLocale(price)}</span>
        <img src={`https://pics.avs.io/99/36/${carrier}.png`} alt='Logo'/>
      </div>
      {segm}
    </div>
  );
};

export default Ticket;
