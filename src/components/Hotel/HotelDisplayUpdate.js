import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import BookingContext from '../../contexts/BookingContext';
import UserContext from '../../contexts/UserContext';
import { getMyBooking, updateBooking } from '../../services/booking';
import { getHotelRooms, getHotels } from '../../services/hotelsApi';
import Hotelicon from './Hotelicon';
import RoomIcon from './Roomicon';

export default function HotelDisplayUpdate({ changeBack }) {
  const [hotels, setHotels] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [hotelSelected, setHotelSelected] = useState(-1);
  const [roomSelected, setRoomSelected] = useState(-1);

  const { userData } = useContext(UserContext);
  const { bookingData, setBooking } = useContext(BookingContext);

  useEffect(async() => {
    let token = userData.token;

    try {
      const hotels = await getHotels(token);
      const rooms = await getHotelRooms(token, bookingData.Room.Hotel.id);
      setHotels(hotels);
      setRooms(rooms.Rooms);
    } catch (err) { }

    setHotelSelected(bookingData.Room.Hotel.id);
    setRoomSelected(bookingData.Room.id);
  }, []);

  async function reservRoom() {
    try{
      await updateBooking(userData.token, bookingData.id, roomSelected);
      const myBooking = await getMyBooking(userData.token);
      setBooking(myBooking);
      changeBack(false);
    }catch(err) { }
  };

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
            {rooms.map((r) => <RoomIcon roomInfo={r} chooseRoom={setRoomSelected} roomSelected={roomSelected} />)}
          </FlexDivs>
        </>
        : null}

      {roomSelected !== 0?
        <ConfirmRoomButton onClick={() => reservRoom()}>
          <h1>
            CONFIRMAR TROCA
          </h1>
        </ConfirmRoomButton>
        :null}

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

const ConfirmRoomButton = styled.button`
  height: 37px;
  width: 162px;
  border-radius: 4px;
  background-color: #e0e0e0;
  border: none;
  box-shadow: 0px 2px 10px 0px #00000040;
  cursor: pointer;
  margin-bottom: 128px;

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
