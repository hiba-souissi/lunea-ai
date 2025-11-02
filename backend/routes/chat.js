// routes/chat.js - MODE SIMULATION (SANS OpenAI)
const fs = require('fs');
const path = require('path');

const products = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8')
);

module.exports = (req, res) => {
  const { message } = req.body;
  const lower = message.toLowerCase().trim();

  let botResponse = "";
  let recommendations = [];

  // Analyse du message
  if (lower.includes('bonjour') || lower.includes('salut') || lower.includes('hello')) {
    botResponse = "Bonjour ! Je suis Lunéa, votre conseillère beauté. 🌸\nPour commencer, dites-moi : avez-vous la peau **grasse**, **sèche**, **mixte** ou **normale** ?";
  }
  else if (lower.includes('grasse') || lower.includes('brillante') || lower.includes('acné')) {
    botResponse = "Merci ! Votre peau grasse a besoin de **purification** et de **matité**.\nJe vous recommande :";
    recommendations = products.filter(p => 
      p.skin.some(s => ['grasse', 'acné', 'brillance'].includes(s))
    ).slice(0, 2);
  }
  else if (lower.includes('sèche') || lower.includes('desséchée') || lower.includes('tiraille')) {
    botResponse = "Votre peau sèche a besoin d’**hydratation intense**.\nVoici mes conseils :";
    recommendations = products.filter(p => 
      p.skin.some(s => ['sèche', 'desséchée'].includes(s))
    ).slice(0, 2);
  }
  else if (lower.includes('mixte') || lower.includes('zone t')) {
    botResponse = "Peau mixte ? Équilibrons la **zone T** et les joues !\nSuggestions :";
    recommendations = products.filter(p => p.skin.includes('mixte')).slice(0, 2);
  }
  else if (lower.includes('normale')) {
    botResponse = "Super ! Peau normale = base idéale.\nOn peut prévenir ou sublimer :";
    recommendations = products.filter(p => p.skin.includes('normale')).slice(0, 2);
  }
  else {
    botResponse = "Je n’ai pas bien compris… 😊\nDites-moi simplement : **grasse**, **sèche**, **mixte** ou **normale** ?";
  }

  // Simulation d'une réponse IA (800ms)
  setTimeout(() => {
    res.json({
      response: botResponse,
      recommendations: recommendations.map(p => ({
        name: p.name,
        price: p.price
      }))
    });
  }, 800);
};