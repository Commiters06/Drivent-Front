import styled from 'styled-components';

export default function LocalColumn({ localInfo, activities }) {
  return (
    <LocalBox>
      <h1>{localInfo.name}</h1>
      <div>

      </div>
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
    div{
        border: 1px solid #D7D7D7;
        height: 392px;
        padding: 10px 0px;
        overflow-y: scroll;
    }

`;
