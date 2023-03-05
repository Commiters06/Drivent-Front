import styled from 'styled-components';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../contexts/UserContext';
import TicketTypeBox from '../../../components/Payment/TicketType';
import { getTicket } from '../../../services/ticketApi';
import TicketTypeSection from '../../../components/Payment/TicketTypeSection';

export default function Payment() {
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [ticket, setTicket] = useState(null);

  const { userData } = useContext(UserContext);

  useEffect(() => {
    let URL = process.env.REACT_APP_API_BASE_URL;
    let token = userData.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let promise = axios.get(`${URL}/tickets/`, config);
    promise.then((res) => {
      const myTicket = res.data;
      setTicket(myTicket);
      setPaymentComplete(true);
    });
    promise.catch((err) => {
      console.log(err);
      console.log(config);
    });
  });

  function summaryText() {
    console.log(ticket);

    if(ticket.TicketType.isRemote) return 'Online';

    if(!ticket.TicketType.isRemote && ticket.TicketType.includesHotel) return 'Presencial + Com Hotel';
   
    if(!ticket.TicketType.isRemote && !ticket.TicketType.includesHotel) return 'Presencial sem hotel';
  }

  return (
    <PageContainer>
      <MainTitle>
        <h1>Ingresso e pagamento</h1>
      </MainTitle>
      
      {!paymentComplete ? (
        <TicketTypeSection completeReservation={setPaymentComplete} chooseTicket={setTicket}/>
      ) : (
        <div>
          <PaymentSummary>
            <h1>{summaryText()}</h1>
            <p>{ticket?.TicketType.price ? `R$ ${ticket.TicketType.price}` : 'Erro! ticket não encontrado.'}</p>
          </PaymentSummary>
        </div>
      )}

    </PageContainer>
  );
}

const PaymentSummary = styled.div`
  background: #ffeed2;
  border-radius: 20px;
  width: 290px;
  height: 108px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;

  h1 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #454545;
  }

  p {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #898989;
  }
`;

const PageContainer = styled.div`
  background-color: white;
`;

const MainTitle = styled.div`
  h1 {
    font-family: 'Roboto';
    font-size: 34px;
    font-weight: 400;
    line-height: 40px;
    letter-spacing: 0em;
    text-align: left;
    color: #000000;
  }
  margin-bottom: 37px;
`;
