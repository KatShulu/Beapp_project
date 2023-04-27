# Beapp_project

Projet réalisé dans le cadre d'un entretien technique demandant une application mobile pour la NASA.


Cette application a été effectuée en ***4 jours et seule.*** Projet rendu le 28-04-2023

## Demandes du projet :

- [x] Une navigation avec une tabbar
- [x] La page d'accueil avec la photo du jour
- [x] La liste des photos du jour avec un scroll infini. 
- [x] Le tap sur un élément de la liste permet d’afficher la photo en plein écran avec les informations associées 
- [x] Un bouton Call To Action permettant de partager la photo.
- [x] Fonction de recherche par date
- [x] Projet versionné sur Git
- [x] Utilisation Bibliothèque MUI ou React-native-paper
- [x] Choix des librairies
- [x] Code Lisible et de qualité
- [x] Bonnes pratiques
- [x] Choix design
- [ ] Test (à venir)



## Langages, Dépendances & Outils

- Js -> React Native
- JSX
- JSON
- Expo 
- Babel
- React Navigation
- Jest 
- react-native-dotenv 
- react-native-paper
- react-native-paper-dates
- Notion (Organisation & Préparation)
- Git/Github (versionage)

## Installation 

- Installer l'apli expo sur votre téléphone
- Clonez le projet
- Récupérer une clée d'API sûr [le site de la nasa](https://api.nasa.gov/)
- Créer un /nasa_app/.env dans le projet
- Y entrer  ```API_KEY= ``` puis la clé que vous avez récupérée
- Ouvrir une console dans /nasa_app/
- Faire la commande  ```npm install ```
- Faire la commande  ```npx expo start -c ``` (-c pour vider le cache)

## Pistes d'améliorations

- Corriger le bug du premier appel API (il s'effectue vers les dates futures au lieu des dates passées)
- Rédiger des tests pour couvrir l'ensemble de l'application avec Jest et Enzyme
- Ajouter un deuxième zoom sur l'image pour l'avoir un vrai full screen 
- Améliorer L'UX/UI en harmonisant les couleurs
- Tester l'accessibilité avec : Accessibility Scanner, TalkBack ou Color Contrast Analyzer
- Améliorer l'optimisation avec react memo
- Améliorer le composant ZoomCard pour ne pas avoir les fonctions d'ouverture et de fermeture de la card en dehors 
- Proposer plusieurs palettes de couleur à l'utilisateur ainsi que des options d'accessibilité

***Lancer l'application 🚀***
