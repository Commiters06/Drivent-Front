import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';
import { getActivities } from '../../services/activities';
import { getLocals } from '../../services/locals';
import LocalColumn from './Local';

export default function ActivitiesDisplay({ date }) {
  const [activities, setActivities] = useState(null);
  const [activitySelected, setActivitySelected] = useState(-1);
  const [locals, setLocals] = useState(null);

  const { userData } = useContext(UserContext);

  useEffect(async() => {
    try {
      const localsReceived = await getLocals(userData.token);
      setLocals(localsReceived);

      if(date !== undefined) {
        const activitiesReceived = await getActivities(userData.token, dayjs(date));
        console.log(activitiesReceived);
        setActivities(activitiesReceived);
      }
    }catch(err) { }
  }, []);

  return(
    <>
      <ActivitiesBox>
        {locals !== null && activities !== null?
          locals.map((l) =>  <LocalColumn localInfo={l} activities={activities[l.id]} activitySelected={activitySelected} changeActivity={setActivitySelected}/>)
          : null}
      </ActivitiesBox>
      {activitySelected !== -1?
        <ConfirmTicketButton> 
          <h1>RESERVAR VAGA</h1>
        </ConfirmTicketButton>
        :null}
    </>
  );
}

const ActivitiesBox = styled.div`
  display: flex;
  overflow-x: scroll;
`;

const ConfirmTicketButton = styled.button`
  margin-top: 30px;
  height: 37px;
  width: 162px;
  border-radius: 4px;
  background-color: #e0e0e0;
  border: none;
  box-shadow: 0px 2px 10px 0px #00000040;
  cursor: pointer;

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
