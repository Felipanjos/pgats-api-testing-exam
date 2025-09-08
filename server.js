import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor Pokémon Teams API rodando na porta ${PORT}`);
  console.log(`📚 Documentação disponível em: http://localhost:${PORT}/api-docs`);
  console.log(`🔍 Health check disponível em: http://localhost:${PORT}/health`);
});
