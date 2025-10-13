const { connectToDatabase } = require('./mongodb');
const initializeBot = require('./utils/intializer');

(async () => {

    await connectToDatabase();

    const client = require('./main');
    require('./shiva');
    loadEventHandlers(client);
    await initializeBot();
})();


const loadEventHandlers = (client) => {
    const log = (msg) => console.log(`[SYSTEM] ${msg}`);
    console.log(`\n===== Bot System Initialization (${new Date().toLocaleString()}) =====\n`);


    require('./events/ticketHandler')(client);
    log('Ticket Handler loaded');


    require('./events/voiceChannelHandler')(client);
    log('Voice Channel Handler loaded');

    require('./events/autorole')(client);
    log('Autorole Handler loaded');

    require('./events/nqn')(client);
    log('NQN Handler loaded');

    require('./events/afkHandler')(client);
    log('AFK Handler loaded');

    require('./events/youTubeHandler')(client);
    log('YouTube Notifier loaded');

    require('./events/twitchHandler')(client);
    log('Twitch Notifier loaded');

    require('./events/facebookHandler')(client);
    log('Facebook Notifier loaded');

    require('./events/instagramHandler')(client);
    log('Instagram Notifier loaded');


    require('./events/music')(client);
    log('Lavalink Music System loaded');

    require('./handlers/distube')(client);
    log('Distube Music System loaded');

    console.log(`\n[STATUS] All systems initialized successfully at ${new Date().toLocaleTimeString()}\n`);
};
