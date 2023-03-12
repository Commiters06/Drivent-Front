import { useContext } from 'react';
import styled from 'styled-components';
import TicketContext from '../../../contexts/Ticket';

export default function Activities() {
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
  } else if(ticketData?.TicketType.isRemote) {
    return (
      <Container>
        <MainTitle>
          <h1>Escolha de atividades</h1>
        </MainTitle>

        <ActivitiesContainer>
          <h5>Sua modalidade de ingresso não necessita escolher</h5>
          <h5>atividades. Você terá acesso a todas as atividades.</h5>
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
          <h5>
            Escolha das atividades em breve!
          </h5>
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
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
