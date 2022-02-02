# Weigth Traker


### ToDos
- [x] Index Seite
- [x] NavBar
- [x] Login Firebase / Next-Auth
- [x] Logout
- [x] Seite zum Gewicht eintragen
- [x] Database Setup
- [ ] Gewicht für anderes Datum eintragen
- [ ] Chart mit Gewicht zu Tag geplottet
- [ ] User Profile Seite
  - [ ] Größe hinterlegen
  - [ ] Liste eingetragener Gewichte
  - [ ] Gewichts-Eintrag löschen
- [ ] BMI Berechnung


## Google Login 
### Google Cloud Einstellungen die gemacht werdenmüssen

 Google secret stuff:
 - https://console.cloud.google.com/apis/credentials?hl=de&project=weight-tracker-a9673
  - OAuth 2.0-Client-IDs -> den einen bearbeiten
  - Autorisierte JavaScript-Quellen -> da http://localhost:3000 oder der port mit dem die app läuft
  - Autorisierte Weiterleitungs-URIs -> http://localhost:3000/api/auth/callback/google
  bzw das was google sagt wenn der login nicht geht welche url authorisiert werden muss