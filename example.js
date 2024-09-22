const { Worker } = require('worker_threads');
const path = require('path');

// Pfad zu Stockfish (worker.js)
const workerPath = path.resolve(__dirname, './worker.js');

// Erstelle einen Worker für die Stockfish Engine
const stockfishWorker = new Worker(workerPath);

// Empfange Nachrichten vom Worker (Antworten von Stockfish)
stockfishWorker.on('message', (message) => {
    console.log(`Stockfish Worker sagt: ${message}`);
});

// Fehlerbehandlung
stockfishWorker.on('error', (error) => {
    console.error(`Stockfish Worker Fehler: ${error}`);
});

// Beende den Worker, wenn er fertig ist
stockfishWorker.on('exit', (code) => {
    if (code !== 0) {
        console.error(`Worker hat sich unerwartet beendet mit Code: ${code}`);
    } else {
        console.log('Worker hat sich erfolgreich beendet.');
    }
});

// Sende Befehle an den Worker (und damit an Stockfish)
stockfishWorker.postMessage('uci');
stockfishWorker.postMessage('position startpos');
stockfishWorker.postMessage('go depth 10');
