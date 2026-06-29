import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { registerMainMenuItem, inlineButton, inlineKeyboard } from "../toolkit/index.js";

registerMainMenuItem({ label: "😊 Mood", data: "mood:show", order: 40 });

const composer = new Composer<Ctx>();

composer.command("mood", async (ctx) => {
  await ctx.reply("How are you feeling? Tap a rating:", {
    reply_markup: inlineKeyboard([
      [inlineButton("😊 Great", "mood:set:5"), inlineButton("🙂 Good", "mood:set:4")],
      [inlineButton("😐 Okay", "mood:set:3"), inlineButton("😕 Low", "mood:set:2")],
      [inlineButton("⬅️ Back to menu", "menu:main")],
    ]),
  });
});

composer.callbackQuery("mood:show", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText("How are you feeling? Tap a rating:", {
    reply_markup: inlineKeyboard([
      [inlineButton("😊 Great", "mood:set:5"), inlineButton("🙂 Good", "mood:set:4")],
      [inlineButton("😐 Okay", "mood:set:3"), inlineButton("😕 Low", "mood:set:2")],
      [inlineButton("⬅️ Back to menu", "menu:main")],
    ]),
  });
});

composer.callbackQuery(/^mood:set:/, async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText("Mood saved — thanks for checking in. You're doing great!", {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
  });
});

export default composer;
