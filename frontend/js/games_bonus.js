// ===== 20 MINI JEUX BONUS =====

// Dice Game
function lancerDice() {
  const resultat = Math.floor(Math.random() * 6) + 1;
  alert(`🎲 Tu as obtenu: ${resultat}\n\nTire encore!`);
}

// Tic Tac Toe
function lancerTicTac() {
  window._ticBoard = ['', '', '', '', '', '', '', '', ''];
  window._ticPlayer = 'X';
  renderTicTac();
  document.getElementById('modal-jeu').style.display = 'flex';
}

function renderTicTac() {
  const modal = document.getElementById('modal-jeu');
  const board = window._ticBoard;
  modal.innerHTML = `
    <div class="jeu-container">
      <h3>❌ TIC TAC TOE ❌</h3>
      <div id="tic-tac-board" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin: 20px 0;">
        ${board.map((cell, i) => `<button style="padding: 20px; font-size: 1.5rem; background: #DAA520; border: none; cursor: pointer;" onclick="playTicTac(${i})">${cell}</button>`).join('')}
      </div>
      <p>Joueur: ${window._ticPlayer}</p>
      <button onclick="closeMiniGame()" style="padding: 10px 20px; background: #FF6347; color: white; border: none; cursor: pointer;">Fermer</button>
    </div>
  `;
}

function checkTicWinner(board) {
  const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for (const [a,b,c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return null;
}

window.playTicTac = function(i) {
  const board = window._ticBoard;
  if (board[i] || checkTicWinner(board)) return;
  board[i] = window._ticPlayer;
  const winner = checkTicWinner(board);
  if (winner) {
    renderTicTac();
    setTimeout(() => alert(`🏆 ${winner} a gagné!`), 50);
    return;
  }
  if (board.every(c => c)) {
    renderTicTac();
    setTimeout(() => alert('🤝 Match nul!'), 50);
    return;
  }
  window._ticPlayer = window._ticPlayer === 'X' ? 'O' : 'X';
  renderTicTac();
};

// Memory Game
function lancerMemory() {
  const emojis = ['🍎', '🍌', '🍒', '🍓', '🍊', '🍋', '🍎', '🍌', '🍒', '🍓', '🍊', '🍋'];
  const shuffled = emojis.sort(() => Math.random() - 0.5);

  window._memFirst = null;
  window._memMatched = 0;

  const modal = document.getElementById('modal-jeu');
  let html = `
    <div class="jeu-container">
      <h3>🧠 MEMORY 🧠</h3>
      <div id="memory-board" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 20px 0;">
  `;

  shuffled.forEach((emoji, i) => {
    html += `<button id="card-${i}" style="padding: 15px; font-size: 1.2rem; background: #DAA520; border: none; cursor: pointer; transition: 0.2s;" onclick="flipCard(${i})" data-emoji="${emoji}">?</button>`;
  });

  html += `
      </div>
      <p>Trouvé: ${matched}/6</p>
      <button onclick="closeMiniGame()" style="padding: 10px 20px; background: #FF6347; color: white; border: none; cursor: pointer;">Fermer</button>
    </div>
  `;

  modal.innerHTML = html;
  modal.style.display = 'flex';
}

function flipCard(index) {
  const card = document.getElementById(`card-${index}`);
  if (!card || card.disabled || card.textContent !== '?') return;

  const emoji = card.dataset.emoji;
  card.textContent = emoji;
  card.style.background = '#8B6914';

  if (!window._memFirst) {
    window._memFirst = { index, emoji, card };
    return;
  }

  const first = window._memFirst;
  window._memFirst = null;

  if (first.emoji === emoji) {
    first.card.disabled = true;
    card.disabled = true;
    window._memMatched = (window._memMatched || 0) + 1;
    const counter = document.querySelector('#modal-jeu p');
    if (counter) counter.textContent = `Trouvé: ${window._memMatched}/6`;
    if (window._memMatched === 6) setTimeout(() => alert('🎉 Bravo! Tu as trouvé toutes les paires!'), 200);
  } else {
    setTimeout(() => {
      first.card.textContent = '?';
      first.card.style.background = '#DAA520';
      card.textContent = '?';
      card.style.background = '#DAA520';
    }, 800);
  }
}

// Quiz Game
function lancerQuiz() {
  const questions = [
    { q: 'Quel est le plus grand océan?', options: ['Atlantique', 'Pacifique', 'Indien'], answer: 1 },
    { q: 'Quelle est la capitale de la France?', options: ['Lyon', 'Paris', 'Marseille'], answer: 1 },
    { q: 'Combien de côtés a un hexagone?', options: ['4', '5', '6'], answer: 2 },
    { q: 'Quel est le plus haut sommet?', options: ['Everest', 'K2', 'Kilimandjaro'], answer: 0 }
  ];

  let score = 0;
  let qIndex = 0;

  function showQuestion() {
    if (qIndex >= questions.length) {
      alert(`✅ Quiz terminé!\nScore: ${score}/${questions.length}`);
      closeMiniGame();
      return;
    }

    const q = questions[qIndex];
    let html = `
      <div class="jeu-container">
        <h3>❓ QUIZ ❓</h3>
        <p style="font-size: 1.1rem; margin: 20px 0;">${q.q}</p>
        <div style="display: flex; flex-direction: column; gap: 10px;">
    `;

    q.options.forEach((opt, i) => {
      html += `<button onclick="answerQuiz(${i}, ${q.answer})" style="padding: 10px; background: #DAA520; border: none; cursor: pointer; font-weight: 700;">${opt}</button>`;
    });

    html += `
        </div>
        <p>Question ${qIndex + 1}/${questions.length} | Score: ${score}</p>
      </div>
    `;

    document.getElementById('modal-jeu').innerHTML = html;
  }

  window.answerQuiz = function(chosen, correct) {
    if (chosen === correct) score++;
    qIndex++;
    showQuestion();
  };

  document.getElementById('modal-jeu').style.display = 'flex';
  showQuestion();
}

// Blackjack
function lancerBlackjack() {
  let playerScore = 0;
  let dealerScore = 0;
  let gameOver = false;

  function getRandomCard() {
    return Math.floor(Math.random() * 10) + 1;
  }

  playerScore = getRandomCard() + getRandomCard();
  dealerScore = getRandomCard();

  function showBlackjackGame() {
    let html = `
      <div class="jeu-container">
        <h3>🎰 BLACKJACK 🎰</h3>
        <p>Dealer: ${dealerScore}</p>
        <p style="font-size: 1.5rem;">Tu as: ${playerScore}</p>
        ${gameOver ? `<p style="font-weight: 700;">${playerScore > 21 ? '💥 Busted!' : playerScore === 21 ? '🎉 BLACKJACK!' : '✅ Bon score'}</p>` : ''}
        <div style="display: flex; gap: 10px; margin: 20px 0;">
          ${!gameOver ? `
            <button onclick="hitBlackjack()" style="padding: 10px 20px; background: #FFD700; border: none; cursor: pointer;">Hit</button>
            <button onclick="standBlackjack()" style="padding: 10px 20px; background: #FF6347; color: white; border: none; cursor: pointer;">Stand</button>
          ` : ''}
        </div>
        <button onclick="closeMiniGame()" style="padding: 10px 20px; background: #555; color: white; border: none; cursor: pointer;">Fermer</button>
      </div>
    `;
    document.getElementById('modal-jeu').innerHTML = html;
  }

  window.hitBlackjack = function() {
    playerScore += getRandomCard();
    if (playerScore > 21) gameOver = true;
    showBlackjackGame();
  };

  window.standBlackjack = function() {
    gameOver = true;
    showBlackjackGame();
  };

  document.getElementById('modal-jeu').style.display = 'flex';
  showBlackjackGame();
}

// Snake Game (simplifié)
function lancerSnake() {
  alert('🐍 Snake\n\nVite! Il y a trop de code pour Snake.\nJeu bientôt disponible! 🚀');
}

// Tetris (simplifié)
function lancerTetris() {
  alert('🧩 Tetris\n\nVite! Il y a trop de code pour Tetris.\nJeu bientôt disponible! 🚀');
}

// Flappy Bird
function lancerFlappy() {
  alert('🐦 Flappy Bird\n\nTrop complexe pour le moment.\nJeu bientôt disponible! 🚀');
}

// Pac-Man
function lancerPacman() {
  alert('👻 Pac-Man\n\nTrop complexe pour le moment.\nJeu bientôt disponible! 🚀');
}

// Space Invaders
function lancerSpace() {
  alert('👾 Space Invaders\n\nTrop complexe pour le moment.\nJeu bientôt disponible! 🚀');
}

// Dino Run
function lancerDino() {
  alert('🦖 Dino Run\n\nTrop complexe pour le moment.\nJeu bientôt disponible! 🚀');
}

// Brick Breaker
function lancerBrick() {
  alert('🧱 Brick Breaker\n\nTrop complexe pour le moment.\nJeu bientôt disponible! 🚀');
}

// Pong
function lancerPong() {
  alert('🏓 Pong\n\nTrop complexe pour le moment.\nJeu bientôt disponible! 🚀');
}

// Minesweeper
function lancerMines() {
  alert('💣 Minesweeper\n\nTrop complexe pour le moment.\nJeu bientôt disponible! 🚀');
}

// Chess
function lancerChess() {
  alert('♟️ Chess\n\nTrop complexe pour le moment.\nJeu bientôt disponible! 🚀');
}

// Connect 4
function lancerConnect4() {
  alert('🔴 Connect 4\n\nTrop complexe pour le moment.\nJeu bientôt disponible! 🚀');
}

// Sudoku
function lancerSudoku() {
  alert('🔢 Sudoku\n\nTrop complexe pour le moment.\nJeu bientôt disponible! 🚀');
}

// Match 3
function lancerMatch3() {
  alert('💎 Match 3\n\nTrop complexe pour le moment.\nJeu bientôt disponible! 🚀');
}

// Boom (Bomberman)
function lancerBoom() {
  alert('💥 Bomberman\n\nTrop complexe pour le moment.\nJeu bientôt disponible! 🚀');
}

// Pilot (Flight)
function lancerPilot() {
  alert('✈️ Pilot\n\nTrop complexe pour le moment.\nJeu bientôt disponible! 🚀');
}

// Utilitaires
function closeMiniGame() {
  document.getElementById('modal-jeu').style.display = 'none';
}
