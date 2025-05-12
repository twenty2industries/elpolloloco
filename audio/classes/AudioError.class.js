class AudioError {
    static LONG = new Audio('./assets/sounds/binary.mp3');

    // Spielt eine einzelne Audiodatei ab, - wenn sie bereit ist - 
    static playOne(sound) {
        setInterval(() => {  // Wiederholt die Überprüfung alle 200ms
            //hier sounbd wird gestoppt
            if (sound.readyState == 4) {  // Überprüft, ob die Audiodatei vollständig geladen ist, wenn man die if abfrage rausnehmen würde, würde es bei start & drücken auf den stopp Knopf einen Fehler werfen. (am besten low-tier throttling nutzen!)
                console.log("Sound ready"); 
                sound.volume = 0.5;  // Setzt die Lautstärke auf 50%
                sound.play();  // Spielt das übergebene Sound-Objekt ab
            } else {
                console.log("Sound not ready"); 
            }
        }, 200);
    }


    // Stoppt das Abspielen einer einzelnen Audiodatei
    static stopOne(sound) {
        sound.pause();  // Pausiert das übergebene Audio
    }
}
