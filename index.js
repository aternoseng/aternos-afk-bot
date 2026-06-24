const mineflayer = require('mineflayer');
const http = require('http');

// CONFIGURACIÓN DE TU SERVIDOR
const SERVER_IP = 'SurviZ.aternos.me'; // <-- Reemplaza con tu IP de Aternos
const BOT_NAME = 'BotSimple247';            // El nombre de tu bot

function createBot() {
    const bot = mineflayer.createBot({
        host: SERVER_IP,
        port: 25565,
        username: BOT_NAME,
        version: false,              // Auto-detectar versión estable
        checkTimeoutInterval: 90000  // Tolerancia extra de 90 segundos para evitar lag
    });

    bot.on('login', () => {
        console.log('¡El bot ha entrado con éxito al servidor!');
    });

    bot.on('spawn', () => {
        console.log('El bot está estático y seguro en el mundo.');
    });

    // Auto-reconexión automática si se cae
    bot.on('end', () => {
        console.log('Conexión perdida. Reintentando conectar en 30 segundos...');
        setTimeout(createBot, 30000); 
    });

    bot.on('error', (err) => console.log(`Error del bot: ${err.message}`));
    bot.on('kick', (reason) => console.log(`Bot expulsado por: ${reason}`));
}

// Servidor web obligatorio para que Render no tire error de puerto
const port = process.env.PORT || 10000;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write("Bot AFK en modo ultra-estable conectado.");
    res.end();
}).listen(port, '0.0.0.0', () => {
    console.log(`Servidor web activo en puerto ${port}`);
});

crea
    teBot();
