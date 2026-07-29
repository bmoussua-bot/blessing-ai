# Blessing AI

Assistant personnel chrétien de productivité — verset du jour, méditations, prières, historique et favoris. Conçu pour usage personnel, hors-ligne, sans dépendance à un compte ou à un service tiers.

**Stack actuelle (phase 1)** : HTML / CSS / JS pur, packagé plus tard en app Android via **Capacitor**. Aucune installation d'Android Studio n'est requise tant que tu restes en phase web.

## Structure du projet

```
blessing-ai/
├── www/                  ← le code de l'application (c'est ce que Capacitor empaquette)
│   ├── index.html
│   ├── css/style.css
│   ├── js/data.js        ← versets, prières, thèmes (facile à étendre)
│   ├── js/app.js         ← logique de l'app
│   └── assets/logo.png
├── capacitor.config.json
├── package.json
├── .gitignore
└── README.md
```

## 1. Tester en local (aucune installation lourde nécessaire)

Ouvre simplement `www/index.html` dans ton navigateur, ou lance un petit serveur :

```bash
npx serve www
```

Toutes les données (favoris, historique, préférences, notes) sont stockées dans le `localStorage` du navigateur — rien n'est envoyé sur internet.

## 2. Mettre le projet sur GitHub

```bash
cd blessing-ai
git init
git add .
git commit -m "Initial commit — Blessing AI v1 (HTML/CSS/JS + Capacitor)"
git branch -M main
git remote add origin https://github.com/<ton-nom-utilisateur>/blessing-ai.git
git push -u origin main
```

> Remplace `<ton-nom-utilisateur>` par ton pseudo GitHub. Si le dépôt distant n'existe pas encore, crée-le d'abord sur github.com (repo vide, sans README, pour éviter un conflit avec le commit initial).

## 3. Passer à l'app Android (plus tard, quand tu auras la place pour Android Studio)

```bash
npm install
npx cap add android
npx cap sync
npx cap open android
```

Cela génère un dossier `android/` (ignoré par Git) que tu ouvres et compiles depuis Android Studio.

## 4. Notifications locales

Le bouton **Activer les notifications** dans Réglages utilise le plugin `@capacitor/local-notifications`. Il ne fonctionne que dans l'app packagée (pas dans un simple navigateur) — c'est normal et déjà géré dans `app.js`.

## 5. Étendre le contenu biblique

Tout le contenu (versets, prières, méditations, thèmes) est centralisé dans `www/js/data.js`. Pour ajouter un verset, une prière ou un contexte, il suffit d'ajouter une entrée dans le tableau correspondant — aucune autre modification n'est nécessaire.

Traduction utilisée par défaut : **Louis Segond 1910**, domaine public.

## Roadmap

- [x] Phase 1 — Verset du jour, contextes, méditation, prières, favoris/historique, préférences (HTML/CSS/JS + localStorage)
- [ ] Phase 2 — Tâches, agenda, rappels (productivité)
- [ ] Phase 3 — Chat IA (OpenAI/Gemini)
- [ ] Phase 4 — Synchronisation cloud (Firebase) + packaging Android final
