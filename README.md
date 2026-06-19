# 🤖 TOKYO Chatbot - Version Professionnelle

Un chatbot IA multi-personnalités créé pour une présentation à un jury dans le cadre d'une formation IA.

## 🎯 Caractéristiques

- **6 Personnalités** : Prof France, Prof Maths, Prof Physique, Amis, Expert Mangas, Expert Animes
- **Design Professionnel** : Interface moderne avec thème dark/gold
- **Historique** : Sauvegarde les conversations (localStorage)
- **Animations** : Titre animé, avion qui s'envole, transitions fluides
- **Blagues** : Une blague aléatoire avec chaque réponse
- **Mobile-Ready** : Responsive et adapté aux petits écrans
- **Backend Python** : API FastAPI pour les réponses Claude

## 📂 Structure du Projet

```
RebootJR/
├── index.html              # 📄 Page d'accueil (landing)
├── chat.html               # 💬 Interface de chat principale
├── css/
│   └── style.css          # 🎨 Tous les styles centralisés
├── js/
│   └── app.js             # ⚙️ Logique du chatbot
├── assets/
│   ├── saros.jpg          # 🖼️ Logo du chatbot
│   └── goku-icon.svg      # 🔗 Favicon
├── main.py                # 🐍 Serveur API Python
├── .env                   # 🔑 Clé API Claude (non commitée)
└── requirements.txt       # 📦 Dépendances Python
```

## 🚀 Installation & Démarrage

### 1️⃣ Cloner et installer

```bash
cd RebootJR/
# Installer les dépendances Python (optionnel, si tu veux Claude)
pip install -r requirements.txt
```

### 2️⃣ Configurer la clé API

```bash
# Ajouter ta clé Anthropic au fichier .env
echo "ANTHROPIC_API_KEY=sk-ant-..." >> .env
```

### 3️⃣ Démarrer le serveur

```bash
python3 main.py
# ✅ Serveur démarré sur http://localhost:8000
```

### 4️⃣ Ouvrir le chatbot

```bash
# Dans un terminal
python3 -m http.server 8080

# Puis ouvre dans ton navigateur:
# http://localhost:8080
```

## 📋 Flux Utilisateur

1. **Accueil** → User clique "Commencer le chat" ou ignore la question
2. **Question modale** → "Quel est le nom du jeu en fond d'écran?" → Réponse: **SAROS**
3. **Chat** → L'interface de chat se charge avec la personnalité par défaut
4. **Changer de personnalité** → Clic sur la barre latérale gauche
5. **Historique** → Les conversations s'auto-sauvegardent et apparaissent en bas de la sidebar

## 🎨 Personnalisation

### Couleurs

Modifie `:root` dans `css/style.css` :

```css
:root {
  --primary: #DAA520;        /* Or principal */
  --dark: #15151e;           /* Fond très sombre */
  --gray: #38383f;           /* Cartes/surfaces */
  --white: #ffffff;          /* Texte principal */
}
```

### Personnalités

Ajoute/modifie dans `js/app.js` :

```javascript
const PERSONNALITES = {
  'NouveauRole': { icon: '🆕', label: 'Nouveau Rôle' }
};
```

Et ajoute le `system prompt` dans `main.py` :

```python
SYSTEM_PROMPTS = {
    'NouveauRole': "Tu es un...",
}
```

## 🌍 Déploiement

### Option 1️⃣ : Vercel (Frontend + Backend)

```bash
# Créer vercel.json
{
  "buildCommand": "true",
  "outputDirectory": ".",
  "functions": {
    "main.py": {
      "runtime": "python3.9"
    }
  }
}

# Déployer
vercel deploy
```

### Option 2️⃣ : GitHub Pages (Frontend seul)

```bash
# Créer repo public
git init
git add .
git commit -m "TOKYO Chatbot v1.0"
git push origin main

# Activer GitHub Pages dans Settings
```

### Option 3️⃣ : Heroku (Backend)

```bash
# Backend
git push heroku main

# Frontend sur Netlify ou Vercel
```

## 📊 Performances

- **Taille CSS** : ~12 KB
- **Taille JS** : ~4 KB
- **Temps de chargement** : < 1s
- **Requête API** : ~500ms (dépend de Claude)

## ✅ Checklist Jury

- ✅ Chatbot fonctionnel avec plusieurs personnalités
- ✅ Design professionnel et moderne
- ✅ Historique des conversations
- ✅ Animation et UX fluides
- ✅ Code bien organisé (HTML/CSS/JS séparés)
- ✅ Backend API avec Claude
- ✅ Mobile-responsive
- ✅ Facile à déployer

## 🐛 Troubleshooting

### "Erreur serveur"
- Vérifie que `main.py` est en cours d'exécution
- Vérifie ton ANTHROPIC_API_KEY dans .env
- Teste : `curl http://localhost:8000/health`

### "Historique ne sauvegarde pas"
- Vérifie que localStorage est activé dans le navigateur
- Regarde la console (F12) pour les erreurs

### "API ne répond pas"
- Redémarre le serveur Python
- Vérifie le port 8000 n'est pas occupé : `lsof -i :8000`

## 📄 Licence

Créé à titre éducatif pour une formation IA.

## 👨‍💻 Auteur

Créé par un collégien passionné par l'IA et les chatbots.

---

**Bon courage pour ta présentation au jury! 🎓**
