# Projet Test Technique - Les Bons Artisans

Ce projet consiste en la création d'une API REST en Node.js/Express liée à une base de données MongoDB pour gérer des produits, ainsi qu'une application Web en ReactJS pour consulter, modifier, supprimer et créer de nouveaux produits.

## Spécifications du Projet
- **API REST en Node.js/Express** :
  - Permet de gérer les opérations CRUD (Créer, Lire, Mettre à jour, Supprimer) sur les produits.
  - Utilisation de MongoDB comme base de données.
  
- **Application Web en ReactJS** :
  - Affichage des produits dans une liste.
  - Fonctionnalités de modification, suppression et création de produits.
  
- **Design** :
  - Utilisation de Material UI pour le design de l'application.

## Bonus (non implémentés)
- **WebSocket** : Implémentation entre le serveur et l'application pour garder les produits à jour.
- **Authentification JWT/Token**.
- **Redux** : Gestion des actions et chargement des produits dans l'application.

## Normes et Outils
- Utilisation d'ESLint pour respecter les normes de codage.
- Installation d'ESLint via VSCode recommandée.

## Remise de l'Exercice
- Lien GitHub public contenant le projet complet.

## Produits de la Base de Données
```json
[
  { "_id" : 1, "name" : "AC1 Phone1", "type" : "phone", "price" : 200.05, "rating" : 3.8,"warranty_years" : 1, "available" : true },
  { "_id" : 2, "name" : "AC2 Phone2", "type" : "phone", "price" : 147.21, "rating" : 1,"warranty_years" : 3, "available" : false },
  { "_id" : 3, "name" : "AC3 Phone3", "type" : "phone", "price" : 150, "rating" : 2,"warranty_years" : 1, "available" : true },
  { "_id" : 4, "name" : "AC4 Phone4", "type" : "phone", "price" : 50.20, "rating" : 3,"warranty_years" : 2, "available" : true }
]
```

Pour commencer, l'utilisateur doit suivre ces étapes :
1. Dans le dossier du backend, exécuter la commande `npm run dev` pour démarrer le serveur Node.js.
2. Dans le dossier du frontend, exécuter la commande `npm install` pour installer les dépendances, puis `npm run dev` pour lancer l'application React.

Ces commandes sont nécessaires car :
- `npm run dev` dans le backend lance le serveur Node.js avec les scripts définis dans le fichier `package.json`, permettant ainsi d'exécuter l'API REST.
- `npm install` dans le frontend installe les dépendances déclarées dans le fichier `package.json`, assurant que l'application React dispose de tous les modules nécessaires pour fonctionner correctement. Ensuite, `npm run dev` démarre l'application en mode développement.

Cela garantit que l'API et l'application Web sont correctement configurées et prêtes à être utilisées.
