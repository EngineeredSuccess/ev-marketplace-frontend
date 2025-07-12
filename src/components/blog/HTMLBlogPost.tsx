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
      // BYD Dolphin content
      htmlContent = `
        <div class="html-blog-container">
          <div class="key-benefits">
            <p><strong>Czy BYD Dolphin Surf może zostać nowym "Maluchem" ery elektromobilności?</strong> Ten przystępny cenowo elektryczny SUV ma potencjał, by zrewolucjonizować polski rynek EV, podobnie jak Fiat 126p zmienił polską motoryzację w latach 70.</p>
            
            <h3>Kluczowe zalety BYD Dolphin Surf:</h3>
            <ul>
              <li>💰 <strong>Przystępna cena</strong> - dostępny dla szerokiego grona klientów</li>
              <li>🔋 <strong>Nowoczesna technologia</strong> - baterie LFP Blade Battery</li>
              <li>🚗 <strong>Praktyczny rozmiar</strong> - idealny do miasta i rodziny</li>
              <li>⚡ <strong>Szybkie ładowanie</strong> - wygoda codziennego użytkowania</li>
              <li>🌱 <strong>Zero emisji</strong> - przyjazny środowisku</li>
            </ul>
          </div>

          <h2>Dlaczego BYD Dolphin Surf to potencjalny "Maluch" elektromobilności?</h2>
          
          <p>Podobnie jak Fiat 126p w latach 70., BYD Dolphin Surf może stać się symbolem demokratyzacji motoryzacji - tym razem elektrycznej. Oto dlaczego:</p>
          
          <h3>🏭 Masowa produkcja = niskie ceny</h3>
          <p>BYD, jako największy producent pojazdów elektrycznych na świecie, może oferować konkurencyjne ceny dzięki skali produkcji.</p>
          
          <h3>🔧 Prostota i niezawodność</h3>
          <p>Jak "Maluch" był prosty w obsłudze, tak BYD Dolphin Surf stawia na prostotę użytkowania i niezawodność.</p>
          
          <h3>👨‍👩‍👧‍👦 Dostępność dla każdego</h3>
          <p>Przystępna cena czyni go dostępnym dla przeciętnej polskiej rodziny, podobnie jak kiedyś Fiat 126p.</p>

          <h2>Specyfikacja BYD Dolphin Surf</h2>
          
          <div class="pricing-table">
            <h3>Kluczowe parametry</h3>
            <table>
              <thead>
                <tr>
                  <th>Parametr</th>
                  <th>Wartość</th>
                  <th>Komentarz</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Zasięg WLTP</strong></td>
                  <td>427 km</td>
                  <td>Wystarczający na codzienne potrzeby</td>
                </tr>
                <tr>
                  <td><strong>Bateria</strong></td>
                  <td>60,48 kWh</td>
                  <td>Technologia LFP Blade Battery</td>
                </tr>
                <tr>
                  <td><strong>Moc</strong></td>
                  <td>204 KM</td>
                  <td>Dynamiczna jazda w mieście</td>
                </tr>
                <tr class="highlight">
                  <td><strong>Cena szacowana</strong></td>
                  <td>Od 120 000 zł</td>
                  <td>Konkurencyjna na rynku EV</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Porównanie: "Maluch" vs BYD Dolphin Surf</h2>
          
          <div class="competitive-analysis">
            <table>
              <thead>
                <tr>
                  <th>Aspekt</th>
                  <th>Fiat 126p "Maluch"</th>
                  <th>BYD Dolphin Surf</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Era</strong></td>
                  <td>Lata 70-90</td>
                  <td>Lata 20. XXI wieku</td>
                </tr>
                <tr>
                  <td><strong>Rewolucja</strong></td>
                  <td>Motoryzacja mas</td>
                  <td>Elektromobilność dla wszystkich</td>
                </tr>
                <tr>
                  <td><strong>Dostępność</strong></td>
                  <td>Przystępny dla przeciętnej rodziny</td>
                  <td>Konkurencyjny w segmencie EV</td>
                </tr>
                <tr class="highlight">
                  <td><strong>Wpływ społeczny</strong></td>
                  <td>Zmienił polską motoryzację</td>
                  <td>Może zmienić polską elektromobilność</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Czy BYD Dolphin Surf zmieni polski rynek EV?</h2>
          
          <div class="recommendation">
            <h4>Argumenty ZA:</h4>
            <ul>
              <li>✅ <strong>Przystępna cena</strong> - dostępny dla szerszego grona</li>
              <li>✅ <strong>Sprawdzona technologia</strong> - BYD to lider rynku EV</li>
              <li>✅ <strong>Praktyczność</strong> - idealny rozmiar dla polskich warunków</li>
              <li>✅ <strong>Infrastruktura</strong> - rosnąca sieć ładowarek</li>
            </ul>
            
            <h4>Wyzwania:</h4>
            <ul>
              <li>⚠️ <strong>Świadomość marki</strong> - BYD dopiero wchodzi na polski rynek</li>
              <li>⚠️ <strong>Sieć serwisowa</strong> - wymaga rozbudowy</li>
              <li>⚠️ <strong>Przyzwyczajenia</strong> - Polacy powoli przechodzą na EV</li>
            </ul>
          </div>

          <div class="verdict">
            <p><strong>🎯 Werdykt:</strong> BYD Dolphin Surf ma potencjał stać się "Maluchem" elektromobilności, ale sukces zależy od strategii marketingowej i rozwoju infrastruktury.</p>
          </div>

          <div class="cta-section">
            <h2>🚀 Śledź rozwój elektromobilności w Polsce!</h2>
            
            <p><strong>Czy BYD Dolphin Surf rzeczywiście zmieni polski rynek? Czas pokaże!</strong></p>
            
            <div class="cta-buttons">
              <a href="/blog" class="primary-cta">
                📰 WIĘCEJ ARTYKUŁÓW O EV
              </a>
              <a href="/kontakt" class="secondary-cta">
                💬 PODZIEL SIĘ OPINIĄ
              </a>
            </div>
          </div>

          <p><strong>BYD Dolphin Surf – czy to przyszłość polskiej elektromobilności?</strong></p>
          <p><em>Historia lubi się powtarzać. Może tym razem zamiast "Malucha" będziemy wspominać "Delfinka"?</em></p>
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