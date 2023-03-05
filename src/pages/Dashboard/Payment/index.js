/* eslint-disable no-console */
import styled from 'styled-components';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../contexts/UserContext';
import TicketTypeSection from '../../../components/Payment/TicketTypeSection';
import DataPayment from '../../../components/Payment/DataPayment';
import TicketContext from '../../../contexts/Ticket';

export default function Payment() {
  const [paymentComplete, setPaymentComplete] = useState(false);

  const { userData } = useContext(UserContext);
  const { setTicket } = useContext(TicketContext);

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
  }, []);

  return (
    <PageContainer>
      <MainTitle>
        <h1>Ingresso e pagamento</h1>
      </MainTitle>
      
      {!paymentComplete ? (
        <TicketTypeSection completeReservation={setPaymentComplete} chooseTicket={setTicket}/>
      ) : (
        <DataPayment />
      )}
    </PageContainer>
  );
}

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
