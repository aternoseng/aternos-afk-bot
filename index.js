const mineflayer = require('mineflayer');
const http = require('http');

// CONFIGURACIÓN DE TU SERVIDOR - CAMBIA ESTO
const SERVER_IP = 'SurviZ.aternos.me'; // <-- Pon tu IP real de Aternos
const BOT_NAME = 'BotDefensor';             // El nombre de tu bot

function createBot() {
    const bot = mineflayer.createBot({
        host: SERVER_IP,
        port: 25565,
        username: BOT_NAME,
        version: false, // Auto-detectar versión estable
        checkTimeoutInterval: 60000 // Aumenta el margen de espera a 60s para evitar los "timed out"
    });

    bot.on('login', () => {
        console.log('¡El bot ha entrado con éxito al servidor!');
    });

    // Bucle de combate e inteligencia artificial
    bot.on('spawn', () => {
        console.log('El bot está vivo. Modo de defensa activado.');
        
        setInterval(() => {
            // Busca la entidad viva más cercana en un radio de 12 bloques (mobs o jugadores)
            const target = bot.nearestEntity((entity) => {
                return (entity.type === 'mob' || entity.type === 'player') && entity.username !== bot.username;
            });

            if (target) {
                const distance = bot.entity.position.distanceTo(target.position);

                // 1. Mirar fijamente a la entidad
                bot.lookAt(target.position.offset(0, target.height, 0));

                // 2. Caminar hacia ella si está lejos
                if (distance > 2 && distance < 12) {
                    bot.setControlState('forward', true);
                } else {
                    bot.setControlState('forward', false);
                }

                // 3. Pegar si está a rango de golpe (menos de 3.5 bloques)
                if (distance <= 3.5) {
                    bot.attack(target);
                }
            } else {
                // Quedarse quieto si no hay peligro cerca
                bot.setControlState('forward', false);
            }
        }, 1000); // Revisa el entorno cada 1 segundo
    });

    // Auto-reconexión si el servidor se cae o lo expulsan
    bot.on('end', () => {
        console.log('Conexión perdida con Aternos. Reconectando en 30 segundos...');
        setTimeout(createBot, 30000); 
    });

    bot.on('error', (err) => console.log(`Error del bot: ${err.message}`));
    bot.on('kick', (reason) => console.log(`Bot expulsado por: ${reason}`));
}

// Servidor web obligatorio en el puerto correcto de Render (10000)
const port = process.env.PORT || 10000;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write("Bot Activo y Protegiendo 24/7");
    res.end();
}).listen(port, '0.0.0.0', () => {
    console.log(`Servidor de Render escuchando correctamente en puerto ${port}`);
});

c
    reateBot();
