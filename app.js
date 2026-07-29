// Blessing AI — app.js
// Stockage 100% local (localStorage). Aucune dépendance réseau requise en v1.

const STORAGE_KEYS = {
  favorites: "blessingai_favorites",
  history: "blessingai_history",
  prefs: "blessingai_prefs",
  notes: "blessingai_notes"
};

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}
function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ---------- Verset du jour (déterministe : même verset toute la journée) ----------
function pickVerseOfDay() {
  const all = Object.values(VERSES).flat();
  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  return all[dayIndex % all.length];
}

function renderVerseOfDay() {
  const v = pickVerseOfDay();
  document.getElementById("vod-text").textContent = `« ${v.text} »`;
  document.getElementById("vod-ref").textContent = v.ref;

  const favBtn = document.getElementById("vod-fav-btn");
  favBtn.onclick = () => {
    addFavorite(v);
    favBtn.textContent = "✓ Ajouté aux favoris";
    setTimeout(() => (favBtn.textContent = "♡ Ajouter aux favoris"), 1500);
  };

  addHistory({ type: "verset_du_jour", text: v.text, ref: v.ref });
}

// ---------- Contextes ----------
function renderContextGrid() {
  const grid = document.getElementById("context-grid");
  grid.innerHTML = "";
  CONTEXTS.forEach(ctx => {
    const chip = document.createElement("button");
    chip.className = "context-chip";
    chip.textContent = ctx.label;
    chip.onclick = () => showContextVerse(ctx);
    grid.appendChild(chip);
  });
}

function showContextVerse(ctx) {
  const list = VERSES[ctx.key];
  const v = list[Math.floor(Math.random() * list.length)];
  const box = document.getElementById("context-result");
  box.classList.remove("hidden");
  document.getElementById("ctx-theme").textContent = ctx.label;
  document.getElementById("ctx-text").textContent = `« ${v.text} »`;
  document.getElementById("ctx-ref").textContent = v.ref;
  document.getElementById("ctx-start-btn").onclick = () => {
    addHistory({ type: "contexte:" + ctx.key, text: v.text, ref: v.ref });
    box.classList.add("hidden");
  };
}

// ---------- Méditation ----------
function renderMeditation() {
  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const m = MEDITATIONS[dayIndex % MEDITATIONS.length];
  document.getElementById("med-verse").textContent = `« ${m.verse.text} »`;
  document.getElementById("med-ref").textContent = m.verse.ref;
  document.getElementById("med-reflection").textContent = m.reflection;
  document.getElementById("med-prayer").textContent = m.prayer;
  document.getElementById("med-challenge").textContent = m.challenge;

  const notes = loadJSON(STORAGE_KEYS.notes, {});
  const todayKey = new Date().toISOString().slice(0, 10);
  document.getElementById("med-notes").value = notes[todayKey] || "";

  document.getElementById("med-save-btn").onclick = () => {
    const current = loadJSON(STORAGE_KEYS.notes, {});
    current[todayKey] = document.getElementById("med-notes").value;
    saveJSON(STORAGE_KEYS.notes, current);
    addHistory({ type: "meditation_note", text: "Note de méditation enregistrée", ref: todayKey });
  };
}

// ---------- Prières ----------
function renderPrayerList() {
  const list = document.getElementById("prayer-list");
  list.innerHTML = "";
  PRAYERS.forEach(p => {
    const item = document.createElement("div");
    item.className = "prayer-item";
    item.textContent = p.title;
    item.onclick = () => {
      const detail = document.getElementById("prayer-detail");
      detail.classList.remove("hidden");
      document.getElementById("prayer-detail-title").textContent = p.title;
      document.getElementById("prayer-detail-text").textContent = p.text;
      addHistory({ type: "priere:" + p.key, text: p.title, ref: "" });
    };
    list.appendChild(item);
  });
}

// ---------- Favoris & Historique ----------
function addFavorite(verse) {
  const favs = loadJSON(STORAGE_KEYS.favorites, []);
  favs.unshift({ ...verse, date: new Date().toISOString() });
  saveJSON(STORAGE_KEYS.favorites, favs.slice(0, 200));
  renderFavHistoryLists();
}

function addHistory(entry) {
  const hist = loadJSON(STORAGE_KEYS.history, []);
  hist.unshift({ ...entry, date: new Date().toISOString() });
  saveJSON(STORAGE_KEYS.history, hist.slice(0, 200));
  renderFavHistoryLists();
}

function renderFavHistoryLists() {
  const favList = document.getElementById("fav-list");
  const histList = document.getElementById("history-list");
  const favs = loadJSON(STORAGE_KEYS.favorites, []);
  const hist = loadJSON(STORAGE_KEYS.history, []);

  favList.innerHTML = favs.length
    ? favs.map(f => `<div class="list-item">« ${f.text} »<small>${f.ref} — ${new Date(f.date).toLocaleDateString("fr-FR")}</small></div>`).join("")
    : `<p class="empty-note">Aucun favori pour le moment.</p>`;

  histList.innerHTML = hist.length
    ? hist.map(h => `<div class="list-item">${h.text}<small>${h.ref} — ${new Date(h.date).toLocaleString("fr-FR")}</small></div>`).join("")
    : `<p class="empty-note">Ton historique apparaîtra ici.</p>`;
}

// ---------- Préférences ----------
function renderPreferences() {
  const prefs = loadJSON(STORAGE_KEYS.prefs, {
    translation: "LSG",
    count: 1,
    morning: "06:00",
    noon: "12:00",
    evening: "21:00",
    themes: []
  });

  document.getElementById("pref-translation").value = prefs.translation;
  document.getElementById("pref-count").value = prefs.count;
  document.getElementById("pref-morning").value = prefs.morning;
  document.getElementById("pref-noon").value = prefs.noon;
  document.getElementById("pref-evening").value = prefs.evening;

  const chipsBox = document.getElementById("pref-themes");
  chipsBox.innerHTML = "";
  THEMES.forEach(theme => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "theme-chip" + (prefs.themes.includes(theme) ? " selected" : "");
    chip.textContent = theme;
    chip.onclick = () => {
      chip.classList.toggle("selected");
    };
    chipsBox.appendChild(chip);
  });

  document.getElementById("pref-save-btn").onclick = () => {
    const selectedThemes = Array.from(chipsBox.querySelectorAll(".theme-chip.selected")).map(c => c.textContent);
    const newPrefs = {
      translation: document.getElementById("pref-translation").value,
      count: Number(document.getElementById("pref-count").value),
      morning: document.getElementById("pref-morning").value,
      noon: document.getElementById("pref-noon").value,
      evening: document.getElementById("pref-evening").value,
      themes: selectedThemes
    };
    saveJSON(STORAGE_KEYS.prefs, newPrefs);
    const status = document.getElementById("pref-status");
    status.textContent = "Préférences enregistrées ✓";
    setTimeout(() => (status.textContent = ""), 2000);
  };

  document.getElementById("notif-enable-btn").onclick = scheduleNotifications;
}

// ---------- Notifications (Capacitor LocalNotifications) ----------
// En mode navigateur (avant l'ajout de la plateforme Android), ce plugin
// n'existe pas : on informe simplement l'utilisateur. Une fois la plateforme
// Android ajoutée (npx cap add android) et le plugin installé
// (@capacitor/local-notifications), ce code programmera les 3 rappels.
async function scheduleNotifications() {
  const status = document.getElementById("pref-status");
  if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.LocalNotifications) {
    const { LocalNotifications } = window.Capacitor.Plugins;
    const perm = await LocalNotifications.requestPermissions();
    if (perm.display !== "granted") {
      status.textContent = "Permission refusée pour les notifications.";
      return;
    }
    const prefs = loadJSON(STORAGE_KEYS.prefs, { morning: "06:00", noon: "12:00", evening: "21:00" });
    const times = [
      { id: 1, time: prefs.morning, title: "Bonjour ✨", body: "Ton verset du jour t'attend dans Blessing AI." },
      { id: 2, time: prefs.noon, title: "Un instant de gratitude 🙏", body: "Prends une minute pour remercier Dieu aujourd'hui." },
      { id: 3, time: prefs.evening, title: "Bonne nuit 🌙", body: "Un verset du soir pour terminer ta journée en paix." }
    ];
    await LocalNotifications.schedule({
      notifications: times.map(t => {
        const [h, m] = t.time.split(":").map(Number);
        return {
          id: t.id,
          title: t.title,
          body: t.body,
          schedule: { on: { hour: h, minute: m }, repeats: true }
        };
      })
    });
    status.textContent = "Notifications programmées ✓";
  } else {
    status.textContent = "Disponible une fois l'app packagée avec Capacitor (npx cap add android).";
  }
}

// ---------- Navigation ----------
function initNavigation() {
  const buttons = document.querySelectorAll(".nav-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
      document.getElementById("view-" + btn.dataset.view).classList.add("active");
    });
  });
}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
  renderVerseOfDay();
  renderContextGrid();
  renderMeditation();
  renderPrayerList();
  renderFavHistoryLists();
  renderPreferences();
  initNavigation();
});
