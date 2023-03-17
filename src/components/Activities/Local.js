import styled from 'styled-components';
import Activity from './Activity';

export default function LocalColumn({ localInfo, activities }) {
  return (
    <LocalBox>
      <h1>{localInfo.name}</h1>
      <section>
        {activities!== undefined?
          activities.map((a) => <Activity info={a}/>)
          : null}

      </section>
    </LocalBox>
  );
}

const LocalBox = styled.div`
    width: 288px;
    min-width: 288px;
    
    h1{
        font-family: 'Roboto';
        font-size: 17px;
        font-weight: 400;
        text-align: center;
        color: #7B7B7B; 
        margin-bottom: 7px;
    }
    section{
        border-left: 1px solid #D7D7D7;
        border-top: 1px solid #D7D7D7;
        border-bottom: 1px solid #D7D7D7;
        height: 392px;
        padding: 10px 9px;
        overflow-y: scroll;
    }

    :last-child{
        section{
            border-right:1px solid #D7D7D7;
        }        
    }
`;
