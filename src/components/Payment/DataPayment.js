import styled from 'styled-components';
import 'react-credit-cards-2/es/styles-compiled.css';
import CardDataForm from '../CardDataForm';
import TicketContext from '../../contexts/Ticket';
import { useContext, useState } from 'react';

export default function DataPayment() {
  const { ticketData } = useContext(TicketContext);
  const [paid, setPaid] = useState(ticketData.status === 'PAID');

  function summaryText() {
    if (ticketData.TicketType.isRemote) return 'Online';

    if (!ticketData.TicketType.isRemote && ticketData.TicketType.includesHotel) return 'Presencial + Com Hotel';

    if (!ticketData.TicketType.isRemote && !ticketData.TicketType.includesHotel) return 'Presencial sem hotel';
  }

  return (
    <div>
      <PaymentSummary>
        <h1>{summaryText()}</h1>
        <p>{ticketData?.TicketType.price ? `R$ ${ticketData.TicketType.price}` : 'Erro! ticket não encontrado.'}</p>
      </PaymentSummary>
      {!paid?
        <CardDataForm ticketId={ticketData.id} isPaid={setPaid}/>:
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
      }      
    </div>
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

const ConfirmPaymentContainer = styled.div`
  margin-top: 30px;

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
