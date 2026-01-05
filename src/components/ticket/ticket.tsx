import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import styles from './ticket.module.css'
import TicketHeader from "../ticketHeader/ticketHeader";
import Button from "../button/button";
import Post from "../post/post";
import share from '../../assets/share.svg'

export default function Ticket () {
  const location = useLocation();
  //const { id } = useParams();

  const [isOpen, setIsOpen] = useState(false);

  const data = location.state;
  const lastComment = data?.comments[data.comments.length - 1];
  console.log(lastComment)
  return (
    <>
      <div className={styles.container}>
        <TicketHeader isCompleted={data?.isTicketClosed} answers={data?.answers} id={data?.id} title={data?.title}/>
        <div className={styles.ticket}>
          <Post author={data?.author} authorCircleColor={data?.authorProfileColor} text={data?.description} type="main" views={data?.views} answers={data?.answers}/>
          <div className={styles.line}></div>
        </div>
        <div className={styles.commentsContainer}>
          {data?.comments.length >= 2 && !isOpen ? 
            <div className={styles.moreComments}>
              <div className={styles.moreCommentText}>
                <span>{`${data?.comments.length - 1} comments`}</span>
                <Button type="transparent" onClick={() => setIsOpen(a => !a)}>Show</Button>
              </div>
              <div className={styles.line}></div>
            </div> : null}
            {data?.comments.length > 0 &&
              <div className={styles.ticket}>
                <Post author={lastComment?.author} authorCircleColor={lastComment?.authorProfileColor} text={lastComment?.text} type="comments"/>
                <div className={styles.line}></div>
              </div>
            }
            <div className={styles.commentInput}>
              
            </div>
        </div>
      </div>
    </>
  );
}
