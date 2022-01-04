import {FC, InputHTMLAttributes} from 'react';
import s from "./Checkbox.module.scss";
import clsx from "clsx";

export type CheckboxProps = {
  readonly className?: string;
}

const Checkbox: FC<CheckboxProps & InputHTMLAttributes<HTMLInputElement>> = (
  {
    children,
    className,
    ...props
  }) => {
  return (
    <label className={clsx(s.root, className)}>
      <input className={s.root__checkbox} type="checkbox" {...props}/>
      <span className={s.root__checkmark}/>
      {children}
    </label>
  );
}

export default Checkbox;