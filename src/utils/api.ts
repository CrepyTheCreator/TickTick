import { getCookie } from "./cookie";
import type { Ticket } from "./types";


const BASE_URL = import.meta.env.VITE_BASE_URL

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export type TFeedApiResponse = {
  tickets: Ticket[] | [];
};

export type TCreateTicketResponse = {
  id: number;
}

export type TAddComment = {
  success: string;
}

export type TDeleteResponse = {
  success: string;
}

export type TToggleTicketResponse = {
  success: string;
}

export type TRegisterData = {
  username: string;
  password: string;
  profileColor: string;
}

export type TLoginData = {
  username: string;
  password: string;
}

export type TUserApiResponse = {
  username: string;
  profileColor: string;
  accessToken: string;
}

export const getTicketList = async (): Promise<TFeedApiResponse> => {
  const response = await fetch(`${BASE_URL}/tickets`);
  const data = await checkResponse<TFeedApiResponse>(response);
  return data;
}

export const refreshUserApi = async () => {
  const response = await fetch(`${BASE_URL}/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: `Bearer ${getCookie('accessToken')}`
    }
  });
  const data = await checkResponse<TUserApiResponse>(response);
  return data;
}

export const getTicketByIdApi = async (id: number): Promise<Ticket> => {
  const response = await fetch(`${BASE_URL}/tickets/${id}`);
  const data = await checkResponse<Ticket>(response);
  return data;
}

export const createTicket = async (author: string, title: string, description: string): Promise<TCreateTicketResponse> => {
  const response = await fetch(`${BASE_URL}/tickets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: `Bearer ${getCookie('accessToken')}`
    },
    body: JSON.stringify({
      author: author,
      title: title,
      description: description
    })
  })
  const data = await checkResponse<TCreateTicketResponse>(response);
  return data;
}

export const registerUserApi = async (registerData: TRegisterData): Promise<TUserApiResponse> => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(registerData)
  })
  const data = await checkResponse<TUserApiResponse>(response);
  return data;
}

export const loginUserApi = async (loginData: TLoginData): Promise<TUserApiResponse> => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(loginData)
  })
  const data = await checkResponse<TUserApiResponse>(response);
  return data;
}

export const addComment = async (author: string, text: string, id: string): Promise<TAddComment> => {
  const response = await fetch(`${BASE_URL}/tickets/${id}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: `Bearer ${getCookie('accessToken')}`
    },
    body: JSON.stringify({
      author: author,
      text: text,
    })
  })
  const data = await checkResponse<TAddComment>(response);
  return data;
}

export const deleteTicketApi = async (id: string): Promise<TDeleteResponse> => {
  const response = await fetch(`${BASE_URL}/tickets`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: `Bearer ${getCookie('accessToken')}`
    },
    body: JSON.stringify({id})
  })
  const data = await checkResponse<TDeleteResponse>(response);
  return data
}

export const toggleTicketStatus = async (id: string, isClosed: boolean): Promise<TToggleTicketResponse> => {
  const response = await fetch(`${BASE_URL}/tickets/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({isClosed})
  })
  const data = await checkResponse<TToggleTicketResponse>(response);
  return data
}