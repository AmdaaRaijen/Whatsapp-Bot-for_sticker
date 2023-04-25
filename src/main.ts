import { Client, LocalAuth, Message } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  console.log("QR RECEIVED");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (msg) => {
  try {
    if (msg.hasMedia && msg.type == "image") {
      client.sendMessage(msg.from, "⏳ Stiker sedang diproses...");
      try {
        const media = await msg.downloadMedia();
        client.sendMessage(msg.from, media, {
          sendMediaAsSticker: true,
          stickerAuthor: "BOT-WA-STICKER/BT",
          stickerName: "a.amdaa_",
        });
      } catch (err) {
        console.log(err);
        client.sendMessage(msg.from, "❌ Gagal membuat stiker");
      }
    } else {
      msg.reply(
        "*Bot Sedang Aktif*\n\nSilahkan kirim gambar yang akan dibuat stiker.\n\n*NOTE*\n\nSekarang anda *tidak perlu* menggunakan *caption* lagi untuk membuat stiker\n\nJaga kesopanan yaa... \nkirim gambar yang baik baik 🤨📸\n\nbot by @a.amdaa_"
      );
    }
  } catch (err) {
    console.log(err);
  }
});

client.initialize();
