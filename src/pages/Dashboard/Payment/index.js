/* eslint-disable no-console */
import styled from 'styled-components';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../contexts/UserContext';
import TicketTypeSection from '../../../components/Payment/TicketTypeSection';
import DataPayment from '../../../components/Payment/DataPayment';
import TicketContext from '../../../contexts/Ticket';
import { getTicket } from '../../../services/ticketApi';

export default function Payment() {
  const [paymentComplete, setPaymentComplete] = useState(false);

  const { userData } = useContext(UserContext);
  const { ticketData, setTicket } = useContext(TicketContext);

  useEffect(async() => {
    let token = userData.token;
    try {
      const myTicket = await getTicket(token);
      setTicket(myTicket);
      setPaymentComplete(true);
    }catch(err) {
      setTicket(null);
    }
  }, []);

  return (
    <PageContainer>
      <MainTitle>
        <h1>Ingresso e pagamento</h1>
      </MainTitle>

      {!paymentComplete ? (
        <TicketTypeSection completeReservation={setPaymentComplete} chooseTicket={setTicket} />
      ) : (
        <>
          <DataPayment />
          <ConfirmPaymentContainer>
            <h2>Pagamento</h2>
            <ConfirmPayment>
              <Checkmark>
                <ion-icon name="checkmark-circle"></ion-icon>
              </Checkmark>
              <ConfirmText>
                <h3>Pagamento confirmado!</h3>
                <h4>Prossiga para a escolha de hospedagem e atividades</h4>
              </ConfirmText>
            </ConfirmPayment>
          </ConfirmPaymentContainer>
        </>
      )}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  background-color: white;
  width: 100%;
  height: 80%;
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

const ConfirmPaymentContainer = styled.div`
  h2 {
    font-family: 'Roboto';
    font-size: 20px;
    color: #8E8E8E;
    margin-bottom: 17px;
  }
`;

const ConfirmPayment = styled.div`
  display: flex;
  flex-direction: row;
`;

const Checkmark = styled.div`
  width: 40px;
  margin-right: 14px;

  ion-icon {
    color: #36B853;
    height: 40px;
    width: 40px;
  }
`;

const ConfirmText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 40px;

  h3 {
    font-size: 16px;
    font-weight: 700;
  }

  h4 {
    font-size: 16px;
    font-weight: 400;
    color: #454545;
  }
`;
