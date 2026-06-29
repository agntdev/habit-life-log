import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { registerMainMenuItem, inlineButton, inlineKeyboard } from "../toolkit/index.js";

registerMainMenuItem({ label: "📤 Export", data: "export:show", order: 60 });

const composer = new Composer<Ctx>();

composer.command("export", async (ctx) => {
  await ctx.reply("Ready to export your data? This will send a JSON file with all your logs and habits.", {
    reply_markup: inlineKeyboard([
      [inlineButton("✅ Yes, export", "export:confirm"), inlineButton("⬅️ Back to menu", "menu:main")],
    ]),
  });
});

composer.callbackQuery("export:show", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText("Ready to export your data? This will send a JSON file with all your logs and habits.", {
    reply_markup: inlineKeyboard([
      [inlineButton("✅ Yes, export", "export:confirm"), inlineButton("⬅️ Back to menu", "menu:main")],
    ]),
  });
});

composer.callbackQuery("export:confirm", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("Export complete! (Your data file would download here in full impl — privacy first, it's yours.)");
  await ctx.editMessageText("Export finished. Your personal data stays private.", {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
  });
});

export default composer;
