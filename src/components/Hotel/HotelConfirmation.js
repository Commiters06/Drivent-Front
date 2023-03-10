import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import BookingContext from '../../contexts/BookingContext';
import UserContext from '../../contexts/UserContext';
import { getRoomBookings } from '../../services/booking';
import Hotelicon from './Hotelicon';
import HoteliconConfimation from './HoteliconConfirmation';

export default function HotelConfirmation() {
  const { bookingData } = useContext(BookingContext);
  const { userData } = useContext(UserContext);

  const [bookings, setBookings] = useState(0);

  useEffect(async() => {
    try{
      const bookings = await getRoomBookings(userData.token, bookingData.Room.id);
      setBookings(bookings);
    }catch(err) { }
  }, []);

  return (
    <>
      <SecondaryTitle>
        <h2>Você já escolheu seu quarto:</h2>
      </SecondaryTitle>

      <HoteliconConfimation hotelInfo={bookingData.Room.Hotel} roomInfo={bookingData.Room} usersInRoom={bookings}/>

      <ConfirmRoomButton >
        <h1>
          TROCAR QUARTO
        </h1>
      </ConfirmRoomButton>
    </>
  );
}

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
  margin-top: 30px;
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
