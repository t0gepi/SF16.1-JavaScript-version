const { parentPort } = require('worker_threads');
const { spawn } = require('child_process');
const path = require('path');

// Pfad zu Stockfish JavaScript-Datei
const stockfishPath = path.resolve(__dirname, './stockfish-16.1-lite-f4fa625.js');

// Starte Stockfish als Child-Prozess
const stockfish = spawn('node', [stockfishPath]);

// Empfange Nachrichten von Stockfish
stockfish.stdout.on('data', (data) => {
    // Sende die Ausgabe von Stockfish zurück an den Hauptthread
    parentPort.postMessage(data.toString());
});

// Fehlerbehandlung
stockfish.stderr.on('data', (data) => {
    console.error(`Stockfish Fehler: ${data}`);
});

// Wenn Stockfish beendet wird
stockfish.on('close', (code) => {
    console.log(`Stockfish Prozess beendet mit Code: ${code}`);
});

// Empfange Nachrichten vom Hauptthread und leite sie an Stockfish weiter
parentPort.on('message', (message) => {
    stockfish.stdin.write(message + '\n');
});
