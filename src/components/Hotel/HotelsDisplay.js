import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';
import { getHotels } from '../../services/hotelsApi';
import Hotelicon from './Hotelicon';
import RoomIcon from './Roomicon';

export default function HotelDisplay() {
  const [hotels, setHotels] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [hotelSelected, setHotelSelected] = useState(0);

  const { userData } = useContext(UserContext);

  useEffect(async() => {
    let token = userData.token;

    try {
      const hotels = await getHotels(token);
      setHotels(hotels);
    } catch (err) { }
  }, []);

  return (
    <>
      <SecondaryTitle>
        <h2>Primeiro, escolha seu hotel</h2>
      </SecondaryTitle>

      <FlexDivsOverflow>
        {hotels ?
          hotels.map((h) => <Hotelicon hotelInfo={h} isSelected={hotelSelected} selectOther={setHotelSelected} showRooms={setRooms} />)
          : null}
      </FlexDivsOverflow>

      {rooms ?
        <>
          <SecondaryTitle>
            <h2>Ótima pedida! Agora escolha seu quarto:</h2>
          </SecondaryTitle>
          <FlexDivs>
            {rooms.map((r) => <RoomIcon roomInfo={r} showRooms={setRooms} />)}
          </FlexDivs>
        </>
        : null}

    </>
  );
}

const FlexDivsOverflow = styled.div`
  display: flex;
  margin-bottom: 50px;
  overflow-x: scroll;
`;

const FlexDivs = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  justify-content: flex-start;
  margin-bottom: 50px;
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
