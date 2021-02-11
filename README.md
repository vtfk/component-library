# Komponentbibliotek

Felles komponenter for VTFKs frontend-løsninger.


***

## Introduksjon

Komponentbiblioteket har som formål å standardisere kode og design, samt å effektivere utvikling av nye frontend-løsninger i fylkeskommunen.
Dette verktøyet forhåndsviser komponentene og dokumenterer bruken av dem. Har du spørsmål, kan du ta kontakt med seksjonen for Teknologi og digitalisering (BDK-TEK).

Komponentene er oppbygd slik at de skal være enkele å bruke, følge prinsippene om [universell utforming](https://www.uutilsynet.no/) (WCAG 2.0), og fungere på alle flater og skjermstørrelser.

Finner du noe feil, eller har du innspill til forbedringer, kan du komme i kontakt med oss på [Github](https://github.com/vtfk/component-library)!

## Design

Designmanualen komponentene er bygget på finner du på [designmanual.vtfk.no](https://designmanual.vtfk.no).<br />
Retningslinjer for bruk er også beskrevet her: [*kommer snart*](/)

## Kom i gang

For å installere komponentbiblioteket og lagre det i `package.json`-fila di, kjør kommandoen:

```bash
npm install @vtfk/components

# eller denne, om du bruker yarn:
yarn add @vtfk/components
```

### BaseStyle

For at stilsettet skal bli korrekt og at alt skal fungere optimalt, er det anbefalt å pakke alle siden i applikasjonen inn i [`BaseStyle`-komponenten](/?path=/story/komponenter-basestyle--basic).

I en React-applikasjon kan dette gjøres i index.js som dette:

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { BaseStyle } from '@vtfk/components'

import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <BaseStyle>
      <App />
    </BaseStyle>
  </React.StrictMode>,
  document.getElementById('root')
)
```

## Utvikling

Repository for biblioteket finner du [her](https://github.com/vtfk/component-library).

1. Klone ned repository

  ```bash
  git clone https://github.com/vtfk/component-library.git git clone https://github.com/vtfk/component-library.git git clone https://github.com/vtfk/component-library.git git clone https://github.com/vtfk/component-library.git

  # eller over SSH
  git clone git@github.com:vtfk/component-library.git
  ```

2. Installere dependencies

  ```bash
  npm install
  ```
  
3. Starte storybook for forhåndsvisning av komponenter

  ```bash
  npm run storybook
  ```

### Opprette ny komponent

Det er lagt inn et script for generering av nye komponenter, som hjelper deg med å sette opp det du trenger. Kjør følgende kommando og følg veiviseren for å komme i gang. Husk å eksportere ut komponenten din i `/src/index.js` så den blir tilgjengelig i pakka.

```bash
npm run generate
```

### Kodestil

Fylkeskommunen prøver så langt det lar seg gjøre å standarisere på bruk av [Standardjs]()-kodestil. Komponentbiblioteket inneholder linter (eslint) som sjekker og fikser eventuelle feil.

Sjekk at kodestilen holder mål ved å kjøre:

```bash
npm run test:lint
```

### Automatiserte tester

Alle komponenter i biblioteket skal som hovedregel ha automatiserte tester, slik at vi unngår feil i komponenter når det gjøres endringer.

Testene bør som et minimum validere at komponenten laster, og at den gjør det den skal (user action). Det er for eksempel fornuftig å sjekke at klikk på en knapp faktisk trigger en `onClick`-event, eller at endring av verdi i et tekstfelt trigger forventet endring. For å hjelpe oss med testingen bruker vi [jest](https://jestjs.io/) og [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

Kjør testene ved å kjøre:

```bash
npm run test

# eller med watcher, som er kjekt når man utvikler
npm run test:watch
```

## Publisering av biblioteket

Vi bruker git tags for publisering av nye versjoner. For å opprette ny versjon bruker vi pakken [release](https://www.npmjs.com/package/release), som lar deg opprette endringslogg og tagg av releasen på en god måte. Selve publiseringen til NPM er det [Github Actions](https://github.com/features/actions) som tar seg av for oss.

For å opprette ny release, bruk følgende kommando. Type erstatter du med enten `major`, `minor` eller `patch`, alt ettersom.

```bash
npm run release -- <type>
```

🔗  &nbsp; [NPM-pakke - @vtfk/components](https://www.npmjs.com/package/@vtfk/components)<br />
🔗  &nbsp; [Mer dokumentasjon på bruk av release-kommandoen](https://www.npmjs.com/package/release#usage)

## Publisering av dokumentasjon/Storybook

For å oppdatere denne Storybook-siden holder det å dytte endringen din til `main`-branchen i Github, da vil Vercel oppdatere siden automatisk. Det vil også genereres en forhåndsvisning av Storybook-dokumentasjonen i andre brancher (PR-er), slik at man kan se hvordan ting vil se ut når man legger til produksjon.

## Lisens

Komponentbiblioteket er lisensiert som [MIT](https://github.com/vtfk/component-library/blob/main/LICENSE), og all kode er utgitt som åpen kildekode.
