/* eslint-disable no-console */
import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../contexts/UserContext';
import TicketTypeSection from '../../../components/Payment/TicketTypeSection';
import DataPayment from '../../../components/Payment/DataPayment';
import TicketContext from '../../../contexts/TicketContext';
import { getTicket } from '../../../services/ticketApi';
import { getPersonalInformations } from '../../../services/enrollmentApi';

export default function Payment() {
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [enrollment, setEnrollment] = useState(null);

  const { userData } = useContext(UserContext);
  const { setTicket } = useContext(TicketContext);

  useEffect(async() => {
    let token = userData.token;
    try {
      const enrollmentExist = await getPersonalInformations(userData.token);
      setEnrollment(enrollmentExist);
      const myTicket = await getTicket(token);
      setTicket(myTicket);
      setPaymentComplete(true);
    }catch(err) {
      setTicket(null);
    }
  }, []);

  if(enrollment === null) {
    return (
      <PageContainer>
        <MainTitle>
          <h1>Ingresso e pagamento</h1>
        </MainTitle>

        <UnavailableTicketsContainer>
          <div>
            <h3>Você precisa completar sua inscrição antes</h3>
            <h3>de prosseguir pra escolha de ingresso</h3>
          </div>
        </UnavailableTicketsContainer>

      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <MainTitle>
        <h1>Ingresso e pagamento</h1>
      </MainTitle>

      {!paymentComplete ? (
        <TicketTypeSection completeReservation={setPaymentComplete} chooseTicket={setTicket} />
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

const UnavailableTicketsContainer = styled.div`
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    height: 46px;
    width: 399px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  h3 {
    font-family: 'Roboto';
    font-size: 20px;
    font-weight: 400;
    color: #8E8E8E;
  }
`;
