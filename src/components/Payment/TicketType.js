import styled from 'styled-components';

export default function TicketTypeBox({ selected, selectedFunction, exchangeSelected, ticketInfo, aditional, finalPriceChange, parentalDependency }) {
  if(!parentalDependency) {
    finalPriceChange(0);
    selectedFunction(false);
  }

  function toggleType() {
    if(selected) {
      finalPriceChange(0);
    }else{
      finalPriceChange(ticketInfo.price);
    }

    selectedFunction(!selected); 
    exchangeSelected(false); 
  }

  return(
    <TicketBox onClick={() => toggleType()} selected={selected}>
      <h3>{ticketInfo?.name}</h3>
      <h4>{aditional? '+': ''} R$ {ticketInfo?.price}</h4>
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
