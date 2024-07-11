import React, { FormEvent, useState } from "react";
import userSchema from "../schemas/userSchema";
import InputMask from 'react-input-mask';
import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography, Grid } from "@mui/material";

export function LoginForm() {
  const [document, setDocument] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<any>({});


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      await userSchema.validate({
        document,
        password,
      }, { abortEarly: false }); // abortEarly: false to validation executing before return
      
      const data = {
        document,
        password,
      };

      const response = await fetch(
        'http://localhost:8080/sign_in', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          alert('Login realizado com sucesso!');
          setDocument('');
          setPassword('');
          setErrors({});
        } else {
          alert('Erro ao realizar login.');
        }
      } catch (error: any) {
        if (error.name === 'ValidationError') {
          const yupErrors: any = {};
          error.inner.forEach((e: any) => {
            yupErrors[e.path] = e.message;
          });
          setErrors(yupErrors);
        } else {
          alert('Erro ao realizar login.');
        }
      }
  }
    return (
    <>
      <Typography sx={{ textAlign: 'center', mt: 2 }} id="modal-modal-title" variant="h6" component="h2">
        Fazer Login como Administrador
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
            type="password"
            id="password"
            label="Senha"
            name="password"
            autoFocus
            value={name}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />

          <Button
            type="submit"
            fullWidth
            color="primary"
            variant="contained"
            sx={{ mt: 3, mb: 2, height: 40}}
          >
            Fazer login
          </Button>
        </Box>
    </>
  );
}
