import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import styles from './ticket.module.css'
import TicketHeader from "../ticketHeader/ticketHeader";
import Button from "../button/button";
import Post from "../post/post";
import { useDispatch } from "../../service/store";
import Comments from "../comments/comments";
import Line from "../line/line";
import TextArea from "../textArea/textArea";

export default function Ticket () {
  const location = useLocation();
  //const dispatch = useDispatch();
  //const { id } = useParams();
  const data = location.state;
  //useEffect(() => {
  //  if(!data) {
  //    dispatch(someFunc(id));
  //  }
  //})

  const lastComment = data?.comments[data.comments.length - 1];
  return (
    <>
      <div className={styles.container}>
        <TicketHeader isCompleted={data?.isTicketClosed} answers={data?.answers} id={data?.id} title={data?.title}/>
        <div className={styles.ticket}>
          <Post author={data?.author} authorProfileColor={data?.authorProfileColor} text={data?.description} type="main" views={data?.views} answers={data?.answers}/>
          <Line />
        </div>
        <div className={styles.commentsContainer}>
          <Comments comments={data?.comments}/>
          {data?.comments.length > 0 &&
            <div className={styles.ticket}>
              <Post author={lastComment?.author} authorProfileColor={lastComment?.authorProfileColor} text={lastComment?.text} type="comments"/>
            </div>
          }
        </div>
        {!data?.isTicketClosed && 
            <div className={styles.userComment}>
              <Line />
              <div className={styles.userCommentContainer}>
                <TextArea size="small" placeholder="Type your text here"/>
                <Button type="fill" className={styles.commentBtn}>Send Comment</Button>
              </div>
            </div>
            }
      </div>
    </>
  );
}
