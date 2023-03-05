import axios from 'axios';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';
import Hotel from '../../pages/Dashboard/Hotel';
import Hotelicon from './Hotelicon';

export default function HotelDisplay({}) {
  const [hotels, setHotels] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [hotelSelected, setHotelSelected] = useState(0);

  const { userData } = useContext(UserContext);

  useEffect(() => {
    let URL = process.env.REACT_APP_API_BASE_URL;
    let token = userData.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let promise = axios.get(`${URL}/hotels/`, config);
    promise.then((res) => {
      setHotels(res.data);
      console.log(res.data);
    });
    promise.catch((err) => {
      console.log(err);
    });
  }, []);

  return(
    <HotelPage>
      <SecondaryTitle>
        <h2>Primeiro, escolha seu hotel</h2>
      </SecondaryTitle>

      <div>
        {hotels?
          hotels.map((h) => <Hotelicon hotelInfo={h} isSelected={hotelSelected} selectOther= {setHotelSelected}/>)
          :null}
      </div>

      <div>
        {rooms?
          hotels.map((h) => <Hotelicon hotelInfo={h} showRooms={setRooms}/>)
          :null}
      </div>
    </HotelPage>
  );
}

const HotelPage = styled.div`
    div{
        display: flex;

        .on{
            background-color: '#FFEED2';
        }

        .off{
            background-color: '#FFFFFF';
        }
    }
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
