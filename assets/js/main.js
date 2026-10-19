// Chat with Jason (proxied through a Cloudflare Worker).
(function () {
  var cfg = window.CHAT_CONFIG;
  var btn = document.getElementById('chatBtn');
  if (!cfg || !btn) return;
  var panel = document.getElementById('chatPanel');
  var closeBtn = document.getElementById('chatClose');
  var list = document.getElementById('chatMessages');
  var form = document.getElementById('chatForm');
  var input = document.getElementById('chatInput');
  var send = document.getElementById('chatSend');
  var sugs = document.getElementById('chatSuggestions');
  var history = [];

  function setOpen(open) {
    panel.hidden = !open;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) input.focus(); else btn.focus();
  }
  btn.addEventListener('click', function () { setOpen(panel.hidden); });
  closeBtn.addEventListener('click', function () { setOpen(false); });
  panel.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });

  function add(role, text) {
    var wrap = document.createElement('div');
    wrap.className = 'chat-msg ' + role;
    var b = document.createElement('div');
    b.className = 'chat-bubble';
    b.textContent = text;
    wrap.appendChild(b);
    list.appendChild(wrap);
    list.scrollTop = list.scrollHeight;
    return wrap;
  }
  function typing() {
    var wrap = document.createElement('div');
    wrap.className = 'chat-msg assistant';
    var t = document.createElement('div');
    t.className = 'chat-typing';
    t.setAttribute('aria-label', 'Typing');
    for (var i = 0; i < 3; i++) t.appendChild(document.createElement('span'));
    wrap.appendChild(t);
    list.appendChild(wrap);
    list.scrollTop = list.scrollHeight;
    return wrap;
  }

  async function ask(text) {
    text = (text || '').trim();
    if (!text) return;
    input.value = '';
    if (sugs) sugs.hidden = true;
    add('user', text);
    history.push({ role: 'user', content: text });
    var t = typing();
    send.disabled = true;
    try {
      var res = await fetch(cfg.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: cfg.model, max_tokens: 1000, system: cfg.system, messages: history })
      });
      var data = await res.json();
      var reply = (data && data.content && data.content[0] && data.content[0].text) || 'Sorry, something went sideways. Try again.';
      t.remove();
      add('assistant', reply);
      history.push({ role: 'assistant', content: reply });
    } catch (err) {
      t.remove();
      add('assistant', 'Something broke on my end. Probably a sign you should just email me directly.');
    }
    send.disabled = false;
    input.focus();
  }

  form.addEventListener('submit', function (e) { e.preventDefault(); ask(input.value); });
  if (sugs) sugs.querySelectorAll('.chat-suggestion').forEach(function (s) {
    s.addEventListener('click', function () { ask(s.textContent); });
  });
})();

// Awards page: filter groups by show.
(function () {
  var chips = document.querySelectorAll('.chip[data-filter]');
  if (!chips.length) return;
  var groups = document.querySelectorAll('.award-group');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter');
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
      groups.forEach(function (g) {
        g.hidden = !(f === 'all' || g.getAttribute('data-group') === f);
      });
    });
  });
})();
