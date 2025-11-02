import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState([
    { 
      text: "Bonjour ! Je suis Lunéa, votre conseillère beauté intelligente. 🌸\nPour commencer, dites-moi : avez-vous la peau grasse, sèche, mixte ou normale ?", 
      from: 'bot' 
    }
  ]);
  const [input, setInput] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { text: input, from: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulation IA intelligente
    setTimeout(() => {
      const lower = input.toLowerCase();
      let botResponse = "Merci ! ";
      let products = [];

      if (lower.includes('grasse') || lower.includes('brillante') || lower.includes('acné')) {
        botResponse += "Je vous recommande des produits matifiants et purifiants.";
        products = ['Gel Nettoyant Purifiant A', 'Sérum Matifiant B', 'Crème Légère C'];
      } 
      else if (lower.includes('sèche') || lower.includes('desséchée') || lower.includes('tiraille')) {
        botResponse += "Votre peau a besoin d’hydratation intense.";
        products = ['Crème Riche Hydratante X', 'Huile Nourrissante Y', 'Masque Réparateur Z'];
      }
      else if (lower.includes('mixte') || lower.includes('zone t')) {
        botResponse += "Équilibrons votre zone T et vos joues.";
        products = ['Lotion Équilibrante M', 'Gel-Crème N', 'Poudre Matifiante P'];
      }
      else if (lower.includes('normale')) {
        botResponse += "Parfait ! On peut prévenir ou sublimer.";
        products = ['Sérum Antioxydant Q', 'Crème de Jour R', 'Eau Thermale S'];
      }
      else {
        botResponse += "Pouvez-vous préciser votre type de peau ou vos préoccupations ?";
      }

      setMessages(prev => [...prev, { text: botResponse, from: 'bot' }]);
      if (products.length > 0) {
        setRecommendations(products);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm p-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <Sparkles className="w-9 h-9 text-purple-600 animate-pulse" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Lunéa
          </h1>
          <span className="text-sm text-purple-600 ml-2">Conseillère Beauté IA</span>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full p-4 flex flex-col lg:flex-row gap-6">
        {/* Chatbot */}
        <div className="flex-1 bg-white/90 backdrop-blur rounded-2xl shadow-xl p-6 flex flex-col">
          <h2 className="text-xl font-semibold text-purple-800 mb-4">Parlez-moi de votre peau</h2>
          
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2 max-h-96">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-5 py-3 rounded-3xl shadow-sm ${
                    msg.from === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'bg-gray-100 text-gray-800 border border-purple-100'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ex: J'ai la peau grasse et de l'acné..."
              className="flex-1 px-5 py-3 border border-purple-200 rounded-full focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
            />
            <button
              onClick={handleSend}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-full hover:scale-105 transition transform"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Recommandations */}
        {recommendations.length > 0 && (
          <div className="lg:w-96 bg-white/90 backdrop-blur rounded-2xl shadow-xl p-6 animate-slideIn">
            <h2 className="text-xl font-semibold text-purple-800 mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              Recommandations personnalisées
            </h2>
            <div className="space-y-3">
              {recommendations.map((product, i) => (
                <div 
                  key={i} 
                  className="group border border-purple-200 rounded-xl p-4 hover:border-purple-400 hover:shadow-md transition-all"
                >
                  <p className="font-semibold text-purple-900">{product}</p>
                  <p className="text-sm text-purple-600 mt-1">Adapté à votre peau</p>
                  <button className="mt-2 text-xs text-purple-600 underline opacity-0 group-hover:opacity-100 transition">
                    Voir le produit →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;