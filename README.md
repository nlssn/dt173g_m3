# DT173G, Moment 3

## Syfte
Syftet med denna uppgift är att bygga vidare på [den föregående uppgiften](https://github.com/nlssn/dt173g_m2) och lägga till stöd för SASS. Nödvändiga förändringar i  `tasks`har gjorts, samt att följande paket har lagts till:

- **sass** - En implementation av SASS i JavaScript.
- **gulp-sass** - En "wrapper" för SASS-paketet som gör det möjligt att arbeta med SASS i Gulp.
- **gulp-rename** - Ett litet paket för att enkelt kunna döpa om filer.

## Länk
En publik version av webbplatsen som generaras i detta porjekt finns tillgänglig [här](https://studenter.miun.se/~joni1307/DT173G/Moment3/).

## Installation
För att installera den automatiserade miljön lokalt så använder du följande tre kommandon:

```
git clone https://github.com/nlssn/dt173g_m3.git
cd dt173g_m3/
npm install
```

Vad som sker är att detta git repository klonas till en katalog som heter 'dt173g_m3'. Ifrån den katalogen kan npm installera alla paket genom att läsa igenom filen 'package.json'. 

## Tillgängliga tasks
Standardkommandot ``gulp`` kör alla _tasks_ i en förbestämd ordning för att bygga projektet. När alla filer är klara så börjar BrowserSync att serva dem automatiskt. Därefter håller 'gulp.watch' koll efter eventuella uppdateringar av filer och kör passande _tasks_ vid behov.

Kommandot ``gulp build`` kan användas om du endast vill generera nya filer i '/dist' och inte köra igång den lokala utvecklingsservern.
