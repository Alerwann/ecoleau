

const app = require('./app');

 // Vos routes sont bien préfixées par /api

app.listen(3001, () => {
  console.log('Serveur démarré sur http://localhost:3001');
});