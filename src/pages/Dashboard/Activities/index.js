import { useContext, useState } from 'react';
import styled from 'styled-components';
import ActivitiesDisplay from '../../../components/Activities/ActivitiesDisplay';
import TicketContext from '../../../contexts/TicketContext';

export default function Activities() {
  const [date, setDate] = useState('2023-03-08');
  const { ticketData } = useContext(TicketContext);

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

          <ActivitiesDisplay date={date}/>
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
    text-align: center;
    color: #8E8E8E;
  }
`;
