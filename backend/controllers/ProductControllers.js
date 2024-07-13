const Product = require("../models/Product");

// Récupérer tous les produits
module.exports.getProducts = (req, res) => {
  Product.find()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Error fetching products" });
    });
};

// Récupérer un produit existant
module.exports.getProduct = (req, res) => {
  const { id } = req.params;
  Product.findById(id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json(product);
    })
    .catch((error) => {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Error fetching product" });
    });
};

// Créer un nouveau produit
module.exports.createProduct = (req, res) => {
  const { name, type, price, rating, warranty_years, available } = req.body;
  Product.create({ name, type, price, rating, warranty_years, available })
    .then((product) => {
      res.status(201).json("Product created successfully");
    })
    .catch((error) => {
      console.error("Error creating product:", error);
      res.status(400).json({ error: "Error creating product" });
    });
};

// Mettre à jour un produit existant
module.exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, type, price, rating, warranty_years, available } = req.body;
  Product.findByIdAndUpdate(
    id,
    { name, type, price, rating, warranty_years, available },
    { new: true }
  )
    .then((updatedProduct) => {
      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json(updatedProduct);
    })
    .catch((error) => {
      console.error("Error updating product:", error);
      res.status(400).json({ error: "Error updating product" });
    });
};

// Supprimer un produit existant
module.exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  Product.findByIdAndDelete(id)
    .then((deletedProduct) => {
      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted successfully" });
    })
    .catch((error) => {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Error deleting product" });
    });
};
