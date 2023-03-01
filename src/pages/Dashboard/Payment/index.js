import styled from 'styled-components';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../contexts/UserContext';
import TicketTypeBox from '../../../components/Payment/TicketType';
import { set } from 'date-fns';

export default function Payment() {
  const [tickets, setTickets] = useState([]);
  const [baseValue, setBaseValue] = useState (0);
  const [aditionalValue, setAdiotionalValue] = useState (0);

  const [isRemote, setIsRemote] = useState(false);
  const [includesHotel, setIncludesHotel] = useState(false);

  const [presentialSelected, setPresentialSelected] = useState(false);
  const [remoteSelected, setRemoteSelected] = useState(false);
  const [hotelSelected, setHotelSelected] = useState(false);
  const [noHotelSelected, setNoHotelSelected] = useState(false);

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

  return (
    <PageContainer>
      <MainTitle>
        <h1>Ingresso e pagamento</h1>
      </MainTitle>
      <SecondaryTitle>
        <h2>Primeiro, escolha sua modalidade de ingresso</h2>
      </SecondaryTitle>
      <TicketsContainer>

        <TicketTypeBox selected={presentialSelected} selectedFunction={setPresentialSelected} exchangeSelected={setRemoteSelected} 
          type={'Presencial'} price={250} key={1} 
          aditional={false} finalPriceChange={setBaseValue} parentalDependency={true}/>

        <TicketTypeBox selected={remoteSelected} selectedFunction={setRemoteSelected} exchangeSelected={setPresentialSelected} 
          type={'Online'} price={100} key={2} 
          aditional={false} finalPriceChange={setBaseValue} parentalDependency={true}/>

      </TicketsContainer>
      <SecondInnerContainer visible={presentialSelected}>
        <SecondaryTitle>
          <h2>Ótimo! Agora escolha sua modalidade de hospedagem</h2>
        </SecondaryTitle>
        <TicketsContainer>

          <TicketTypeBox selected={hotelSelected} selectedFunction={setHotelSelected} exchangeSelected={setNoHotelSelected} 
            type={'Sem Hotel'} price={0} key={3} 
            aditional={true} finalPriceChange={setAdiotionalValue} parentalDependency={presentialSelected}/>
          
          <TicketTypeBox selected={noHotelSelected} selectedFunction={setNoHotelSelected} exchangeSelected={setHotelSelected} 
            type={'Com Hotel'} price={350} key={4} 
            aditional={true}  finalPriceChange={setAdiotionalValue} parentalDependency={presentialSelected}/>

        </TicketsContainer>
      </SecondInnerContainer>
      <ThirdInnerContainer visible={remoteSelected || hotelSelected || noHotelSelected}>
        <SecondaryTitle>
          <h2>
            Fechado! O total ficou em <strong>R$ {baseValue + aditionalValue}</strong>. Agora é só confirmar:
          </h2>
        </SecondaryTitle>
        <ConfirmTicketButton>
          <h1>RESERVAR INGRESSO</h1>
        </ConfirmTicketButton>
      </ThirdInnerContainer>
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
