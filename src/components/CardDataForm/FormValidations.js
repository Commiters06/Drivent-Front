import cardValidator from 'card-validator';

const validations = {
  name: {
    custom: {
      isValid: (value) => isValidString(value),
      message: 'Digite um nome válido',
    },
  },

  number: {
    custom: {
      isValid: (value) => isNumberValid(value),
      message: 'Número de cartão inválido'
    }
  },

  expiry: {
    custom: {
      isValid: (value) => isExpiryValid(value),
      message: 'Data inválida'
    }
  },

  cvc: {
    custom: {
      isValid: (value) => isCvcValid(value),
      message: 'cvc inválido'
    }
  }

};

export default validations;

function isValidString(value) {
  return value || value?.trim();
}

function isNumberValid(value) {
  const result = cardValidator.number(value);
  if(result.isValid) {
    return value;
  }
}

function isExpiryValid(value) {
  const result = cardValidator.expirationDate(value);
  if(result.isValid) {
    return value;
  }
}

function isCvcValid(value) {
  const result = cardValidator.cvv(value);
  if(result.isValid) {
    return value;
  }
}
