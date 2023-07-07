const BOT_TOKEN = `6104531083:AAFS_EB5mH-7Fahuhw0fIZ-RnLvkf0Qdcb4`;
const ADMIN = `1900752973`;
import TelegramBot from "node-telegram-bot-api";

const bot = new TelegramBot(BOT_TOKEN, { polling: true });
let lastUserMessage = {};
let users = {};

bot.onText(/\/start/, async (msg) => {
    try {
        const { id, first_name } = msg.from;
        users[id] = {};

        await bot.sendMessage(id, `Salom ${first_name}🤗\nIltimos contactni ulashish tugmasini bosing!`, {
            reply_markup: {
                keyboard: [
                    [{ text: "📲", request_contact: true }]
                ],
                resize_keyboard: true,
            }
        });
    } catch (error) {
        console.log(error);
    }

});

bot.on("text", async (msg) => {
    try {
        const { id, first_name } = msg.from;
        const { text } = msg;

        if (id.toString() === ADMIN) {
            const chatId = lastUserMessage.chatId;
            if (!chatId) throw new Error("No chat");
            bot.sendMessage(chatId, text);

        } else {
            if (text === "📞 Aloqa") {
                bot.sendMessage(id, `Telefon raqamim: +998900242744\nTelegram: @adhamovman`);
            }
            else if (text === "☕️ Bo'lishish") {
                bot.sendMessage(id, `Men bilan ixtiyoriy narsa bo'lishishingiz mumkin. Ularni albatta ko'rib chiqaman.`);
            } else if (text === "Yozibam bo'midimi🥸") {
                bot.sendMessage(id, `Bo'ladi😅\nNima gaap?`);
                bot.sendMessage(ADMIN, `${first_name} qadam ranjida qildilar`);
            } else if (text === "Menga ulashish") {
                bot.sendMessage(id, `Qani ko'relikchi`);
            } else {
                lastUserMessage = { chatId: id, };

                bot.sendMessage(ADMIN, `${first_name}: ${text}`);
            }
        }
    } catch (error) {
        console.log(error);
    }

});


bot.on("contact", async (msg) => {
    try {
        const { phone_number, first_name } = msg.contact;
        const { id } = msg.chat;

        if (!users[id]) {
            users[id] = { first_name: msg.from.first_name };
        }
        console.log(msg.contact);
        users[id].contact = phone_number;
        users[id].first_name = first_name;

        await bot.sendMessage(id, `Nimalar qilamiz?`, {
            reply_markup: {
                keyboard: [
                    [{ text: "☕️ Bo'lishish" }, { text: "📞 Aloqa" }],
                    [{ text: "Yozibam bo'midimi🥸" }]
                ],
                resize_keyboard: true,
            }
        });

        await bot.sendMessage(ADMIN, `User: ${msg.from.first_name}\nContact: ${phone_number}`);
        await bot.sendMessage(`-1001511937285`, `User: ${msg.from.first_name}\nContact: ${phone_number}`);

    } catch (error) {
        console.log(error);
    }

});

bot.on("photo", async (msg) => {
    await bot.sendPhoto(`-1001887819893`, msg.photo.at(-1).file_id, {
        caption: `${msg.from.first_name}`
    });
    await bot.sendMessage(msg.chat.id, `Muvafaqqiyatli yuborildi!`);
});

bot.on("video", async (msg) => {
    await bot.sendVideo(`-1001685051880`, msg.video.file_id, {
        caption: `${msg.from.first_name}`
    });
    await bot.sendMessage(msg.chat.id, `Muvafaqqiyatli yuborildi!`);
});

bot.on("audio", async (msg) => {

    await bot.sendAudio(`-1001914640344`, msg.audio.file_id, {
        caption: `${msg.from.first_name}`
    });
    await bot.sendMessage(msg.chat.id, `Muvafaqqiyatli yuborildi!`);
});

bot.on("voice", async (msg) => {
    await bot.sendVoice(`-1001914640344`, msg.voice.file_id, {
        caption: `${msg.from.first_name}`
    });
    await bot.sendMessage(msg.chat.id, `Muvafaqqiyatli yuborildi!`);
});

bot.on("document", async (msg) => {
    await bot.sendVoice(`-1001594375981`, msg.document.file_id, {
        caption: `${msg.from.first_name}: ${msg.document.file_name}`
    });
    await bot.sendMessage(msg.chat.id, `Muvafaqqiyatli yuborildi!`);
});


