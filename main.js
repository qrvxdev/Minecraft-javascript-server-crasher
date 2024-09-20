const mineflayer = require('mineflayer');

const serverHost = 'localhost';  // server
const serverPort = 25565; 
const botCount = 50; // bot count

const adjectives = [
    'Red', 'Blue', 'Green', 'Crazy', 'Silent', 'Mighty', 'Swift', 'Brave', 'Cunning', 'Wise',
    'Fierce', 'Gentle', 'Quick', 'Happy', 'Sad', 'Curious', 'Bold', 'Eager', 'Loyal', 'Sly',
    'Fearless', 'Proud', 'Clever', 'Witty', 'Sly', 'Noble', 'Daring', 'Kind', 'Frosty', 'Sunny',
];

const nouns = [
    'Dragon', 'Warrior', 'Builder', 'Explorer', 'Hunter', 'Mage', 'Knight', 'Archer', 'Rogue',
    'Wizard', 'Champion', 'Guardian', 'Seeker', 'Tamer', 'Defender', 'Avenger', 'Paladin',
    'Sorcerer', 'Ranger', 'Titan', 'Demon', 'Spirit', 'Phantom', 'Giant', 'Phoenix', 'Hero',
    'Viking', 'Ninja', 'Samurai', 'Bard', 'Brawler', 'Seer', 
];

function generateRandomName(index) {
    const adjective = adjectives[index % adjectives.length];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adjective}${noun}${index}`; 
}

function createBot(index) {
    const botName = generateRandomName(index);
    const bot = mineflayer.createBot({
        host: serverHost,
        port: serverPort,
        username: botName,
        version: '1.8.9'  
    });

    bot.on('spawn', () => {
        console.log(`${botName} has spawned.`);
        setInterval(() => {
            const messages = ['hy nyggers', 'yt bombawrouter'];
            const message = messages[Math.floor(Math.random() * messages.length)];
            bot.chat(message);
        }, 5000); 

        const moveDelay = 2000; 

        const walkBackAndForth = () => {
            const forwardPosition = bot.entity.position.offset(10, 0, 10);
            const backwardPosition = bot.entity.position.offset(-10, 0, -10);

            bot.setControlState('forward', true);
            setTimeout(() => {
                bot.setControlState('forward', false);
                bot.entity.position = forwardPosition;
                setTimeout(() => {
                    bot.setControlState('forward', true);
                    setTimeout(() => {
                        bot.setControlState('forward', false);
                        bot.entity.position = backwardPosition;
                        setTimeout(walkBackAndForth, moveDelay);
                    }, moveDelay);
                }, moveDelay);
            }, moveDelay);
        };

        setTimeout(walkBackAndForth, 1000); 
    });

    bot.on('error', (err) => console.log(`Error: ${err}`));
    bot.on('end', () => console.log(`${botName} has disconnected.`));
}

for (let i = 0; i < botCount; i++) {
    createBot(i); 
}
