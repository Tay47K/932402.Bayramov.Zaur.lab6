const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Массив цитат
const quotes = [
  { text: 'Бытие определяет сознание.', author: 'Карл Маркс', lang: 'ru' },
  { text: 'Век живи — век учись.', author: 'Русская пословица', lang: 'ru' },
  { text: 'Нет ничего практичнее хорошей теории.', author: 'Людвиг Больцман', lang: 'ru' },
  { text: 'Не откладывай на завтра то, что можно сделать сегодня.', author: 'Бенджамин Франклин', lang: 'ru' },
  { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs', lang: 'en' },
  { text: 'Simplicity is the ultimate sophistication.', author: 'Leonardo da Vinci', lang: 'en' },
  { text: 'Talk is cheap. Show me the code.', author: 'Linus Torvalds', lang: 'en' },
  { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson', lang: 'en' }
];

// Статика: HTML, CSS, JS, manifest, service worker, иконки
app.use(express.static(path.join(__dirname, 'public'), { index: false }));

// GET /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET /about
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// GET /api/status
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), quotes: quotes.length });
});

// GET /api/quote[?lang=en]
app.get('/api/quote', (req, res) => {
  const { lang } = req.query;                       // query-параметр
  const pool = lang ? quotes.filter(q => q.lang === lang) : quotes;

  if (pool.length === 0) {
    return res.status(500).json({ error: 'No quotes available' });
  }
  const q = pool[Math.floor(Math.random() * pool.length)];
  res.json({ text: q.text, author: q.author, lang: q.lang });
});

// GET /api/quote/:id — параметр маршрута (демонстрация req.params)
app.get('/api/quote/:id', (req, res) => {
  const id = Number(req.params.id);
  const q = quotes[id];
  if (!Number.isInteger(id) || !q) {
    return res.status(404).json({ error: 'Quote not found' });
  }
  res.json({ text: q.text, author: q.author, lang: q.lang });
});

app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
