import { FC, useEffect } from 'react';
import s from './Home.module.scss';
import Header from 'components/Header';
import FilterPanel from './partials/FilterPanel';
import { useAppDispatch } from 'app/hooks';
import { getSearchId } from 'app/slices/tickets/thunks/getSearchId';
import Sort from './partials/Sort';
import TicketsList from './partials/TicketsList';

const HomePage: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSearchId());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className={s.root}>
        <FilterPanel />
        <main className={s.root__main}>
          <Sort />
          <TicketsList />
        </main>
      </div>
    </>
  );
};

export default HomePage;
