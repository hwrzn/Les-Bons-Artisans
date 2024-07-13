import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductRow({ product, onDelete }) {
  function handleDelete() {
    axios
      .delete(`http://localhost:5000/api/products/${product._id}`)
      .then(() => {
        onDelete(product._id);
      })
      .catch((err) => {
        console.log('Erreur : ', err);
      });
  }

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <StyledTableRow>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.type}</TableCell>
      <TableCell>{product.price}€</TableCell>
      <TableCell>{product.rating}/5</TableCell>
      <TableCell>
        {product.warranty_years === 1
          ? '1 an'
          : product.warranty_years > 1
          ? product.warranty_years + ' ans'
          : 'Aucune'}
      </TableCell>
      <TableCell
        sx={{
          color: product.available ? 'green' : 'red',
        }}
      >
        {product.available ? 'Oui' : 'Non'}
      </TableCell>
      <TableCell sx={{ display: 'flex', gap: '0.5rem' }}>
        <Link to={`/edit/${product._id}`}>
          <Button variant="contained" color="primary">
            <EditIcon />
          </Button>
        </Link>
        <Button variant="contained" color="error" onClick={handleDelete}>
          <DeleteIcon />
        </Button>
      </TableCell>
    </StyledTableRow>
  );
}

export default ProductRow;
