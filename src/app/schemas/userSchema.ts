import * as Yup from 'yup';

const userSchema = Yup.object().shape({
  document: Yup.string()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido')
    .required('CPF é obrigatório'),
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string()
    .email('Email inválido')
    .required('Email é obrigatório'),
  phone: Yup.string()
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone inválido')
    .required('Telefone é obrigatório'),
  area: Yup.string().required('Especialização é obrigatória'),
  organization: Yup.string().required('Casa é obrigatória'),
});

export default userSchema