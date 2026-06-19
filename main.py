#!/usr/bin/env python3
"""
TOKYO Chatbot API Server
Backend pour le chatbot TOKYO avec support multi-personnalités
"""

import http.server
import json
import os
import random
from socketserver import ThreadingMixIn

# ===== CHARGER .env =====
def load_env_file(filepath):
    """Charge les variables du fichier .env"""
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    os.environ[key.strip()] = value.strip()

load_env_file(os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env'))

# ===== CONFIGURATION =====
API_HOST = '0.0.0.0'
API_PORT = 8000

# ===== BLAGUES =====
BLAGUES = [
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
]

# ===== SYSTEM PROMPTS PAR PERSONNALITE =====
SYSTEM_PROMPTS = {
    'France': "Tu es un professeur d'histoire et de géographie passionné par la France. Réponds avec enthousiasme et partage tes connaissances.",
    'Mathématiques': "Tu es un prof de maths patient et bienveillant. Explique les concepts de façon simple et amusante.",
    'Physique': "Tu es un physicien enthousiaste qui rend la science accessible et fascinante.",
    'Amis': "Tu es un ami sympa et drôle. Sois casual, souriant et bienveillant dans tes réponses.",
    'Mangas': "Tu es un expert en mangas et otaku passionné. Parle avec enthousiasme de manga et d'anime.",
    'Animes': "Tu es un expert en anime. Donne des avis éclairés et partage ton amour pour les animes."
}


class ChatHandler(http.server.BaseHTTPRequestHandler):
    """Gestionnaire HTTP pour l'API TOKYO"""

    def do_POST(self):
        """Traite les requêtes POST"""
        if self.path == '/ask':
            try:
                content_length = int(self.headers.get('Content-Length', 0))
                if content_length > 10_000:
                    self.send_error(413, 'Request too large')
                    return
                body = self.rfile.read(content_length).decode('utf-8')
                data = json.loads(body)

                question = data.get('question', '').strip()
                personnalite = data.get('personnalite', 'France')

                if not question:
                    self.send_error(400, 'Question cannot be empty')
                    return

                response_text = get_response(question, personnalite)
                joke = random.choice(BLAGUES)
            except Exception as e:
                self.send_error(500, f'Server error: {str(e)}')
                return

            # Headers only written after all data is ready — avoids send_error after commit
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            response_json = json.dumps({
                'response': response_text,
                'joke': joke
            })
            self.wfile.write(response_json.encode('utf-8'))
        else:
            self.send_error(404, 'Not found')

    def do_GET(self):
        """Traite les requêtes GET"""
        if self.path == '/health':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            response = json.dumps({
                'status': 'ok',
                'service': 'TOKYO Chatbot API',
                'version': '1.0.0'
            })
            self.wfile.write(response.encode('utf-8'))
        else:
            self.send_error(404, 'Not found')

    def do_OPTIONS(self):
        """Traite les requêtes CORS preflight"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def log_message(self, format, *args):
        """Supprime les logs par défaut"""
        pass


def get_response(question, personnalite='France'):
    """Obtient une réponse de Claude via l'API HTTP"""
    import urllib.request
    import urllib.error

    api_key = os.getenv('ANTHROPIC_API_KEY')
    if not api_key:
        return f"❌ Clé API non configurée"

    system_prompt = SYSTEM_PROMPTS.get(personnalite, SYSTEM_PROMPTS['France'])

    try:
        # Appel HTTP à l'API Claude
        url = "https://api.anthropic.com/v1/messages"
        headers = {
            'Content-Type': 'application/json',
            'x-api-key': api_key,
            'anthropic-version': '2023-06-01'
        }

        data = json.dumps({
            "model": "claude-haiku-4-5-20251001",
            "max_tokens": 1024,
            "system": system_prompt,
            "messages": [{"role": "user", "content": question}]
        }).encode('utf-8')

        req = urllib.request.Request(url, data=data, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as response:
            result = json.loads(response.read().decode('utf-8'))
            return result['content'][0]['text']

    except urllib.error.HTTPError as e:
        error_msg = e.read().decode('utf-8')
        return f"❌ Erreur API: {error_msg[:200]}"
    except Exception as e:
        return f"❌ Erreur: {type(e).__name__}: {str(e)[:100]}"


class ThreadedHTTPServer(ThreadingMixIn, http.server.HTTPServer):
    """Each request runs in its own thread — prevents one slow Claude call from blocking others."""
    daemon_threads = True


if __name__ == '__main__':
    server = ThreadedHTTPServer((API_HOST, API_PORT), ChatHandler)
    print(f'✅ Serveur TOKYO API démarré sur http://{API_HOST}:{API_PORT}')
    print('📡 Endpoints:')
    print('   POST /ask - Poser une question')
    print('   GET /health - Vérifier la santé du serveur')
    print('   OPTIONS /* - Support CORS')
    server.serve_forever()
