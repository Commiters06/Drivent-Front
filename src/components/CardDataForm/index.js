import { useContext, useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import { useForm } from '../../hooks/useForm';
import Input from '../Form/Input';
import Button from '../Form/Button';
import { ErrorMsg } from './ErrorMsg';
import FormValidations from './FormValidations';
import { Box } from '@material-ui/core';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';
import api from '../../services/api';
import cardValidator from 'card-validator';
import UserContext from '../../contexts/UserContext';
import TicketContext from '../../contexts/Ticket';

dayjs.extend(CustomParseFormat);

export default function CardDataForm({ ticketId }) {
  const { ticketData, setTicket } = useContext(TicketContext);

  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });
  const [loading, setLoading] = useState(false);
  const { userData } = useContext(UserContext);
  let token = userData.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { handleSubmit, handleChange, data, errors } = useForm({
    validations: FormValidations,
     
    onSubmit: async(data) => {
      const cardValidation = cardValidator.number(data.number);
      const newData = {
        ticketId,
        cardData: {
          number: data.number,
          expirationDate: dayjs().set('month', data.expiry.substr(0, 2) - 1).set('year', `20${data.expiry.substr(3, 2)}`).format('YYYY-MM-DD'),
          cvv: data.cvc,
          name: data.name,
          issuer: cardValidation.card?.type
        }
      };

      try {
        setLoading(true);
        await api.post('/payments/process', newData, config);
        setLoading(false);
        setTicket({ ...ticketData, status: 'PAID' });
        toast('Informações salvas com sucesso!');
      } catch (err) {
        toast('Não foi possível salvar suas informações!');
      }
    },

    initialValues: {
      number: '',
      expiry: '',
      cvc: '',
      name: '',
    },
  });

  const handleInputFocus = (evt) => {
    setCardData((prev) => ({ ...prev, focus: evt.target.name }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardWrapper>
        <Cards
          name={data?.name || ''}
          expiry={data?.expiry || ''}
          cvc={data?.cvc || ''}
          number={data?.number || ''}
          focused={cardData.focus}
        />
        <Form>
          <Input
            inputProps={{ maxLength: 16 }}
            name="number"
            value={data?.number || ''}
            onChange={handleChange('number')}
            onFocus={handleInputFocus}
            label="Cartão de Crédito"
            variant="outlined"
            error={errors.number}
          />
          {errors.number && <ErrorMsg>{errors.number}</ErrorMsg>}
          <Input
            name="name"
            error={errors.name}
            value={data?.name || ''}
            onChange={handleChange('name')}
            onFocus={handleInputFocus}
            label="Nome"
            variant="outlined"
          />
          {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
          <InputColumn>
            <div style={{ width: '58%' }}>
              <Box onFocus={handleInputFocus} style={{ marginBottom: '15px' }}>
                <Input
                  mask="99/99"
                  value={data?.expiry || ''}
                  onChange={handleChange('expiry')}
                  name="expiry"
                  label="Validade"
                  variant="outlined"
                  error={errors.expiry}
                />
              </Box>
              {errors.expiry && <ErrorMsg>{errors.expiry}</ErrorMsg>}
            </div>
            <div style={{ width: '38%' }}>
              <Box style={{ marginBottom: '15px' }}>
                <Input
                  inputProps={{ maxLength: 3 }}
                  name="cvc"
                  value={data?.cvc || ''}
                  onChange={handleChange('cvc')}
                  onFocus={handleInputFocus}
                  label="CVC"
                  variant="outlined"
                  error={errors.cvc}
                />
              </Box>
              {errors.cvc && <ErrorMsg>{errors.cvc}</ErrorMsg>}
            </div>
          </InputColumn>
        </Form>
      </CardWrapper>
      <SubmitContainer>
        <Button type="submit" disable={loading.toString()}>Finalizar pagamento</Button>
      </SubmitContainer>
    </form>
  );
}

const CardWrapper = styled.div`
  display: flex;
  justify-content: start;
  margin-top: 50px;
  gap: 20px;
  align-items: center;

  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

const SubmitContainer = styled.div`
  margin-top: 40px !important;
  width: 100% !important;

  > button {
    margin-top: 0 !important;
  }
`;

const InputColumn = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Form = styled.div`
  width: 347px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  @media (max-width: 750px) {
    width: 100%;
  }
`;
