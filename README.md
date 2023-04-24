[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=10772887&assignment_repo_type=AssignmentRepo)
# Web Technologien // begleitendes Projekt Sommersemester 2023
Zum Modul Web Technologien gibt es ein begleitendes Projekt. Im Rahmen dieses Projekts werden wir von Veranstaltung zu Veranstaltung ein Projekt sukzessive weiter entwickeln und uns im Rahmen der Veranstaltung den Fortschritt anschauen, Code Reviews machen und Entwicklungsschritte vorstellen und diskutieren.

Als organisatorischen Rahmen für das Projekt nutzen wir GitHub Classroom. Inhaltlich befassen wir uns mit der Entwicklung einer kleinen Web-Anwendung für die Erprobung von Augmented Reality im Browser. Das wird toll!

## Installation

Für die Installation aller unten aufgeführten Module wechseln sie in den Root-Ordner und geben
````
npm i 
````
ins Terminal ein.

### Verwendete Module in diesem Projekt
* [React](https://react.dev/learn/start-a-new-react-project)
  * Verwendete Script-Sprache : TypeScript
  * ESLint
  * CSS/SASS Framework: Bootstrap
  * React Webcam als Kamera Modul für React Applicationen

## Entscheidungstabelle
| Issue | Probleme                                                                                                                                                                                                                                                                                                                                                                                                       | ADR | Zeit | Entscheidung                    |
|-------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----|------|---------------------------------|
| 1     | Zu begin wurde React als eigenständiges Framework mit cra initialiert.  Da React aktuell aber mit Next.js arbeitet und bei jeder implementation von AR.js probleme warf, wurde React zusammen mit Vite installiert. Die aktuellen probleme mit React liegen bei der implementation, einbindung und dem deploy. Der Service liegt zur Zeit mit einem Implementationsfehler auf https://web102.in-p.de/dwebtech/ | 1-5 | 18St | React wird durch Vue.js ersetzt |
|       |                                                                                                                                                                                                                                                                                                                                                                                                                |     |      |                                 |
|       |                                                                                                                                                                                                                                                                                                                                                                                                                |     |      |                                 |
