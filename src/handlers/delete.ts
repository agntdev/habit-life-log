import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { registerMainMenuItem, inlineButton, inlineKeyboard } from "../toolkit/index.js";

registerMainMenuItem({ label: "🗑️ Delete", data: "delete:show", order: 70 });

const composer = new Composer<Ctx>();

composer.command("delete", async (ctx) => {
  await ctx.reply("Delete data? Choose carefully — this is permanent.", {
    reply_markup: inlineKeyboard([
      [inlineButton("🗑️ Delete all", "delete:all"), inlineButton("⬅️ Back to menu", "menu:main")],
    ]),
  });
});

composer.callbackQuery("delete:show", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText("Delete data? Choose carefully — this is permanent.", {
    reply_markup: inlineKeyboard([
      [inlineButton("🗑️ Delete all", "delete:all"), inlineButton("⬅️ Back to menu", "menu:main")],
    ]),
  });
});

composer.callbackQuery("delete:all", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText("All your entries and habits are now deleted. Fresh start whenever you're ready — I'm here.", {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
  });
});

export default composer;
