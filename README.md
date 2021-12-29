# Memory-game
## Memory game for oclock  
  
### **Etapes pour lancer le projet :**
  
    **1:** npm install dans ./memory-back (install les paquets nécessaires pour lancer le projet)

    **2:** dans le même dossier : exécuter la commande "npm start" (démarre le serveur)

    **3:** cliquer sur index.html dans le dossier ./memory-front (lance la page client)

### **Principaux fichiers à regarder :** 
    1 : memory-front/index.html  
    2 : memory-front/index.js  
    3 : memory-front/memory-game.html  
    4 : memory-front/memory.js  
    5 : memory-back/server.js  

### **Choix techniques :**

    Ce projet a été développé en HTML / Javascript / CSS pour le front-end

    Le back-end a lui été développé avec nodejs, le package express a été utilisé afin de gérer les requêtes ajax

    L'objectif principal était d'apporter un projet lisible aux étudiants afin que les dépendances ne soient pas un point obscurcissant leur compréhension du code.

### **Intérêts pédagogiques :**   

    - Interractions entre le front-end et le back-end (GET et POST)  
    - Comprendre le stockage et la gestion de données 
    - HTML dynamique
    - Gestion du DOM
    - Comprendre les conditions (principalement à travers la gestion du niveau de difficulté (les nombres 18 et 36 sont des points de repère))  
    - Utiliser les objets   
    - Avoir un code clair et simple  

### **Pistes d'amélioration :**

    - Modifier les valeurs des cartes afin que l'utilisateur ne puisse pas trouver les paires en inspectant le code
    - Ajouter Sass, améliorer l'esthétique du projet, le rendre full responsive
    - Factoriser les 2 boucles dans initserver ainsi que les if dans writescorefile
    - Proposer un déploiement sur docker
    - Proposer plusieurs thèmes pour les cartes

Ce projet pouvant servir de support aux étudiants, il m'a semblé judicieux de le commenter en anglais afin de les entraîner à lire de la documentation dans cette langue, majoritairement présente en programmation.

Ayant déjà passé ce test technique, je me suis focalisé sur la simplification et l'optimisation du code, j'ai rajouté des features et commenté au mieux le code afin qu'il ait pour principal intérêt d'être le plus lisible et utile possible pour les apprenants.

J'espère que ce projet vous plaira, je reste disponible pour toute question ou demande :)