import type { ReactNode } from "react";
import styles from './button.module.css'
import clsx from "clsx";


export interface IButtonProps {
  children: ReactNode;
  type: 'fill' | 'transparent'
  onClick?: () => void;
  className?: string;
}

export default function Button (props: IButtonProps) {
  return (
    <button className={clsx(styles.button, props.type === 'fill' ? styles.fill : styles.transparent, props.className)} onClick={props.onClick}>
      <span className={styles.text}>{props.children}</span>
    </button> 
  );
}
