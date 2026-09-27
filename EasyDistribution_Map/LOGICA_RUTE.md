# Logica actuală a rutelor și opririlor

Documentul descrie comportamentul implementat în aplicație în acest moment. Datele sunt demonstrative; nu sunt încă preluate de la un server.

## 1. Modelul de date

Tipurile sunt definite în `src/features/routes/types/route.types.ts`:

- O rută (`DeliveryRoute`) are un identificator, un nume, un status, ore de început și de final estimat, opțional ora finalizării și o listă de opriri.
- O oprire (`RouteStop`) aparține unei rute, are o ordine, coordonate geografice, status, oră de început, oră estimată de finalizare și opțional ora reală de finalizare.
- Statusurile unei opriri și ale unei rute sunt `pending`, `delivered` și `refused`.
- Opririle nu au câmp de nume. Identificarea lor vizuală folosește numele rutei și numărul opririi.

Orele din datele mock sunt șiruri `HH:mm`. Coordonatele sunt perechi `[latitudine, longitudine]`.

## 2. Datele demonstrative

`src/features/routes/data/mockRoutes.ts` conține trei rute:

- `Ruta 003`: în desfășurare, cu opriri livrate, în așteptare și refuzate.
- `Ruta 002`: toate opririle sunt livrate, iar ruta are ora finalizării.
- `Ruta 001`: opririle sunt refuzate, iar ruta are statusul `refused`.

Aceste valori inițiale sunt folosite ca stare locală la montarea hărții.

## 3. Starea și actualizarea simulării

Hookul `useRouteTracking` păstrează lista rutelor, ruta selectată și timpul rămas până la următoarea actualizare.

- La început este selectată prima rută din lista mock.
- La fiecare secundă se actualizează ceasul intern, folosit pentru numărătoarea inversă.
- La fiecare 30 de secunde, hookul încearcă să avanseze ruta selectată cu `advanceRoute` și pornește următorul interval de 30 de secunde.
- Schimbarea rutei selectate recreează intervalul de actualizare. Prin urmare, simularea avansează ruta care este selectată în momentul actualizării.
- Ora de finalizare simulată este ora locală curentă, formatată pentru limba română ca `HH:mm`.

`advanceRoute` caută oprirea `pending` cu cel mai mic număr de ordine. O marchează `delivered`, îi salvează ora în `finishedAt`, apoi verifică dacă au mai rămas opriri `pending`. Dacă nu au rămas, marchează ruta `delivered` și setează `completedAt`.

Opririle `refused` sunt sărite în căutarea următoarei opriri. Așadar, simulatorul nu le modifică și continuă cu următoarea oprire în așteptare.

## 4. Panoul „Rute curente”

`CurrentRoutesPanel` afișează rutele în ordine descrescătoare după nume. Panoul este deschis inițial și poate fi strâns sau redeschis cu butonul din antet.

Pentru fiecare rută afișează:

- numele rutei;
- progresul `opriri livrate / total opriri` — opririle refuzate nu sunt numărate ca livrate, dar fac parte din total;
- ora de început și ora de final estimată cât timp ruta are status `pending`;
- ora reală `completedAt` pentru o rută cu status `delivered` sau `refused`;
- o reprezentare vizuală a statusului: indicator pentru ruta în desfășurare, săgeată pentru ruta livrată sau săgeată roșie pentru ruta refuzată.

Numărătoarea de lângă titlul panoului arată secundele până la actualizarea următoare și se reîmprospătează o dată pe secundă.

Selectarea unui card actualizează ruta activă pentru hartă și pentru simularea opririlor.

## 5. Marker-ele de pe hartă

`DeliveryMap` combină harta Leaflet/OpenStreetMap, panoul rutelor și stratul de markere pentru ruta selectată. `RouteStopsLayer` sortează opririle după ordine și creează câte un marker pentru fiecare:

- portocaliu: prima oprire `pending` — oprirea curentă;
- verde: oprire `delivered`;
- roșu: oprire `refused`;
- gri: oprire `pending` care urmează după cea curentă.

Markerul include numele rutei deasupra și numărul opririi în pin. Opririle refuzate sunt desenate cu roșu; ele nu sunt omise de pe hartă.

Când nu mai există opriri `pending`, stratul reduce opacitatea tuturor markerelor rutei. La click pe un marker se deschide un popup sub pin, cu ruta și numărul opririi, ora de început, ora estimată sau reală de finalizare și statusul scris.

## 6. Limitele logicii curente

- Simularea rulează doar în memoria interfeței și se resetează la reîncărcarea paginii.
- Se avansează doar ruta selectată; rutele din fundal nu progresează.
- O oprire refuzată nu este schimbată automat și nu există o acțiune în interfață pentru schimbarea manuală a statusului.
- `advanceRoute` marchează ruta ca `delivered` când nu mai există opriri `pending`, chiar dacă unele opriri sunt `refused`. Acesta este comportamentul actual al codului.
- După completarea rutei, intervalul de 30 de secunde continuă să se reinițializeze, dar `advanceRoute` nu mai schimbă datele rutei.
- Datele mock păstrează ore fixe de început și estimare; actualizarea periodică schimbă statusul și ora efectivă de finalizare, nu recalculează estimările.
