import { Box, Button, Container, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductRow from './components/ProductRow';
import SearchBar from './components/SearchBar';

function Home() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/products')
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((product) => product._id !== id));
  };

  const visibleProducts = data.filter((product) => {
    if (
      searchTerm &&
      !product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <Container
      sx={{
        marginTop: '3rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
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
  const titleHeader = [
    'Produit 💻',
    'Type 🏷️',
    'Prix 💸',
    'Note ⭐',
    'Garantie 🛡️',
    'Disponible 📢',
    'Action ⚙️',
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {titleHeader.map((header, index) => (
              <TableCell key={header + index} sx={{ fontWeight: 'bold' }}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <ProductRow
              product={product}
              key={product._id}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Home;
