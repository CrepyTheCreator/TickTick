export type TUserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  data: {
    email: string;
    name: string;
    profileColor: string;
  };
  loginUserError: string | null;
  loginUserRequest: boolean | null;
};

export type TFeedState = {
  isLoading: boolean;
  tickets: Ticket[];
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
