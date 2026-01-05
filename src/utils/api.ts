import type { Ticket } from "./types";


const BASE_URL = import.meta.env.VITE_BASE_URL

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export type TFeedApiResponse = {
  tickets: Ticket[];
};

export const getTicketList = async (): Promise<TFeedApiResponse> => {
  const response = await fetch(`${BASE_URL}/tickets`);
  const data = await checkResponse<TFeedApiResponse>(response);
  return data;
}