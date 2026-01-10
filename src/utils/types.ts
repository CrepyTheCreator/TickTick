export type TUserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  data: {
    name: string;
    profileColor: string;
  };
  loginUserError: string | null;
  loginUserRequest: boolean | null;
};

export type TFeedState = {
  isLoading: boolean;
  tickets: Ticket[];
  currentTicket: Ticket | null;
  ticketLoading: boolean;
};

export type Ticket = {
  author: string;
  authorProfileColor: string;
  views: number;
  answers: number;
  id: number;
  isTicketClosed: boolean;
  title: string;
  description: string;
  comments: {
      commentId: number;
      author: string;
      authorProfileColor: string;
      text: string;
  }[];
};

export type Comment = {
  commentId: number;
  author: string;
  authorProfileColor: string;
  text: string;
}
