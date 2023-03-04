import styled from 'styled-components';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';
import { useState } from 'react';
import { Box, TextField } from '@material-ui/core';
import InputMask from 'react-input-mask';
import { cardNumber } from 'card-validator/dist/card-number';

export default function DataPayment({ ticket }) {
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });
  const [cardNumberError, setCardNumberError] = useState(false);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setCardData((prev) => ({ ...prev, focus: evt.target.name }));
  };

  function summaryText() {
    if (ticket.TicketType.isRemote) return 'Online';

    if (!ticket.TicketType.isRemote && ticket.TicketType.includesHotel) return 'Presencial + Com Hotel';

    if (!ticket.TicketType.isRemote && !ticket.TicketType.includesHotel) return 'Presencial sem hotel';
  }

  function isValidCardData() {
    if(!cardNumber(cardData.number).isValid) {
      setCardNumberError(true);
    }else{
      setCardNumberError(false);
    }
  }

  return (
    <div>
      <PaymentSummary>
        <h1>{summaryText()}</h1>
        <p>{ticket?.TicketType.price ? `R$ ${ticket.TicketType.price}` : 'Erro! ticket não encontrado.'}</p>
      </PaymentSummary>
      <CardWrapper>
        <Cards
          name={cardData.name}
          expiry={cardData.expiry}
          cvc={cardData.cvc}
          number={cardData.number}
          focused={cardData.focus}
        />
        <Form>
          <TextField onBlur={isValidCardData} inputProps={{ maxLength: 16 }} error={cardNumberError} name="number"  value={cardData.number} onChange={handleInputChange} onFocus={handleInputFocus} label="Cartão de Crédito" variant="outlined" />
          <TextField name="name" value={cardData.name} onChange={handleInputChange} onFocus={handleInputFocus} label="Nome" variant="outlined" />
          <InputColumn>
            <Box width={'58%'}>
              <InputMask
                mask="99/99"
                onChange={handleInputChange} onFocus={handleInputFocus}
                value={cardData.expiry}
              >
                {() => <TextField name="expiry"  label="Validade" variant="outlined" />}
              </InputMask>
            </Box>
            <Box width={'38%'}>
              <TextField inputProps={{ maxLength: 3 }} name="cvc" value={cardData.cvc} onChange={handleInputChange} onFocus={handleInputFocus} label="CVC" variant="outlined" />
            </Box>
          </InputColumn>
        </Form>
      </CardWrapper>
    </div>
  );
}

const InputColumn = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Form = styled.form`
  width: 347px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  @media(max-width:750px){
    width: 100%;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: start;
  margin-top: 50px;
  gap: 20px;
  align-items: center;

  @media(max-width:750px){
    flex-direction: column;
  }
`;

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
