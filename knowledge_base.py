import random
from typing import List, Dict

class KnowledgeBase:
    def __init__(self):
        self.entries = [
            {
                "keywords": ["bonjour", "salut", "coucou", "hello"],
                "response": "Salut ! Comment puis-je t'aider aujourd'hui ? 😊",
                "jokes": [
                    "Pourquoi les poissons ne disent jamais bonjour ? Parce qu'ils ont peur du filet ! 🎣",
                    "Qu'est-ce qu'un robot qui dit bonjour ? Un hello-bot ! 👋",
                    "Pourquoi les crocodiles disent bonjour le matin ? Parce qu'ils sont de bonne dent ! 🐊"
                ]
            },
            {
                "keywords": ["qui es-tu", "qui es tu", "ton nom", "tu es qui"],
                "response": "Je suis un chatbot créé avec du HTML, du CSS, du JavaScript et Python/FastAPI ! 🤖",
                "jokes": [
                    "Pourquoi les chatbots ne disent pas bonjour ? Parce qu'ils sont trop HTML pour ça ! 💻",
                    "Quel est le comble pour un chatbot ? De ne pas connaître sa fonction ! 😂",
                    "Pourquoi les chatbots n'aiment pas les secrets ? Parce qu'ils mettent tout en CSS ! 🎨"
                ]
            },
            {
                "keywords": ["merci"],
                "response": "Avec plaisir ! 🙌",
                "jokes": [
                    "Pourquoi les robots ne disent jamais merci ? Parce qu'ils manquent de batterie pour la politesse ! 🔋",
                    "Qu'est-ce qu'un bot qui dit merci ? Un bot respectueux ! 😇",
                    "Merci pour quoi ? Ah oui, tu as cliqué sur le bouton ! 😆"
                ]
            },
            {
                "keywords": ["aide", "help", "?", "commandes"],
                "response": "Voici ce que je sais faire : bonjour, qui es-tu, merci, aide. Pose-moi une question ! 🤖",
                "jokes": [
                    "Pourquoi les chatbots aiment aider ? Parce qu'ils n'ont rien de mieux à faire ! 😅",
                    "Quel est le comble pour quelqu'un qui demande de l'aide ? De n'avoir personne à qui demander ! 🆘",
                    "L'aide, c'est comme un héros, sauf que c'est moi ! 🦸‍♂️"
                ]
            }
        ]

    def contains_keywords(self, text: str, keywords: List[str]) -> bool:
        """Check if the text contains any of the keywords"""
        return any(keyword in text for keyword in keywords)

    def get_response(self, question: str) -> Dict[str, str]:
        """Get response and joke for a given question"""
        # Normalize question
        normalized_question = question.lower().strip()

        # Search for matching entry
        for entry in self.entries:
            if self.contains_keywords(normalized_question, entry["keywords"]):
                joke = random.choice(entry["jokes"])
                return {
                    "response": entry["response"],
                    "joke": joke
                }

        # Default response if no match found
        return {
            "response": "Je n'ai pas compris ta question 🤔 Tape 'aide' pour voir ce que je sais faire.",
            "joke": "Pourquoi tu me poses une question que je ne comprends pas ? Parce que tu es un blagueur ! 😆"
        }

    def get_all_commands(self) -> List[str]:
        """Get all available commands"""
        commands = []
        for entry in self.entries:
            commands.append(entry["keywords"][0])
        return commands
