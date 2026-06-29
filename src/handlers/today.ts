import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { registerMainMenuItem, inlineButton, inlineKeyboard } from "../toolkit/index.js";

registerMainMenuItem({ label: "📅 Today", data: "today:show", order: 20 });

const composer = new Composer<Ctx>();

composer.command("today", async (ctx) => {
  await ctx.reply("No entries logged yet today — start with the Log button! Keep going, you're building momentum.", {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
  });
});

composer.callbackQuery("today:show", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText("No entries logged yet today — start with the Log button! Keep going, you're building momentum.", {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
  });
});

export default composer;
