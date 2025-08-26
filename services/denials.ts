import { format } from 'date-fns';

export interface Denial {
  sn: number;
  time: string;
  date: string;
  enrolleeId: string;
  daysOpened: string;
  hmo: string;
  reason: string;
  action: string;
}

// In a real app, this would be an API call to your backend
const denials: Denial[] = [];

let nextSn = 1;

export const addDenial = (denial: Omit<Denial, 'sn' | 'time' | 'date' | 'daysOpened' | 'action'>): Denial => {
  const now = new Date();
  const newDenial: Denial = {
    ...denial,
    sn: nextSn++,
    time: format(now, 'h:mm a'),
    date: format(now, 'yyyy-MM-dd'),
    daysOpened: 'Just now',
    action: 'Reprocess',
  };
  
  denials.unshift(newDenial);
  return newDenial;
};

export const getDenials = (): Denial[] => {
  return [...denials];
};
