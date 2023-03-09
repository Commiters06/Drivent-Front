import styled from 'styled-components';
import { BsPersonFill } from 'react-icons/bs';
import { BsPerson } from 'react-icons/bs';
import { useEffect, useState } from 'react';

export default function RoomIcon({ roomInfo }) {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    const spacesRegistration = [];

    for(let i = 1; i <= roomInfo.capacity; i ++) {
      const newObject = {
        spaceId: i,
        bookingId: roomInfo.Booking[i - 1]?.id
      };
      spacesRegistration.push(newObject);
    };

    setSpaces([...spacesRegistration]);
  }, [roomInfo]);

  return(
    <RoomBox>
      <h3>{ roomInfo.name }</h3>
      <section>
        {spaces?
          spaces.map((e) =>  <SpaceIcon spaceInfo={e}/>)
          : null}
      </section>
      
    </RoomBox>
  );
}

function SpaceIcon({ spaceInfo }) {
  console.log(spaceInfo);

  return(
    <ReservRoomButton disabled ={spaceInfo.bookingId}>
      {spaceInfo.bookingId ? 
        <BsPersonFill/>
        :<BsPerson/>
      }

    </ReservRoomButton>

  );
}

const RoomBox = styled.div`
    border-radius: 10px;
    padding: 11px;
    margin: 4px 8px;
    width: 180px;
    height: 45px;
    border: 1px solid #CECECE;

    display: flex;
    justify-content: space-between;
    align-items: center;

    section{
        display: flex;
        align-items: center;
    }
`;

const ReservRoomButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0px;

    color: #000000;
    font-size: 22px;
    
    display: flex;
    align-items: center;

`;
