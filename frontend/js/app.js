// ===== BLAGUES =====
const BLAGUES = [
  "😂 Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ? Parce que sinon ils tombent dans le bateau !",
  "😂 Qu'est-ce qu'un crocodile qui surveille la pharmacie ? Un Lacoste-gard !",
  "😂 Quel est le comble pour un électricien ? De ne pas être au courant !",
  "😂 Pourquoi les poissons n'aiment pas jouer au tennis ? Parce qu'ils ont peur du filet !",
  "😂 Qu'est-ce qu'un cannibale végétarien ? Un humanitaire !",
  "😂 Pourquoi les champignons vont à la fête ? Parce qu'ils sont fongis !",
  "😂 Quel est le gâteau préféré des mathématiciens ? Le Pi ! 🥧",
  "😂 Pourquoi les programmeurs préfèrent le dark mode ? Parce que la lumière attire les bugs !",
  "😂 Qu'est-ce qu'un robot qui fait du karaté ? Un Cyber-martien !",
  "😂 Pourquoi les ghosts ne mentent jamais ? Parce qu'ils sont transparents !"
];

// ===== PERSONNALITES =====
const PERSONNALITES = {
  'France': { icon: '🇫🇷', label: 'Prof de France' },
  'Mathématiques': { icon: '📐', label: 'Prof de Mathématiques' },
  'Physique': { icon: '⚛️', label: 'Prof de Physique' },
  'Amis': { icon: '👥', label: 'Amis' },
  'Mangas': { icon: '📚', label: 'Expert en Mangas' },
  'Animes': { icon: '🎬', label: 'Expert en Animes' }
};

// ===== VARIABLES D'ETAT =====
let personnaliteActive = localStorage.getItem('personnaliteActive') || 'France';
let messagesActuels = [];

// ===== DOM ELEMENTS =====
const zoneChat = document.getElementById('zone-chat');
const champTexte = document.getElementById('champ-texte');
const boutonEnvoyer = document.getElementById('bouton-envoyer');
const headerPersonnalite = document.querySelector('header .personality');
const avion = document.getElementById('avion');

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  mettreAJourHeader();
  chargerHistoriqueChat();
  boutonEnvoyer.addEventListener('click', envoyerMessage);
  champTexte.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') envoyerMessage();
  });
}

// ===== HEADER =====
function mettreAJourHeader() {
  if (!PERSONNALITES[personnaliteActive]) personnaliteActive = 'France';
  if (headerPersonnalite) {
    const p = PERSONNALITES[personnaliteActive];
    headerPersonnalite.textContent = `${p.icon} ${p.label}`;
  }
}

// ===== UTILITAIRES =====
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function applyInline(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.+?)__/g, '<strong>$1</strong>')
    .replace(/\*([^*\n]+?)\*/g, '<em>$1</em>')
    .replace(/_([^_\n]+?)_/g, '<em>$1</em>')
    .replace(/`([^`\n]+?)`/g, '<code>$1</code>');
}

function renderMarkdown(text) {
  const lines = escapeHtml(text).split('\n');
  const out = [];
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (line.startsWith('### ')) {
      if (inList) { out.push('</ul>'); inList = false; }
      out.push(`<h4>${applyInline(line.slice(4))}</h4>`);
    } else if (line.startsWith('## ')) {
      if (inList) { out.push('</ul>'); inList = false; }
      out.push(`<h3>${applyInline(line.slice(3))}</h3>`);
    } else if (line.startsWith('# ')) {
      if (inList) { out.push('</ul>'); inList = false; }
      out.push(`<h2>${applyInline(line.slice(2))}</h2>`);
    } else if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      // Horizontal rule: ---, ***, ___
      if (inList) { out.push('</ul>'); inList = false; }
      out.push('<hr class="md-hr">');
    } else if (/^[-*] /.test(line)) {
      if (!inList) { out.push('<ul>'); inList = true; }
      out.push(`<li>${applyInline(line.slice(2))}</li>`);
    } else if (trimmed === '') {
      if (inList) { out.push('</ul>'); inList = false; }
      // Skip consecutive blank lines — one paragraph gap is enough
      if (out.length > 0 && out[out.length - 1] !== '<br>') out.push('<br>');
    } else {
      if (inList) { out.push('</ul>'); inList = false; }
      out.push(applyInline(line) + '<br>');
    }
  }

  if (inList) out.push('</ul>');

  // Strip trailing <br> tags that would add dead space at bottom of bubble
  let html = out.join('');
  html = html.replace(/(<br>)+$/, '');
  return html;
}

// ===== MESSAGES =====
function ajouterMessage(type, texte) {
  const msg = document.createElement('div');
  msg.className = `message ${type}`;
  if (type === 'user') {
    msg.textContent = texte;
  } else {
    msg.innerHTML = texte;
  }
  zoneChat.appendChild(msg);
  zoneChat.scrollTop = zoneChat.scrollHeight;

  messagesActuels.push({ type, texte, time: new Date().toLocaleTimeString() });
}

// ===== ENVOI =====
async function envoyerMessage() {
  const texte = champTexte.value.trim();
  if (!texte) return;

  ajouterMessage('user', texte);
  champTexte.value = '';

  // Animation avion - créer un élément qui s'envole
  const btnRect = boutonEnvoyer.getBoundingClientRect();
  const avionVolant = document.createElement('div');
  avionVolant.className = 'avion-volant';
  avionVolant.textContent = '✈️';
  avionVolant.style.left = (btnRect.left + btnRect.width / 2) + 'px';
  avionVolant.style.top = (btnRect.top + btnRect.height / 2) + 'px';
  document.getElementById('conteneur-avions').appendChild(avionVolant);

  // Animation
  setTimeout(() => {
    avionVolant.style.animation = 'avionEnvole 1.5s ease-in forwards';
  }, 10);

  // Nettoyer après animation
  setTimeout(() => {
    avionVolant.remove();
  }, 1500);

  try {
    const apiUrl = window.TOKYO_API_URL ?? 'http://localhost:8000';
    const response = await fetch(`${apiUrl}/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: texte, personnalite: personnaliteActive })
    });

    if (!response.ok) throw new Error('Erreur API');

    const data = await response.json();
    const rep = renderMarkdown(data.response)
      + '<hr class="joke-sep"><em class="joke-text">' + escapeHtml(data.joke) + '</em>';
    ajouterMessage('bot', rep);
  } catch (error) {
    ajouterMessage('bot', '❌ Erreur serveur. Vérifie que l\'API est en cours d\'exécution.');
  }
}

// ===== CHANGEMENT DE PERSONNALITE =====
function changerPersonnalite(p) {
  personnaliteActive = p;
  localStorage.setItem('personnaliteActive', p);
  mettreAJourHeader();
  sauvegarderHistoriqueChat();

  // Update active button
  document.querySelectorAll('.btn-personality').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.personality === p) btn.classList.add('active');
  });
}

// ===== NOUVEAU CHAT =====
function demarrerNouveauChat() {
  sauvegarderHistoriqueChat();
  messagesActuels = [];
  zoneChat.innerHTML = '';
  champTexte.value = '';
  ajouterMessage('bot', `Salut ! Je suis ton ${PERSONNALITES[personnaliteActive].label.toLowerCase()} 👨‍🏫<br>Comment puis-je t'aider ?`);
}

// ===== 20 JEUX BONUS =====
const JEUX_BONUS = [
  { nom: 'Snake', icon: '🐍' },
  { nom: 'Tetris', icon: '🧩' },
  { nom: 'Flappy', icon: '🐦' },
  { nom: 'Pac-Man', icon: '👻' },
  { nom: 'Space', icon: '👾' },
  { nom: 'Dino Run', icon: '🦖' },
  { nom: 'Brick', icon: '🧱' },
  { nom: 'Pong', icon: '🏓' },
  { nom: 'Memory', icon: '🧠' },
  { nom: 'Mines', icon: '💣' },
  { nom: 'Chess', icon: '♟️' },
  { nom: 'Connect4', icon: '🔴' },
  { nom: 'Sudoku', icon: '🔢' },
  { nom: 'Match3', icon: '💎' },
  { nom: 'Tic Tac', icon: '❌' },
  { nom: 'Dice', icon: '🎲' },
  { nom: 'Blackjack', icon: '🎰' },
  { nom: 'Quiz', icon: '❓' },
  { nom: 'Boom', icon: '💥' },
  { nom: 'Pilot', icon: '✈️' }
];

function afficherJeuxBonus() {
  const modal = document.getElementById('modal-jeux-bonus');
  const grille = document.getElementById('grille-jeux');

  const JEUX_FONCTIONS = {
    'Snake': lancerSnake,
    'Tetris': lancerTetris,
    'Flappy': lancerFlappy,
    'Pac-Man': lancerPacman,
    'Space': lancerSpace,
    'Dino Run': lancerDino,
    'Brick': lancerBrick,
    'Pong': lancerPong,
    'Memory': lancerMemory,
    'Mines': lancerMines,
    'Chess': lancerChess,
    'Connect4': lancerConnect4,
    'Sudoku': lancerSudoku,
    'Match3': lancerMatch3,
    'Tic Tac': lancerTicTac,
    'Dice': lancerDice,
    'Blackjack': lancerBlackjack,
    'Quiz': lancerQuiz,
    'Boom': lancerBoom,
    'Pilot': lancerPilot
  };

  grille.innerHTML = '';
  JEUX_BONUS.forEach(jeu => {
    const div = document.createElement('div');
    div.className = 'jeu-bonus';
    const func = JEUX_FONCTIONS[jeu.nom];
    div.onclick = func || (() => alert(`🎮 ${jeu.nom} - Erreur!`));
    div.innerHTML = `
      <div class="jeu-bonus-icon">${jeu.icon}</div>
      <div class="jeu-bonus-nom">${jeu.nom}</div>
    `;
    grille.appendChild(div);
  });

  modal.classList.add('active');
}

function fermerJeuxBonus() {
  document.getElementById('modal-jeux-bonus').classList.remove('active');
}

// ===== HISTORIQUE =====
function sauvegarderHistoriqueChat() {
  if (messagesActuels.length === 0) return;

  const historique = JSON.parse(localStorage.getItem('chatHistory') || '{}');
  const titre = `Chat ${Object.keys(historique).length + 1}`;
  const timestamp = new Date().toISOString();

  historique[timestamp] = {
    titre,
    personnalite: personnaliteActive,
    messages: messagesActuels
  };

  localStorage.setItem('chatHistory', JSON.stringify(historique));
}

function chargerHistoriqueChat() {
  const historique = JSON.parse(localStorage.getItem('chatHistory') || '{}');
  const historyList = document.querySelector('.history-list');

  if (!historyList) return;

  historyList.innerHTML = '';
  Object.entries(historique).forEach(([timestamp, chat]) => {
    const btn = document.createElement('button');
    btn.className = 'btn-history';
    btn.textContent = `${chat.titre} (${chat.personnalite})`;
    btn.addEventListener('click', () => afficherConversation(chat));
    historyList.appendChild(btn);
  });
}

function afficherConversation(chat) {
  messagesActuels = [...chat.messages];
  personnaliteActive = chat.personnalite;
  mettreAJourHeader();

  document.querySelectorAll('.btn-personality').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.personality === personnaliteActive);
  });

  zoneChat.innerHTML = '';
  chat.messages.forEach(msg => {
    ajouterMessage(msg.type, msg.texte);
  });
}
