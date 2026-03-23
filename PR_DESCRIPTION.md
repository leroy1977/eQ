# feat: Internacionalização do Site eQuanta (PT | EN | ES)

## Descrição

Esta PR implementa um sistema completo de internacionalização (i18n) para o site da eQuanta, substituindo a abordagem anterior de páginas duplicadas por idioma por uma solução de tradução dinâmica em tempo real, sem recarregamento de página. O site agora suporta três idiomas: **Português (PT)**, **Inglês (EN)** e **Espanhol (ES)**.

---

## Motivação

Anteriormente, o site mantinha arquivos HTML separados para cada idioma (ex: `index-en.html`, `about-equanta.html`, `contact-equanta.html`, `environmental-services.html`, `dnlds-en.html`), o que gerava duplicação de código, dificultava a manutenção e aumentava o risco de inconsistências entre versões. Esta PR elimina essa abordagem e centraliza todo o conteúdo traduzível em um único arquivo de traduções.

---

## O que foi feito

### ✨ Novas funcionalidades

- **`assets/js/i18n.js`** *(novo arquivo)*: Dicionário centralizado de traduções com todas as strings do site organizadas por idioma (`pt`, `en`, `es`) e por página (`index`, `about`, `services`, `contact`, `notfound`, `downloads`). Cobre navegação, rodapé, meta tags, títulos, descrições e todo o conteúdo textual das páginas.

- **Sistema de troca de idioma dinâmico** (`assets/js/language-switcher.js`): Classe `LanguageSwitcher` refatorada com suporte a:
  - Detecção automática de idioma via parâmetro de URL (`?lang=en`), `localStorage` e atributo `lang` do HTML
  - Persistência da preferência do usuário via `localStorage`
  - Aplicação de traduções via atributos `data-i18n`, `data-i18n-href` e `data-i18n-placeholder`
  - Atualização dinâmica de `<title>` e `<meta name="description">` por página
  - Seletor de idioma na navbar com bandeiras emoji (🇧🇷 PT | 🇺🇸 EN | 🇪🇸 ES)
  - Suporte completo ao Espanhol como terceiro idioma

### 🗑️ Arquivos removidos (páginas duplicadas por idioma)

| Arquivo removido | Substituído por |
|---|---|
| `index-en.html` | `index.html` (com i18n dinâmico) |
| `about-equanta.html` | `sobre-equanta.html` (com i18n dinâmico) |
| `contact-equanta.html` | `contato-equanta.html` (com i18n dinâmico) |
| `environmental-services.html` | `servicos-ambientais.html` (com i18n dinâmico) |
| `dnlds-en.html` | `dnlds.html` (com i18n dinâmico) |

### 🔧 Arquivos modificados

- **`index.html`**: Adicionados atributos `data-i18n` em todos os elementos traduzíveis; atributo `data-page="index"` no `<body>`; cache-bust `v=3` nos scripts.
- **`sobre-equanta.html`**: Migrado para i18n dinâmico com atributos `data-i18n`; atributo `data-page="about"`.
- **`servicos-ambientais.html`**: Migrado para i18n dinâmico; atributo `data-page="services"`.
- **`contato-equanta.html`**: Migrado para i18n dinâmico; atributo `data-page="contact"`.
- **`dnlds.html`**: Migrado para i18n dinâmico; atributo `data-page="downloads"`.
- **`404.html`**: Migrado para i18n dinâmico; atributo `data-page="notfound"`.
- **`sitemap.xml`**: Atualizado para refletir a nova estrutura de URLs (remoção das páginas `-en.html` e adição de parâmetros de idioma).
- **`assets/css/style.css`**: Correção do display dos divisores (`|`) do seletor de idioma no mobile — alterado de `display: none` para `display: inline`.

---

## Arquitetura da solução

```
Usuário acessa a página
        │
        ▼
LanguageSwitcher.detectLanguage()
  1. ?lang= (URL param)
  2. localStorage["eqLang"]
  3. <html lang="...">
  4. Default: "pt"
        │
        ▼
applyTranslations()
  - Busca strings em eQTranslations[lang]
  - Aplica via data-i18n → innerHTML
  - Aplica via data-i18n-href → href
  - Atualiza <title> e <meta description>
        │
        ▼
updateSwitcherUI() → destaca idioma ativo na navbar
```

---

## Commits incluídos

| Hash | Descrição |
|---|---|
| `eac230a` | Adicionando padrões i18n de internacionalização |
| `3bcc812` | Adicionando bandeiras de idioma |
| `eb1e6c6` | Adicionando o Espanhol como opção |
| `38b8e6a` | SiteMap em i18n |
| `9be8c73` | fix: add nav.lang.es key to es locale + cache-bust v=3 for all HTML files |
| `a6decef` | fix: show language switcher dividers on mobile (PT \| EN \| ES) |

---

## Impacto

- **Redução de ~1.875 linhas** de código HTML duplicado (5 arquivos removidos)
- **Manutenção simplificada**: alterações de conteúdo agora feitas em um único lugar (`i18n.js`)
- **Experiência do usuário melhorada**: troca de idioma instantânea sem recarregamento de página
- **SEO**: meta tags (`title` e `description`) atualizadas dinamicamente por idioma
- **Acessibilidade**: atributo `lang` do HTML atualizado conforme o idioma selecionado

---

## Como testar

1. Acesse o site e verifique o seletor de idioma na navbar (🇧🇷 PT | 🇺🇸 EN | 🇪🇸 ES)
2. Troque entre os idiomas e confirme que todo o conteúdo é traduzido dinamicamente
3. Recarregue a página e confirme que o idioma selecionado é mantido (via `localStorage`)
4. Acesse com `?lang=en` ou `?lang=es` na URL e confirme a detecção automática
5. Verifique o seletor de idioma em dispositivos móveis (divisores PT | EN | ES visíveis)
6. Confirme que as URLs antigas (`index-en.html`, `about-equanta.html`, etc.) foram removidas e o `sitemap.xml` está atualizado
