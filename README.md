# Weigth Traker


### ToDos
- [x] Index Seite
- [x] NavBar
- [x] Login Firebase / Next-Auth
- [x] Logout
- [x] Seite zum Gewicht eintragen
- [x] Database Setup
- [x] Gewicht für anderes Datum eintragen
  - [x] Datum Eingabe validieren
- [x] Chart mit Gewicht zu Tag geplottet
  - [x] Chart mit DarkMode compatibel machen
- [x] User Profile Seite
  - [x] Größe hinterlegen
  - [x] Liste eingetragener Gewichte
    - [x] Was passiert wenn Liste zu groß?
  - [x] Gewichts-Eintrag löschen
- [x] BMI Berechnung
- [ ] DarkModeSwitch von Portfolio Seite einbauen
- [ ] WihteMode schick machen
- [x] Sign In Seite DarkMode fixen
- [ ] Zuletzt eingetragenes Gewicht anzeigen
  - [ ] Gewicht einfärben ob mehr oder weniger
    - Einfärben im verhältnis zum zuletzt eingtragenen Gewicht oder zum Startgewicht?
  - [x] 3 Optionen zum färben - none / weight loss / weight gain
- [ ] Footer mit Link zum Github?


## Google Login 
### Google Cloud Einstellungen die gemacht werdenmüssen

 Google secret stuff:
 - https://console.cloud.google.com/apis/credentials?hl=de&project=weight-tracker-a9673
  - OAuth 2.0-Client-IDs -> den einen bearbeiten
  - Autorisierte JavaScript-Quellen -> da http://localhost:3000 oder der port mit dem die app läuft
  - Autorisierte Weiterleitungs-URIs -> http://localhost:3000/api/auth/callback/google
  bzw das was google sagt wenn der login nicht geht welche url authorisiert werden muss