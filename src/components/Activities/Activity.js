import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GiCancel } from 'react-icons/gi';
import { BsCheckCircle } from 'react-icons/bs';
import { MdExitToApp } from 'react-icons/md';

export default function Activity({ info, activitySelected, changeActivity }) {
  const [selected, setSelect] = useState(false);
  const [size, setSize] = useState();
  const [color, setColor] = useState();

  console.log(info);
  
  useEffect(() => {
    const begin = dayjs(info.hourStart).hour();
    const end = dayjs(info.hourEnd).hour();
    setSize(`${(end-begin)*80+(end-begin-1)*10}px`);
  }, []);

  return(
    <ActivityBox selected={info.iBooked}  disabled={info.iBooked} size={size} color={(info.limit)? '#078632': '#CC6666'} choosing={activitySelected === info.id} 
      onClick={(activitySelected === info.id)?() => changeActivity(-1):() => changeActivity(info.id)}>
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

const ActivityBox = styled.button`
    padding: 12px 10px;
    background-color: ${props => props.selected? '#D0FFDB': props => props.choosing? '#FFEED2': '#F1F1F1'};
    border-radius: 5px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;

    height: ${props => props.size};

    &:hover {
        background-color: ${props => props.selected? '#D0FFDB': props => props.choosing? '#FFEED2': '#CCCCCC'};
    }

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
            width:75%;
            align-self: flex-start;
        }

        :last-child{
            width: 25%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            font-size: 22px;
            height: 100%;
            color: ${props => props.color};
            border-left: ${props => props.selected? '1px solid #99E8A1':'1px solid #CFCFCF'};

            p{
                font-family: 'Roboto';
                font-size: 10px;
                font-weight: 400;
                text-align: left;
                margin-top: 5px;
            }
        }

    }
`;

