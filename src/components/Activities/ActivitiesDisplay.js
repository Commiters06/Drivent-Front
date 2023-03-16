import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';
import { getActivities } from '../../services/activities';
import { getLocals } from '../../services/locals';
import LocalColumn from './Local';

export default function ActivitiesDisplay({ date }) {
  const [activities, setActivities] = useState(null);
  const [locals, setLocals] = useState(null);

  const { userData } = useContext(UserContext);

  useEffect(async() => {
    try {
      const localsReceived = await getLocals(userData.token);
      console.log(localsReceived);
      setLocals(localsReceived);

      if(date !== undefined) {
        const activitiesReceived = await getActivities(userData.token, dayjs(date));
        setActivities(activitiesReceived);
      }
    }catch(err) { }
  }, []);

  return(
    <ActivitiesBox>
      {locals !== null ?
        locals.map((l) =>  <LocalColumn localInfo={l} activities={activities}/>)
        : null}
    </ActivitiesBox>
  );
}

const ActivitiesBox = styled.div`
  display: flex;
  overflow-x: scroll;

`;
