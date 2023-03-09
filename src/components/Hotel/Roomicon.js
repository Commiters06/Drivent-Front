import styled from 'styled-components';
import { BsPersonFill } from 'react-icons/bs';
import { BsPerson } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { tr } from 'date-fns/locale';

export default function RoomIcon({ roomInfo, chooseRoom, roomSelected }) {
  const [spaces, setSpaces] = useState([]);
  const [full, setFull] = useState(false);
  const [chosenSpace, setChosenSpace] = useState(0);

  useEffect(() => {
    const spacesRegistration = [];

    for(let i = 1; i <= roomInfo.capacity; i ++) {
      const newObject = {
        spaceId: i,
        bookingId: roomInfo.Booking[i - 1]?.id
      };
      spacesRegistration.push(newObject);
    };

    if(roomInfo.capacity === roomInfo.Booking.length) {
      setFull(true);
    }

    setSpaces([...spacesRegistration]);
  }, [roomInfo, roomSelected]);

  return(
    <RoomBox full={full} selected={(roomSelected === roomInfo.id)}>
      <h3>{ roomInfo.name }</h3>
      <section>
        {spaces?
          spaces.map((e) =>  <SpaceIcon spaceInfo={e} full={full} chooseRoom={chooseRoom} roomId={roomInfo.id} available={(roomSelected === roomInfo.id)}
            chosenSpace={chosenSpace} setChosenSpace={setChosenSpace}/>)
          : null}
      </section>
    </RoomBox>
  );
}

function SpaceIcon({ spaceInfo, full, chooseRoom, roomId, available, chosenSpace, setChosenSpace }) {
  console.log(spaceInfo);

  function reservRoom() {
    chooseRoom(roomId);
    setChosenSpace(spaceInfo.spaceId);
  }

  return(
    <ReservRoomButton disabled ={!(spaceInfo.bookingId === undefined)} onClick={() => reservRoom()} full={full} 
      selected={(available && (chosenSpace === spaceInfo.spaceId))}>

      {spaceInfo.bookingId ||(available && (chosenSpace === spaceInfo.spaceId)) ? 
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

    background-color: ${props => props.full ? '#E9E9E9': props.selected? '#FFEED2' :'#FFFFFF' };

    h3{
        font-family: 'Roboto';
        font-size: 20px;
        font-weight: 700;
        color: ${props => props.full ? ' #9D9D9D': '#454545' };
    }

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

    color: ${props => props.full ? ' #8C8C8C': props.selected ? '#FF4791':  '#000000'};
    font-size: 22px;
    
    display: flex;
    align-items: center;

`;
