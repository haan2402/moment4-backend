# Del 1 Moment 4
Del 1 av denna uppgift går ut på att skapa funktionalitet för autentisering för att registrera nya användarkonton och inloggning.
Med hjälp av JWT förhindras obehörig åtkomst, den autentiserar användaren  vid inloggning. Webbtjänsten är skapad med MongoDB och Expres.js.

## Länk till API
APIet finns på denna URL: 
[http://localhost:3000/api/moment4]

## Installation
API:et använder sig av MongoDB som databas. 

För att komma igång med projektet kör man följande kommandon:
```bash
npm install
```

Kommando för att starta server:
```bash
npm run start
```

## Funktioner
- Skapa ett användarkonto
- Inloggning för en användare med hjälp av JWT
- JWT för att förhindra obehörig åtkomst
- Validering av registrering och inloggning


## Skapa en användare
För att registrera en ny användare gör man på följande sätt:
- localhost:3000/api/register
- Method: POST
- Data:

``` 
{
    "username": "användarnamn",
    "password": "lösenord",
    "fullname": "Hela namnet",
    "email": "namn@email.com"
}
``` 
Svar:
- 201
``` 
{
    "message": "Användare skapad!"
}
``` 
- 400
``` 
{
    "error": "Ogiltig inmatning, alla fält måste fyllas i!"
}
``` 

## Inloggning av användare
För att logga in en användare gör man på följande sätt:
- localhost:3000/api/login
- Method: POST
- Data:

``` 
{
    "username": "användarnamn",
    "password": "lösenord"
}
``` 
Svar:
- 201
``` 
{
    "message": "Användare inloggad!"
}
``` 
- 401
``` 
{
    "error": "Fel användarnamn/lösenord"
}
``` 

## Struktur
- .env: innehåller posrt, databas och nyckel.
- models/User.js: Ett schema för en användare och har funktioner för inloggning och registrering av användare.
- server.js: Startar applikationen, ansluter till databas, och validerar token. 
- authRoute.js: POST för att skapa ny användare och göra inloggning



