import React, { useState } from 'react';
import { Modal, Box, Typography, FormControl, InputLabel, Select, MenuItem, TextField, Button, Grid } from '@mui/material';
import Image from 'next/image';
import InputMask from 'react-input-mask';

interface ModalFormProps {
  open: boolean;
  handleClose: () => void;
}

const ModalForm: React.FC<ModalFormProps> = ({ open, handleClose }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedAreaValue, setSelectedAreaValue] = useState('');

  const handleSelectChange = (event) => setSelectedValue(event.target.value);
  const handleSelectAreaChange = (event) => setSelectedAreaValue(event.target.value);

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

        <Box component="form" sx={{ mt: 2, width: '100%' }}>
          <InputMask mask="999.999.999-99">
            {() => (
              <TextField
                margin="normal"
                required
                fullWidth
                name="document"
                label="CPF"
                type="text"
                id="document"
                autoComplete="document"
              />
            )}
          </InputMask>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nome completo"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
          />
          <InputMask mask="(99) 99999-9999">
            {() => (
              <TextField
                margin="normal"
                required
                fullWidth
                name="phone"
                label="Celular"
                type="phone"
                id="phone"
                autoComplete="phone"
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
              >
                <MenuItem value={"teacher"}>Professor</MenuItem>
                <MenuItem value={"technical"}>Técnico</MenuItem>
                <MenuItem value={"engineer"}>Engenheiro</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Área</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedAreaValue}
                onChange={handleSelectAreaChange}
              >
                <MenuItem value={"FIEMS"}>FIEMS</MenuItem>
                <MenuItem value={"SESI"}>SESI</MenuItem>
                <MenuItem value={"IEL"}>IEL</MenuItem>
                <MenuItem value={"SENAI"}>SENAI</MenuItem>
              </Select>
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
