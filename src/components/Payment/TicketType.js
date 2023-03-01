import { useEffect } from 'react';
import styled from 'styled-components';

export default function TicketTypeBox({ selected, selectedFunction, exchangeSelected, type, price, aditional }) {
  function chooseType() {
    selectedFunction(!selected); 
    exchangeSelected(false); 
  }
  return(
    <TicketBox onClick={() => chooseType()} selected={selected}>
      <h3>{type}</h3>
      <h4>{aditional? '+': ''} R$ {price}</h4>
    </TicketBox>
  );
}

const TicketBox = styled.button`
  height: 145px;
  width: 145px;
  left: 341px;
  top: 323px;
  border-radius: 20px;
  border: 1px solid #cecece;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 3px;
  border: 1px solid #cecece;
  cursor: pointer;

  background-color: ${props => props.selected ? '#FFEED2' : '#FFFFFF'};

  h3 {
    font-family: 'Roboto';
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: center;
    color: #454545;
  }
  h4 {
    font-family: 'Roboto';
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: center;
    color: #898989;
  }
  
`;
