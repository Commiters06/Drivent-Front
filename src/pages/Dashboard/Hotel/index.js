import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import HotelConfirmation from '../../../components/Hotel/HotelConfirmation';
import HotelDisplay from '../../../components/Hotel/HotelsDisplay';
import BookingContext from '../../../contexts/BookingContext';
import TicketContext from '../../../contexts/TicketContext';
import UserContext from '../../../contexts/UserContext';
import { getMyBooking } from '../../../services/booking';

export default function Hotel() {
  const { ticketData } = useContext(TicketContext);
  const { userData } = useContext(UserContext);
  const { bookingData, setBooking } = useContext(BookingContext);

  useEffect(async() => {
    try{
      const myBooking = await getMyBooking(userData.token);
      setBooking(myBooking);
    }catch(err) { 
      setBooking(null);
    }
  }, []);

  if(ticketData === null || ticketData?.status !== 'PAID') {
    return (
      <PageContainer>
        <MainTitle>
          <h1>Escolha de hotel e quarto</h1>
        </MainTitle>

        <AlertCase>
          <h5>
            Você precisa ter confirmado pagamento antes
          </h5>
          <h5>
            de fazer a escolha de hospedagem
          </h5>
        </AlertCase>
    
      </PageContainer>
    );
  }
  else if(!ticketData?.TicketType.includesHotel) {
    return (
      <PageContainer>
        <MainTitle>
          <h1>Escolha de hotel e quarto</h1>
        </MainTitle>

        <AlertCase>
          <h5>
            Sua modalidade de ingresso não inclui hospedagem
          </h5>
          <h5>
            Prossiga para a escolha de atividades
          </h5>
        </AlertCase>
    
      </PageContainer>
    );
  }
  else{
    return (  
      <PageContainer>
        <MainTitle>
          <h1>Escolha de hotel e quarto</h1>
        </MainTitle>
        {bookingData === null?
          <HotelDisplay/>
          : <HotelConfirmation/>}
        
      </PageContainer>
    );
  }  
}

const PageContainer = styled.div`
  background-color: white;
  width: 100%;
  height: 80%;
`;

const AlertCase = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h5{
    font-family: 'Roboto';
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: center;
    color: #8E8E8E;
  }
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
