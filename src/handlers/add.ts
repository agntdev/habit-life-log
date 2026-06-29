import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { registerMainMenuItem, inlineButton, inlineKeyboard } from "../toolkit/index.js";

registerMainMenuItem({ label: "➕ Add habit", data: "add:show", order: 30 });

const composer = new Composer<Ctx>();

composer.command("add", async (ctx) => {
  await ctx.reply("What habit would you like to track? Reply with the name and I'll save it for your checklist.", {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
  });
});

composer.callbackQuery("add:show", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText("What habit would you like to track? Reply with the name and I'll save it for your checklist.", {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
  });
});

export default composer;
