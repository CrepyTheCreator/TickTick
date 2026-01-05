import styles from './post.module.css';
import eye from '../../assets/eye.svg';
import note from '../../assets/note.svg';
import share from '../../assets/share.svg'

export interface IPostProps {
  authorCircleColor: string;
  author: string;
  text: string;
  type: 'main' | 'comments';
  views?: number;
  answers?: number;
}

export default function Post ({authorCircleColor, author, text, type, views, answers}: IPostProps) {
  return (
    <div className={styles.container}>
      <div className={styles.profileCircle} style={{backgroundColor: `#${authorCircleColor}`}}></div>
      <div className={styles.post}>
        <div className={styles.author}>
          <span>{`@${author}`}</span>
          <div className={styles.features}>
            {type === 'main' ? <>
            <div className={styles.countContainer}>
              <img src={eye} alt="eye" />
              <span>{views}</span>
            </div>
            <div className={styles.countContainer}>
              <img src={note} alt="note" />
              <span>{answers}</span>
            </div> </> : null
            }
            <img src={share} alt="" className={styles.share}/>
          </div>
        </div>
        <div className={styles.postText}>
          {text}
        </div>
      </div>
    </div>
  );
}
