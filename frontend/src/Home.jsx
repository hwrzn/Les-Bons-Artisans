import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";
import SearchBar from "./components/SearchBar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ProductRow from "./components/ProductRow";

function Home() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((product) => product._id !== id));
  };

  const visibleProducts = data.filter((chantier) => {
    if (
      searchTerm &&
      !chantier.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <Container
      sx={{
        marginTop: "3rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4">Liste des produits</Typography>
        <Link to={`/create`}>
          <Button variant="contained" color="success">
            Créer un produit
          </Button>
        </Link>
      </Box>

      <SearchBar
        placeholder="Rechercher un produit ..."
        value={searchTerm}
        onChange={setSearchTerm}
      />

      <ProductTable products={visibleProducts} onDelete={handleDelete} />
    </Container>
  );
}

function ProductTable({ products, onDelete }) {
  const rows = [];
  for (let product of products) {
    rows.push(
      <ProductRow product={product} key={product._id} onDelete={onDelete} />
    );
  }
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Produit💻</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Type🏷️</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Prix💸</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Note⭐</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Garantie🛡️</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Disponible📢</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Action⚙️</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{rows}</TableBody>
      </Table>
    </TableContainer>
  );
}

export default Home;
