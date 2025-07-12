require('dotenv').config();

const { Client, GatewayIntentBits, Events, REST, Routes, SlashCommandBuilder } = require('discord.js');
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

// Tạo slash command: /ping
const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!')
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('🔁 Đang đăng ký slash command...');
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
    console.log('✅ Đăng ký slash command thành công.');
  } catch (err) {
    console.error('❌ Lỗi khi đăng ký slash command:', err);
  }
})();

// Tạo client Discord
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  console.log(`📩 Slash command được gọi: ${interaction.commandName} bởi ${interaction.user.tag}`);

  if (interaction.commandName === 'ping') {
    await interaction.reply('🏓 Pong!');
  }
});

client.login(TOKEN);
