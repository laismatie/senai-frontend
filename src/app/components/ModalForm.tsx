import React, { FormEvent, useState } from 'react';
import { Modal, Box, Typography, FormControl, InputLabel, Select, MenuItem, TextField, Button, Grid, FormHelperText } from '@mui/material';
import Image from 'next/image';
import InputMask from 'react-input-mask';
import userSchema from '../schemas/userSchema';

interface ModalFormProps {
  open: boolean;
  handleClose: () => void;
}

const ModalForm: React.FC<ModalFormProps> = ({ open, handleClose }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedAreaValue, setSelectedAreaValue] = useState('');
  const [document, setDocument] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [errors, setErrors] = useState<any>({});

  const handleSelectChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setSelectedValue(event.target.value);
  const handleSelectAreaChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setSelectedAreaValue(event.target.value);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      await userSchema.validate({
        document,
        name,
        email,
        phone,
        area: selectedValue,
        organization: selectedAreaValue,
      }, { abortEarly: false }); // abortEarly: false to validation executing before return
      
      const data = {
        document,
        name,
        email,
        phone,
        area: selectedValue,
        organization: selectedAreaValue,
      };

      const response = await fetch(
        'http://localhost:8080/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          alert('Inscrição realizada com sucesso!');
          handleClose();
        } else {
          alert('Erro ao realizar inscrição. Tente novamente.');
        }
      } catch (error: any) {
        if (error.name === 'ValidationError') {
          const yupErrors: any = {};
          error.inner.forEach((e: any) => {
            yupErrors[e.path] = e.message;
          });
          setErrors(yupErrors);
        } else {
          alert('Erro ao realizar inscrição. Tente novamente.');
        }
      }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          borderRadius: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: 'fit-content',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Image
          src="/images/logo.png"
          alt="SENAI Logo"
          width={110}
          height={76}
        />

        <Typography sx={{ textAlign: 'center', mt: 2 }} id="modal-modal-title" variant="h6" component="h2">
          Formulário de Inscrição de Voluntário na Campanha MS Pela Vida
        </Typography>

        <Box onSubmit={handleSubmit} component="form" sx={{ mt: 2, width: '100%' }}>
          <InputMask mask="999.999.999-99" value={document} onChange={(e) => setDocument(e.target.value)}>
            {() => (
              <TextField
                margin="normal"
                fullWidth
                name="document"
                label="CPF"
                type="text"
                id="document"
                autoComplete="document"
                error={!!errors.document}
                helperText={errors.document}
              />
            )}
          </InputMask>
          <TextField
            margin="normal"
            fullWidth
            id="name"
            label="Nome completo"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
          <InputMask mask="(99) 99999-9999" value={phone} onChange={(e) => setPhone(e.target.value)}>
            {() => (
              <TextField
                margin="normal"
                fullWidth
                name="phone"
                label="Celular"
                type="phone"
                id="phone"
                autoComplete="phone"
                error={!!errors.phone}
                helperText={errors.phone}
              />
            )}
          </InputMask>

          <Grid container direction="column" mt={2} gap={4}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Especialização</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedValue}
                onChange={handleSelectChange}
                error={!!errors.area}
              >
                <MenuItem value={"teacher"}>Professor</MenuItem>
                <MenuItem value={"technician"}>Técnico</MenuItem>
                <MenuItem value={"engineer"}>Engenheiro</MenuItem>
              </Select>
              {errors.area && <FormHelperText error>{errors.area}</FormHelperText>}
            </FormControl>

            <FormControl>
              <InputLabel id="demo-simple-select-label">Casa</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedAreaValue}
                error={!!errors.organization}
                onChange={handleSelectAreaChange}
              >
                <MenuItem value={"FIEMS"}>FIEMS</MenuItem>
                <MenuItem value={"SESI"}>SESI</MenuItem>
                <MenuItem value={"IEL"}>IEL</MenuItem>
                <MenuItem value={"SENAI"}>SENAI</MenuItem>
              </Select>
              {errors.organization && <FormHelperText error>{errors.organization}</FormHelperText>}
            </FormControl>
          </Grid>
          <Button
            type="submit"
            fullWidth
            color="primary"
            variant="contained"
            sx={{ mt: 3, mb: 2, height: 40}}
          >
            Realizar inscrição
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalForm;
