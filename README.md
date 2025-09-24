Aplikacija za pretragu filmova i serija koja omogućava brzo pretraživanje, pregled najpopularnijih naslova i detaljan prikaz informacija o svakom filmu ili seriji. Napravljena je sa fokusom na performans, responzivni dizajn i jednostavno korisničko iskustvo. Idealna je za demonstraciju API integracije, routing-a i tipiziranog React koda u TypeScriptu.

Funkcionalnosti
- Pretraga filmova i serija po naslovu.
- Prikaz najpopularnijih naslova na početnoj stranici.
- Detaljni prikaz pojedinačnog filma/serije uključujući sinopsis, ocjene, žanrove i slične naslove.
- Pagination i error handling za stabilno iskustvo pri listanju rezultata.
- Responsive UI prilagođen mobilnim uređajima i desktopu.

Tehnologije
- Front-end: React
- Build tooling: Vite
- Jezik: TypeScript
- State management: lokalni React state / Zustand  
- API: TMDB

Instalacija i pokretanje
- Kloniraj repo ili preuzmi izvorni kod.
- U root folderu projekta pokreni instalaciju dependencija:
      npm i

- Pokreni razvojni server:
npm run dev

- Otvori preglednik na adresi koju Vite izbaci u konzoli.


Struktura projekta
- src/ — glavni izvorni kod aplikacije
- src/pages/ — stranice:  Details
- src/components/ — ponovo upotrebljive UI komponente (SearchBar, Card, MainSection,  Hero, NavBar)
- vite.config.ts — konfiguracija Vite-a

