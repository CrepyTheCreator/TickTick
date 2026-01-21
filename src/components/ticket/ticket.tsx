import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
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
import { getAuthenticate, getUser } from "../../slices/userSlice/userSlice";
import { addComment } from "../../utils/api";

export default function Ticket () {
  const data = useSelector(getCurrentTicket);
  const user = useSelector(getUser);
  const loading = useSelector(getTicketLoading);
  const isAuthenticated = useSelector(getAuthenticate);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const commentRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if(!data || data?.id !== Number(id)) {
      dispatch(getTicketByIdThunk(Number(id)));
    }
  }, [])
  const sendComment = async () => {
    try {
      if (!commentRef.current) {
        console.error('Comment ref is not available');
        return;
      }
      
      const commentText = commentRef.current.value.trim();
      
      if (!commentText) {
        console.error('Comment cannot be empty');
        alert('Комментарий не может быть пустым');
        return;
      }
      
      if (!id) {
        console.error('Ticket ID is missing');
        return;
      }
      
      if (!user || !user.name) {
        console.error('User is not authenticated');
        alert('Пожалуйста, войдите в систему чтобы оставить комментарий');
        return;
      }
      
      const submitButton = document.querySelector('[type="submit"]') as HTMLButtonElement;
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Отправка...';
      }
      
      const data = await addComment(user.name, commentText, id);
      
      if (data.success) {
        commentRef.current.value = '';

        dispatch(getTicketByIdThunk(Number(id)));
        
      } else { console.log('Erorr') }
      
    } catch (error) {
      console.error('Error sending comment:', error);
      alert('Произошла ошибка при отправке комментария');
      
    } finally {
      const submitButton = document.querySelector('[type="submit"]') as HTMLButtonElement;
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Отправить';
      }
    }
  };

  if (loading || !data) return <Preloader />

  const lastComment = data.comments[data.comments.length - 1];

  return (
    <>
      <div className={styles.container}>
        <TicketHeader isCompleted={data?.isTicketClosed} answers={data?.answers} id={data?.id} title={data?.title} author={data.author} isClose={data.isTicketClosed}/>
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
                <TextArea size="small" placeholder="Type your text here" ref={commentRef}/>
                <Button type="fill" className={styles.commentBtn} onClick={() => sendComment()}>Send Comment</Button>
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
