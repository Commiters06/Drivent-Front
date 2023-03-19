import dayjs from 'dayjs';
import { useState } from 'react';
import styled from 'styled-components';

export default function DateDisplay({ daysRender, chooseDate, chosenDate }) {
  const [selectedDay, setSelectedDay] = useState(-1);

  if(daysRender !== null || daysRender!== undefined) {
    return(
      <DateDisplayStyle>
        {chosenDate === null?
          <h5>
            Primeiro, filtre pelo dia do evento: 
          </h5>
          : null}
        
        {daysRender?.map((d, index) => <DayIcon day={d} chooseDate={chooseDate} daysInfo={{ selectedDay, setSelectedDay }}key={index} id={index}/>)}
      </DateDisplayStyle>
    );
  }
}

function DayIcon({ day, chooseDate, daysInfo, id }) {
  const { selectedDay, setSelectedDay } = daysInfo;

  function defineDay() {
    const numberDay = dayjs(day).day();
    
    switch(numberDay) {
    case 0: return 'Domingo';
    case 1: return 'Segunda';
    case 2: return 'Terça';
    case 3: return 'Quarta';
    case 4: return 'Quinta';
    case 5: return 'Sexta';
    case 6: return 'Sábado';
    };

    return numberDay;
  };

  return(
    <DayBox onClick={(selectedDay!== id) ? () => { chooseDate(day); setSelectedDay(id); }: () => { chooseDate(null); setSelectedDay(-1); }}
      selected={selectedDay === id}>
      <h2>
        {defineDay()}, {dayjs(day).format('DD/MM')}
      </h2>
    </DayBox>
  );
}

const DateDisplayStyle = styled.div`
    margin-bottom: 70px;

    h5{
        margin-bottom: 15px;
    }

`;

const DayBox = styled.button`
    border: none;
    padding: 10px 0px;
    width: 131px;
    border-radius: 5px;
    margin: 10px 17px;
    cursor: pointer;
    background-color: ${props => props.selected? '#FFD37D' : '#E0E0E0'};

    h2{
        font-family: 'Roboto';
        font-size: 14px;
        font-weight: 400;
        text-align: center;
    }
`;
