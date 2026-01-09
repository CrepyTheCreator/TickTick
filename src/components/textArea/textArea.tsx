import clsx from 'clsx';
import styles from './textArea.module.css'

export interface ITextAreaProps {
  size: 'small' | 'big';
  placeholder: string;
  ref?: React.RefObject<HTMLTextAreaElement | null>;
  required?: boolean;
}

export default function TextArea ({size, placeholder, ref, required}: ITextAreaProps) {
  return (
    <textarea 
      className={clsx(size === 'small' ? styles.small : styles.big, styles.input)}
      placeholder={placeholder}
      rows={4}
      maxLength={500}
      ref={ref}
      required={required}
    />
  );
}
