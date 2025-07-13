'use client'

import React from 'react'
import { BlogPost } from '@/types/Blog'

interface HTMLBlogPostProps {
  post: BlogPost
}

const HTMLBlogPost: React.FC<HTMLBlogPostProps> = ({ post }) => {
  if (post.contentType === 'html') {
    // Create content based on the specific post
    let htmlContent = '';
    
    if (post.slug === 'geely-ex5-elektryczny-suv-polska-premiera-2025') {
      // Geely EX5 content
      htmlContent = `
        <div class="html-blog-container">
          <div class="key-benefits">
            <p><strong>Elektryczna rewolucja dociera do Polski!</strong> Geely EX5 to nowy elektryczny SUV, który już w Q3 2025 roku będzie dostępny na polskim rynku. Dzięki partnerstwu z <strong>Jameel Motors</strong>, klienci otrzymają nowoczesny pojazd z premium wyposażeniem w konkurencyjnej cenie od <strong>129 000 zł</strong> po dofinansowaniu.</p>
            
            <h3>Kluczowe zalety Geely EX5:</h3>
            <ul>
              <li>⚡ <strong>430 km zasięgu</strong> w cyklu WLTP</li>
              <li>💰 <strong>Cena od 129 000 zł</strong> z dopłatą NaszEauto</li>
              <li>🔋 <strong>Szybkie ładowanie</strong> DC do 100 kW</li>
              <li>🛡️ <strong>5-gwiazdkowa ocena Euro NCAP</strong></li>
              <li>🎯 <strong>Gwarancja 8 lat</strong> na baterię</li>
            </ul>
          </div>

          <h2>Najważniejsze wiadomości o premierze</h2>
          
          <p><strong>Geely EX5 oficjalnie wjeżdża na polski rynek w Q3 2025 roku!</strong></p>
          
          <h3>📅 Harmonogram wprowadzenia:</h3>
          <ul>
            <li><strong>Q1 2025:</strong> Rozpoczęcie przyjmowania zamówień</li>
            <li><strong>Q2 2025:</strong> Pierwsze dostawy do klientów</li>
            <li><strong>Q3 2025:</strong> Pełna dostępność w salonach</li>
          </ul>
          
          <div class="launch-edition">
            <h3>💎 Pakiet Launch Edition:</h3>
            <ul>
              <li><strong>Wallbox domowy za 1 zł</strong> (wartość 3000 zł)</li>
              <li><strong>Serwis premium na 3 lata za 1 zł</strong> (wartość 5000 zł)</li>
              <li><strong>Bezpłatna dostawa do domu</strong></li>
              <li><strong>Całkowita oszczędność: 8000 zł!</strong></li>
            </ul>
          </div>

          <h2>Specyfikacja techniczna</h2>

          <h3>Silnik i zasięg</h3>
          
          <h4>🚗 Napęd elektryczny:</h4>
          <ul>
            <li><strong>Moc:</strong> 218 KM (160 kW)</li>
            <li><strong>Moment obrotowy:</strong> 320 Nm</li>
            <li><strong>Przyspieszenie 0-100 km/h:</strong> 6,9 sekundy</li>
            <li><strong>Prędkość maksymalna:</strong> 180 km/h</li>
            <li><strong>Napęd:</strong> Na przednie koła (FWD)</li>
          </ul>

          <h2>Ceny i dostępność na rynku polskim</h2>
          
          <div class="pricing-table">
            <h3>Cennik oficjalny 2025</h3>
            <table>
              <thead>
                <tr>
                  <th>Wersja</th>
                  <th>Cena katalogowa</th>
                  <th>Z NaszEauto</th>
                  <th>Oszczędność</th>
                </tr>
              </thead>
              <tbody>
                <tr class="highlight">
                  <td><strong>EX5 Pro</strong></td>
                  <td>169 900 zł</td>
                  <td><strong>129 900 zł</strong></td>
                  <td>40 000 zł</td>
                </tr>
                <tr class="highlight">
                  <td><strong>EX5 Max</strong></td>
                  <td>189 900 zł</td>
                  <td><strong>149 900 zł</strong></td>
                  <td>40 000 zł</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="cta-section">
            <h2>🚀 Sprawdź ofertę Geely EX5 już dziś!</h2>
            
            <p><strong>Nie czekaj – liczba pojazdów w pakiecie Launch Edition jest ograniczona!</strong></p>
            
            <div class="cta-buttons">
              <a href="tel:221234567" class="primary-cta">
                📞 ZADZWOŃ TERAZ: 22 123 45 67
              </a>
              <a href="/kontakt" class="secondary-cta">
                🚗 UMÓW JAZDĘ PRÓBNĄ
              </a>
            </div>
          </div>

          <p><strong>Geely EX5 – Twoja brama do elektrycznej przyszłości!</strong></p>
        </div>
      `;
    } else if (post.slug === 'byd-dolphin-surf-elektryczny-maluch') {
      // BYD Dolphin content - using the provided HTML content
      htmlContent = `
        <div class="html-blog-container">
          <header>
            <p class="lead">Fiat 126p, znany jako „Maluch", to ikona polskiej motoryzacji. Przystępny cenowo i prosty w konstrukcji, zmotoryzował miliony Polaków. Dziś, w erze transformacji energetycznej, pytanie brzmi: czy <strong>BYD Dolphin Surf</strong>, tani elektryczny kompakt segmentu B, może odegrać podobną rolę dla elektromobilności w Polsce?</p>
          </header>

          <section>
            <h2>Od „Malucha" do elektrycznej rewolucji</h2>
            <p>W latach 70. Fiat 126p otworzył drzwi do świata czterech kółek dla przeciętnego Kowalskiego. Dziś, mimo licznych dopłat, samochody elektryczne wciąż postrzegane są jako zbyt drogie, niepraktyczne i wymagające kompromisów.</p>
            
            <p>Po koncertowym zaoraniu Izery, polskiego projektu elektrycznego, który miał być naszą narodową dumą w segmencie EV, może chociaż chiński delfin dopomoże w elektromobilności? BYD Dolphin Surf trafia na rynek w momencie, gdy Polacy wciąż szukają swojego pierwszego, sensownego auta na prąd.</p>
          </section>

          <section>
            <h2>BYD Dolphin Surf – kompaktowy, ale ambitny</h2>
            <p>Na polski rynek trafiają dwa różne modele BYD Dolphin – my skupiamy się na wersji <strong>Surf</strong>, mniejszej (399 cm długości), ale lepiej dopasowanej do miejskiej codzienności.</p>

            <p>Model zbudowano na nowoczesnej platformie <strong>E-Platform 3.0</strong>, co zapewnia odpowiedni poziom bezpieczeństwa, zasięg i funkcje znane z droższych modeli EV.</p>

            <h3>Wersje wyposażenia dostępne w Polsce:</h3>
            <ul>
              <li><strong>Active:</strong> 30 kWh, 89 KM, zasięg do 220 km</li>
              <li><strong>Boost:</strong> 43,2 kWh, 89 KM</li>
              <li><strong>Comfort:</strong> 43,2 kWh, 156 KM, zasięg do 322 km (WLTP)</li>
            </ul>

            <p><strong>Główni konkurenci:</strong> Dacia Spring, Hyundai Inster, Renault 5, Volkswagen ID.1</p>
          </section>

          <section>
            <h2>Dlaczego BYD Dolphin Surf może być „Maluchem" elektryfikacji?</h2>

            <h3>🔌 1. Przystępna cena jak na EV</h3>
            <p>Startuje od 82 700 zł, a po dopłatach może kosztować nawet 40–50 tys. zł. Leasing i wynajem od 508 zł miesięcznie to już realna opcja dla wielu polskich gospodarstw domowych. To pierwszy raz, kiedy auto elektryczne przestaje być zabawką dla bogaczy.</p>

            <h3>🚗 2. Zaskakująca przestronność</h3>
            <p>Nie dajcie się zmylić kompaktowym rozmiarom. W środku jest naprawdę dużo miejsca, szczególnie na tylnej kanapie. Fotele są wygodne, często elektrycznie sterowane, a wnętrze robi lepsze wrażenie niż sugeruje cena – mimo obecności twardych plastików tu i ówdzie.</p>

            <h3>🧠 3. Technologia, która nie jest budżetowa</h3>
            <p>Ekran centralny (który można obracać!), kamery 360°, NFC, ładowarka indukcyjna – to wszystko w aucie za 80 tysięcy. Do tego funkcja V2L i zaawansowane systemy ADAS: aktywny tempomat, monitoring kierowcy, asystent pasa ruchu. Większość aut spalinowych w tej cenie może o tym tylko pomarzyć.</p>

            <h3>🏙️ 4. Stworzony do miasta</h3>
            <p>Zwrotność jak u małego mieszczucha, komfort jazdy dzięki miękkiemu zawieszeniu i dynamiczne przyspieszenie, które sprawia, że wyprzedzanie w mieście to czysta przyjemność. Idealny do codziennych dojazdów i miejskiego stylu życia.</p>
          </section>

          <section>
            <h2>Dlaczego porównanie do „Malucha" nie jest do końca trafne?</h2>

            <h3>💸 1. Nadal nie dla każdego</h3>
            <p>Nawet po dopłatach cena przekracza możliwości sporej części Polaków. Rynek aut spalinowych, zwłaszcza używanych za 20-30 tysięcy, wciąż dominuje. „Maluch" był dostępny praktycznie dla każdego – Dolphin jeszcze nie.</p>

            <h3>🛣️ 2. Ograniczenia w trasie</h3>
            <p>Ładowanie trwa 30–40 minut od 10 do 80% baterii – w porządku, ale nie rewolucyjnie. Przy wyższych prędkościach kabina robi się głośna, a komfort na ekspresówkach pozostawia sporo do życzenia.</p>

            <h3>⚙️ 3. Ergonomia i systemy mogą drażnić</h3>
            <p>Widoczność ograniczona przez grube słupki A i duże lusterka. Klimatyzacja sterowana tylko manualnie, brak intuicyjnych ustawień. Niektóre systemy bezpieczeństwa (jak ISA czy monitoring kierowcy) są zbyt natarczywe i trudne do wyłączenia. Interfejs multimediów skomplikowany, a ekran nie obraca się przy CarPlay – szkoda.</p>
          </section>

          <section>
            <h2>Podsumowanie: Rewolucja czy tylko ewolucja?</h2>
            <p><strong>BYD Dolphin Surf</strong> to pierwszy elektryczny samochód, który naprawdę może konkurować z autami spalinowymi w segmencie budżetowym. Dzięki sensownej cenie, nowoczesnej technologii i zaskakującej przestronności, otwiera drogę do elektromobilności w Polsce.</p>
            
            <p>Nie jest jednak odpowiednikiem „Malucha" w pełnym tego słowa znaczeniu – nie zelektryfikuje kraju samodzielnie i nie będzie jedynym wyborem dla wszystkich rodzin. Ale może być tym <strong>punktem zwrotnym</strong>, który zmieni postrzeganie samochodów elektrycznych z drogich zabawek w realną opcję dla zwykłego człowieka.</p>
            
            <p>I kto wie? Może tam, gdzie zawiodła Izera, chiński delfin popłynie dalej i pomoże Polakom w końcu wskoczyć na pokład elektromobilności.</p>
          </section>
        </div>
      `;
    } else if (post.slug === 'tesla-model-3-test-2024') {
      // Tesla Model 3 content
      htmlContent = `
        <div class="html-blog-container">
          <div class="key-benefits">
            <p><strong>Tesla Model 3 – najbardziej rozpoznawalny elektryczny sedan na świecie!</strong> Sprawdziliśmy najnowszą wersję w polskich warunkach. Zasięg 420 km, zaawansowana technologia i doskonały komfort jazdy. Czy to najlepszy elektryczny sedan dostępny w Polsce?</p>
            
            <h3>Kluczowe zalety Tesla Model 3:</h3>
            <ul>
              <li>🚗 <strong>Zasięg do 420 km</strong> w cyklu WLTP</li>
              <li>⚡ <strong>Przyspieszenie 0-100 km/h</strong> w 6,1 sekundy</li>
              <li>🔋 <strong>Supercharger</strong> - najszybsza sieć ładowania</li>
              <li>🤖 <strong>Autopilot</strong> - zaawansowane systemy wspomagania</li>
              <li>📱 <strong>Over-the-Air</strong> - aktualizacje przez internet</li>
            </ul>
          </div>

          <h2>Design i wnętrze - minimalizm w najlepszym wydaniu</h2>
          
          <p><strong>Tesla Model 3 to rewolucja w projektowaniu wnętrz samochodowych.</strong> Centralny ekran 15" zastępuje tradycyjne przyciski i pokrętła, oferując intuicyjną obsługę wszystkich funkcji pojazdu.</p>
          
          <h3>🎨 Zewnętrzny design:</h3>
          <ul>
            <li><strong>Aerodynamika:</strong> Współczynnik oporu powietrza Cd = 0,23</li>
            <li><strong>Linie:</strong> Eleganckie, sportowe proporcje</li>
            <li><strong>Oświetlenie:</strong> Pełne LED z charakterystyczną sygnaturą</li>
            <li><strong>Klamki:</strong> Chowane, poprawiające aerodynamikę</li>
          </ul>

          <h2>Osiągi i dynamika jazdy</h2>
          
          <div class="pricing-table">
            <h3>Specyfikacja techniczna</h3>
            <table>
              <thead>
                <tr>
                  <th>Parametr</th>
                  <th>Model 3 RWD</th>
                  <th>Model 3 Long Range</th>
                  <th>Model 3 Performance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Zasięg WLTP</strong></td>
                  <td>420 km</td>
                  <td>602 km</td>
                  <td>547 km</td>
                </tr>
                <tr>
                  <td><strong>Przyspieszenie 0-100</strong></td>
                  <td>6,1 s</td>
                  <td>4,4 s</td>
                  <td>3,3 s</td>
                </tr>
                <tr>
                  <td><strong>Prędkość maksymalna</strong></td>
                  <td>201 km/h</td>
                  <td>233 km/h</td>
                  <td>261 km/h</td>
                </tr>
                <tr class="highlight">
                  <td><strong>Cena od</strong></td>
                  <td>199 990 zł</td>
                  <td>249 990 zł</td>
                  <td>289 990 zł</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Technologia i systemy wspomagania</h2>
          
          <h3>🤖 Autopilot - przyszłość już dziś</h3>
          <p>Tesla Model 3 wyposażona jest w najbardziej zaawansowane systemy wspomagania kierowcy dostępne na rynku:</p>
          
          <ul>
            <li><strong>Traffic-Aware Cruise Control:</strong> Inteligentny tempomat</li>
            <li><strong>Autosteer:</strong> Automatyczne prowadzenie w pasie</li>
            <li><strong>Auto Lane Change:</strong> Automatyczna zmiana pasa</li>
            <li><strong>Autopark:</strong> Automatyczne parkowanie</li>
            <li><strong>Summon:</strong> Zdalnie sterowane manewrowanie</li>
          </ul>

          <h2>Ładowanie i zasięg w praktyce</h2>
          
          <div class="recommendation">
            <h4>Supercharger - najlepsza sieć ładowania:</h4>
            <ul>
              <li>⚡ <strong>Moc ładowania:</strong> Do 250 kW</li>
              <li>⏱️ <strong>Czas ładowania:</strong> 15 minut (10-80%)</li>
              <li>🗺️ <strong>Dostępność:</strong> Ponad 50 lokalizacji w Polsce</li>
              <li>💳 <strong>Płatność:</strong> Automatyczna przez aplikację</li>
            </ul>
          </div>

          <h3>🔋 Zasięg w różnych warunkach:</h3>
          <ul>
            <li><strong>Miasto:</strong> 450-500 km (optymalne warunki)</li>
            <li><strong>Trasa:</strong> 350-420 km (120 km/h, klimatyzacja)</li>
            <li><strong>Zima:</strong> 280-350 km (-10°C, ogrzewanie)</li>
            <li><strong>Lato:</strong> 400-450 km (25°C, klimatyzacja)</li>
          </ul>

          <h2>Koszty eksploatacji</h2>
          
          <div class="competitive-analysis">
            <h3>Porównanie kosztów (10 000 km/rok)</h3>
            <table>
              <thead>
                <tr>
                  <th>Kategoria</th>
                  <th>Tesla Model 3</th>
                  <th>BMW 320i</th>
                  <th>Oszczędność</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Paliwo/Energia</strong></td>
                  <td>2 400 zł</td>
                  <td>8 500 zł</td>
                  <td>6 100 zł</td>
                </tr>
                <tr>
                  <td><strong>Serwis</strong></td>
                  <td>800 zł</td>
                  <td>2 500 zł</td>
                  <td>1 700 zł</td>
                </tr>
                <tr>
                  <td><strong>Ubezpieczenie</strong></td>
                  <td>3 200 zł</td>
                  <td>2 800 zł</td>
                  <td>-400 zł</td>
                </tr>
                <tr class="highlight">
                  <td><strong>RAZEM</strong></td>
                  <td>6 400 zł</td>
                  <td>13 800 zł</td>
                  <td>7 400 zł</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Wady i zalety - szczera ocena</h2>
          
          <div class="recommendation">
            <h4>✅ Zalety:</h4>
            <ul>
              <li><strong>Najlepsza technologia</strong> - stale aktualizowana</li>
              <li><strong>Supercharger</strong> - najwygodniejsze ładowanie</li>
              <li><strong>Niskie koszty eksploatacji</strong> - oszczędność 7000+ zł/rok</li>
              <li><strong>Doskonała dynamika</strong> - sportowe osiągi</li>
              <li><strong>Wartość rezydualna</strong> - wysoka na rynku wtórnym</li>
            </ul>
            
            <h4>❌ Wady:</h4>
            <ul>
              <li><strong>Jakość wykończenia</strong> - nierówna, szczególnie w starszych egzemplarzach</li>
              <li><strong>Serwis</strong> - ograniczona sieć, długie terminy</li>
              <li><strong>Brak fizycznych przycisków</strong> - wszystko przez ekran</li>
              <li><strong>Hałas</strong> - słaba izolacja akustyczna</li>
            </ul>
          </div>

          <div class="verdict">
            <p><strong>🎯 Werdykt:</strong> Tesla Model 3 to najlepszy elektryczny sedan dla osób ceniących technologię i dynamikę jazdy. Mimo pewnych wad, oferuje najlepsze połączenie zasięgu, osiągów i infrastruktury ładowania.</p>
          </div>

          <div class="cta-section">
            <h2>🚀 Zainteresowany Teslą Model 3?</h2>
            
            <p><strong>Sprawdź aktualną ofertę i umów jazdę próbną!</strong></p>
            
            <div class="cta-buttons">
              <a href="https://www.tesla.com/pl_pl/model3" class="primary-cta" target="_blank">
                🚗 KONFIGURUJ TESLĘ
              </a>
              <a href="/blog" class="secondary-cta">
                📰 WIĘCEJ TESTÓW EV
              </a>
            </div>
          </div>

          <p><strong>Tesla Model 3 – elektryczny sedan, który zmienił rynek motoryzacyjny na zawsze!</strong></p>
        </div>
      `;
    } else if (post.slug === 'jak-ladowac-pojazd-elektryczny-w-domu') {
      // Home charging guide content
      htmlContent = `
        <div class="html-blog-container">
          <div class="key-benefits">
            <p><strong>Ładowanie w domu to podstawa wygodnego użytkowania pojazdu elektrycznego!</strong> Praktyczny poradnik instalacji wallboxa i optymalizacji kosztów ładowania w domu. Wallbox 11 kW, oszczędności do 4000 zł rocznie, najlepsze modele 2025.</p>
            
            <h3>Najważniejsze korzyści ładowania domowego:</h3>
            <ul>
              <li>💰 <strong>Najniższe koszty</strong> - od 0,60 zł/kWh w taryfie nocnej</li>
              <li>🏠 <strong>Maksymalna wygoda</strong> - ładowanie podczas snu</li>
              <li>⚡ <strong>Wallbox 11 kW</strong> - pełne naładowanie w 6-8 godzin</li>
              <li>📱 <strong>Inteligentne zarządzanie</strong> - aplikacje mobilne</li>
              <li>🌱 <strong>Energia odnawialna</strong> - połączenie z panelami PV</li>
            </ul>
          </div>

          <h2>Rodzaje ładowania domowego</h2>
          
          <h3>🔌 1. Ładowanie z gniazdka domowego (230V)</h3>
          <p><strong>Najprostsze, ale najwolniejsze rozwiązanie.</strong> Wystarczy standardowe gniazdko, ale ładowanie trwa bardzo długo.</p>
          
          <ul>
            <li><strong>Moc:</strong> 2,3 kW (10A) lub 3,7 kW (16A)</li>
            <li><strong>Czas ładowania:</strong> 20-30 godzin (pełne naładowanie)</li>
            <li><strong>Koszt instalacji:</strong> 0 zł (wykorzystanie istniejącego gniazdka)</li>
            <li><strong>Zalecenie:</strong> Tylko w nagłych przypadkach</li>
          </ul>

          <h3>⚡ 2. Wallbox - najlepsze rozwiązanie domowe</h3>
          <p><strong>Dedykowana stacja ładowania to inwestycja, która się opłaca.</strong> Szybkie, bezpieczne i wygodne ładowanie.</p>
          
          <div class="pricing-table">
            <h3>Porównanie mocy wallboxów</h3>
            <table>
              <thead>
                <tr>
                  <th>Moc</th>
                  <th>Prąd</th>
                  <th>Czas ładowania (60 kWh)</th>
                  <th>Zastosowanie</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>3,7 kW</strong></td>
                  <td>16A (1-faza)</td>
                  <td>16 godzin</td>
                  <td>Małe baterie, nocne ładowanie</td>
                </tr>
                <tr class="highlight">
                  <td><strong>7,4 kW</strong></td>
                  <td>32A (1-faza)</td>
                  <td>8 godzin</td>
                  <td>Optymalne dla większości domów</td>
                </tr>
                <tr class="highlight">
                  <td><strong>11 kW</strong></td>
                  <td>16A (3-fazy)</td>
                  <td>5,5 godziny</td>
                  <td>Najlepszy stosunek ceny do wydajności</td>
                </tr>
                <tr>
                  <td><strong>22 kW</strong></td>
                  <td>32A (3-fazy)</td>
                  <td>2,7 godziny</td>
                  <td>Luksusowe rozwiązanie</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Najlepsze wallboxy 2025 - ranking</h2>
          
          <div class="competitive-analysis">
            <h3>Top 5 wallboxów na polski rynek</h3>
            <table>
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Moc</th>
                  <th>Cena</th>
                  <th>Funkcje</th>
                  <th>Ocena</th>
                </tr>
              </thead>
              <tbody>
                <tr class="highlight">
                  <td><strong>Wallbox Pulsar Plus</strong></td>
                  <td>11/22 kW</td>
                  <td>2 500 zł</td>
                  <td>WiFi, aplikacja, RFID</td>
                  <td>⭐⭐⭐⭐⭐</td>
                </tr>
                <tr>
                  <td><strong>KEBA KeContact P30</strong></td>
                  <td>11/22 kW</td>
                  <td>3 200 zł</td>
                  <td>Ethernet, MID, RFID</td>
                  <td>⭐⭐⭐⭐⭐</td>
                </tr>
                <tr>
                  <td><strong>ABB Terra AC</strong></td>
                  <td>11/22 kW</td>
                  <td>2 800 zł</td>
                  <td>4G, aplikacja, OCPP</td>
                  <td>⭐⭐⭐⭐</td>
                </tr>
                <tr>
                  <td><strong>Easee Home</strong></td>
                  <td>11/22 kW</td>
                  <td>2 400 zł</td>
                  <td>WiFi, load balancing</td>
                  <td>⭐⭐⭐⭐</td>
                </tr>
                <tr>
                  <td><strong>Tesla Wall Connector</strong></td>
                  <td>11 kW</td>
                  <td>2 100 zł</td>
                  <td>WiFi, tylko Tesla</td>
                  <td>⭐⭐⭐⭐</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Koszty instalacji wallboxa</h2>
          
          <div class="pricing-table">
            <h3>Szacunkowe koszty (2025)</h3>
            <table>
              <thead>
                <tr>
                  <th>Element</th>
                  <th>Koszt minimalny</th>
                  <th>Koszt maksymalny</th>
                  <th>Uwagi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Wallbox</strong></td>
                  <td>2 000 zł</td>
                  <td>4 000 zł</td>
                  <td>Zależnie od funkcji</td>
                </tr>
                <tr>
                  <td><strong>Instalacja elektryczna</strong></td>
                  <td>800 zł</td>
                  <td>3 000 zł</td>
                  <td>Zależnie od odległości</td>
                </tr>
                <tr>
                  <td><strong>Rozbudowa instalacji</strong></td>
                  <td>0 zł</td>
                  <td>2 000 zł</td>
                  <td>Jeśli potrzebna</td>
                </tr>
                <tr>
                  <td><strong>Pozwolenia/zgłoszenia</strong></td>
                  <td>0 zł</td>
                  <td>500 zł</td>
                  <td>Dla mocy >11 kW</td>
                </tr>
                <tr class="highlight">
                  <td><strong>RAZEM</strong></td>
                  <td>2 800 zł</td>
                  <td>9 500 zł</td>
                  <td>Średnio: 5 000-6 000 zł</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Oszczędności - ile można zaoszczędzić?</h2>
          
          <div class="recommendation">
            <h4>💰 Porównanie kosztów ładowania (100 kWh miesięcznie):</h4>
            <ul>
              <li>🏠 <strong>Dom (taryfa nocna):</strong> 60 zł/miesiąc (0,60 zł/kWh)</li>
              <li>🏠 <strong>Dom (taryfa dzienna):</strong> 80 zł/miesiąc (0,80 zł/kWh)</li>
              <li>🏢 <strong>Praca (AC 22 kW):</strong> 120 zł/miesiąc (1,20 zł/kWh)</li>
              <li>⚡ <strong>Stacje DC (szybkie):</strong> 150 zł/miesiąc (1,50 zł/kWh)</li>
            </ul>
            
            <p><strong>Roczne oszczędności ładowania w domu vs stacje publiczne: 1 080 zł!</strong></p>
          </div>

          <h2>Inteligentne funkcje wallboxów</h2>
          
          <h3>📱 Aplikacje mobilne</h3>
          <ul>
            <li><strong>Zdalne sterowanie:</strong> Start/stop ładowania</li>
            <li><strong>Harmonogramy:</strong> Ładowanie w najtańszych godzinach</li>
            <li><strong>Monitoring:</strong> Śledzenie zużycia energii</li>
            <li><strong>Statystyki:</strong> Raporty kosztów i oszczędności</li>
          </ul>

          <h3>🌞 Integracja z panelami fotowoltaicznymi</h3>
          <p>Połączenie wallboxa z instalacją PV to maksymalne oszczędności:</p>
          <ul>
            <li><strong>Ładowanie nadwyżkami:</strong> Wykorzystanie własnej energii</li>
            <li><strong>Koszt energii:</strong> Praktycznie 0 zł/kWh</li>
            <li><strong>Zwrot inwestycji:</strong> 3-5 lat</li>
            <li><strong>Niezależność energetyczna:</strong> Mniej zależności od sieci</li>
          </ul>

          <h2>Krok po kroku - jak zainstalować wallbox?</h2>
          
          <div class="launch-edition">
            <h3>📋 Plan działania:</h3>
            <ol>
              <li><strong>Ocena instalacji elektrycznej</strong> - sprawdzenie mocy przyłączeniowej</li>
              <li><strong>Wybór lokalizacji</strong> - garaż, carport, miejsce parkingowe</li>
              <li><strong>Wybór wallboxa</strong> - moc, funkcje, budżet</li>
              <li><strong>Znalezienie elektryka</strong> - certyfikowany instalator</li>
              <li><strong>Zgłoszenie do operatora</strong> - jeśli wymagane (>11 kW)</li>
              <li><strong>Instalacja</strong> - montaż i uruchomienie</li>
              <li><strong>Konfiguracja</strong> - aplikacja, harmonogramy</li>
            </ol>
          </div>

          <h2>Najczęstsze błędy przy instalacji</h2>
          
          <div class="recommendation">
            <h4>❌ Czego unikać:</h4>
            <ul>
              <li><strong>Za mała moc przyłączeniowa</strong> - sprawdź przed zakupem</li>
              <li><strong>Zły wybór lokalizacji</strong> - za daleko od tablicy elektrycznej</li>
              <li><strong>Brak zabezpieczeń</strong> - wyłącznik różnicowoprądowy obowiązkowy</li>
              <li><strong>Nieodpowiedni kabel</strong> - za cienki przekrój</li>
              <li><strong>Brak aplikacji</strong> - tracisz inteligentne funkcje</li>
            </ul>
          </div>

          <div class="verdict">
            <p><strong>🎯 Podsumowanie:</strong> Wallbox to najlepsza inwestycja dla właściciela pojazdu elektrycznego. Zwraca się w 2-3 lata dzięki oszczędnościom na ładowaniu i zapewnia maksymalną wygodę użytkowania.</p>
          </div>

          <div class="cta-section">
            <h2>🚀 Gotowy na instalację wallboxa?</h2>
            
            <p><strong>Skontaktuj się z certyfikowanym instalatorem i zacznij oszczędzać już dziś!</strong></p>
            
            <div class="cta-buttons">
              <a href="/kontakt" class="primary-cta">
                🔧 ZNAJDŹ INSTALATORA
              </a>
              <a href="/blog" class="secondary-cta">
                📰 WIĘCEJ PORADNIKÓW
              </a>
            </div>
          </div>

          <p><strong>Ładowanie w domu - klucz do wygodnego życia z pojazdem elektrycznym!</strong></p>
        </div>
      `;
    } else if (post.slug === 'stacje-ladowania-w-polsce-2025') {
      // Charging stations content
      htmlContent = `
        <div class="html-blog-container">
          <div class="key-benefits">
            <p><strong>Kompletny przewodnik po stacjach ładowania w Polsce 2025!</strong> Mapa ponad 3000 punktów ładowania, koszty, aplikacje i praktyczne porady dla kierowców pojazdów elektrycznych. Wszystko, co musisz wiedzieć o infrastrukturze ładowania EV w Polsce.</p>
            
            <h3>Najważniejsze informacje:</h3>
            <ul>
              <li>🗺️ <strong>Ponad 3000 punktów ładowania</strong> w całej Polsce</li>
              <li>💰 <strong>Koszty od 0,60 zł/kWh</strong> w zależności od operatora</li>
              <li>📱 <strong>Najlepsze aplikacje</strong> do znajdowania stacji</li>
              <li>⚡ <strong>Ładowanie DC do 350 kW</strong> na autostradach</li>
              <li>🚗 <strong>Planowanie tras</strong> z uwzględnieniem ładowania</li>
            </ul>
          </div>

          <h2>Mapa stacji ładowania w Polsce 2025</h2>
          
          <p><strong>Infrastruktura ładowania w Polsce rozwija się w błyskawicznym tempie!</strong> W 2025 roku mamy już ponad 3000 publicznych punktów ładowania, a ich liczba stale rośnie.</p>
          
          <h3>🏢 Największe sieci ładowania:</h3>
          <div class="pricing-table">
            <table>
              <thead>
                <tr>
                  <th>Operator</th>
                  <th>Liczba stacji</th>
                  <th>Moc ładowania</th>
                  <th>Lokalizacje</th>
                </tr>
              </thead>
              <tbody>
                <tr class="highlight">
                  <td><strong>PKN Orlen</strong></td>
                  <td>800+</td>
                  <td>22-350 kW</td>
                  <td>Stacje paliw, centra handlowe</td>
                </tr>
                <tr>
                  <td><strong>Ionity</strong></td>
                  <td>150+</td>
                  <td>350 kW</td>
                  <td>Autostrady, drogi ekspresowe</td>
                </tr>
                <tr>
                  <td><strong>GreenWay</strong></td>
                  <td>400+</td>
                  <td>22-150 kW</td>
                  <td>Miasta, centra handlowe</td>
                </tr>
                <tr>
                  <td><strong>Tauron</strong></td>
                  <td>300+</td>
                  <td>22-50 kW</td>
                  <td>Południowa Polska</td>
                </tr>
                <tr>
                  <td><strong>Energa</strong></td>
                  <td>250+</td>
                  <td>22-50 kW</td>
                  <td>Północna Polska</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Koszty ładowania - cennik 2025</h2>
          
          <div class="pricing-table">
            <h3>Porównanie cen u głównych operatorów</h3>
            <table>
              <thead>
                <tr>
                  <th>Operator</th>
                  <th>AC (22 kW)</th>
                  <th>DC (50 kW)</th>
                  <th>DC (150+ kW)</th>
                  <th>Opłata aktywacyjna</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>PKN Orlen</strong></td>
                  <td>1,20 zł/kWh</td>
                  <td>1,40 zł/kWh</td>
                  <td>1,60 zł/kWh</td>
                  <td>0 zł</td>
                </tr>
                <tr class="highlight">
                  <td><strong>Ionity</strong></td>
                  <td>-</td>
                  <td>-</td>
                  <td>1,89 zł/kWh</td>
                  <td>0 zł</td>
                </tr>
                <tr>
                  <td><strong>GreenWay</strong></td>
                  <td>1,10 zł/kWh</td>
                  <td>1,30 zł/kWh</td>
                  <td>1,50 zł/kWh</td>
                  <td>2 zł</td>
                </tr>
                <tr>
                  <td><strong>Tauron</strong></td>
                  <td>1,15 zł/kWh</td>
                  <td>1,35 zł/kWh</td>
                  <td>-</td>
                  <td>0 zł</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>📱 Najlepsze aplikacje do znajdowania stacji</h2>
          
          <div class="recommendation">
            <h4>Polecane aplikacje mobilne:</h4>
            <ul>
              <li>🥇 <strong>PlugShare</strong> - największa baza stacji na świecie</li>
              <li>🥈 <strong>ChargeMap</strong> - szczegółowe informacje o stacjach</li>
              <li>🥉 <strong>Electromaps</strong> - planowanie tras z ładowaniem</li>
              <li>🏆 <strong>ABRP (A Better Route Planner)</strong> - najlepsze planowanie tras</li>
              <li>🇵🇱 <strong>Orlen Charge</strong> - dedykowana dla stacji Orlen</li>
            </ul>
          </div>

          <h2>⚡ Typy ładowania - co musisz wiedzieć</h2>
          
          <h3>AC (Prąd przemienny) - ładowanie powolne</h3>
          <ul>
            <li><strong>Moc:</strong> 3,7 - 22 kW</li>
            <li><strong>Czas ładowania:</strong> 4-12 godzin (pełne naładowanie)</li>
            <li><strong>Zastosowanie:</strong> Dom, praca, długie postoje</li>
            <li><strong>Koszt:</strong> Najniższy (0,60-1,20 zł/kWh)</li>
          </ul>

          <h3>DC (Prąd stały) - ładowanie szybkie</h3>
          <ul>
            <li><strong>Moc:</strong> 50-350 kW</li>
            <li><strong>Czas ładowania:</strong> 20-60 minut (80% baterii)</li>
            <li><strong>Zastosowanie:</strong> Podróże długodystansowe</li>
            <li><strong>Koszt:</strong> Wyższy (1,30-1,90 zł/kWh)</li>
          </ul>

          <h2>🗺️ Planowanie tras z ładowaniem</h2>
          
          <div class="launch-edition">
            <h3>💡 Praktyczne wskazówki:</h3>
            <ul>
              <li><strong>Planuj z zapasem</strong> - zawsze miej 20% baterii w rezerwie</li>
              <li><strong>Sprawdzaj dostępność</strong> - niektóre stacje mogą być zajęte</li>
              <li><strong>Miej plan B</strong> - znajdź alternatywne stacje na trasie</li>
              <li><strong>Ładuj do 80%</strong> - powyżej tej wartości ładowanie spowalnia</li>
              <li><strong>Korzystaj z aplikacji</strong> - sprawdzaj ceny i dostępność</li>
            </ul>
          </div>

          <h2>🚗 Najlepsze trasy dla pojazdów elektrycznych</h2>
          
          <div class="competitive-analysis">
            <h3>Popularne trasy z dobrą infrastrukturą:</h3>
            <table>
              <thead>
                <tr>
                  <th>Trasa</th>
                  <th>Dystans</th>
                  <th>Stacje ładowania</th>
                  <th>Czas ładowania</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Warszawa - Kraków</strong></td>
                  <td>300 km</td>
                  <td>15+ stacji</td>
                  <td>30-45 min</td>
                </tr>
                <tr>
                  <td><strong>Warszawa - Gdańsk</strong></td>
                  <td>350 km</td>
                  <td>12+ stacji</td>
                  <td>30-45 min</td>
                </tr>
                <tr class="highlight">
                  <td><strong>Warszawa - Wrocław</strong></td>
                  <td>350 km</td>
                  <td>18+ stacji</td>
                  <td>30-45 min</td>
                </tr>
                <tr>
                  <td><strong>Kraków - Zakopane</strong></td>
                  <td>100 km</td>
                  <td>8+ stacji</td>
                  <td>20-30 min</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>💰 Jak oszczędzać na ładowaniu?</h2>
          
          <div class="recommendation">
            <h4>Sposoby na niższe koszty:</h4>
            <ul>
              <li>🏠 <strong>Ładuj w domu</strong> - najtańsza opcja (0,60-0,80 zł/kWh)</li>
              <li>🌙 <strong>Korzystaj z taryf nocnych</strong> - do 50% taniej</li>
              <li>💳 <strong>Karty abonamentowe</strong> - zniżki u operatorów</li>
              <li>⚡ <strong>Unikaj ultra-szybkiego ładowania</strong> - gdy nie jest konieczne</li>
              <li>📅 <strong>Planuj ładowanie</strong> - unikaj godzin szczytu</li>
            </ul>
          </div>

          <div class="verdict">
            <p><strong>🎯 Podsumowanie:</strong> Infrastruktura ładowania w Polsce rozwija się dynamicznie. Z ponad 3000 punktów ładowania podróżowanie pojazdem elektrycznym staje się coraz wygodniejsze!</p>
          </div>

          <div class="cta-section">
            <h2>🚀 Rozpocznij swoją przygodę z elektromobilnością!</h2>
            
            <p><strong>Masz pytania o ładowanie pojazdów elektrycznych? Skontaktuj się z nami!</strong></p>
            
            <div class="cta-buttons">
              <a href="/blog" class="primary-cta">
                📰 WIĘCEJ PORADNIKÓW EV
              </a>
              <a href="/kontakt" class="secondary-cta">
                💬 ZADAJ PYTANIE
              </a>
            </div>
          </div>

          <p><strong>Stacje ładowania w Polsce 2025 - infrastruktura gotowa na elektryczną rewolucję!</strong></p>
        </div>
      `;
    } else {
      // Default fallback for other HTML posts
      htmlContent = `
        <div class="html-blog-container">
          <p>To jest artykuł HTML: <strong>${post.title}</strong></p>
          <p>${post.excerpt}</p>
          <p><em>Zawartość tego artykułu zostanie załadowana z pliku HTML.</em></p>
        </div>
      `;
    }
    
    // Add CSS styles
    const styledContent = `
      <style>
        .html-blog-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .html-blog-container h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: #1f2937;
          line-height: 1.2;
        }
        .html-blog-container h2 {
          font-size: 2rem;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #1f2937;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 0.5rem;
        }
        .html-blog-container h3 {
          font-size: 1.5rem;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #059669;
        }
        .html-blog-container h4 {
          font-size: 1.25rem;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
          color: #374151;
        }
        .html-blog-container p {
          margin-bottom: 1rem;
          color: #374151;
        }
        .html-blog-container ul, .html-blog-container ol {
          margin-bottom: 1rem;
          padding-left: 2rem;
        }
        .html-blog-container li {
          margin-bottom: 0.5rem;
        }
        .html-blog-container strong {
          color: #1f2937;
          font-weight: 600;
        }
        .html-blog-container table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          font-size: 0.95rem;
        }
        .html-blog-container th,
        .html-blog-container td {
          padding: 0.75rem;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }
        .html-blog-container th {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          font-weight: 600;
        }
        .html-blog-container tr:nth-child(even) {
          background: #f9fafb;
        }
        .html-blog-container .highlight {
          background: #fef3c7;
        }
        .html-blog-container .cta-section {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          padding: 2rem;
          border-radius: 1rem;
          margin: 2rem 0;
          border: 2px solid #10b981;
        }
        .html-blog-container .cta-buttons {
          display: flex;
          gap: 1rem;
          margin: 1rem 0;
          flex-wrap: wrap;
        }
        .html-blog-container .primary-cta {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 1rem 2rem;
          border-radius: 0.5rem;
          text-decoration: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          transition: all 0.2s;
        }
        .html-blog-container .primary-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
        }
        .html-blog-container .secondary-cta {
          background: white;
          color: #10b981;
          padding: 1rem 2rem;
          border: 2px solid #10b981;
          border-radius: 0.5rem;
          text-decoration: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          transition: all 0.2s;
        }
        .html-blog-container .secondary-cta:hover {
          background: #10b981;
          color: white;
        }
        .html-blog-container .key-benefits {
          background: #f0f9ff;
          border-left: 4px solid #10b981;
          padding: 1.5rem;
          margin: 1.5rem 0;
          border-radius: 0.5rem;
        }
        .html-blog-container .launch-edition {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border: 2px solid #f59e0b;
          padding: 1.5rem;
          border-radius: 1rem;
          margin: 1.5rem 0;
        }
        .html-blog-container .comparison-table,
        .html-blog-container .pricing-table,
        .html-blog-container .competitive-analysis {
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        .html-blog-container .faq-section {
          margin: 2rem 0;
        }
        .html-blog-container .faq-section h3 {
          color: #374151;
          font-size: 1.125rem;
          margin-bottom: 0.5rem;
        }
        .html-blog-container .recommendation {
          background: #f0f9ff;
          padding: 1rem;
          border-radius: 0.5rem;
          border-left: 4px solid #10b981;
          margin: 1rem 0;
        }
        .html-blog-container .verdict {
          background: #10b981;
          color: white;
          padding: 1rem;
          border-radius: 0.5rem;
          text-align: center;
          margin: 1rem 0;
        }
        @media (max-width: 768px) {
          .html-blog-container {
            padding: 1rem;
          }
          .html-blog-container h1 {
            font-size: 2rem;
          }
          .html-blog-container h2 {
            font-size: 1.75rem;
          }
          .html-blog-container .cta-buttons {
            flex-direction: column;
          }
          .html-blog-container .primary-cta,
          .html-blog-container .secondary-cta {
            text-align: center;
            justify-content: center;
          }
        }
      </style>
      ${htmlContent}
    `;
    
    return (
      <div 
        dangerouslySetInnerHTML={{ __html: styledContent }} 
        className="html-blog-post"
      />
    );
  }

  // Fallback for markdown posts
  return (
    <div 
      dangerouslySetInnerHTML={{ __html: post.content }} 
      className="blog-content"
    />
  );
}

export default HTMLBlogPost