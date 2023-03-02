import styled from 'styled-components';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../contexts/UserContext';
import { getTicket } from '../../../services/ticketApi';

export default function Payment() {
  // eslint-disable-next-line no-unused-vars
  const [tickets, setTickets] = useState([]);
  // const [value, setValue] = useState();

  // const [isRemote, setIsRemote] = useState(false);
  // const [includesHotel, setIncludesHotel] = useState(false);

  const [presentialSelected, setPresentialSelected] = useState(false);
  const [remoteSelected, setRemoteSelected] = useState(false);
  const [hotelSelected, setHotelSelected] = useState(false);
  const [noHotelSelected, setNoHotelSelected] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [paymentComplete, setPaymentComplete] = useState(false);
  // eslint-disable-next-line no-unused-vars
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
    let promise = axios.get(`${URL}/tickets/types`, config);
    promise.then((res) => {
      const newArr = res.data;
      setTickets(newArr);
      // eslint-disable-next-line no-console
      console.log(newArr, 'se res');
    });
    promise.catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      // eslint-disable-next-line no-console
      console.log(config);
    });
  }, []);

  function summaryText() {
    if(presentialSelected && noHotelSelected) return 'Presencial + Com Hotel';
    
    if(presentialSelected && hotelSelected) return 'Presencial sem hotel';

    if(remoteSelected) return 'Online';
  }

  async function reservTicket() {
    setPaymentComplete(true);
    let data = await getTicket(userData.token);
    setTicket(data);
  }

  return (
    <PageContainer>
      <MainTitle>
        <h1>Ingresso e pagamento</h1>
      </MainTitle>
      {!paymentComplete ? (
        <div>
          <SecondaryTitle>
            <h2>Primeiro, escolha sua modalidade de ingresso</h2>
          </SecondaryTitle>
          <TicketsContainer>
            <TicketBox
              onClick={() => {
                setPresentialSelected(!presentialSelected);
                setRemoteSelected(false);
              }}
              selected={presentialSelected}
            >
              <h3>Presencial</h3>
              <h4>R$ 250</h4>
              {/* {tickets.map((ticket) => (
                  <div key={ticket.id}>
                    {ticket.name}, {ticket.price}
                  </div>
                ))} */}
            </TicketBox>
            <TicketBox
              onClick={() => {
                setRemoteSelected(!remoteSelected);
                setPresentialSelected(false);
              }}
              selected={remoteSelected}
            >
              <h3>Online</h3>
              <h4>R$ 100</h4>
            </TicketBox>
          </TicketsContainer>
          <SecondInnerContainer visible={presentialSelected}>
            <SecondaryTitle>
              <h2>Ótimo! Agora escolha sua modalidade de hospedagem</h2>
            </SecondaryTitle>
            <TicketsContainer>
              <TicketBox
                onClick={() => {
                  setHotelSelected(!hotelSelected);
                  setNoHotelSelected(false);
                }}
                selected={hotelSelected}
              >
                <h3>Sem Hotel</h3>
                <h4>+ R$ 0</h4>
                {/* {tickets} */}
              </TicketBox>
              <TicketBox
                onClick={() => {
                  setNoHotelSelected(!noHotelSelected);
                  setHotelSelected(false);
                }}
                selected={noHotelSelected}
              >
                <h3>Com Hotel</h3>
                <h4>+ R$ 350</h4>
              </TicketBox>
            </TicketsContainer>
          </SecondInnerContainer>
          <ThirdInnerContainer visible={remoteSelected || hotelSelected || noHotelSelected}>
            <SecondaryTitle>
              <h2>
                Fechado! O total ficou em <strong>R$ 600</strong>. Agora é só confirmar:
              </h2>
            </SecondaryTitle>
            <ConfirmTicketButton onClick={reservTicket}>
              <h1>RESERVAR INGRESSO</h1>
            </ConfirmTicketButton>
          </ThirdInnerContainer>
        </div>
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

  background-color: ${(props) => (props.selected ? '#FFEED2' : '#FFFFFF')};

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

const ConfirmTicketButton = styled.button`
  height: 37px;
  width: 162px;
  border-radius: 4px;
  background-color: #e0e0e0;
  border: none;
  box-shadow: 0px 2px 10px 0px #00000040;

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
