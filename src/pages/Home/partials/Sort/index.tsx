import { FC } from 'react';
import s from './Sort.module.scss';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { changeSortCondition } from 'app/slices/tickets';
import { SortTypes } from 'app/enum/sortTypes';

const Sort: FC = () => {
  const {
    tickets: { sort },
  } = useAppSelector();
  const dispatch = useAppDispatch();

  const sortConditions = [
    { key: SortTypes.CHEEP, value: 'самый дешевый' },
    { key: SortTypes.FAST, value: 'самый быстрый' },
    { key: SortTypes.OPTIMAL, value: 'оптимальный' },
  ];

  const onActiveHandler = (key: string) => {
    dispatch(changeSortCondition(key));
  };

  return (
    <div className={s.root}>
      {sortConditions.map(({ key, value }, i) => (
        <button
          onClick={() => onActiveHandler(key)}
          className={clsx(s.root__btn, sort === key && s.root__btn_active)}
          key={key}
        >
          {value}
        </button>
      ))}
    </div>
  );
};

export default Sort;
