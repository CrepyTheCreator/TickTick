import clsx from 'clsx';
import styles from './textArea.module.css'

export interface ITextAreaProps {
  size: 'small' | 'big';
  placeholder: string;
}

export default function TextArea ({size, placeholder}: ITextAreaProps) {
  return (
    <textarea 
      className={clsx(size === 'small' ? styles.small : styles.big, styles.input)}
      placeholder={placeholder}
      rows={4}
      maxLength={500}
    />
  );
}
