import React, { useState } from "react";
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Create() {
  const [data, setData] = useState({
    name: "",
    type: "",
    price: "",
    rating: "",
    warranty_years: "",
    available: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    type: "",
    price: "",
    rating: "",
    warranty_years: "",
  });

  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: "",
      type: "",
      price: "",
      rating: "",
      warranty_years: "",
    };

    if (data.name.trim() === "") {
      newErrors.name = "Le nom est requis";
      valid = false;
    }

    if (data.type.trim() === "") {
      newErrors.type = "Le type est requis";
      valid = false;
    }

    if (data.price.trim() === "") {
      newErrors.price = "Le prix est requis";
      valid = false;
    } else if (isNaN(data.price)) {
      newErrors.price = "Le prix doit être un nombre";
      valid = false;
    }

    if (data.rating.trim() === "") {
      newErrors.rating = "La note est requise";
      valid = false;
    } else if (isNaN(data.rating) || +data.rating < 0 || +data.rating > 5) {
      newErrors.rating = "La note doit être un nombre entre 0 et 5";
      valid = false;
    }

    if (data.warranty_years.trim() === "") {
      newErrors.warranty_years = "Les années de garantie sont requises";
      valid = false;
    } else if (isNaN(data.warranty_years)) {
      newErrors.warranty_years =
        "Les années de garantie doivent être un nombre";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .post("http://localhost:5000/api/products", data)
        .then((res) => {
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Container sx={{ marginTop: "3rem" }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Créer un produit
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}
      >
        <TextField
          id="formName"
          name="name"
          label="Nom"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          fullWidth
          error={!!errors.name}
          helperText={errors.name}
        />

        <TextField
          id="formType"
          name="type"
          label="Type"
          value={data.type}
          onChange={(e) => setData({ ...data, type: e.target.value })}
          fullWidth
          error={!!errors.type}
          helperText={errors.type}
        />

        <TextField
          id="formPrice"
          name="price"
          label="Prix"
          value={data.price}
          onChange={(e) => setData({ ...data, price: e.target.value })}
          fullWidth
          error={!!errors.price}
          helperText={errors.price}
        />

        <TextField
          id="formRating"
          name="rating"
          label="Note"
          value={data.rating}
          onChange={(e) => setData({ ...data, rating: e.target.value })}
          fullWidth
          error={!!errors.rating}
          helperText={errors.rating}
        />

        <TextField
          id="formWarrantyYears"
          name="warranty_years"
          label="Années de garantie"
          value={data.warranty_years}
          onChange={(e) => setData({ ...data, warranty_years: e.target.value })}
          fullWidth
          error={!!errors.warranty_years}
          helperText={errors.warranty_years}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
