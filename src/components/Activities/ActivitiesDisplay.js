import { setDate } from 'date-fns';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';
import { getActivities, joinActivity } from '../../services/activities';
import { getLocals } from '../../services/locals';
import LocalColumn from './Local';

export default function ActivitiesDisplay({ date }) {
  const [activities, setActivities] = useState(null);
  const [activitySelected, setActivitySelected] = useState(-1);
  const [locals, setLocals] = useState(null);
  const [render, setRender] = useState(false);

  const { userData } = useContext(UserContext);

  useEffect(async() => {
    try {
      const localsReceived = await getLocals(userData.token);
      setLocals(localsReceived);

      if(date !== undefined && date !== null) {
        const activitiesReceived = await getActivities(userData.token, dayjs(date));
        setActivities(activitiesReceived);
      }else{
        setActivities(null);
        setActivitySelected(-1);
      }
    }catch(err) {setActivities(null); setActivitySelected(-1);}
  }, [date, render]);

  async function participateInActivity() {
    try{
      await joinActivity(userData.token, activitySelected);
      toast('Inscrição feita com sucesso');
      setRender(!render);
    }catch(err) {
      if(err?.response?.status === 409) {
        toast(err.response.data.message);
      }
    }
  }

  if(activities !== null && Object.keys(activities).length === 0) {
    return(
      <ActivitiesContainer>
        <h5>O dia selecionado não tem atividades</h5>
      </ActivitiesContainer>
    );
  };

  return(
    <ActivityDisplayStyle>
      <ActivitiesBox>
        {locals !== null && activities !== null?
          locals.map((l) =>  <LocalColumn localInfo={l} activities={activities[l.id]} activitySelected={activitySelected} changeActivity={setActivitySelected}/>)
          : null}
      </ActivitiesBox>
      {activitySelected !== -1?
        <ConfirmTicketButton onClick={async() => await participateInActivity()}> 
          <h1>RESERVAR VAGA</h1>
        </ConfirmTicketButton>
        :null}
    </ActivityDisplayStyle>
  );
}

const ActivityDisplayStyle = styled.div`
  margin-bottom: 110px;
`;

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

const ActivitiesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  h5 {
    font-family: 'Roboto';
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: #8E8E8E;
  }
`;
