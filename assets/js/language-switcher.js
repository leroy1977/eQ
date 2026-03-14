// Language Switcher for eQuanta website
class LanguageSwitcher {

    constructor() {

        // Explicit page translations
        this.pageMap = {
            "index.html": "index-en.html",
            "servicos-ambientais.html": "environmental-services.html",
            "contato-equanta.html": "contact-equanta.html",
            "sobre-equanta.html": "about-equanta.html",
            "dnlds.html": "dnlds-en.html"
        };

        // Build reverse mapping automatically
        this.reverseMap = Object.fromEntries(
            Object.entries(this.pageMap).map(([pt, en]) => [en, pt])
        );

        this.currentLang = this.getCurrentLanguage();

        document.addEventListener("DOMContentLoaded", () => this.init());
    }

    getCurrentFile() {

        let file = window.location.pathname.split("/").pop();

        if (!file || file === "") file = "index.html";

        return file;

    }

    getCurrentLanguage() {

        const file = this.getCurrentFile();

        if (this.reverseMap[file]) return "en";

        return "pt";

    }

    setLanguage(lang) {

        if (lang === this.currentLang) return;

        this.redirectToLanguageVersion(lang);

    }

    redirectToLanguageVersion(lang) {

        const file = this.getCurrentFile();

        let target;

        if (lang === "en") {

            target = this.pageMap[file];

            // fallback attempt
            if (!target) {

                if (file === "index.html") {
                    target = "index-en.html";
                }

            }

            // final fallback
            if (!target) {
                target = "index-en.html";
            }

        } else {

            target = this.reverseMap[file];

            if (!target) {

                if (file === "index-en.html") {
                    target = "index.html";
                }

            }

            if (!target) {
                target = "index.html";
            }

        }

        window.location.href = target;

    }

    createLanguageSwitcher() {

        const navList = document.querySelector(".navbar-nav.ml-auto");

        if (!navList) return;

        const li = document.createElement("li");

        li.classList.add("nav-item", "language-switcher");

        li.innerHTML = `
            <a href="#" class="menu-item lang-link ${this.currentLang === "pt" ? "active" : ""}" data-lang="pt">PT</a>
            <span class="divider"> | </span>
            <a href="#" class="menu-item lang-link ${this.currentLang === "en" ? "active" : ""}" data-lang="en">EN</a>
        `;

        navList.appendChild(li);

        this.addEventListeners();

    }

    addEventListeners() {

        document.querySelectorAll(".lang-link").forEach(link => {

            link.addEventListener("click", e => {

                e.preventDefault();

                const lang = link.dataset.lang;

                this.setLanguage(lang);

            });

        });

    }

    init() {

        this.createLanguageSwitcher();

    }

}

new LanguageSwitcher();
