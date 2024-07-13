const { Router } = require("express");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/ProductControllers");

const router = Router();

// Routes pour les produits
router.get("/", getProducts); // Récupérer tous les produits
router.get("/:id", getProduct); // Récupérer un produit existant
router.post("/", createProduct); // Créer un nouveau produit
router.put("/:id", updateProduct); // Mettre à jour un produit existant
router.delete("/:id", deleteProduct); // Supprimer un produit existant

module.exports = router;
