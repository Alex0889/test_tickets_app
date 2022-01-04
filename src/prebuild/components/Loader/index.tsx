import {FC} from 'react';
import loader from './loader.svg';
import s from './Loader.module.scss';
import clsx from "clsx";

interface LoaderProps {
  readonly className?: string;
}

const Loader: FC<LoaderProps> = ({className}) => {
  return (
    <div className={clsx(s.root, className)}>
      <div className={s.root__wrapper}>
        <img src={loader} alt='loader'/>
      </div>
    </div>
  );
};

export default Loader;
