import styled from 'styled-components';
import HotelDisplay from '../../../components/Hotel/HotelsDisplay';

export default function Hotel() {
  return (
    <PageContainer>
      <MainTitle>
        <h1>Escolha de hotel e quarto</h1>
      </MainTitle>

      <HotelDisplay/>
  
    </PageContainer>
  );
}

const PageContainer = styled.div`
  background-color: white;
`;

const MainTitle = styled.div`
  h1 {
    font-family: 'Roboto';
    font-size: 34px;
    font-weight: 400;
    line-height: 40px;
    letter-spacing: 0em;
    text-align: left;
    color: #000000;
  }
  margin-bottom: 37px;
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

const SecondInnerContainer = styled.div`
  display: ${(props) => (props.visible ? 'block' : 'none')};
`;
const ThirdInnerContainer = styled.div`
  display: ${(props) => (props.visible ? 'block' : 'none')};
`;

