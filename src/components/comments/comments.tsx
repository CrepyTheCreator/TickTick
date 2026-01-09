import { useRef, useState } from 'react';
import Button from '../button/button';
import type { Comment } from '../../utils/types';
import styles from './comments.module.css';
import Post from '../post/post';
import Line from '../line/line';

export interface ICommentsProps {
  comments: Comment[];
}

export default function Comments ({comments}: ICommentsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const commonComments = comments.slice(0, comments.length - 1);
  const commentsListRef = useRef<HTMLDivElement | null>(null);
  const commentsMoreRef = useRef<HTMLDivElement | null>(null);
  return (
    <>
    {comments.length >= 2 && !isOpen ? 
      <div className={styles.moreComments} ref={commentsMoreRef}>
        <div className={styles.moreCommentText}>
          <span>{`${comments.length - 1} comments`}</span>
          <Button type="transparent" onClick={() => setIsOpen(a => !a)}>Show</Button>
        </div>
        <div className={styles.line}></div>
      </div> : null
    }
    {isOpen ? 
      <div className={styles.comments} ref={commentsListRef}>
        <div className={styles.commentsList}>
        {commonComments.map((el, i) => {
          return (
            <>
            <Post author={el.author} authorProfileColor={el.authorProfileColor} text={el.text} type='comments'/>
            {i !== commonComments.length - 1 ? <Line /> : null}
            </>
          )
        })}
        </div>
        <div className={styles.end}>
          <Line />
          <Button type="transparent" onClick={() => setIsOpen(a => !a)}>Hide</Button>
          <Line />
        </div>

      </div> : null}
    </>
  );
}