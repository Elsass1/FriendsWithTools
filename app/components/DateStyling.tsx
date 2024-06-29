import React from 'react';
import { parseISO, format } from 'date-fns';


// const Date = ({ dateString }) => {
//   const date = parseISO(dateString);
//   return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
// };

// export default Date;

export default function DateStyling ({ dateString }: {dateString: string}) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
}


