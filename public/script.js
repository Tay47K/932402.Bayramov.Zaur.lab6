// --- Регистрация service worker ---
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(r => console.log('SW registered, scope:', r.scope))
      .catch(e => console.error('SW error:', e));
  });
}

// --- Запасные цитаты на случай офлайна ---
  const fallback = [
  { text: 'Бытие определяет сознание.', author: 'Карл Маркс', lang: 'ru' },
  { text: 'Век живи — век учись.', author: 'Русская пословица', lang: 'ru' },
  { text: 'Нет ничего практичнее хорошей теории.', author: 'Людвиг Больцман', lang: 'ru' },
  { text: 'Не откладывай на завтра то, что можно сделать сегодня.', author: 'Бенджамин Франклин', lang: 'ru' },
  { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs', lang: 'en' },
  { text: 'Simplicity is the ultimate sophistication.', author: 'Leonardo da Vinci', lang: 'en' },
  { text: 'Talk is cheap. Show me the code.', author: 'Linus Torvalds', lang: 'en' },
  { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson', lang: 'en' }
];
const textEl = document.getElementById('text');
if (textEl) {
  const authorEl = document.getElementById('author');
  const statusEl = document.getElementById('status');

  async function loadQuote(lang) {
    const url = '/api/quote' + (lang ? `?lang=${encodeURIComponent(lang)}` : '');
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');
      show(data, '');
    } catch (e) {
      const pool = lang ? fallback.filter(q => q.lang === lang) : fallback;
      if (pool.length) show(pool[Math.floor(Math.random() * pool.length)], 'Офлайн: локальная цитата');
      else { textEl.textContent = 'Ошибка'; authorEl.textContent = ''; statusEl.textContent = e.message; }
    }
  }

  function show(q, note) {
    textEl.textContent = '«' + q.text + '»';
    authorEl.textContent = '— ' + q.author + ' (' + q.lang + ')';
    statusEl.textContent = note;
  }

  document.querySelectorAll('button[data-lang]').forEach(b =>
    b.addEventListener('click', () => loadQuote(b.dataset.lang)));
  loadQuote('');
}
