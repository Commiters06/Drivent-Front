import styled from 'styled-components';

export default function HoteliconConfimation({ hotelInfo,  roomInfo, usersInRoom }) {
  return(
    <HotelBox>
      <img src={hotelInfo.image} alt='Hotel'/>
      <h3>{hotelInfo.name}</h3>
      <h4>Quarto Reservado</h4>
      <p>
        {roomInfo.capacity === 1? `${roomInfo.name} (Single)`: null} 
        {roomInfo.capacity === 2? `${roomInfo.name} (Double)`: null} 
        {roomInfo.capacity === 3? `${roomInfo.name} (Triple)`: null} 
      </p>
      <h4>Pessoas no seu quarto</h4>
      <p>
        {usersInRoom.length === 1? 'Somente você': null} 
        {usersInRoom.length === 2? 'Você e mais 1': null} 
        {usersInRoom.length === 3? 'Você e mais 2': null} 
      </p>
    </HotelBox>
  );
}
  
const HotelBox = styled.button`
    height: 264px;
    width: 196px;
    min-width: 196px;
    border-radius: 10px;
    padding: 16px 14px;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0px 10px;
  
    background-color: #FFEED2;
  
    h3 {
      font-family: 'Roboto';
      font-size: 20px;
      font-weight: 400;
      color: #343434;
      margin: 9px 0px;
    }
    h4 {
      font-family: 'Roboto';
      font-size: 12px;
      font-weight: 700;
      color: #3C3C3C;
      margin: 3px 0px;
    }
    p{
      font-family: 'Roboto';
      font-size: 12px;
      font-weight: 400;
      color: #3C3C3C;
      margin-bottom: 14px;
    }
  
    img{
      width: 100%;
      aspect-ratio: 17/11;
      border-radius: 5px;
    }
    
`;
