import { createContext } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

const BookingContext = createContext();
export default BookingContext;

export function BookingProvider({ children }) {
  const [bookingData, setBooking] = useLocalStorage('BookingData', null);
  
  return (
    <BookingContext.Provider value={{ bookingData, setBooking }}>
      {children}
    </BookingContext.Provider>
  );
}
