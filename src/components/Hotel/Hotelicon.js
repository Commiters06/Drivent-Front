import axios from 'axios';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';

export default function Hotelicon({ hotelInfo,  isSelected, selectOther }) {
  const [rooms, setRooms] = useState();

  const { userData } = useContext(UserContext);

  useEffect(() => {
    let URL = process.env.REACT_APP_API_BASE_URL;
    let token = userData.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let promise = axios.get(`${URL}/hotels/${hotelInfo.id}`, config);
    promise.then((res) => {
      setRooms(res.data);
    });
    promise.catch((err) => {
      console.log(err);
    });
  }, []);

  return(
    <HotelBox onClick={(!isSelected)? () => selectOther(hotelInfo.id): () => selectOther(0)} className={ isSelected == hotelInfo.id ? 'on' : 'off'}>
      <img src={hotelInfo.image}/>
      <h3>{hotelInfo.name}</h3>

    </HotelBox>
  );
}

const HotelBox = styled.button`
  height: 264px;
  width: 196px;
  border-radius: 10px;
  padding: 16px 14px;
  border: none;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0px 10px;
  cursor: pointer;


  h3 {
    font-family: 'Roboto';
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: center;
    color: #454545;
  }
  h4 {
    font-family: 'Roboto';
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: center;
    color: #898989;
  }

  img{
    width: 100%;
    border-radius: 5px;
  }
  
`;
