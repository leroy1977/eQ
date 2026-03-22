// Language Switcher for eQuanta website
// Uses in-place translation via data-i18n attributes + eQTranslations object (i18n.js)

class LanguageSwitcher {

    constructor() {
        this.supportedLangs = ["pt", "en"];
        this.defaultLang = "pt";
        this.currentLang = this.detectLanguage();
        document.addEventListener("DOMContentLoaded", () => this.init());
    }

    detectLanguage() {
        // 1. Check URL param: ?lang=en
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get("lang");
        if (urlLang && this.supportedLangs.includes(urlLang)) {
            localStorage.setItem("eqLang", urlLang);
            return urlLang;
        }
        // 2. Check localStorage
        const stored = localStorage.getItem("eqLang");
        if (stored && this.supportedLangs.includes(stored)) {
            return stored;
        }
        // 3. Check html lang attribute
        const htmlLang = document.documentElement.lang;
        if (htmlLang && htmlLang.startsWith("en")) return "en";
        // 4. Default
        return this.defaultLang;
    }

    setLanguage(lang) {
        if (!this.supportedLangs.includes(lang)) return;
        this.currentLang = lang;
        localStorage.setItem("eqLang", lang);
        this.applyTranslations();
        this.updateSwitcherUI();
        this.updateHtmlLang();
    }

    applyTranslations() {
        const translations = (typeof eQTranslations !== "undefined")
            ? eQTranslations[this.currentLang]
            : null;
        if (!translations) return;

        // Apply text content
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (translations[key] !== undefined) {
                el.innerHTML = translations[key];
            }
        });

        // Apply href attributes
        document.querySelectorAll("[data-i18n-href]").forEach(el => {
            const key = el.getAttribute("data-i18n-href");
            if (translations[key] !== undefined) {
                el.setAttribute("href", translations[key]);
            }
        });

        // Apply placeholder attributes
        document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
            const key = el.getAttribute("data-i18n-placeholder");
            if (translations[key] !== undefined) {
                el.setAttribute("placeholder", translations[key]);
            }
        });

        // Apply page title
        const titleKey = document.body.getAttribute("data-page") + ".meta.title";
        if (translations[titleKey]) {
            document.title = translations[titleKey];
        }

        // Apply meta description
        const descKey = document.body.getAttribute("data-page") + ".meta.desc";
        const metaDesc = document.querySelector("meta[name='description']");
        if (metaDesc && translations[descKey]) {
            metaDesc.setAttribute("content", translations[descKey]);
        }
    }

    updateHtmlLang() {
        document.documentElement.lang = this.currentLang === "en" ? "en" : "pt-BR";
    }

    updateSwitcherUI() {
        document.querySelectorAll(".lang-link").forEach(link => {
            link.classList.toggle("active", link.dataset.lang === this.currentLang);
        });
    }

    createLanguageSwitcher() {
        const navList = document.querySelector(".navbar-nav.ml-auto");
        if (!navList) return;

        const li = document.createElement("li");
        li.classList.add("nav-item", "language-switcher");
        li.innerHTML = `
            <a href="#" class="menu-item lang-link ${this.currentLang === "pt" ? "active" : ""}" data-lang="pt"><span class="lang-flag">🇧🇷</span> PT</a>
            <span class="divider"> | </span>
            <a href="#" class="menu-item lang-link ${this.currentLang === "en" ? "active" : ""}" data-lang="en"><span class="lang-flag">🇺🇸</span> EN</a>
        `;
        navList.appendChild(li);

        li.querySelectorAll(".lang-link").forEach(link => {
            link.addEventListener("click", e => {
                e.preventDefault();
                this.setLanguage(link.dataset.lang);
            });
        });
    }

    init() {
        this.createLanguageSwitcher();
        // Apply translations if not default PT
        if (this.currentLang !== this.defaultLang) {
            this.applyTranslations();
            this.updateHtmlLang();
        }
    }
}

new LanguageSwitcher();
