import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { registerMainMenuItem, inlineButton, inlineKeyboard } from "../toolkit/index.js";

registerMainMenuItem({ label: "📝 Log", data: "log:show", order: 10 });

const composer = new Composer<Ctx>();

composer.command("log", async (ctx) => {
  await ctx.reply("Here's your daily checklist. Tap to check habits, then add a note if you'd like!", {
    reply_markup: inlineKeyboard([
      [inlineButton("✅ Run", "log:check:run")],
      [inlineButton("✅ Meditate", "log:check:meditate")],
      [inlineButton("📝 Add note", "log:note"), inlineButton("😊 Mood", "mood:show")],
      [inlineButton("⬅️ Back to menu", "menu:main")],
    ]),
  });
});

composer.callbackQuery("log:show", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText("Here's your daily checklist. Tap to check habits, then add a note if you'd like!", {
    reply_markup: inlineKeyboard([
      [inlineButton("✅ Run", "log:check:run")],
      [inlineButton("✅ Meditate", "log:check:meditate")],
      [inlineButton("📝 Add note", "log:note"), inlineButton("😊 Mood", "mood:show")],
      [inlineButton("⬅️ Back to menu", "menu:main")],
    ]),
  });
});

composer.callbackQuery(/^log:check:/, async (ctx) => {
  await ctx.answerCallbackQuery("Logged! Nice work.");
  // basic toggle sim; full would use persistent store
});

composer.callbackQuery("log:note", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText("Reply with your note for today — I'm listening.", {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back", "log:show")]]),
  });
});

export default composer;
