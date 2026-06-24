const mineflayer = require('mineflayer');
const http = require('http');

// CONFIGURACIÓN DE TU SERVIDOR
const SERVER_IP = 'SurviZ.aternos.me'; // <-- Coloca aquí tu IP de Aternos
const BOT_NAME = 'BotEstable';               // Nombre del bot en el servidor

function createBot() {
    const bot = mineflayer.createBot({
        host: SERVER_IP,
        port: 25565,
        username: Botsito
        version: '1.21.1',             // Deja en false para detección automática corregida
        checkTimeoutInterval: 90000 // Eleva el límite de espera a 90s para evitar los "timed out"
    });

    bot.on('login', () => {
        console.log('¡El bot ha ingresado exitosamente al servidor!');
    });

    bot.on('spawn', () => {
        console.log('El bot se encuentra activo en el entorno.');
    });

    bot.on('end', () => {
        console.log('Conexión finalizada con el servidor. Reintentando en 30 segundos...');
        setTimeout(createBot, 30000); 
    });

    bot.on('error', (err) => console.log(`Error interno del bot: ${err.message}`));
    bot.on('kick', (reason) => console.log(`Bot expulsado del juego por: ${reason}`));
}

// Configuración del servidor web compatible con la plataforma
const port = process.env.PORT || 10000;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write("Servidor del bot activo y respondiendo.");
    res.end();
}).listen(port, '0.0.0.0', () => {
    console.log(`Peticiones web redirigidas al puerto asignado: ${port}`);
});

crea
    teBot();
