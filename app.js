const app = document.getElementById("app");
const STORE_KEY = "lily-english-progress-v1";

const state = {
  route: "home",
  listenId: null,
  listenIndex: 0,
  speakMode: "menu",
  speakIndex: 0,
  speakKind: "repeat",
  readId: null,
  readPage: 0,
  readMode: "page",
  readNote: "",
  showZh: true,
  wordsId: null,
  wordsIndex: 0,
  wordsMode: "cards",
  quizIndex: 0,
  quizOrder: [],
  recognizing: false,
  chatId: null,
  chatStep: 0,
  chatLog: [],
  chatDone: false,
  chatNote: "",
  bookUnit: null,
  bookSection: null,
  bookIndex: 0,
  bookMode: "units",
  bookQuiz: [],
  bookQuizIndex: 0,
  bookScore: 0,
  bookLocked: false,
  bookListen: "zh",
  bookScope: "words",
  bookCover: "none",
  bookChecked: false,
  bookMisses: [],
};

let listenGen = 0;

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveProgress(patch) {
  const next = { ...loadProgress(), ...patch };
  localStorage.setItem(STORE_KEY, JSON.stringify(next));
  return next;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function ensureStreak() {
  const p = loadProgress();
  const stars = p.stars || 0;
  const last = p.lastVisit;
  const t = today();
  let streak = p.streak || 0;
  if (last !== t) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    streak = last === yesterday ? streak + 1 : 1;
    saveProgress({ lastVisit: t, streak, stars });
  } else if (!p.lastVisit) {
    saveProgress({ lastVisit: t, streak: 1, stars });
  }
  return loadProgress();
}

function addStars(n) {
  const p = loadProgress();
  saveProgress({ stars: (p.stars || 0) + n });
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "早上好";
  if (h < 18) return "下午好";
  return "晚上好";
}

let speechToken = 0;
let activeUtterance = null;

function englishUtter(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  utter.rate = 1;
  utter.pitch = 1;
  const voices = window.speechSynthesis.getVoices().filter(
    (voice) => voice.lang.startsWith("en") && !/bad news|bahh|bells|boing|bubbles|cellos|zarvox|trinoids|whisper|deranged/i.test(voice.name)
  );
  const en = voices.find((voice) => /samantha|google us english|google uk english female/i.test(voice.name))
    || voices.find((voice) => voice.lang === "en-US")
    || voices[0];
  if (en) utter.voice = en;
  return utter;
}

function stopSpeech() {
  speechToken += 1;
  activeUtterance = null;
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}

function speakSequence(lines, onIndex) {
  const token = ++speechToken;
  const queue = lines.filter(Boolean);
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  let index = 0;
  const step = () => {
    if (token !== speechToken || index >= queue.length) return;
    const utter = englishUtter(queue[index]);
    activeUtterance = utter;
    const current = index;
    utter.onend = () => {
      if (token !== speechToken) return;
      index += 1;
      window.setTimeout(step, 280);
    };
    utter.onerror = () => {
      if (token !== speechToken) return;
      index += 1;
      window.setTimeout(step, 280);
    };
    if (onIndex) onIndex(current);
    window.speechSynthesis.speak(utter);
  };
  window.setTimeout(step, 120);
}

function speakEn(text) {
  speakSequence([text]);
}

function speakLines(lines) {
  speakSequence(lines);
}

function speakZh(text) {
  speechToken += 1;
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "zh-CN";
  utter.rate = 1;
  utter.pitch = 1;
  activeUtterance = utter;
  window.speechSynthesis.speak(utter);
}

if (window.speechSynthesis) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.addEventListener("voiceschanged", () => {
    window.speechSynthesis.getVoices();
  });
}

function foxSvg() {
  return `<svg class="fox" viewBox="0 0 128 128" aria-hidden="true">
    <ellipse cx="64" cy="86" rx="40" ry="28" fill="#ffedd5"/>
    <path d="M24 54 L38 14 L60 50 Z" fill="#e76f51"/>
    <path d="M104 54 L90 14 L68 50 Z" fill="#e76f51"/>
    <path d="M38 14 L50 42 L60 50 L38 46 Z" fill="#ffedd5"/>
    <path d="M90 14 L78 42 L68 50 L90 46 Z" fill="#ffedd5"/>
    <circle cx="50" cy="78" r="7" fill="#2b2d42"/>
    <circle cx="78" cy="78" r="7" fill="#2b2d42"/>
    <circle cx="52" cy="76" r="2.2" fill="#fff"/>
    <circle cx="80" cy="76" r="2.2" fill="#fff"/>
    <ellipse cx="64" cy="94" rx="8" ry="5.5" fill="#e76f51"/>
  </svg>`;
}

function topbar() {
  const p = ensureStreak();
  return `<header class="topbar">
    <div class="brand">
      <div>
        <h1>Lily English</h1>
        <p>${window.LILY_CONTENT.companion.nameZh} 陪你学英文</p>
      </div>
    </div>
    <div class="stats">
      <div class="pill">⭐ ${p.stars || 0}</div>
      <div class="pill">🔥 ${p.streak || 1} 天</div>
    </div>
  </header>`;
}

function renderHome() {
  app.innerHTML = `${topbar()}
    <section class="hero">
      ${foxSvg()}
      <div>
        <h2>${greeting()}！我是 Pip。</h2>
        <p>今天想听故事、开口说、读一小段，还是记几个新单词？选一个，我们一起玩十分钟就很好。</p>
      </div>
    </section>
    <div class="grid">
      <button class="mode listen" data-go="listen"><span class="emoji">🎧</span><strong>听力</strong><span>听短故事和句子</span></button>
      <button class="mode speak" data-go="speak"><span class="emoji">🎤</span><strong>口语</strong><span>聊天、跟读、小问答</span></button>
      <button class="mode read" data-go="read"><span class="emoji">📖</span><strong>阅读</strong><span>分级小书，一页一页翻</span></button>
      <button class="mode words" data-go="words"><span class="emoji">🃏</span><strong>单词</strong><span>句子卡片 + 小测验</span></button>
      <button class="mode book" data-go="book"><span class="emoji">📘</span><strong>课本学习</strong><span>3A 四个单元，能学也能考</span></button>
    </div>
    <p class="tip">句子比三年级上册稍进一步，会用 because、but、so，小故事里有过去时。用 Safari 打开后，点「分享 → 添加到主屏幕」，就会像 App 一样。口语需要允许麦克风。</p>`;
}

function renderListenList() {
  const cards = window.LILY_CONTENT.listen
    .map(
      (lesson) => `<button class="item" data-listen="${lesson.id}">
        <div class="badge">${lesson.emoji}</div>
        <div><b>${lesson.title}</b><small>${lesson.theme} · ${lesson.titleZh} · 约 ${lesson.minutes} 分钟</small></div>
      </button>`
    )
    .join("");
  app.innerHTML = `${topbar()}
    <div class="nav-row"><button class="back" data-go="home">← 回家</button><h2>听力</h2></div>
    <div class="list">${cards}</div>`;
}

function renderListen() {
  const lesson = window.LILY_CONTENT.listen.find((l) => l.id === state.listenId);
  const line = lesson.lines[state.listenIndex];
  const pct = ((state.listenIndex + 1) / lesson.lines.length) * 100;
  const lines = lesson.lines
    .map(
      (item, i) => `<div class="line ${i === state.listenIndex ? "active" : ""}" data-line="${i}">
        <div class="en">${item.en}</div>
        <div class="zh ${state.showZh ? "" : "hidden"}">${item.zh}</div>
      </div>`
    )
    .join("");
  app.innerHTML = `${topbar()}
    <div class="nav-row"><button class="back" data-go="listen">← 听力</button><h2>${lesson.emoji} ${lesson.title}</h2></div>
    <div class="panel">
      <div class="progress"><span style="width:${pct}%"></span></div>
      ${lines}
      <div class="row-actions">
        <button class="primary" data-action="play-line">听这句</button>
        <button class="secondary" data-action="play-all">整段听</button>
        <button class="ghost" data-action="toggle-zh">${state.showZh ? "先藏中文" : "显示中文"}</button>
        <button class="ghost" data-action="next-line">下一句</button>
      </div>
    </div>`;
}

function renderSpeakMenu() {
  const chats = window.LILY_CONTENT.speak.chats
    .map(
      (chat) => `<button class="item" data-chat="${chat.id}">
        <div class="badge">${chat.emoji}</div>
        <div><b>${chat.titleZh}</b><small>${chat.theme} · 和小狐狸说 ${chat.steps.length} 轮</small></div>
      </button>`
    )
    .join("");
  app.innerHTML = `${topbar()}
    <div class="nav-row"><button class="back" data-go="home">← 回家</button><h2>口语</h2></div>
    <div class="list">
      ${chats}
      <button class="item" data-speak="repeat"><div class="badge">🗣️</div><div><b>跟读</b><small>Pip 说一句，你跟着说</small></div></button>
      <button class="item" data-speak="questions"><div class="badge">❓</div><div><b>小问答</b><small>听问题，用英文回答</small></div></button>
    </div>
    <p class="tip">聊天时点一句英文，或者说出来。麦克风不能用也没关系，点句子就能把对话说完。</p>`;
}

function esc(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function currentChat() {
  return window.LILY_CONTENT.speak.chats.find((chat) => chat.id === state.chatId);
}

function scrollChat() {
  const log = document.querySelector(".chat-log");
  if (log) log.scrollTop = log.scrollHeight;
}

function beginChat(id) {
  listenGen += 1;
  state.recognizing = false;
  state.speakKind = "chat";
  state.speakMode = "chat";
  state.chatId = id;
  state.chatStep = 0;
  state.chatDone = false;
  state.chatNote = "";
  const step = currentChat().steps[0];
  state.chatLog = [{ who: "pip", en: step.pip, zh: step.pipZh }];
  render();
  speakEn(step.pip);
  scrollChat();
}

function chooseReply(reply) {
  if (state.chatDone || !reply) return;
  listenGen += 1;
  state.recognizing = false;
  const chat = currentChat();
  state.chatLog.push({ who: "me", en: reply.en, zh: reply.zh });
  state.chatLog.push({ who: "pip", en: reply.pip, zh: reply.pipZh });
  state.chatStep += 1;
  state.chatNote = "";
  const lines = [reply.pip];
  const next = chat.steps[state.chatStep];
  if (next) {
    state.chatLog.push({ who: "pip", en: next.pip, zh: next.pipZh });
    lines.push(next.pip);
  } else {
    state.chatDone = true;
    const bye = { en: "Bye! I feel happy.", zh: "再见！我很开心。" };
    state.chatLog.push({ who: "pip", en: bye.en, zh: bye.zh });
    lines.push(bye.en);
    addStars(2);
  }
  addStars(1);
  render();
  speakLines(lines);
  scrollChat();
}

function matchReply(heard, replies) {
  const words = new Set(normalize(heard).split(" ").filter(Boolean));
  let best = null;
  let bestScore = 0;
  replies.forEach((reply) => {
    const score = reply.keys.filter((key) => words.has(key)).length;
    if (score > bestScore) {
      best = reply;
      bestScore = score;
    }
  });
  return best;
}

function renderChat() {
  const chat = currentChat();
  const step = chat.steps[state.chatStep];
  const bubbles = state.chatLog
    .map(
      (line) => `<div class="bubble ${line.who}">
        <div class="who">${line.who === "pip" ? "Pip" : "我"}</div>
        <div class="en">${esc(line.en)}</div>
        <div class="zh ${state.showZh ? "" : "hidden"}">${esc(line.zh)}</div>
      </div>`
    )
    .join("");
  const replies = state.chatDone
    ? `<div class="row-actions">
        <button class="primary" data-action="chat-again">再聊一次</button>
        <button class="ghost" data-go="speak">换一个话题</button>
      </div>`
    : `<div class="replies">
        ${step.replies
          .map(
            (reply, index) => `<button data-reply="${index}">
              <span class="en">${esc(reply.en)}</span>
              <span class="zh ${state.showZh ? "" : "hidden"}">${esc(reply.zh)}</span>
            </button>`
          )
          .join("")}
      </div>
      <div class="row-actions">
        <button class="primary" data-action="chat-replay">再听一遍</button>
        <button class="secondary" data-action="chat-listen">${state.recognizing ? "正在听…" : "听我说"}</button>
        <button class="ghost" data-action="toggle-zh">${state.showZh ? "先藏中文" : "显示中文"}</button>
      </div>`;
  app.innerHTML = `${topbar()}
    <div class="nav-row"><button class="back" data-go="speak">← 口语</button><h2>${chat.emoji} ${chat.titleZh}</h2></div>
    <div class="panel">
      <div class="chat-log">${bubbles}</div>
      ${replies}
      <p class="status" id="chat-note">${esc(state.chatNote)}</p>
    </div>`;
}

function currentSpeakItem() {
  if (state.speakKind === "repeat") return window.LILY_CONTENT.speak.repeat[state.speakIndex];
  return window.LILY_CONTENT.speak.questions[state.speakIndex];
}

function renderSpeak() {
  const item = currentSpeakItem();
  const total =
    state.speakKind === "repeat"
      ? window.LILY_CONTENT.speak.repeat.length
      : window.LILY_CONTENT.speak.questions.length;
  const title = state.speakKind === "repeat" ? "跟读" : "小问答";
  const extra =
    state.speakKind === "questions"
      ? `<p class="zh-hint">提示：${item.hint}（${item.hintZh}）</p>`
      : `<p class="zh-hint">${item.zh}</p>`;
  app.innerHTML = `${topbar()}
    <div class="nav-row"><button class="back" data-go="speak">← 口语</button><h2>${title} ${state.speakIndex + 1}/${total}</h2></div>
    <div class="panel">
      ${foxSvg()}
      <div class="big-en">${item.en}</div>
      ${extra}
      <p class="status" id="speak-status">${state.recognizing ? "我在听…" : "点按钮，开始说"}</p>
      <div class="row-actions">
        <button class="primary" data-action="hear-phrase">听 Pip 说</button>
        <button class="secondary" data-action="listen-me">${state.recognizing ? "正在听…" : "听我说"}</button>
        <button class="ghost" data-action="i-did-it">我会了</button>
        <button class="ghost" data-action="next-speak">下一句</button>
      </div>
    </div>`;
}

function currentStory() {
  return window.LILY_CONTENT.read.find((story) => story.id === state.readId);
}

function renderReadList() {
  const groups = window.LILY_CONTENT.readLevels
    .map((band) => {
      const cards = window.LILY_CONTENT.read
        .filter((story) => story.level === band.level)
        .map(
          (story) => `<button class="item" data-read="${story.id}">
            <div class="badge">${story.emoji}</div>
            <div><b>${story.title}</b><small>${story.titleZh} · ${story.pages.length} 页</small></div>
          </button>`
        )
        .join("");
      return `<h3 class="level-head">${band.name} · ${band.hint}</h3><div class="list">${cards}</div>`;
    })
    .join("");
  app.innerHTML = `${topbar()}
    <div class="nav-row"><button class="back" data-go="home">← 回家</button><h2>阅读</h2></div>
    <p class="tip">还是一页一个画面。Level 1–2 用现在时，要读出 but、so、because。Level 3 用过去时把一件事讲完。</p>
    ${groups}`;
}

function wordSpans(sentence) {
  return sentence
    .split(/(\s+)/)
    .map((part) => {
      const word = part.replace(/[^A-Za-z']/g, "");
      if (!word) return part;
      return `<button class="word" data-word="${word}">${part}</button>`;
    })
    .join("");
}

function renderRead() {
  const story = currentStory();
  const band = window.LILY_CONTENT.readLevels.find((item) => item.level === story.level);
  if (state.readMode === "check") {
    app.innerHTML = `${topbar()}
      <div class="nav-row"><button class="back" data-go="read">← 阅读</button><h2>${story.emoji} 看一看</h2></div>
      <div class="panel">
        <p class="zh-hint">读完小书，选一句。</p>
        <div class="big-en">${esc(story.check.ask)}</div>
        <p class="zh-hint ${state.showZh ? "" : "hidden"}">${esc(story.check.askZh)}</p>
        <div class="replies">
          ${story.check.options
            .map(
              (option, index) => `<button data-read-answer="${index}">
                <span class="en">${esc(option.en)}</span>
                <span class="zh ${state.showZh ? "" : "hidden"}">${esc(option.zh)}</span>
              </button>`
            )
            .join("")}
        </div>
        <p class="status" id="read-note">${esc(state.readNote)}</p>
        <div class="row-actions">
          <button class="ghost" data-action="prev-page">回上一页</button>
        </div>
      </div>`;
    return;
  }
  const page = story.pages[state.readPage];
  const dots = story.pages
    .map((_, index) => `<button class="dot ${index === state.readPage ? "on" : ""}" data-read-page="${index}" aria-label="第 ${index + 1} 页"></button>`)
    .join("");
  const lines = page.lines
    .map(
      (line) => `<div class="en">${wordSpans(line.en)}</div><div class="zh ${state.showZh ? "" : "hidden"}">${esc(line.zh)}</div>`
    )
    .join("");
  const nextLabel = state.readPage + 1 >= story.pages.length ? "看一看" : "下一页";
  app.innerHTML = `${topbar()}
    <div class="nav-row"><button class="back" data-go="read">← 阅读</button><h2>${story.emoji} ${story.title}</h2></div>
    <p class="level-head">${band.name} · ${state.readPage + 1} / ${story.pages.length}</p>
    <div class="book">
      <div class="book-scene">${page.scene}</div>
      <div class="book-text">${lines}</div>
    </div>
    <div class="page-dots">${dots}</div>
    <div class="row-actions">
      <button class="ghost" data-action="prev-page">上一页</button>
      <button class="primary" data-action="next-page">${nextLabel}</button>
      <button class="secondary" data-action="read-page">听这页</button>
      <button class="ghost" data-action="read-aloud">一起读</button>
      <button class="ghost" data-action="toggle-zh">${state.showZh ? "先藏中文" : "显示中文"}</button>
    </div>`;
}

function renderWordsList() {
  const cards = window.LILY_CONTENT.words
    .map(
      (deck) => `<button class="item" data-words="${deck.id}">
        <div class="badge">${deck.emoji}</div>
        <div><b>${deck.title}</b><small>${deck.titleZh} · ${deck.items.length} 个句子</small></div>
      </button>`
    )
    .join("");
  app.innerHTML = `${topbar()}
    <div class="nav-row"><button class="back" data-go="home">← 回家</button><h2>单词</h2></div>
    <div class="list">${cards}</div>`;
}

function renderWords() {
  const deck = window.LILY_CONTENT.words.find((d) => d.id === state.wordsId);
  if (state.wordsMode === "quiz") return renderQuiz(deck);
  const item = deck.items[state.wordsIndex];
  app.innerHTML = `${topbar()}
    <div class="nav-row"><button class="back" data-go="words">← 单词</button><h2>${deck.emoji} ${deck.title}</h2></div>
    <div class="word-card">
      <div>
        <div class="emoji">${item.emoji}</div>
        <div class="big-en">${item.en}</div>
        <p class="zh-hint">${item.zh}</p>
      </div>
    </div>
    <div class="row-actions">
      <button class="primary" data-action="say-word">听这句</button>
      <button class="ghost" data-action="prev-word">上一个</button>
      <button class="ghost" data-action="next-word">下一个</button>
      <button class="secondary" data-action="start-quiz">小测验</button>
    </div>`;
}

function shuffle(list) {
  return [...list].sort(() => Math.random() - 0.5);
}

function renderQuiz(deck) {
  const item = deck.items[state.quizOrder[state.quizIndex]];
  const others = shuffle(deck.items.filter((x) => x.en !== item.en)).slice(0, 3);
  const options = shuffle([item, ...others]);
  app.innerHTML = `${topbar()}
    <div class="nav-row"><button class="back" data-action="back-cards">← 卡片</button><h2>测验 ${state.quizIndex + 1}/${deck.items.length}</h2></div>
    <div class="panel">
      <p class="zh-hint">这句怎么说？</p>
      <div class="big-en">${item.emoji} ${esc(item.zh)}</div>
      <div class="quiz-options stack">
        ${options.map((opt) => `<button data-answer="${deck.items.indexOf(opt)}">${esc(opt.en)}</button>`).join("")}
      </div>
      <p class="status" id="quiz-status"></p>
    </div>`;
}

function currentBookUnit() {
  return window.LILY_BOOK.units.find((unit) => unit.id === state.bookUnit);
}

function bookSections(unit) {
  const sections = [
    ["words", "单词", unit.words.length],
    ["phrases", "词组", unit.phrases.length],
    ["sentences", "句子", unit.sentences.length],
  ];
  if (unit.grammar) sections.push(["grammar", "动词变化", unit.grammar.length]);
  if (unit.sounds) sections.push(["sounds", "语音", unit.sounds.length]);
  return sections;
}

function studyRows() {
  const unit = currentBookUnit();
  if (!unit) return [];
  if (state.bookSection === "sentences") {
    const rows = [];
    unit.sentences.forEach((group) => {
      rows.push({ type: "head", text: group.title });
      group.lines.forEach((line) => rows.push({ type: "line", en: line.en, zh: line.zh }));
    });
    return rows;
  }
  if (state.bookSection === "sounds") {
    return unit.sounds.map((sound) => ({
      type: "sound",
      title: sound.zh,
      words: sound.words.split(",").map((word) => word.trim()).filter(Boolean),
    }));
  }
  return (unit[state.bookSection] || []).map((item) => ({ type: "line", en: item.en, zh: item.zh }));
}

function bookPool(unit, scope) {
  const tag = (list, kind) => list.map((item) => ({ en: item.en, zh: item.zh, kind }));
  if (scope === "words") return tag(unit.words, "单词");
  if (scope === "phrases") return tag(unit.phrases, "词组");
  if (scope === "grammar") return tag(unit.grammar || [], "动词变化");
  if (scope === "sentences") return tag(unit.sentences.flatMap((group) => group.lines), "句子");
  const lines = unit.sentences.flatMap((group) => group.lines);
  return [
    ...tag(shuffle(unit.words).slice(0, 4), "单词"),
    ...tag(shuffle(unit.phrases).slice(0, 4), "词组"),
    ...tag(shuffle(lines).slice(0, 4), "句子"),
  ];
}

function renderBookUnits() {
  const cards = window.LILY_BOOK.units
    .map(
      (unit) => `<button class="item" data-book="${unit.id}">
        <div class="badge">${unit.emoji}</div>
        <div><b>${unit.no} ${esc(unit.title)}</b><small>${esc(unit.titleZh)} · ${unit.words.length} 个单词</small></div>
      </button>`
    )
    .join("");
  app.innerHTML = `${topbar()}
    <div class="nav-row"><button class="back" data-go="home">← 回家</button><h2>课本学习</h2></div>
    <p class="tip">一个单元的单词和句子都在同一页。点一行就听。默写准备一张纸，听完写在纸上，再看答案。</p>
    <div class="list">${cards}</div>`;
}

function renderBookUnit() {
  const unit = currentBookUnit();
  const cards = bookSections(unit)
    .map(
      ([id, label, count]) => `<button class="item" data-book-section="${id}">
        <div class="badge">${id === "sentences" ? "💬" : id === "sounds" ? "🔤" : "📘"}</div>
        <div><b>学${label}</b><small>${count} ${id === "sentences" ? "段" : "个"}</small></div>
      </button>`
    )
    .join("");
  app.innerHTML = `${topbar()}
    <div class="nav-row"><button class="back" data-go="book">← 课本</button><h2>${unit.emoji} ${unit.no}</h2></div>
    <p class="tip">${esc(unit.title)} · ${esc(unit.titleZh)}</p>
    <div class="list">${cards}</div>
    <div class="row-actions"><button class="secondary" data-action="book-exam">默写考试</button></div>`;
}

function renderBookStudy() {
  const unit = currentBookUnit();
  const labels = { words: "单词", phrases: "词组", sentences: "句子", grammar: "动词变化", sounds: "语音" };
  const coverEn = state.bookCover === "en";
  const coverZh = state.bookCover === "zh";
  const showCover = state.bookSection !== "sounds";
  let hearIndex = 0;
  const body = studyRows()
    .map((row) => {
      if (row.type === "head") return `<div class="book-head">${esc(row.text)}</div>`;
      if (row.type === "sound") {
        const index = hearIndex;
        hearIndex += 1;
        return `<div class="book-row">
          <button class="book-sound" data-book-hear="${index}">${esc(row.title)} · 读这一组</button>
          <div class="chip-row">${row.words.map((word) => `<button class="chip" data-word="${esc(word)}">${esc(word)}</button>`).join("")}</div>
        </div>`;
      }
      const index = hearIndex;
      hearIndex += 1;
      const en = coverEn ? "····" : row.en;
      const zh = coverZh ? "····" : row.zh;
      return `<button class="book-row" data-book-hear="${index}">
        <b>${esc(en)}</b>
        <small>${esc(zh)}</small>
      </button>`;
    })
    .join("");
  const cover = showCover
    ? `<div class="cover-row">
        <button data-book-cover="none" class="${state.bookCover === "none" ? "on" : ""}">都看</button>
        <button data-book-cover="en" class="${state.bookCover === "en" ? "on" : ""}">盖住英文</button>
        <button data-book-cover="zh" class="${state.bookCover === "zh" ? "on" : ""}">盖住中文</button>
      </div>`
    : "";
  app.innerHTML = `${topbar()}
    <div class="nav-row"><button class="back" data-action="book-menu">← ${unit.no}</button><h2>${labels[state.bookSection]}</h2></div>
    <div class="row-actions book-tools">
      <button class="primary" data-action="book-read-all">从头读到尾</button>
    </div>
    ${cover}
    <div class="book-list">${body}</div>`;
}

function speakStudyAt(index) {
  const rows = studyRows().filter((row) => row.type !== "head");
  const row = rows[index];
  if (!row) return;
  document.querySelectorAll("[data-book-hear]").forEach((el) => {
    el.classList.toggle("on", Number(el.dataset.bookHear) === index);
  });
  if (row.type === "sound") speakSequence(row.words);
  else speakEn(row.en);
}

function bookReadAll() {
  const rows = studyRows().filter((row) => row.type !== "head");
  const queue = [];
  const marks = [];
  rows.forEach((row, index) => {
    const pieces = row.type === "sound" ? row.words : [row.en];
    pieces.forEach(() => marks.push(index));
    queue.push(...pieces);
  });
  speakSequence(queue, (i) => {
    const index = marks[i];
    document.querySelectorAll("[data-book-hear]").forEach((el) => {
      el.classList.toggle("on", Number(el.dataset.bookHear) === index);
    });
    document.querySelector(`[data-book-hear="${index}"]`)?.scrollIntoView({ block: "nearest" });
  });
}

function renderBookSetup() {
  const unit = currentBookUnit();
  const sentenceCount = unit.sentences.reduce((sum, group) => sum + group.lines.length, 0);
  const scopes = [
    ["words", "单词", unit.words.length],
    ["phrases", "词组", unit.phrases.length],
    ["sentences", "句子", sentenceCount],
  ];
  if (unit.grammar) scopes.push(["grammar", "动词变化", unit.grammar.length]);
  scopes.push(["mix", "混合", 12]);
  const listen = [
    ["zh", "听中文，写英文"],
    ["en", "听英文，照着写"],
  ];
  app.innerHTML = `${topbar()}
    <div class="nav-row"><button class="back" data-action="book-menu">← ${unit.no}</button><h2>默写考试</h2></div>
    <p class="tip">准备一张纸。听完写在纸上，写好再看答案，自己判断对不对。</p>
    <p class="book-head">听什么</p>
    <div class="list">${listen
      .map(
        ([id, label]) =>
          `<button class="item choice ${state.bookListen === id ? "on" : ""}" data-book-listen="${id}"><div><b>${label}</b></div></button>`
      )
      .join("")}</div>
    <p class="book-head">默写什么</p>
    <div class="list">${scopes
      .map(
        ([id, label, count]) =>
          `<button class="item choice ${state.bookScope === id ? "on" : ""}" data-book-scope="${id}"><div><b>${label}</b><small>${count} 题</small></div></button>`
      )
      .join("")}</div>
    <div class="row-actions"><button class="secondary" data-action="book-start">开始默写</button></div>`;
}

function startBookExam() {
  const unit = currentBookUnit();
  const questions = bookPool(unit, state.bookScope);
  state.bookQuiz = state.bookScope === "mix" ? shuffle(questions) : shuffle(questions);
  state.bookQuizIndex = 0;
  state.bookScore = 0;
  state.bookMisses = [];
  state.bookChecked = false;
  state.bookMode = "exam";
}

function speakBookPrompt() {
  const question = state.bookQuiz[state.bookQuizIndex];
  if (!question || state.bookMode !== "exam") return;
  if (state.bookChecked || state.bookListen === "en") speakEn(question.en);
  else speakZh(question.zh);
}

function renderBookExam() {
  const unit = currentBookUnit();
  const question = state.bookQuiz[state.bookQuizIndex];
  const listenLabel = state.bookListen === "zh" ? "听中文，在纸上写英文" : "听英文，在纸上照着写";
  const body = state.bookChecked
    ? `<div class="book-row static"><b>${esc(question.en)}</b><small>${esc(question.zh)}</small></div>
       <div class="dictation-bar">
         <button class="primary" data-action="book-right">写对了</button>
         <button class="danger-soft" data-action="book-wrong">写错了</button>
         <button class="ghost" data-action="book-replay">再听一次</button>
       </div>`
    : `<div class="paper-card"><div><div class="emoji">📝</div><p>写在纸上</p></div></div>
       <div class="dictation-bar">
         <button class="primary" data-action="book-replay">再听一次</button>
         <button class="secondary" data-action="book-reveal">写好了，看答案</button>
       </div>`;
  app.innerHTML = `${topbar()}
    <div class="nav-row"><button class="back" data-action="book-menu">← ${unit.no}</button><h2>默写</h2></div>
    <div class="book-count">第 ${state.bookQuizIndex + 1} / ${state.bookQuiz.length} 题 · 写对 ${state.bookScore}</div>
    <div class="dictation">
      <span class="book-kind">${question.kind}</span>
      <p class="listen-label">${listenLabel}</p>
      ${body}
    </div>`;
}

function revealBookAnswer() {
  if (state.bookMode !== "exam" || state.bookChecked) return;
  state.bookChecked = true;
  render();
  speakEn(state.bookQuiz[state.bookQuizIndex].en);
}

function markBookAnswer(ok) {
  if (state.bookMode !== "exam" || !state.bookChecked) return;
  const question = state.bookQuiz[state.bookQuizIndex];
  if (ok) state.bookScore += 1;
  else state.bookMisses.push({ en: question.en, zh: question.zh });
  nextBookQuestion();
}

function nextBookQuestion() {
  if (state.bookQuizIndex + 1 >= state.bookQuiz.length) {
    const total = state.bookQuiz.length;
    addStars(state.bookScore >= Math.ceil(total * 0.8) ? 3 : state.bookScore > 0 ? 1 : 0);
    state.bookMode = "result";
    render();
    return;
  }
  state.bookQuizIndex += 1;
  state.bookChecked = false;
  render();
  speakBookPrompt();
}

function renderBookResult() {
  const unit = currentBookUnit();
  const total = state.bookQuiz.length;
  const praise = state.bookScore === total ? "全部写对了。" : state.bookScore >= Math.ceil(total * 0.8) ? "大部分写对了。" : "错的几题在下面，点一行再听一遍。";
  const misses =
    state.bookMisses.length === 0
      ? ""
      : `<div class="book-list">${state.bookMisses
          .map(
            (miss) => `<button class="book-row" data-word="${esc(miss.en)}">
              <b>${esc(miss.en)}</b>
              <small>${esc(miss.zh)}</small>
              <small class="miss">这题写错了</small>
            </button>`
          )
          .join("")}</div>`;
  app.innerHTML = `${topbar()}
    <div class="nav-row"><button class="back" data-action="book-menu">← ${unit.no}</button><h2>考完了</h2></div>
    <div class="score-card">
      <div class="emoji">${unit.emoji}</div>
      <strong>${state.bookScore} / ${total}</strong>
      <p>${praise}</p>
    </div>
    ${misses}
    <div class="row-actions">
      <button class="secondary" data-action="book-start">再考一次</button>
      <button class="ghost" data-action="book-exam">换一种考法</button>
      <button class="ghost" data-action="book-menu">回单元</button>
    </div>`;
}

function render() {
  if (state.route === "home") return renderHome();
  if (state.route === "book" && state.bookMode === "units") return renderBookUnits();
  if (state.route === "book" && state.bookMode === "unit") return renderBookUnit();
  if (state.route === "book" && state.bookMode === "study") return renderBookStudy();
  if (state.route === "book" && state.bookMode === "exam-setup") return renderBookSetup();
  if (state.route === "book" && state.bookMode === "exam") return renderBookExam();
  if (state.route === "book" && state.bookMode === "result") return renderBookResult();
  if (state.route === "listen" && !state.listenId) return renderListenList();
  if (state.route === "listen") return renderListen();
  if (state.route === "speak" && state.speakMode === "menu") return renderSpeakMenu();
  if (state.route === "speak" && state.speakMode === "chat") return renderChat();
  if (state.route === "speak") return renderSpeak();
  if (state.route === "read" && !state.readId) return renderReadList();
  if (state.route === "read") return renderRead();
  if (state.route === "words" && !state.wordsId) return renderWordsList();
  if (state.route === "words") return renderWords();
}

function playAll(lesson) {
  speakSequence(
    lesson.lines.map((line) => line.en),
    (i) => {
      state.listenIndex = i;
      if (state.route === "listen" && state.listenId === lesson.id) render();
    }
  );
}

function startQuiz() {
  const deck = window.LILY_CONTENT.words.find((d) => d.id === state.wordsId);
  state.wordsMode = "quiz";
  state.quizIndex = 0;
  state.quizOrder = shuffle(deck.items.map((_, i) => i));
  render();
}

function recognitionCtor() {
  return window.SpeechRecognition || window.webkitSpeechRecognition;
}

function listenForChat() {
  const Ctor = recognitionCtor();
  const step = currentChat().steps[state.chatStep];
  if (!Ctor) {
    state.chatNote = "这台设备不能自动听。点下面一句英文就好。";
    render();
    scrollChat();
    return;
  }
  const gen = ++listenGen;
  const rec = new Ctor();
  rec.lang = "en-US";
  rec.interimResults = false;
  rec.maxAlternatives = 3;
  state.recognizing = true;
  state.chatNote = "我在听…";
  render();
  scrollChat();
  rec.onresult = (event) => {
    if (gen !== listenGen) return;
    state.recognizing = false;
    const said = Array.from(event.results[0] || [])
      .map((item) => item.transcript.toLowerCase())
      .join(" ");
    const reply = matchReply(said, step.replies);
    if (reply) {
      chooseReply(reply);
      return;
    }
    state.chatNote = `没对上。点一句也可以。我听到：${said || "……"}`;
    render();
    scrollChat();
  };
  rec.onerror = () => {
    if (gen !== listenGen) return;
    state.recognizing = false;
    state.chatNote = "没听清。点一句也可以。";
    render();
    scrollChat();
  };
  rec.onend = () => {
    if (gen !== listenGen) return;
    state.recognizing = false;
  };
  rec.start();
}

function listenToChild() {
  const Ctor = recognitionCtor();
  const status = () => document.getElementById("speak-status");
  if (!Ctor) {
    if (status()) {
      status().textContent = "这台设备不能自动听。请大声跟读，再点「我会了」。";
      status().className = "status";
    }
    return;
  }
  const rec = new Ctor();
  rec.lang = "en-US";
  rec.interimResults = false;
  rec.maxAlternatives = 3;
  state.recognizing = true;
  render();
  rec.onresult = (event) => {
    const said = Array.from(event.results[0] || [])
      .map((r) => r.transcript.toLowerCase())
      .join(" ");
    gradeSpeech(said);
  };
  rec.onerror = () => {
    state.recognizing = false;
    render();
    const el = document.getElementById("speak-status");
    if (el) {
      el.textContent = "没听清。再试一次，或点「我会了」。";
      el.className = "status bad";
    }
  };
  rec.onend = () => {
    state.recognizing = false;
  };
  rec.start();
}

function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function gradeSpeech(said) {
  state.recognizing = false;
  const item = currentSpeakItem();
  const heard = normalize(said);
  let ok = false;
  if (state.speakKind === "repeat") {
    const target = normalize(item.en);
    ok = heard.includes(target.split(" ")[0]) && (heard.length >= 3 || heard === target);
    const overlap = target.split(" ").filter((w) => heard.includes(w)).length;
    ok = overlap >= Math.max(1, Math.ceil(target.split(" ").length * 0.5));
  } else {
    ok = item.accept.some((word) => heard.includes(normalize(word)));
  }
  render();
  const el = document.getElementById("speak-status");
  if (!el) return;
  if (ok) {
    addStars(1);
    el.textContent = `太棒了！我听到：${said}`;
    el.className = "status ok";
    speakZh("太棒了");
  } else {
    el.textContent = `再试一次。我听到：${said || "……"}`;
    el.className = "status bad";
  }
}

function nextSpeak() {
  const total =
    state.speakKind === "repeat"
      ? window.LILY_CONTENT.speak.repeat.length
      : window.LILY_CONTENT.speak.questions.length;
  if (state.speakIndex + 1 >= total) {
    addStars(2);
    speakZh("这一组完成了，你真认真");
    state.speakMode = "menu";
    state.speakIndex = 0;
  } else {
    state.speakIndex += 1;
  }
  render();
}

app.addEventListener("click", (event) => {
  const t = event.target.closest("[data-go], [data-listen], [data-speak], [data-chat], [data-reply], [data-read], [data-read-page], [data-read-answer], [data-words], [data-action], [data-line], [data-word], [data-answer], [data-book], [data-book-section], [data-book-hear], [data-book-cover], [data-book-listen], [data-book-scope]");
  if (!t) return;

  if (t.dataset.go) {
    listenGen += 1;
    state.recognizing = false;
    state.route = t.dataset.go;
    state.listenId = null;
    state.speakMode = "menu";
    state.readId = null;
    state.readPage = 0;
    state.readMode = "page";
    state.readNote = "";
    state.wordsId = null;
    state.wordsMode = "cards";
    state.bookUnit = null;
    state.bookMode = "units";
    stopSpeech();
    render();
    return;
  }

  if (t.dataset.listen) {
    state.listenId = t.dataset.listen;
    state.listenIndex = 0;
    state.route = "listen";
    render();
    const lesson = window.LILY_CONTENT.listen.find((l) => l.id === state.listenId);
    speakEn(lesson.lines[0].en);
    return;
  }

  if (t.dataset.chat) {
    beginChat(t.dataset.chat);
    return;
  }

  if (t.dataset.reply != null && state.speakMode === "chat" && !state.chatDone) {
    const step = currentChat().steps[state.chatStep];
    chooseReply(step.replies[Number(t.dataset.reply)]);
    return;
  }

  if (t.dataset.speak) {
    state.speakKind = t.dataset.speak;
    state.speakIndex = 0;
    state.speakMode = "play";
    render();
    speakEn(currentSpeakItem().en);
    return;
  }

  if (t.dataset.read) {
    state.readId = t.dataset.read;
    state.readPage = 0;
    state.readMode = "page";
    state.readNote = "";
    state.route = "read";
    render();
    const story = currentStory();
    speakLines(story.pages[0].lines.map((line) => line.en));
    return;
  }

  if (t.dataset.readPage != null && state.route === "read" && state.readMode === "page") {
    state.readPage = Number(t.dataset.readPage);
    render();
    const page = currentStory().pages[state.readPage];
    speakLines(page.lines.map((line) => line.en));
    return;
  }

  if (t.dataset.readAnswer != null && state.readMode === "check") {
    const story = currentStory();
    const option = story.check.options[Number(t.dataset.readAnswer)];
    const el = document.getElementById("read-note");
    if (option.ok) {
      addStars(2);
      if (el) {
        el.textContent = "读完啦！";
        el.className = "status ok";
      }
      speakZh("读完啦");
      setTimeout(() => {
        state.readId = null;
        state.readMode = "page";
        state.readNote = "";
        render();
      }, 700);
    } else if (el) {
      state.readNote = "再看看小书。";
      el.textContent = state.readNote;
      el.className = "status bad";
    }
    return;
  }

  if (t.dataset.book) {
    stopSpeech();
    state.route = "book";
    state.bookUnit = t.dataset.book;
    state.bookMode = "unit";
    render();
    return;
  }

  if (t.dataset.bookSection) {
    stopSpeech();
    state.bookSection = t.dataset.bookSection;
    state.bookCover = "none";
    state.bookMode = "study";
    render();
    return;
  }

  if (t.dataset.bookHear != null && state.bookMode === "study") {
    speakStudyAt(Number(t.dataset.bookHear));
    return;
  }

  if (t.dataset.bookCover) {
    state.bookCover = t.dataset.bookCover;
    render();
    return;
  }

  if (t.dataset.bookListen) {
    state.bookListen = t.dataset.bookListen;
    render();
    return;
  }

  if (t.dataset.bookScope) {
    state.bookScope = t.dataset.bookScope;
    render();
    return;
  }

  if (t.dataset.words) {
    state.wordsId = t.dataset.words;
    state.wordsIndex = 0;
    state.wordsMode = "cards";
    state.route = "words";
    render();
    return;
  }

  if (t.dataset.line) {
    state.listenIndex = Number(t.dataset.line);
    render();
    const lesson = window.LILY_CONTENT.listen.find((l) => l.id === state.listenId);
    speakEn(lesson.lines[state.listenIndex].en);
    return;
  }

  if (t.dataset.word) {
    speakEn(t.dataset.word);
    return;
  }

  if (t.dataset.answer) {
    const deck = window.LILY_CONTENT.words.find((d) => d.id === state.wordsId);
    const item = deck.items[state.quizOrder[state.quizIndex]];
    const el = document.getElementById("quiz-status");
    if (Number(t.dataset.answer) === state.quizOrder[state.quizIndex]) {
      addStars(1);
      el.textContent = "答对了！";
      el.className = "status ok";
      speakEn(item.en);
      setTimeout(() => {
        if (state.quizIndex + 1 >= deck.items.length) {
          addStars(2);
          speakZh("单词测验完成");
          state.wordsMode = "cards";
        } else {
          state.quizIndex += 1;
        }
        render();
      }, 700);
    } else {
      el.textContent = "再想想～";
      el.className = "status bad";
    }
    return;
  }

  const action = t.dataset.action;
  if (action === "book-menu") {
    stopSpeech();
    state.bookMode = "unit";
    state.bookLocked = false;
    render();
    return;
  }
  if (action === "book-exam") {
    stopSpeech();
    state.bookMode = "exam-setup";
    render();
    return;
  }
  if (action === "book-start") {
    stopSpeech();
    startBookExam();
    render();
    speakBookPrompt();
    return;
  }
  if (action === "book-replay") {
    speakBookPrompt();
    return;
  }
  if (action === "book-reveal") {
    revealBookAnswer();
    return;
  }
  if (action === "book-right") {
    markBookAnswer(true);
    return;
  }
  if (action === "book-wrong") {
    markBookAnswer(false);
    return;
  }
  if (action === "book-read-all") {
    bookReadAll();
    return;
  }
  if (action === "play-line") {
    const lesson = window.LILY_CONTENT.listen.find((l) => l.id === state.listenId);
    speakEn(lesson.lines[state.listenIndex].en);
  }
  if (action === "play-all") {
    playAll(window.LILY_CONTENT.listen.find((l) => l.id === state.listenId));
  }
  if (action === "toggle-zh") {
    state.showZh = !state.showZh;
    render();
  }
  if (action === "next-line") {
    const lesson = window.LILY_CONTENT.listen.find((l) => l.id === state.listenId);
    if (state.listenIndex + 1 >= lesson.lines.length) {
      addStars(3);
      speakZh("听完啦，真棒");
      state.listenId = null;
    } else {
      state.listenIndex += 1;
      render();
      speakEn(lesson.lines[state.listenIndex].en);
      return;
    }
    render();
  }
  if (action === "chat-again") beginChat(state.chatId);
  if (action === "chat-replay" && state.speakMode === "chat" && !state.chatDone) {
    speakEn(currentChat().steps[state.chatStep].pip);
  }
  if (action === "chat-listen" && state.speakMode === "chat" && !state.chatDone) listenForChat();
  if (action === "hear-phrase") speakEn(currentSpeakItem().en);
  if (action === "listen-me") listenToChild();
  if (action === "i-did-it") {
    addStars(1);
    speakZh("很好");
    nextSpeak();
  }
  if (action === "next-speak") nextSpeak();
  if (action === "read-page" && state.readMode === "page") {
    const page = currentStory().pages[state.readPage];
    speakLines(page.lines.map((line) => line.en));
  }
  if (action === "prev-page") {
    const story = currentStory();
    if (state.readMode === "check") {
      state.readMode = "page";
      state.readPage = story.pages.length - 1;
      state.readNote = "";
      render();
      return;
    }
    if (state.readPage > 0) {
      state.readPage -= 1;
      render();
      speakLines(story.pages[state.readPage].lines.map((line) => line.en));
    }
  }
  if (action === "next-page" && state.readMode === "page") {
    const story = currentStory();
    if (state.readPage + 1 >= story.pages.length) {
      state.readMode = "check";
      state.readNote = "";
      render();
      speakEn(story.check.ask);
      return;
    }
    state.readPage += 1;
    render();
    speakLines(story.pages[state.readPage].lines.map((line) => line.en));
  }
  if (action === "read-aloud" && state.readMode === "page") {
    const story = currentStory();
    const items = [];
    story.pages.forEach((page, pageIndex) => {
      page.lines.forEach((line) => items.push({ pageIndex, en: line.en }));
    });
    speakSequence(
      items.map((item) => item.en),
      (index) => {
        if (state.readId !== story.id || state.readMode !== "page") return;
        state.readPage = items[index].pageIndex;
        render();
      }
    );
  }
  if (action === "say-word") {
    const deck = window.LILY_CONTENT.words.find((d) => d.id === state.wordsId);
    speakEn(deck.items[state.wordsIndex].en);
  }
  if (action === "next-word") {
    const deck = window.LILY_CONTENT.words.find((d) => d.id === state.wordsId);
    state.wordsIndex = (state.wordsIndex + 1) % deck.items.length;
    render();
  }
  if (action === "prev-word") {
    const deck = window.LILY_CONTENT.words.find((d) => d.id === state.wordsId);
    state.wordsIndex = (state.wordsIndex - 1 + deck.items.length) % deck.items.length;
    render();
  }
  if (action === "start-quiz") startQuiz();
  if (action === "back-cards") {
    state.wordsMode = "cards";
    render();
  }
});

ensureStreak();
render();

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  navigator.serviceWorker.register("./sw.js");
}
