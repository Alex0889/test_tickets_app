import { FC, useEffect, useMemo, useState } from 'react';
import s from './FilterPanel.module.scss';
import clsx from 'clsx';
import Checkbox from 'prebuild/components/Checkbox';
import { generateIndexesArr } from './helpers';
import { useAppDispatch } from 'app/hooks';
import { changeFilterConditions } from 'app/slices/tickets';

const FilterPanel: FC = () => {
  const stops = useMemo(
    () => [
      { id: 0, key: 'stops-all', value: 'Все' },
      { id: 1, key: 'stops-0', value: 'Без пересадок' },
      { id: 2, key: 'stops-1', value: '1 пересадка' },
      { id: 3, key: 'stops-2', value: '2 пересадки' },
      { id: 4, key: 'stops-3', value: '3 пересадки' },
    ],
    [],
  );

  const dispatch = useAppDispatch();

  const [filterState, setFilterState] = useState(
    new Array(stops.length).fill(true),
  );

  useEffect(() => {
    dispatch(changeFilterConditions(stops.map((item) => item.id)));
  }, [dispatch, stops]);

  const onChangeHandler = (id: number) => {
    if (id === 0) {
      const updatedState = new Array(stops.length).fill(!filterState[0]);

      setFilterState(updatedState);
      dispatch(changeFilterConditions([...generateIndexesArr(updatedState)]));
      return;
    }

    const updatedCheckedState = filterState.map((item, i) => {
      if (i === 0) return false;
      return i === id ? !item : item;
    });

    setFilterState(updatedCheckedState);
    dispatch(
      changeFilterConditions([...generateIndexesArr(updatedCheckedState)]),
    );
  };

  return (
    <aside className={s.root}>
      <span className={s.root__header}>количество пересадок</span>
      <div className={s.root__checklist}>
        {stops.map(({ id, key, value }, i) => (
          <Checkbox
            key={key}
            className={clsx(filterState[i] && s.active)}
            value={value}
            checked={filterState[i]}
            onChange={() => onChangeHandler(id)}
          >
            {value}
          </Checkbox>
        ))}
      </div>
    </aside>
  );
};

export default FilterPanel;
