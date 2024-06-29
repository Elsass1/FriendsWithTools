import React from 'react';
import { parseISO, format } from 'date-fns';

export default function DateStyling ({ dateString }: {dateString: string}) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
}


