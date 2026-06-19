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
  'Animes': { icon: '🎬', label: 'Expert en Animes' },
  'Révision': { icon: '📝', label: 'Fiche de Révision' }
};

// ===== TRADUCTIONS =====
const LANGUES = {
  fr: {
    placeholder: 'Écris ton message ici...',
    envoyer: 'Envoyer',
    nouveauChat: '🔄 Nouveau Chat',
    retour: '← Retour Accueil',
    personnalites: '🤖 Personnalités',
    historique: '📜 Historique',
    salut: (label) => `Salut ! Je suis ton ${label} 👨‍🏫<br>Comment puis-je t'aider ?`,
    erreur: "❌ Erreur serveur. Vérifie que l'API est en cours d'exécution.",
    btnLangue: '🇫🇷 FR'
  },
  en: {
    placeholder: 'Type your message here...',
    envoyer: 'Send',
    nouveauChat: '🔄 New Chat',
    retour: '← Back Home',
    personnalites: '🤖 Personalities',
    historique: '📜 History',
    salut: (label) => `Hey! I'm your ${label} 👨‍🏫<br>How can I help you?`,
    erreur: '❌ Server error. Make sure the API is running.',
    btnLangue: '🇬🇧 EN'
  },
  es: {
    placeholder: 'Escribe tu mensaje aquí...',
    envoyer: 'Enviar',
    nouveauChat: '🔄 Nuevo Chat',
    retour: '← Inicio',
    personnalites: '🤖 Personalidades',
    historique: '📜 Historial',
    salut: (label) => `¡Hola! Soy tu ${label} 👨‍🏫<br>¿En qué puedo ayudarte?`,
    erreur: '❌ Error del servidor. Verifica que la API esté activa.',
    btnLangue: '🇪🇸 ES'
  },
  de: {
    placeholder: 'Schreib deine Nachricht hier...',
    envoyer: 'Senden',
    nouveauChat: '🔄 Neuer Chat',
    retour: '← Startseite',
    personnalites: '🤖 Persönlichkeiten',
    historique: '📜 Verlauf',
    salut: (label) => `Hallo! Ich bin dein ${label} 👨‍🏫<br>Wie kann ich dir helfen?`,
    erreur: '❌ Serverfehler. Überprüfe ob die API läuft.',
    btnLangue: '🇩🇪 DE'
  },
  it: {
    placeholder: 'Scrivi il tuo messaggio qui...',
    envoyer: 'Invia',
    nouveauChat: '🔄 Nuova Chat',
    retour: '← Home',
    personnalites: '🤖 Personalità',
    historique: '📜 Cronologia',
    salut: (label) => `Ciao! Sono il tuo ${label} 👨‍🏫<br>Come posso aiutarti?`,
    erreur: "❌ Errore del server. Verifica che l'API sia attiva.",
    btnLangue: '🇮🇹 IT'
  },
  pt: {
    placeholder: 'Escreve a tua mensagem aqui...',
    envoyer: 'Enviar',
    nouveauChat: '🔄 Novo Chat',
    retour: '← Início',
    personnalites: '🤖 Personalidades',
    historique: '📜 Histórico',
    salut: (label) => `Olá! Sou o teu ${label} 👨‍🏫<br>Como posso ajudar-te?`,
    erreur: '❌ Erro do servidor. Verifica se a API está ativa.',
    btnLangue: '🇵🇹 PT'
  },
  ja: {
    placeholder: 'メッセージを入力してください...',
    envoyer: '送信',
    nouveauChat: '🔄 新しいチャット',
    retour: '← ホームへ',
    personnalites: '🤖 キャラクター',
    historique: '📜 履歴',
    salut: (label) => `こんにちは！あなたの${label}です 👨‍🏫<br>何でも聞いてください！`,
    erreur: '❌ サーバーエラー。APIが起動しているか確認してください。',
    btnLangue: '🇯🇵 JA'
  }
};

const LANGUES_ORDER = ['fr', 'en', 'es', 'de', 'it', 'pt', 'ja'];

// ===== VARIABLES D'ETAT =====
let personnaliteActive = localStorage.getItem('personnaliteActive') || 'France';
let langueActive = localStorage.getItem('langueActive') || 'fr';
let messagesActuels = [];

// ===== DOM ELEMENTS (set in initApp) =====
let zoneChat, champTexte, boutonEnvoyer, headerPersonnalite;

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  zoneChat = document.getElementById('zone-chat');
  champTexte = document.getElementById('champ-texte');
  boutonEnvoyer = document.getElementById('bouton-envoyer');
  headerPersonnalite = document.querySelector('header .personality');

  appliquerLangue();
  mettreAJourHeader();
  chargerHistoriqueChat();

  boutonEnvoyer.addEventListener('click', envoyerMessage);
  champTexte.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') envoyerMessage();
  });
  champTexte.focus();
}

// ===== LANGUE =====
function toggleLangue() {
  const idx = LANGUES_ORDER.indexOf(langueActive);
  langueActive = LANGUES_ORDER[(idx + 1) % LANGUES_ORDER.length];
  localStorage.setItem('langueActive', langueActive);
  appliquerLangue();
}

function appliquerLangue() {
  const t = LANGUES[langueActive] || LANGUES.fr;

  const btnLangue = document.getElementById('btn-langue');
  if (btnLangue) btnLangue.textContent = t.btnLangue;

  const envoyerText = document.getElementById('envoyer-text');
  if (envoyerText) envoyerText.textContent = t.envoyer;

  if (champTexte) champTexte.placeholder = t.placeholder;

  const btnNewChat = document.querySelector('.btn-new-chat[data-action="new"]');
  if (btnNewChat) btnNewChat.textContent = t.nouveauChat;

  const btnRetour = document.querySelector('.btn-new-chat[data-action="retour"]');
  if (btnRetour) btnRetour.textContent = t.retour;

  document.querySelectorAll('aside h3').forEach((h, i) => {
    if (i === 0) h.textContent = t.personnalites;
    if (i === 1) h.textContent = t.historique;
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
  const conteneur = document.getElementById('conteneur-avions');
  if (conteneur) conteneur.appendChild(avionVolant);

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
      body: JSON.stringify({ question: texte, personnalite: personnaliteActive, langue: langueActive })
    });

    if (!response.ok) throw new Error('Erreur API');

    const data = await response.json();
    const rep = renderMarkdown(data.response)
      + '<hr class="joke-sep"><em class="joke-text">' + escapeHtml(data.joke) + '</em>';
    ajouterMessage('bot', rep);
  } catch (error) {
    ajouterMessage('bot', LANGUES[langueActive].erreur);
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
  ajouterMessage('bot', LANGUES[langueActive].salut(PERSONNALITES[personnaliteActive].label.toLowerCase()));
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

function supprimerHistorique() {
  localStorage.removeItem('chatHistory');
  chargerHistoriqueChat();
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
