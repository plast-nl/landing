function initNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-navigation");
  if (!toggle || !navigation) return;
  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  };
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    navigation.classList.toggle("is-open", open);
  });
  navigation
    .querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      toggle.getAttribute("aria-expanded") === "true"
    ) {
      closeMenu();
      toggle.focus();
    }
  });
  window.matchMedia("(min-width: 992px)").addEventListener("change", closeMenu);
  document.documentElement.classList.add("js-ready");
}

// Copy plain contact details without opening email or maps.
async function copyContactText(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Fall back for browsers or contexts that deny Clipboard API access.
    }
  }
  const field = document.createElement("textarea");
  const previousFocus = document.activeElement;
  field.value = text;
  field.readOnly = true;
  field.style.cssText = "position:fixed;top:0;left:0;opacity:0;font-size:16px;";
  document.body.appendChild(field);
  try {
    field.focus({ preventScroll: true });
    field.select();
    field.setSelectionRange(0, text.length);
    if (!document.execCommand("copy")) throw new Error("Copy failed");
  } finally {
    field.remove();
    previousFocus?.focus({ preventScroll: true });
  }
}

function initBackToTop() {
  document.querySelectorAll(".footer-back").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      document.getElementById("page-top")?.focus({ preventScroll: true });
      window.history.replaceState(window.history.state, "", "#page-top");
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    });
  });
}

function initCopyButtons() {
  document.querySelectorAll("[data-copy]").forEach((button) => {
    const status = button.closest(".contact-row").querySelector(".copy-status");
    let resetTimer;
    button.hidden = false;
    button.addEventListener("click", async () => {
      clearTimeout(resetTimer);
      button.disabled = true;
      button.classList.remove("is-copied");
      status.textContent = "";
      try {
        await copyContactText(button.dataset.copy);
        button.classList.add("is-copied");
        status.textContent = "Скопійовано";
      } catch {
        status.textContent =
          "Не вдалося скопіювати. Виділіть і скопіюйте текст вручну.";
      } finally {
        button.disabled = false;
      }
      resetTimer = setTimeout(() => {
        button.classList.remove("is-copied");
        status.textContent = "";
      }, 4000);
    });
  });
}

function initCitySelection() {
  const groupJoinEmail = document.getElementById("group-join-email");
  if (!groupJoinEmail) return;
  const cityStatus = document.querySelector(".join-city-status");
  const cityLinks = document.querySelectorAll("[data-join-city]");
  cityLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const city = link.dataset.joinCity;
      const subject = `Хочу долучитися до Пласту — ${city}`;
      groupJoinEmail.href = `mailto:${groupJoinEmail.dataset.email}?subject=${encodeURIComponent(subject)}`;
      cityStatus.textContent = `Обране місто: ${city}`;
      cityStatus.hidden = false;
      cityLinks.forEach((cityLink) => {
        const selected = cityLink.dataset.joinCity === city;
        cityLink.classList.toggle("is-selected", selected);
        if (selected) cityLink.setAttribute("aria-current", "true");
        else cityLink.removeAttribute("aria-current");
      });
    });
  });
}

initNavigation();
initBackToTop();
initCopyButtons();
initCitySelection();
