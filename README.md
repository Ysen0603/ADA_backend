# Backend API - Projet APA

Ce dossier contient le backend de l'application, développé avec Node.js et Express.js.

## Prérequis

- Node.js 
- npm 
- MongoDB 

## Guide d'installation et de démarrage

1. Clonez le repository :
```bash
git clone <repository-url>
cd backend-node
```

2. Installez les dépendances :
```bash
npm install
```

3. Configurez MongoDB :
- Installez MongoDB sur votre machine
- Créez une base de données 
- Le serveur MongoDB doit être en cours d'exécution sur le port par défaut (27017)

4. Lancez l'application :
```bash
npm run dev
```
L'application sera accessible sur `http://localhost:5000` ou sur l'URL définie dans les variables d'environnement.

## Structure du projet

```
backend-node/
├── config/         # Configuration de l'application
├── models/        # Modèles de données
├── routes/        # Routes de l'API
└── index.js      # Point d'entrée de l'application
```

## Documentation API

### 1. Récupération des ventes totales
**Endpoint:** `GET /api/analytics/total_sales`

**Paramètres de requête:**
- `period` (obligatoire): Période d'analyse ('7d', '30d', '12m')

**Exemple de requête:**
```
GET /api/analytics/total_sales?period=30d
```

**Exemple de réponse:**
```json
{
  "totalSales": 15000.50
}
```

### 2. Produits les plus vendus
**Endpoint:** `GET /api/analytics/trending_products`

**Paramètres de requête:**
- `period` (obligatoire): Période d'analyse ('7d', '30d', '12m')

**Exemple de requête:**
```
GET /api/analytics/trending_products?period=30d
```

**Exemple de réponse:**
```json
[
  {
    "_id": "123",
    "name": "Produit A",
    "totalSales": 1500
  },
  {
    "_id": "456",
    "name": "Produit B",
    "totalSales": 1200
  }
]
```

### 3. Ventes par catégorie
**Endpoint:** `GET /api/analytics/category_sales`

**Paramètres de requête:**
- `period` (obligatoire): Période d'analyse ('7d', '30d', '12m')

**Exemple de requête:**
```
GET /api/analytics/category_sales?period=30d
```

**Exemple de réponse:**
```json
[
  {
    "category": "Électronique",
    "sales": 50000
  },
  {
    "category": "Vêtements",
    "sales": 35000
  }
]
```

### 4. Liste des produits
**Endpoint:** `GET /api/products`

**Paramètres de requête:**
- `period` (obligatoire): Période d'analyse ('7d', '30d', '12m')

**Exemple de requête:**
```
GET /api/products?period=30d
```

**Exemple de réponse:**
```json
{
  "products": [
    {
      "_id": "123",
      "name": "Produit A",
      "price": 499.99,
      "dateAdded": "2023-12-01T00:00:00.000Z",
      "totalSales": 150
    }
  ]
}
```

## Gestion des erreurs

Les erreurs sont renvoyées au format suivant :
```json
{
  "error": "Description de l'erreur"
}
```

Codes d'erreur courants :
- 400: Paramètres manquants ou invalides
- 404: Ressource non trouvée
- 500: Erreur serveur

## Dépannage

Si vous rencontrez des erreurs :

1. Vérifiez que MongoDB est bien en cours d'exécution :
```bash
mongod --version
```

2. Vérifiez les logs dans la console du serveur

3. Vérifiez que le paramètre `period` est l'une des valeurs suivantes : '7d', '30d', '12m'

4. Assurez-vous que l'URL de l'API est correctement configurée dans le frontend (variable d'environnement VITE_API_URL)
