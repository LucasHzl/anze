# 🛰️ Agence Nationale Des Zinzins de l'Espace (ANZE)

## 🌌 Description

**L'Agence Nationale Des Zinzins de l'Espace (ANZE)** est une plateforme innovante pour gérer et payer vos contraventions spatiales.  
Ce projet est développé avec **Next.js**, **React**, **Symfony**, et **Tailwind CSS**. La communication entre le front-end et le back-end se fait via **API Platform**.

## 🚀 Fonctionnalités

- **Inscription utilisateur** : Les utilisateurs peuvent créer un compte.
- **Connexion utilisateur** : Les utilisateurs peuvent se connecter à leur compte.
- **Mon Compte** : Une page où les utilisateurs peuvent éditer leurs informations personnelles.
- **Gestion des contraventions** : Les utilisateurs peuvent saisir un code unique d'infraction pour afficher les détails de la contravention et procéder au paiement.

## 🛠️ Installation

### Prérequis

- Node.js
- Composer
- Symfony CLI
- MySQL
- phpMyAdmin

### Étapes d'installation

1. **Cloner le dépôt**

    ```bash
    git clone https://github.com/LucasHzl/anze
    cd anze
    ```

2. **Installer les dépendances du front-end**

    ```bash
    cd front-end
    npm install
    ```

3. **Installer les dépendances du back-end**

    ```bash
    cd ../back-end
    composer install
    ```

4. **Configuration de l'environnement**

    - Dupliquer le fichier `.env`

    ```bash
    cp .env .env.local
    ```

    - Configurer les variables d'environnement dans `.env.local` pour correspondre à votre configuration de base de données.

5. **Créer la base de données et charger les données fictives depuis l'interface phpMyAdmin ou depuis Symfony**

    ```bash
    symfony console doctrine:database:create
    symfony console doctrine:migrations:migrate
    ```

    - Injecter le script SQL disponible dans le projet

6. **Démarrer les serveurs**

    - **Front-end**

    ```bash
    cd front-end
    npm run dev
    ```

    - **Back-end**

    ```bash
    cd ../back-end
    symfony server:start
    ```

## 💻 Utilisation

1. Accédez à l'URL de votre serveur front-end (par défaut `http://localhost:3000`).
2. Créez un compte utilisateur.
3. Connectez-vous à votre compte.
4. Accédez à la page "Mon Compte" pour éditer vos informations personnelles si vous le souhaitez.
5. Allez dans l'espace "Contravention" pour saisir un code unique d'infraction et visualiser les détails de la contravention.

### Codes d'infractions pour test

Utilisez les codes d'infraction suivants pour tester la fonctionnalité de gestion des contraventions :

- AZ2024_21_79
- BC2024_10_90
- EF2024_70_30

Saisissez l'un de ces codes dans l'espace "Contraventions" pour être redirigé vers la page correspondante et effectuer le paiement.

Une fois le paiement effecuté, la contravention sera attribuée à l'utilisateur ayant réglé.

## 👤 Auteur

- **LucasHzl**


Merci d'utiliser l'Agence Nationale Des Zinzins de l'Espace (ANZE) !