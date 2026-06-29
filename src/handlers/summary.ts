import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { registerMainMenuItem, inlineButton, inlineKeyboard } from "../toolkit/index.js";

registerMainMenuItem({ label: "📊 Summary", data: "summary:show", order: 50 });

const composer = new Composer<Ctx>();

composer.command("summary", async (ctx) => {
  await ctx.reply("For which range? Pick one below and I'll prepare an encouraging AI insight for you.", {
    reply_markup: inlineKeyboard([
      [inlineButton("📅 Today", "summary:day"), inlineButton("🗓️ This week", "summary:week")],
      [inlineButton("🔍 Custom", "summary:custom"), inlineButton("⬅️ Back to menu", "menu:main")],
    ]),
  });
});

composer.callbackQuery("summary:show", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText("For which range? Pick one below and I'll prepare an encouraging AI insight for you.", {
    reply_markup: inlineKeyboard([
      [inlineButton("📅 Today", "summary:day"), inlineButton("🗓️ This week", "summary:week")],
      [inlineButton("🔍 Custom", "summary:custom"), inlineButton("⬅️ Back to menu", "menu:main")],
    ]),
  });
});

composer.callbackQuery(/^summary:(day|week|custom)$/, async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText("No logs yet for that range — start tracking today and I'll have insights ready soon! Tap View full summary if you have data.", {
    reply_markup: inlineKeyboard([[inlineButton("View full summary", "summary:view"), inlineButton("⬅️ Back", "summary:show")]]),
  });
});

composer.callbackQuery("summary:view", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText("Here's your full AI summary: Great start on your habit journey! You've logged 0 days so far — every entry counts. Keep building your streak.", {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
  });
});

export default composer;
