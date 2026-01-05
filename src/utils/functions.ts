import sucess from '../assets/sucess.svg';
import pending from '../assets/pending.svg';
import warn from '../assets/warn.svg';

export const ticketSwitch = (value: number, isClosed: boolean, type: 'logo' | 'color') => {
  if (type === 'logo') {
    return isClosed ? sucess : value > 0 ? pending : warn;
  } else {
    return isClosed ? '008828' : value > 0 ? '887F00' : 'BF0000';
  }
}