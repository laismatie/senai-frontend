import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  document: Yup.string()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido')
    .required('CPF é obrigatório'),
  password: Yup.string()
    .oneOf(['secret123'], 'Senha inválida')
    .required('Senha é obrigatória'),
});

export default loginSchema