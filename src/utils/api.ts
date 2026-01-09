import type { Ticket } from "./types";


const BASE_URL = import.meta.env.VITE_BASE_URL

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export type TFeedApiResponse = {
  tickets: Ticket[];
};

export type TCreateTicketResponse = {
  id: number;
}

export const getTicketList = async (): Promise<TFeedApiResponse> => {
  const response = await fetch(`${BASE_URL}/tickets`);
  const data = await checkResponse<TFeedApiResponse>(response);
  return data;
}

export const getTicketByIdApi = async (id: number): Promise<Ticket> => {
  const response = await fetch(`${BASE_URL}/tickets/${id}`);
  const data = await checkResponse<Ticket>(response);
  return data;
}

export const createTicket = async (title: string, description: string): Promise<TCreateTicketResponse> => {
  const response = await fetch(`${BASE_URL}/tickets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      //authorization: getCookie('accessToken')
    },
    body: JSON.stringify({
      title: title,
      description: description
    })
  })
  const data = await checkResponse<TCreateTicketResponse>(response);
  return data;
}