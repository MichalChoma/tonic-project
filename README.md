# TypeRacer — Next.js Coding Challenge

Platforma do rywalizacji w pisaniu na klawiaturze zbudowana w Next.js, gdzie użytkownicy mogą mierzyć swoją prędkość i dokładność pisania w timed roundach.

## Uruchomienie

```bash
npm install
npm run dev
```

Aplikacja dostępna pod: [http://localhost:3000](http://localhost:3000)

Dane logowania do konta demo:

- **Login:** `demo`
- **Hasło:** `demo`

## Stack technologiczny

| Warstwa        | Technologia                  |
| -------------- | ---------------------------- |
| Framework      | Next.js 16 (App Router)      |
| Język          | TypeScript                   |
| Style          | Tailwind                     |
| Stan globalny  | Zustand                      |
| Zapytania HTTP | TanStack Query               |
| Testy          | Jest + React Testing Library |

## Zaimplementowane funkcjonalności

### Uwierzytelnianie

- Strona logowania z podziałem na Server Component (layout/SEO) i Client Component (formularz)
- Logowanie z mockiem `fetch` przez `useMutation` z TanStack Query
- Stan sesji przechowywany w Zustand (`authStore`) — token + username
- Przekierowanie na `/login` dla niezalogowanych użytkowników

### Gra

- Jednozdaniowe rundy z odliczającym timerem (30 sekund)
- Kalkulator WPM oparty na znakach (`input.length / 5 / czas * 60`) — standard branżowy (MonkeyType, TypeRacer)
- Śledzenie dokładności w czasie rzeczywistym (poprawne znaki / wszystkie znaki)
- Ekran podsumowania rundy z wynikiem WPM, dokładnością i czasem
- Historia rund przechowywana w `gameStore` (Zustand)

### Tabela graczy

- Statyczni demo-gracze + wiersz z aktualnym postępem zalogowanego użytkownika
- Sortowanie po kolumnach (WPM, dokładność) z kierunkiem asc/desc
- Paginacja (5 wierszy na stronę)
- Pasek postępu dla każdego gracza
- Wyróżnienie wiersza aktualnego użytkownika (zielony akcent)

### UI / UX

- Nawigacja z nazwą użytkownika i przyciskiem wylogowania
- Responsywny dark theme (paleta zinc)
- Spójny system komponentów

## Architektura

```
app/
  layout.tsx          — Root layout z Navbar i QueryClient providerem
  page.tsx            — Strona gry (client component)
  login/
    page.tsx          — Server component (SEO, statyczny shell)
    components/
      LoginForm.tsx   — Client component z useMutation
      LoginForm.test.tsx
  components/
    Navbar.tsx
    TypingInput.tsx
    RoundEnd.tsx
    StatsBar.tsx
    PlayersTable.tsx
    table/
      SortableTableHeader.tsx
      TableRow.tsx
      TablePagination.tsx
  providers.tsx       — QueryClientProvider

store/
  authStore.ts        — Token, username, login/logout
  gameStore.ts        — Live WPM/accuracy, historia rund

lib/
  auth.ts             — mockLogin (symulacja API, delay 1s)
  types.ts            — GameStats interface
  typing.ts           — calculateWPM, getAccuracy, getElapsed
```

## Decyzje projektowe

**Server vs Client Components** — strona logowania jest Server Componentem, żeby umożliwić SEO i eksport metadanych (`title: "Sign In"`). Tylko formularz jest Client Componentem (potrzebuje stanu i event handlerów).

**Timer** — jeden `useEffect` z zależnością `[roundStats]`. Interval sam się czyści przy osiągnięciu 0 (`clearInterval` + `setTimeLeft`). Unika problemu z niestabilnymi referencjami funkcji i komunikatami React Compilera o `setState` w ciele efektu.

**Obliczanie WPM** — metoda znakowa (`input.length / 5`) zamiast liczenia spacji. Standard używany przez MonkeyType i TypeRacer, odporny na krótkie słowa i literówki.

**Zustand zamiast Context** — prostszy boilerplate, lepszy devtools support, selektory bez re-renderów całego drzewa.

**TanStack Query dla logowania** — mimo że to mock, chciałem wykorzystać możliwość wykorzystania tej biblioteki dla późniejszej integracji z backendem.

**Komponenty tabeli w podfolderze** — `table/` zawiera `SortableTableHeader`, `TableRow`, `TablePagination` jako osobne pliki, żeby uniknąć jednego dużego pliku z wieloma komponentami.

## Testy

```bash
npm test
npm run test:watch
```

Testy jednostkowe dla `LoginForm`:

- Renderowanie formularza
- Stan ładowania podczas mutacji
- Przekierowanie po udanym logowaniu
- Wyświetlanie komunikatu błędu

## Zakres i czas

Aplikacja zbudowana w ramach ~3-godzinnego wyzwania. Pominięte:

- Prawdziwy backend / baza danych (zastąpione mockiem)
- WebSockety / live multiplayer (zastąpione statycznymi danymi demo)
- URL state management dla sortowania
- E2E testy (Playwright/Cypress) - ze względu na brak BE

## Kod wspomagany przez AI

Projekt był budowany z pomocą Claude Code (Anthropic). AI pomagało przy:

- Boilerplate komponentów i stylach Tailwind
- Debugowaniu błędów React Compilera (`useCallback` / `setState` w efektach)
- Pomoc przy storze Zustand
- Pomoc przy algorytmach zliczania WPM
- Konfiguracji Jest + ts-jest
- Pomoc z Readme

Architektura, decyzje projektowe i flow logiki gry były podejmowane przeze mnie.
