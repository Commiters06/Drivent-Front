import styled from 'styled-components';
import 'react-credit-cards-2/es/styles-compiled.css';
import CardDataForm from '../CardDataForm';
import TicketContext from '../../contexts/Ticket';
import { useContext } from 'react';

export default function DataPayment() {
  const { ticketData } = useContext(TicketContext);

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
      <CardDataForm ticketId={ticketData.id}/>
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
