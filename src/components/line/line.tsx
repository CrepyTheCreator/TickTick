import styles from './line.module.css'

interface TLineProps {
  type?: 'horizontal' | 'vertical'
}

export default function Line ({type}: TLineProps) {
  return (
    <div className={type === 'horizontal' ? styles.horizontal : styles.line}></div>
  );
}
