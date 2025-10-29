# Blog Automation API - Dokumentacja

## Wprowadzenie

API endpoint `/api/publish-post` umożliwia automatyczne publikowanie nowych postów na blogu poprzez wysyłanie zapytań HTTP POST. Jest to bezpieczne rozwiązanie, które automatyzuje cały proces od konwersji Markdown na HTML, przez commit do GitHub, aż po trigger deploymentu na Vercel.

---

## Konfiguracja

### 1. Zmienne Środowiskowe

Przed użyciem API, skonfiguruj następujące zmienne środowiskowe w Vercel Dashboard:

| Zmienna | Opis | Wymagana | Przykład |
|---------|------|----------|----------|
| `BLOG_API_KEY` | Tajny klucz API do uwierzytelniania | **TAK** | `a1b2c3d4e5f6...` |
| `GITHUB_TOKEN` | Personal Access Token z uprawnieniami `repo` | **TAK** | `ghp_abc123...` |
| `GITHUB_OWNER` | Właściciel repozytorium GitHub | NIE (domyślnie: `EngineeredSuccess`) | `EngineeredSuccess` |
| `GITHUB_REPO` | Nazwa repozytorium | NIE (domyślnie: `ev-marketplace-frontend`) | `ev-marketplace-frontend` |
| `VERCEL_DEPLOY_HOOK` | URL webhooka do ręcznego triggera deploymentu | NIE | `https://api.vercel.com/v1/...` |

#### Jak Wygenerować `BLOG_API_KEY`:

```bash
openssl rand -hex 32
```

Lub użyj generatora online: https://www.uuidgenerator.net/

#### Jak Utworzyć `GITHUB_TOKEN`:

1. Przejdź do: https://github.com/settings/tokens
2. Kliknij "Generate new token" → "Generate new token (classic)"
3. Nadaj nazwę: `Blog Automation API`
4. Zaznacz uprawnienie: `repo` (Full control of private repositories)
5. Kliknij "Generate token" i skopiuj token

#### Jak Dodać Zmienne w Vercel:

1. Przejdź do Vercel Dashboard
2. Wybierz projekt `v0-ev-marketplace-design`
3. Przejdź do: Settings → Environment Variables
4. Dodaj każdą zmienną osobno
5. Wybierz środowiska: Production, Preview, Development
6. Kliknij "Save"

---

## Endpoint API

### `POST /api/publish-post`

Publikuje nowy post na blogu.

#### Headers:

```http
Content-Type: application/json
x-api-key: your-secret-api-key
```

#### Request Body:

```json
{
  "title": "Tytuł Twojego Posta",
  "slug": "tytul-twojego-posta",
  "excerpt": "Krótki opis posta (150-200 znaków)",
  "content": "# Nagłówek\n\nTreść posta w formacie **Markdown**...",
  "author": "iViMarket",
  "category": "Samochody elektryczne",
  "tags": ["Tesla", "Model 3", "test", "recenzja"],
  "featured": true,
  "seo": {
    "metaTitle": "Tytuł SEO (opcjonalny)",
    "metaDescription": "Opis meta (opcjonalny)",
    "ogImage": "https://example.com/image.jpg"
  }
}
```

#### Pola:

| Pole | Typ | Wymagane | Opis |
|------|-----|----------|------|
| `title` | string | **TAK** | Tytuł posta |
| `slug` | string | NIE | URL-friendly slug (generowany automatycznie z tytułu) |
| `excerpt` | string | **TAK** | Krótki opis posta |
| `content` | string | **TAK** | Treść posta w formacie Markdown |
| `author` | string | NIE | Autor (domyślnie: "iViMarket") |
| `category` | string | **TAK** | Kategoria posta |
| `tags` | string[] | NIE | Tablica tagów (domyślnie: []) |
| `featured` | boolean | NIE | Czy post jest wyróżniony (domyślnie: false) |
| `seo.metaTitle` | string | NIE | Tytuł SEO (domyślnie: title) |
| `seo.metaDescription` | string | NIE | Opis meta (domyślnie: excerpt) |
| `seo.ogImage` | string | NIE | URL obrazu Open Graph |

#### Response (Success):

```json
{
  "success": true,
  "message": "Blog post \"Tytuł Twojego Posta\" published successfully!",
  "slug": "tytul-twojego-posta"
}
```

#### Response (Error):

```json
{
  "success": false,
  "error": "Error message"
}
```

#### Status Codes:

- `200` - Post opublikowany pomyślnie
- `400` - Błąd walidacji (brakujące pola)
- `401` - Nieautoryzowany (nieprawidłowy API Key)
- `500` - Błąd serwera (GitHub API, itp.)

---

## Testowanie API

### Przy użyciu cURL:

```bash
curl -X POST https://www.ivimarket.pl/api/publish-post \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-secret-api-key" \
  -d '{
    "title": "Test Post",
    "excerpt": "To jest testowy post",
    "content": "# Witaj świecie\n\nTo jest treść testowego posta.",
    "category": "Testy",
    "tags": ["test"]
  }'
```

### Przy użyciu Postman:

1. Utwórz nowe zapytanie POST
2. URL: `https://www.ivimarket.pl/api/publish-post`
3. Headers:
   - `Content-Type`: `application/json`
   - `x-api-key`: `your-secret-api-key`
4. Body (raw JSON): Wklej przykładowy JSON z sekcji "Request Body"
5. Kliknij "Send"

---

## Integracja z n8n

### Przykładowy Workflow:

```
1. [Trigger] → Google Sheets / Airtable / Webhook
2. [Set] → Przygotuj dane posta
3. [HTTP Request] → POST do /api/publish-post
4. [IF] → Sprawdź success
5. [Slack/Email] → Powiadomienie o sukcesie/błędzie
```

### Konfiguracja Węzła HTTP Request w n8n:

**Method**: POST  
**URL**: `https://www.ivimarket.pl/api/publish-post`

**Headers**:
```json
{
  "Content-Type": "application/json",
  "x-api-key": "={{$env.BLOG_API_KEY}}"
}
```

**Body** (JSON):
```json
{
  "title": "={{$json.title}}",
  "excerpt": "={{$json.excerpt}}",
  "content": "={{$json.content}}",
  "category": "={{$json.category}}",
  "tags": "={{$json.tags.split(',').map(t => t.trim())}}",
  "featured": "={{$json.featured === 'true'}}"
}
```

**Tip**: Zapisz `BLOG_API_KEY` jako zmienną środowiskową w n8n Settings → Variables.

---

## Przykładowy Workflow n8n (JSON)

Poniżej znajduje się gotowy do zaimportowania workflow n8n:

```json
{
  "name": "Blog Post Automation",
  "nodes": [
    {
      "parameters": {
        "operation": "append",
        "documentId": "YOUR_GOOGLE_SHEET_ID",
        "sheetName": "Blog Posts",
        "options": {}
      },
      "name": "Google Sheets Trigger",
      "type": "n8n-nodes-base.googleSheets",
      "position": [250, 300]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://www.ivimarket.pl/api/publish-post",
        "authentication": "none",
        "options": {},
        "headerParametersUi": {
          "parameter": [
            {
              "name": "x-api-key",
              "value": "={{$env.BLOG_API_KEY}}"
            }
          ]
        },
        "bodyParametersJson": "={{ JSON.stringify({\n  title: $json.title,\n  excerpt: $json.excerpt,\n  content: $json.content,\n  category: $json.category,\n  tags: $json.tags.split(',').map(t => t.trim()),\n  featured: $json.featured === 'true'\n}) }}"
      },
      "name": "Publish Post",
      "type": "n8n-nodes-base.httpRequest",
      "position": [450, 300]
    }
  ],
  "connections": {
    "Google Sheets Trigger": {
      "main": [[{ "node": "Publish Post", "type": "main", "index": 0 }]]
    }
  }
}
```

---

## Bezpieczeństwo

1. **Nigdy nie udostępniaj publicznie** swojego `BLOG_API_KEY` ani `GITHUB_TOKEN`.
2. **Używaj HTTPS** - API działa tylko przez bezpieczne połączenie.
3. **Rotacja kluczy** - Regularnie zmieniaj `BLOG_API_KEY` (np. co 90 dni).
4. **Monitoruj logi** - Sprawdzaj logi Vercel pod kątem nieautoryzowanych prób dostępu.
5. **Limit rate** - Rozważ dodanie rate limitingu w przyszłości (np. max 10 postów/godzinę).

---

## Troubleshooting

### Problem: "Unauthorized: Invalid API Key"

**Rozwiązanie**: Sprawdź, czy:
- Zmienna `BLOG_API_KEY` jest ustawiona w Vercel
- Wysyłasz poprawny klucz w nagłówku `x-api-key`
- Nie ma dodatkowych spacji w kluczu

### Problem: "Failed to fetch blog.ts from GitHub"

**Rozwiązanie**: Sprawdź, czy:
- `GITHUB_TOKEN` ma uprawnienia `repo`
- Token nie wygasł
- Nazwa repozytorium i właściciela są poprawne

### Problem: "GitHub API error: ..."

**Rozwiązanie**: 
- Sprawdź logi Vercel (Dashboard → Deployments → Functions)
- Upewnij się, że plik `src/lib/blog.ts` istnieje w repozytorium
- Sprawdź, czy nie ma konfliktów w repozytorium

### Problem: Post się nie pojawia na stronie

**Rozwiązanie**:
- Poczekaj 2-5 minut na deployment Vercel
- Sprawdź status deploymentu w Vercel Dashboard
- Wyczyść cache przeglądarki (Ctrl+Shift+R)

---

## Roadmap

Planowane ulepszenia:

- [ ] Wsparcie dla obrazów (upload do Supabase Storage)
- [ ] Walidacja Markdown przed publikacją
- [ ] Webhook powiadomień (Slack, Discord)
- [ ] Rate limiting
- [ ] Wersjonowanie postów
- [ ] Automatyczne generowanie obrazów OG za pomocą AI

---

## Wsparcie

W razie problemów:
1. Sprawdź logi w Vercel Dashboard
2. Przeczytaj sekcję Troubleshooting
3. Otwórz issue na GitHub: https://github.com/EngineeredSuccess/ev-marketplace-frontend/issues

---

**Wersja**: 1.0.0  
**Data**: 29 października 2025  
**Autor**: Manus AI
