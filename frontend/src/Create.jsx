import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Create() {
  const [data, setData] = useState({
    name: '',
    type: '',
    price: '',
    rating: '',
    warranty_years: '',
    available: false,
  });

  const [errors, setErrors] = useState({
    name: '',
    type: '',
    price: '',
    rating: '',
    warranty_years: '',
  });

  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      type: '',
      price: '',
      rating: '',
      warranty_years: '',
    };

    const requiredFields = [
      'name',
      'type',
      'price',
      'rating',
      'warranty_years',
    ];
    requiredFields.forEach((field) => {
      if (data[field].trim() === '') {
        newErrors[field] = `Le ${field} est requis`;
        valid = false;
      }
    });

    const validations = [
      {
        field: 'price',
        message: 'Le prix doit être un nombre',
        condition: (value) => isNaN(value),
      },
      {
        field: 'rating',
        message: 'La note doit être un nombre entre 0 et 5',
        condition: (value) => isNaN(value) || +value < 0 || +value > 5,
      },
      {
        field: 'warranty_years',
        message: 'Les années de garantie doivent être un nombre',
        condition: (value) => isNaN(value),
      },
    ];

    validations.forEach(({ field, message, condition }) => {
      if (newErrors[field] === '' && condition(data[field])) {
        newErrors[field] = message;
        valid = false;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .post('http://localhost:5000/api/products', data)
        .then((res) => {
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const costam = [
    {
      id: 'formName',
      name: 'name',
      label: 'Nom',
      value: data.name,
      error: errors.name,
    },
    {
      id: 'formType',
      name: 'type',
      label: 'Type',
      value: data.type,
      error: errors.type,
    },
    {
      id: 'formPrice',
      name: 'price',
      label: 'Prix',
      value: data.price,
      error: errors.price,
    },
    {
      id: 'formRating',
      name: 'rating',
      label: 'Note',
      value: data.rating,
      error: errors.rating,
    },
    {
      id: 'formWarrantyYears',
      name: 'warranty_years',
      label: 'Années de garantie',
      value: data.warranty_years,
      error: errors.warranty_years,
    },
  ];

  return (
    <Container sx={{ marginTop: '3rem' }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Créer un produit
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
      >
        {costam.map((field) => (
          <TextField
            key={field.id}
            {...field}
            onChange={(e) => setData({ ...data, [field.name]: e.target.value })}
            fullWidth
            error={!!field.error}
            helperText={field.error}
          />
        ))}
        <FormControlLabel
          control={
            <Checkbox
              checked={data.available}
              onChange={(e) =>
                setData({ ...data, available: e.target.checked })
              }
              name="available"
            />
          }
          label="Disponible"
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button component={Link} to="/" variant="outlined" color="grey">
            Annuler
          </Button>
          <Button variant="contained" color="success" type="submit">
            Créer
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Create;
