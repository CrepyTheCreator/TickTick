import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import styles from './ticket.module.css'
import TicketHeader from "../ticketHeader/ticketHeader";
import Button from "../button/button";
import Post from "../post/post";
import { useDispatch, useSelector } from "../../service/store";
import Comments from "../comments/comments";
import Line from "../line/line";
import TextArea from "../textArea/textArea";
import { getCurrentTicket, getTicketByIdThunk, getTicketLoading } from "../../slices/feedSlice/feedSlice";
import { Preloader } from "../preloader/preloader";
import { getAuthenticate } from "../../slices/userSlice/userSlice";

export default function Ticket () {
  const data = useSelector(getCurrentTicket);
  const loading = useSelector(getTicketLoading);
  const isAuthenticated = useSelector(getAuthenticate);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if(!data || data?.id !== Number(id)) {
      dispatch(getTicketByIdThunk(Number(id)));
      console.log('Call')
    }
  }, [data])

  if (loading || !data) return <Preloader />

  const lastComment = data.comments[data.comments.length - 1];

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
              {isAuthenticated ?
              <div className={styles.userCommentContainer}>
                <TextArea size="small" placeholder="Type your text here"/>
                <Button type="fill" className={styles.commentBtn}>Send Comment</Button>
              </div> : 
              <div className={styles.needAuth}>
                <span className={styles.needAuthText}>You need to log in to send comments</span>
                <Button type="fill" onClick={() => {navigate('/login')}}>Log in</Button>
              </div>}
            </div> 
            }
      </div>
    </>
  );
}
