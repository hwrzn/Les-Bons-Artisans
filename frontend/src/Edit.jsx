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
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Edit() {
  const [data, setData] = useState({
    _id: '',
    name: '',
    type: '',
    price: '',
    rating: '',
    warranty_years: '',
    available: false,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        const product = res.data;
        setData(product);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/products/${id}`, data)
      .then((res) => {
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container sx={{ marginTop: '3rem' }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Modifier le produit
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
      >
        <TextField
          id="formName"
          name="name"
          label="Nom"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          fullWidth
        />

        <TextField
          id="formType"
          name="type"
          label="Type"
          value={data.type}
          onChange={(e) => setData({ ...data, type: e.target.value })}
          fullWidth
        />

        <TextField
          id="formPrice"
          name="price"
          label="Prix"
          value={data.price}
          onChange={(e) => setData({ ...data, price: e.target.value })}
          fullWidth
        />

        <TextField
          id="formRating"
          name="rating"
          label="Note"
          value={data.rating}
          onChange={(e) => setData({ ...data, rating: e.target.value })}
          fullWidth
        />

        <TextField
          id="formWarrantyYears"
          name="warranty_years"
          label="Années de garantie"
          value={data.warranty_years}
          onChange={(e) => setData({ ...data, warranty_years: e.target.value })}
          fullWidth
        />

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
          <Button variant="contained" color="primary" type="submit">
            Modifier
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Edit;
