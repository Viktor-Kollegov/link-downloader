module.exports = async (bot, ctx, result) => {
    let inline_keyboard = []

    for(let t in result.thumbnails) {
        const thumb = result.thumbnails[t]
        inline_keyboard.push([{
            text: `${thumb.id} ${thumb.resolution ? `(${thumb.resolution})` : ''}`,
            callback_data: `thumb_${thumb.id}`
        }])
    }

    await ctx.deleteMessage()
    await ctx.telegram.sendMessage(ctx.chat.id, result.title + '\nAvailable thumbnails :', {
        reply_markup: JSON.stringify({ inline_keyboard })
    })

    for(let t in result.thumbnails) {
        const thumb = result.thumbnails[t]

        await bot.action(`thumb_${thumb.id}`, async ctx => {
            await ctx.replyWithDocument(thumb.url)
        })
    }
}