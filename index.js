const mineflayer = require('mineflayer');
const http = require('http');

// CONFIGURACIÓN DE TU SERVIDOR - CAMBIA ESTO
const SERVER_IP = 'SurviZ.aternos.me'; // <-- Reemplaza esto por tu IP de Aternos
const BOT_NAME = 'Bot24Siete';              // El nombre que tendrá el bot en el juego

function createBot() {
    const bot = mineflayer.createBot({
        host: SERVER_IP,
        port: 25565,
        username: BOT_NAME,
        version: false // Detecta automáticamente la versión de Minecraft
    });

    bot.on('login', () => {
        console.log('¡El bot ha entrado con éxito al servidor!');
    });

    bot.on('spawn', () => {
        console.log('El bot está vivo en el mundo.');
    });

    bot.on('kick', (reason) => {
        console.log(`Bot expulsado por: ${reason}`);
    });

    bot.on('error', (err) => {
        console.log(`Error del bot: ${err.message}`);
    });

    // Si el servidor se apaga o el bot se cae, espera 30 segundos e intenta volver a entrar
    bot.on('end', () => {
        console.log('Conexión perdida. Reintentando conectar en 30 segundos...');
        setTimeout(createBot, 30000); 
    });
}

// Servidor web básico para que Render no apague la aplicación
http.createServer((req, res) => {
    res.write("¡El bot de Minecraft está activo en segundo plano!");
    res.end();
}).listen(10000); // Puerto por defecto para Render

createBot();
