const { Client } = require("discord.js-selfbot-v13");
const config = require('./config');
const client = new Client({
    checkUpdate: false,
});

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

client.on('ready', async () => {
    console.log(`login:${client.user.tag}`);
    try {
        const { token, guildID, channelID, sendMessageCount, sendMessageInterval, messageContent } = config;
        const guild = await client.guilds.fetch(guildID);
        if (!guild) {
            console.error('指定したサーバーIDが見つかりません。');
            process.exit(1);
        }
        const channel = await guild.channels.fetch(channelID);
        if (!channel) {
            console.error('指定したチャンネルIDが見つかりません。');
            process.exit(1);
        }
        for (let i = 0; i < sendMessageCount; i++) {
            await channel.send(`${messageContent}\n${generateRandomString(4)}`);
            await new Promise(resolve => setTimeout(resolve, sendMessageInterval));
        }
        console.log('メッセージの送信が完了しました。');
        process.exit();
    } catch (error) {
        console.error('エラーが発生しました:', error);
    }
});

client.login(config.token);
