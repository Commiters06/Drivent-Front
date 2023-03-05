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
      console.log(res.data);
    });
    promise.catch((err) => {
      console.log(err);
    });
  }, []);

  return(
    <HotelBox onClick={!(isSelected == hotelInfo.id)? () => selectOther(hotelInfo.id): () => selectOther(0)} selected={isSelected == hotelInfo.id}>
      <img src={hotelInfo.image}/>
      <h3>{hotelInfo.name}</h3>
      <h4>Tipos de acomodação:</h4>

      <h4>Vagas disponíveis:</h4>

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
    margin: 10px 0px;
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
  }

  img{
    width: 100%;
    border-radius: 5px;
  }
  
`;
