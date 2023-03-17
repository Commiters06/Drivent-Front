import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GiCancel } from 'react-icons/gi';
import { BsCheckCircle } from 'react-icons/bs';
import { MdExitToApp } from 'react-icons/md';

export default function Activity({ info }) {
  const [select, setSelect] = useState();
  const [size, setSize] = useState();
  const [color, setColor] = useState();
  
  useEffect(() => {
    const begin = dayjs(info.hourStart).hour();
    const end = dayjs(info.hourEnd).hour();
    setSize(`${(end-begin)*80+(end-begin-1)*10}px`);

    if(info.limit === 0) {
      setColor('#CC6666');
    }else{
      setColor('#078632');
    }
  }, []);

  return(
    <ActivityBox selected={select} size={size} color={color}>
      <div>
        <h2>{info.description}</h2>
        <h3>{dayjs(info.hourStart).format('HH:mm')} - {dayjs(info.hourEnd).format('HH:mm')}</h3>
      </div>
      <div>
        {info.ibooked?
          <>
            <BsCheckCircle/>
            <p>inscrito</p>
          </>
          :info.limit === 0?
            <>
              <GiCancel/>
              <p>Esgotado</p>
            </>
            :
            <>
              <MdExitToApp/>
              <p>{info.limit} vagas</p>
            </>
        }
      </div>
      
    </ActivityBox>
  );
}

const ActivityBox = styled.div`
    padding: 12px 10px;
    background-color: ${props => props.selected? '#D0FFDB': '#F1F1F1'};
    border-radius: 5px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;

    height: ${props => props.size};

    h2{
        font-family: 'Roboto';
        font-size: 12px;
        font-weight: 700;
        text-align: left;
        color:  #343434;
        margin-bottom: 6px;
    }

    h3{
        font-family: 'Roboto';
        font-size: 12px;
        font-weight: 400;
        text-align: left;
        color: #343434;

    }

    div{
        :first-child{
            width: 80%;
            align-self: flex-start;
        }

        :last-child{
            width: 20%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            font-size: 20px;
            color: ${props => props.color};

            p{
                font-family: 'Roboto';
                font-size: 9px;
                font-weight: 400;
                text-align: left;
                margin-top: 5px;
            }
        }

    }
`;

