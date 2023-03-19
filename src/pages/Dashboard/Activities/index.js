import { setDay } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import ActivitiesDisplay from '../../../components/Activities/ActivitiesDisplay';
import DateDisplay from '../../../components/Activities/DateDisplay';
import TicketContext from '../../../contexts/TicketContext';
import { getEventDays } from '../../../services/eventApi';

export default function Activities() {
  const [days, setDays] = useState(null);
  const [chosenDate, setChosenDate] = useState(null);
  const { ticketData } = useContext(TicketContext);

  useEffect(async() => {
    try{
      const daysReceived = await getEventDays();
      setDays(daysReceived);
    }catch(err) { }
  }, [chosenDate]);

  if (ticketData === null || ticketData?.status !== 'PAID') {
    return (
      <Container>
        <MainTitle>
          <h1>Escolha de atividades</h1>
        </MainTitle>

        <ActivitiesContainer>
          <h5>Você precisa ter confirmado pagamento antes</h5>
          <h5>de fazer a escolha de atividades</h5>
        </ActivitiesContainer>
      </Container>
    );
  } else if(ticketData.isRemote) {
    return (
      <Container>
        <MainTitle>
          <h1>Escolha de atividades</h1>
        </MainTitle>

        <ActivitiesContainer>
          <h5>Sua modalidade de ingresso não necessita escolher atividade.</h5>
          <h5>Você terá acesso a todas as atividades.</h5>
        </ActivitiesContainer>
      </Container>
    );
  } else {
    return (
      <Container>
        <MainTitle>
          <h1>Escolha de atividades</h1>
        </MainTitle>

        <ActivitiesContainer>
          <DateDisplay daysRender={days} chooseDate={setChosenDate} chosenDate={chosenDate}/>

          <ActivitiesDisplay date={chosenDate}/>
        </ActivitiesContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  height: 80%;
  width: 100%;
`;

const MainTitle = styled.div`
  font-family: 'Roboto';
  font-size: 34px;
  font-weight: 400;
  line-height: 40px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 37px;
`;

const ActivitiesContainer = styled.div`
  h5 {
    font-family: 'Roboto';
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: #8E8E8E;
  }
`;
