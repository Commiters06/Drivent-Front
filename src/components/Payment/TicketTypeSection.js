import TicketTypeBox from '../Payment/TicketType';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import UserContext from '../../contexts/UserContext';
import { getTicket, getTicketTypes, postTicket } from '../../services/ticketApi';
import TicketContext from '../../contexts/Ticket';

export default function TicketTypeSection({ completeReservation, chooseTicket }) {
  const [tickets, setTickets] = useState([]);
  const [baseValue, setBaseValue] = useState (0);
  const [aditionalValue, setAdiotionalValue] = useState (0);

  const [presentialSelected, setPresentialSelected] = useState(false);
  const [remoteSelected, setRemoteSelected] = useState(false);
  const [hotelSelected, setHotelSelected] = useState(false);
  const [noHotelSelected, setNoHotelSelected] = useState(false);

  const [finalSelection, setFinalSelection] = useState(0);

  const { userData } = useContext(UserContext);
  const { setTicket } = useContext(TicketContext);

  useEffect(async() => {
    let token = userData.token;
    try {
      const Tickets = await getTicketTypes(token);
      setTickets(Tickets);
    }catch(err) {}
  }, []);

  async function reservTicket() {
    const body = {
      ticketTypeId: finalSelection
    };
    let data = await postTicket(userData.token, body);
    setTicket(data);
    chooseTicket(data);
    completeReservation(true);
  }

  return(
    <div>
      <SecondaryTitle>
        <h2>Primeiro, escolha sua modalidade de ingresso</h2>
      </SecondaryTitle>
      <TicketsContainer>
        {tickets.length === 3?
          <>
            <TicketTypeBox selected={presentialSelected} selectedFunction={setPresentialSelected} exchangeSelected={setRemoteSelected} 
              ticketInfo={tickets.filter((e) => !e.isRemote && !e.includesHotel)[0]} key={1} chooseFinal={setFinalSelection}
              aditional={false} finalPriceChange={setBaseValue} parentalDependency={true}/>

            <TicketTypeBox selected={remoteSelected} selectedFunction={setRemoteSelected} exchangeSelected={setPresentialSelected} 
              ticketInfo={tickets.filter((e) => e.isRemote)[0]} key={2} chooseFinal={setFinalSelection}
              aditional={false} finalPriceChange={setBaseValue} parentalDependency={true}/>
          </>
          : null}

      </TicketsContainer>
      <SecondInnerContainer visible={presentialSelected}>
        <SecondaryTitle>
          <h2>Ótimo! Agora escolha sua modalidade de hospedagem</h2>
        </SecondaryTitle>
        <TicketsContainer>

          {tickets.length === 3?
            <>
              <TicketTypeBox selected={hotelSelected} selectedFunction={setHotelSelected} exchangeSelected={setNoHotelSelected} 
                ticketInfo={{ id: tickets.filter((e) => !e.isRemote && !e.includesHotel)[0].id, price: 0, name: 'Sem Hotel' }} key={3} chooseFinal={setFinalSelection}
                aditional={true} finalPriceChange={setAdiotionalValue} parentalDependency={presentialSelected}/>

              <TicketTypeBox selected={noHotelSelected} selectedFunction={setNoHotelSelected} exchangeSelected={setHotelSelected} 
                ticketInfo={{ id: tickets.filter((e) => !e.isRemote && e.includesHotel)[0].id, 
                  price: tickets.filter((e) => !e.isRemote && e.includesHotel)[0].price - tickets.filter((e) => !e.isRemote && !e.includesHotel)[0].price,
                  name: tickets.filter((e) => !e.isRemote && e.includesHotel)[0].name }} 
                key={4} chooseFinal={setFinalSelection}
                aditional={true}  finalPriceChange={setAdiotionalValue} parentalDependency={presentialSelected}/>

            </>
            : null}

        </TicketsContainer>
      </SecondInnerContainer>
      <ThirdInnerContainer visible={remoteSelected || hotelSelected || noHotelSelected}>
        <SecondaryTitle>
          <h2>
            Fechado! O total ficou em <strong>R$ {baseValue + aditionalValue}</strong>. Agora é só confirmar:
          </h2>
        </SecondaryTitle>
        <ConfirmTicketButton onClick={() => reservTicket() }>
          <h1>RESERVAR INGRESSO</h1>
        </ConfirmTicketButton>
      </ThirdInnerContainer>
    </div>
  );
};

const SecondaryTitle = styled.div`
  h2 {
    font-family: 'Roboto';
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: #8e8e8e;
  }
  h5 {
    font-family: 'Roboto';
    font-size: 20px;
    font-weight: 700;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
  }
  margin-bottom: 17px;
`;
const TicketsContainer = styled.div`
  display: flex;
  column-gap: 24px;
  margin-bottom: 44px;
`;

const ConfirmTicketButton = styled.button`
  height: 37px;
  width: 162px;
  border-radius: 4px;
  background-color: #e0e0e0;
  border: none;
  box-shadow: 0px 2px 10px 0px #00000040;
  cursor: pointer;

  h1 {
    font-family: 'Roboto';
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: center;
    color: #000000;
  }
`;

const SecondInnerContainer = styled.div`
  display: ${(props) => (props.visible ? 'block' : 'none')};
`;
const ThirdInnerContainer = styled.div`
  display: ${(props) => (props.visible ? 'block' : 'none')};
`;
