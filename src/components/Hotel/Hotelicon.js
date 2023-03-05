import axios from 'axios';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';
import { getHotelRooms } from '../../services/hotelsApi';

export default function Hotelicon({ hotelInfo,  isSelected, selectOther }) {
  const [rooms, setRooms] = useState();
  const [spaces, setSpaces] = useState(0);

  const [single, setSingle] = useState(false);
  const [double, setDouble] = useState(false);
  const [triple, setTriple] = useState(false);

  const { userData } = useContext(UserContext);

  useEffect(async() => {
    let token = userData.token;

    try {
      const hotels = await getHotelRooms(token, hotelInfo.id);
      setRooms(hotels.Rooms);
      determineOccupations(hotels.Rooms);
      detemineAccomodationTypes(hotels.Rooms);
    }catch(err) {}
  }, []);

  function determineOccupations(rooms) {
    let spaces = 0;
    rooms.forEach((e) => {
      spaces += e.capacity - e.Booking.length;
    });
    setSpaces(spaces);
  }

  function detemineAccomodationTypes(rooms) {
    if(rooms.filter((r) => r.capacity === 1).length > 0) {
      setSingle(1);
    };
    if(rooms.filter((r) => r.capacity === 2).length > 0) {
      setDouble(1);
    };
    if(rooms.filter((r) => r.capacity === 3).length > 0) {
      setTriple(1);
    };
  }
  return(
    <HotelBox onClick={!(isSelected == hotelInfo.id)? () => selectOther(hotelInfo.id): () => selectOther(0)} selected={isSelected == hotelInfo.id}>
      <img src={hotelInfo.image}/>
      <h3>{hotelInfo.name}</h3>
      <h4>Tipos de acomodação:</h4>
      <p>
        {single? 'Single': null} 
        {single+double+ triple === 3? ', ': (single+double+ triple === 2 && !triple) ? ' e ': null}  
        {double? 'Double': null} 
        {single+double+ triple === 3 || (single+double+ triple === 2 && triple) ? ' e ': null} 
        {triple? 'Triple': null}
      </p>
      <h4>Vagas disponíveis:</h4>
      <p>{spaces}</p>
    </HotelBox>
  );
}

const HotelBox = styled.button`
  height: 264px;
  width: 196px;
  border-radius: 10px;
  padding: 16px 14px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0px 10px;
  cursor: pointer;

  background-color: ${props => props.selected ? '#FFEED2' : ' #EBEBEB'};

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
