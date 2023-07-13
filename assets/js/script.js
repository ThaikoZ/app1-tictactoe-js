
// Stan rozgrywki
let gameIsOn = true;

// Ilość wykonanych ruchów
let movesNumber = 0;

// Aktualny ruch
let currentMove = 'x';

// Wyświetlane komunikaty
const notices = ["tic tac toe", "o move", "x move", "x won!", "o won!", "draw" ];

// Uchwyt przycisku restartu gry
const buttonRestart = document.getElementById("btn-play-again");

// Uchwyt dla komunikatów
const header = document.querySelector("h4");
header.innerHTML = notices[0];

// Po 5 sekundach nagłówek zmienia się na ruch aktualnego gracza
setTimeout( function() {
    header.innerHTML = notices[2];
}, 5000);

// Konfigurowanie pól
const fields = document.getElementsByClassName("one-nine-field");

// Czyszczenie pól
for(e of fields) 
    e.innerHTML = "";

// Ustawienie przycisków pól
for(let i = 0; i < 9; i++) {
    fields[i].addEventListener("click", function() { 
        if(gameIsOn)
            makeMove(i);
    });
}


// Funkcja robiąca ruch
function makeMove(id) {

    // Sprawdzamy czy pole jest puste
    if(fields[id].innerHTML == "") {

        // Ustawienie w polu currentMove
        fields[id].innerHTML = currentMove;

        // Zwiększenie ilości wykonanych ruchów
        movesNumber++;

        // Sprawdzenie warunku wygranej
        checkWinCondition();
    }
}

// Sprawdzanie warunku wygranej
function checkWinCondition() {

    // Sprawdzamy warunki dopiero od 4 ruchu
    if(movesNumber > 4) {

         // Warunki w poziomie
        if(fields[0].innerHTML == currentMove && fields[1].innerHTML == currentMove && fields[2].innerHTML == currentMove) endGame("win");
        else if(fields[3].innerHTML == currentMove && fields[4].innerHTML == currentMove && fields[5].innerHTML == currentMove) endGame("win");
        else if(fields[6].innerHTML == currentMove && fields[7].innerHTML == currentMove && fields[8].innerHTML == currentMove) endGame("win");

        // Warunki w pionie
        else if(fields[0].innerHTML == currentMove && fields[3].innerHTML == currentMove && fields[6].innerHTML == currentMove) endGame("win");
        else if(fields[1].innerHTML == currentMove && fields[4].innerHTML == currentMove && fields[7].innerHTML == currentMove) endGame("win");
        else if(fields[2].innerHTML == currentMove && fields[5].innerHTML == currentMove && fields[8].innerHTML == currentMove) endGame("win");

        // Warunki po przekątnej
        else if(fields[0].innerHTML == currentMove && fields[4].innerHTML == currentMove && fields[8].innerHTML == currentMove) endGame("win");
        else if(fields[2].innerHTML == currentMove && fields[4].innerHTML == currentMove && fields[6].innerHTML == currentMove) endGame("win");

        // Jeśli nikt nie wygrał, a ruch był 9
        else if(movesNumber >= 9) endGame("draw");

        // Jeśli nie ma wygranego to zmiana gracza
        else changePlayer();
    }
   
    // Jeśli nie ma wygranego to zmiana gracza
    else changePlayer();
    
}

// Zmiana gracza wykonującego ruch
function changePlayer() {
    // Zamiana gracza
    currentMove = currentMove == 'x' ? 'o' : 'x';
    // Zmiana nagłówka
    header.innerHTML = currentMove == 'x' ? header.innerHTML = notices[2] : notices[1];
}

// Zakończenie rozgrywki
function endGame(pos = "draw") {

    // Wyłączanie rozgrywki
    gameIsOn = false;
    // Pokazywanie przycisku restartu
    buttonRestart.hidden = false;
     // Instrukcje, kiedy wygra gracz
    if(pos == "win") {
        // Zmiana nagłówka
        header.innerHTML = currentMove == 'x' ? notices[3] : notices[4];
        // Zmiana koloru nagłówka
        header.style.color = "gold";
    } 
    else {
        // Zmiana nagłówka
        header.innerHTML = notices[5];
        // Zmiana koloru nagłówka
        header.style.color = "gold";
    }
}
