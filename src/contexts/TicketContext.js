import { createContext } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

const TicketContext = createContext();
export default TicketContext;

export function TicketProvider({ children }) {
  const [ticketData, setTicket] = useLocalStorage('ticketData', null);
  
  return (
    <TicketContext.Provider value={{ ticketData, setTicket }}>
      {children}
    </TicketContext.Provider>
  );
}
