import {FC} from 'react';
import s from './ShowMore.module.scss';
import clsx from "clsx";

interface ShowMoreProps {
  readonly onClick: () => void;
  readonly className?: string;
}

const ShowMoreBtn: FC<ShowMoreProps> = (
  {
    onClick,
    className
  }) => {
  return (
    <div className={clsx(s.root, className)}>
      <button onClick={onClick} className={s.root__btn}>
        Показать еще 5 билетов!
      </button>
    </div>
  );
};

export default ShowMoreBtn;
