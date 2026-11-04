(() => {
  const data = document.getElementById('people-preview-data');
  if (!data) return;
  let people;
  try {
    people = JSON.parse(data.textContent).filter(person => person.id && person.name);
  } catch {
    return;
  }

  const birthDateFormat = new Intl.DateTimeFormat('uk-UA', {
    day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC'
  });
  function formatLifeDate(value) {
    return /^\d{4}$/.test(value) ? value : birthDateFormat.format(new Date(value + 'T00:00:00Z'));
  }
  function fillCard(card, person, baseurl, photoUrl) {
    const image = card.querySelector('[data-person-image]');
    image.hidden = !person.image;
    if (person.image) {
      image.src = photoUrl || baseurl + person.image;
      image.alt = person.name;
      image.width = person.image_width;
      image.height = person.image_height;
    } else {
      image.removeAttribute('src');
      image.alt = '';
    }
    card.querySelector('[data-person-photo-placeholder]').hidden = Boolean(person.image);
    card.querySelector('[data-person-name]').textContent = person.name;
    const date = card.querySelector('[data-person-birth-date]');
    date.hidden = !person.birth_date;
    date.textContent = person.birth_date ? formatLifeDate(person.birth_date) : '';
    if (person.birth_date && person.death_date) {
      date.textContent += ` – ${formatLifeDate(person.death_date)}`;
    }
    const description = card.querySelector('[data-person-description]');
    description.textContent = person.description || '';
    description.hidden = !person.description;
    const source = card.querySelector('[data-person-source]');
    const sourceUrl = person.description_source_url || person.source_url || '';
    source.href = sourceUrl;
    source.hidden = !sourceUrl;
  }

  function initFeaturedPeople() {
    const section = document.querySelector('[data-people-preview]');
    if (!section) return;
    const cards = [...section.querySelectorAll('[data-person-card]')];
    const candidates = people.filter(person => person.image && person.description && !['1', '2', '3'].includes(person.id));
    if (!cards.length || candidates.length < cards.length) return;
    const storageKey = 'plast-people-preview-last-selection';
    let previous = [];
    try {
      const stored = JSON.parse(sessionStorage.getItem(storageKey));
      if (Array.isArray(stored)) previous = stored;
    } catch {
      // Storage is optional; it only prevents consecutive repeats.
    }
    const alternatives = candidates.filter(person => !previous.includes(person.id));
    const pool = [...(alternatives.length >= cards.length ? alternatives : candidates)];
    const selected = cards.map(() => pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
    // Update the set together; failed downloads leave the original three cards intact.
    Promise.all(selected.map(person => new Promise((resolve, reject) => {
      const photo = new Image();
      photo.onload = () => resolve(photo);
      photo.onerror = reject;
      photo.src = section.dataset.baseurl + person.image;
    }))).then(photos => {
      cards.forEach((card, index) => fillCard(card, selected[index], section.dataset.baseurl, photos[index].src));
      try {
        sessionStorage.setItem(storageKey, JSON.stringify(selected.map(person => person.id)));
      } catch {
        // The selection still works without browser storage.
      }
    }).catch(() => {
      // Keep the server-rendered cards if any selected photo cannot load.
    });
  }

  function initBirthdays() {
    const calendar = document.querySelector('[data-birthday-calendar]');
    const template = document.getElementById('person-card-template');
    if (!calendar || !template) return;
    const cards = calendar.querySelector('[data-birthday-cards]');
    const dayFormat = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Europe/Amsterdam', year: 'numeric', month: '2-digit', day: '2-digit'
    });
    const displayFormat = new Intl.DateTimeFormat('uk-UA', {
      timeZone: 'Europe/Amsterdam', day: 'numeric', month: 'long'
    });
    let previousDay;
    function updateCalendar() {
      const now = new Date();
      const parts = Object.fromEntries(dayFormat.formatToParts(now).map(part => [part.type, part.value]));
      const day = `${parts.year}-${parts.month}-${parts.day}`;
      if (day === previousDay) return;
      previousDay = day;
      const occurrences = people.flatMap(person => {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(person.birth_date || '')) return [];
        const monthDay = person.birth_date.slice(5);
        const [month, date] = monthDay.split('-').map(Number);
        const validDate = new Date(Date.UTC(2000, month - 1, date));
        if (validDate.getUTCMonth() !== month - 1 || validDate.getUTCDate() !== date) return [];
        let year = Number(parts.year);
        if (`${year}-${monthDay}` > day) year--;
        // For 29 February, use the most recent actual occurrence in a leap year.
        let occurrence = new Date(Date.UTC(year, month - 1, date));
        while (occurrence.getUTCMonth() !== month - 1) {
          year--;
          occurrence = new Date(Date.UTC(year, month - 1, date));
        }
        const key = `${year}-${monthDay}`;
        if (key < person.birth_date) return [];
        return [{ person, key, date: occurrence }];
      });
      const latest = occurrences.reduce((last, entry) => entry.key > last ? entry.key : last, '');
      const current = occurrences.filter(entry => entry.key === latest);
      const birthdays = current.map(entry => entry.person);
      cards.replaceChildren(...birthdays.map(person => {
        const card = template.content.firstElementChild.cloneNode(true);
        fillCard(card, person, calendar.dataset.baseurl);
        return card;
      }));
      calendar.querySelector('[data-calendar-date]').textContent = current.length
        ? displayFormat.format(current[0].date) : '';
      calendar.hidden = birthdays.length === 0;
    }
    updateCalendar();
    setInterval(updateCalendar, 60000);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) updateCalendar();
    });
    window.addEventListener('focus', updateCalendar);
  }

  initFeaturedPeople();
  initBirthdays();
})();
