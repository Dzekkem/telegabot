const TelegramApi = require('node-telegram-bot-api')

const token = '5262977789:AAFicJ5R9pCUwkm8D3-k_0gMPB0_7ovTvqY'

const bot = new TelegramApi(token,  {polling: true})

const startbuttons = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
                [{text: 'Доброе утро ☀', callback_data:'1' }],
                [{text: 'Спокойной ночи 🌑', callback_data: '2'}],
                [{text: 'Напоминание <3', callback_data:'3'}],
                [{text: 'Котики 🐈', callback_data: '4'}],
        ]
    })
}

function arrayRandElement(arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}

bot.on('message', async msg=>{
    const text = msg.text
    const chatId = msg.chat.id;

    if (text === '/start'){
        await bot.sendMessage(chatId, 'Звездочка, привет! Я сделал этого бота, что бы он мог поддержаивать тебя в любое время, даже если когда нибудь я уже не смогу тебе написать <3. ' +
        'Не стесняйся пользоваться им. Я люблю тебя, Женька.')
        await  bot.sendSticker(chatId,'https://tlgrm.ru/_/stickers/b48/7e2/b487e222-21cd-4741-b567-74b25f44b21a/1.webp')

        return  bot.sendMessage(chatId, 'Выбирай', startbuttons)
    }

    if (text === 'Я люблю тебя' || 'я тебя люблю' || 'я люблю тебя' || 'Я тебя люблю'){
      return   bot.sendMessage(chatId, 'И я тебя люблю, звездочка! Спасибо что говоришь это! Мне очень приятно это знать!')
    }


})

bot.on('callback_query',async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    const goodmorning = ['Доброе утро, звездочка! Ты выспалась? Хорошо покушай сегодня, что бы набраться сил! Хорошего дня тебе!',
        'Привет, Женька! Как тебе спалось? Поваляйся побольше, если день позваляет, ведь отдых важен. Удачи тебе сегодня!',
        'Утречка, Женька! Надеюсь ты выспалась. Завтракай хорошо и набирайся сил! я тебя люблю <3',
        'Приветик, Жень! Как тебе спалось? Что снилось? Надеюсь что не кошмары. Хорошего дня тебе, звездочка!',
        'Утро доброе, любимка! Кроватка была мягкой и теплой? Никто не разбудил? Набирайся сил и поспи ещё, если тебе хочется. Главное отдыхай хорошо, договорились?',
        'Жень, привет. Хорошего дня тебе сегодня! Если собираешься на улицу, то не забудь тепло одеться! Проведи этот день отлично!',
        'Доброе утро, цветочек! Пора вставать. Но если ты хочешь, то поваляйся ещё в кроватке. Нет ничего плохого в том, если ты иногда полежишь подольше. Цом носик!',
    ]
    const goodnight = ['Привет, Жень! Как прошёл твой день? Всё ли было хорошо? Надеюсь ты хорошо кушала сегодня. Спокойной ночки тебе и добрых снов, звёздочка <3',
        'Здравтсвуй, звездочка! Ты не болеешь? Надюесь что нет. А если да, то береги себя и выздоравливай. А лучше всегда береги себя.  Сладких и волшебных снов, Жень',
        'Женька, доброй ночи тебе. Как ты? Чем занималась сегодня? Высыпайся, звёздочка. Надеюсь никто не разбудит тебя',
        'Привет! Как прошёл твой день? Гуляля сегодня? Одевайся тепло, звёздочка, если на улице прохладно. Береги себя. Цом в щёчку! Спокойной ночки, звёздочка <3',
        'Жень, как ты? Ты даешь себе время на отдых? Не забывай про него. А ещё кушай хорошо. Побольше фруктов и овощей. Но иногда и фастфуд покушать можно) Позволяй себе все что ты захочешь, ведь ты это заслуживаешь! Такая милашка! цом цом цом цом. Добрых снов, самая яркая звездочка!',
        'Ночки, звёздочка. Ты часто много работаешь и устаешь. Я надеюсь ты сегодня смогла хорошо отдохнуть. Побольше отдыхай, Жень, и береги себя. Милых снов тебе, Женька! Знай, ты самая красивая и умная девочка во всем мире! для меня ты именно такая... Я люблю тебя.'
    ]
    const remember = ['Жень, знай, что бы не случилось, я буду с тобой до конца. Ты всегда можешь написать мне, если что то случится. Мы всегда можем поговорить вдвоем. Ты очень дорогой для меня человек и я хочу что бы ты была счастлива.',
        'Ты самая красивая девочка в мире! И красивее нет никого! По крайней мере для меня ты именно такая.',
        'Не расстраивайся из-за оценок. Это не главное. Но пожалуйста, не уничтожай себя из-за этого. Все ещё впереди, всё наладится.',
        'Жень, что бы ты не начала делать, я уверен, у тебя всё получится! И я знаю, что однажды ты станешь той самой Женькой, которая сможет похвастаться красивым домиком в лесу или крутыми туфлями, или красивым платьем. Ведь ты так стараешься, когда увлечена чем то. Я верю в тебя! Но не забывай про отдых <3 ',
        'Звездочка, если ты вдруг запуталась, остановись, обдумай это. Если тебе плохо, то прошу тебя, остановись и отдохни. Пожалуйста, не изнемождай себя. Ты не робот. И в этом нет ничего плохого. Ты заслуживаешь отдыха.',
        'Я люблю тебя. Такой, какая ты есть. Такой, какой всегда была. Я влюблен в тебя поуши. И если тебе станет плохо, то прошу, не держи все в себе. Ты можешь высказаться мне, а я всегда буду готов поддержать тебя.',
        'Женька, пожалуйста, люби себя. Ты заслуживаешь любви. Побольше уделяй внимания себе. Я вижу как стараешься всем угодить, но забываешь про себя. Сделай ногти, сходи к врачу если тебя что-то беспокоит или просто прими горячую ванну с бомбочкой. Не забывай о себе.',
    ]
    const pussycat = ['https://sun9-56.userapi.com/impg/kGlaTRtZyQGGGtMHqLewb4_hUSzTN3E6FoYteA/2OG3BUjPOPk.jpg?size=749x562&quality=96&sign=1dc77229af0aa088d20754fbc16894b6&type=album',
        'https://sun9-32.userapi.com/impg/DaY2PPztnpIGcb0IhW0f_NYl2wd-o2hQlGf8iw/tLU-ilGpK-M.jpg?size=646x647&quality=96&sign=a9c2b00ce0d9154704e416b248f23ae0&type=album',
        'https://sun4-17.userapi.com/impg/HWl95hSL4XJ3WlfHUtd6cWvhhrR-AABD0XoqQg/YcuPXezatoU.jpg?size=480x468&quality=96&sign=4667c18889be4a7921adfc7f576211bd&type=album',
        'https://sun9-79.userapi.com/impg/eQQNbQ98JFl6XpV_KHLsDlh-le_GUE2_4YNIXQ/o_S3jOPgfqw.jpg?size=750x567&quality=96&sign=c5e4de160260272fd29a4e76b332c1a3&type=album',
        'https://sun9-46.userapi.com/impg/ItueHgv6S0BxnqvK1pcAEa3fjT1iRSry4jfP0A/s1JObsjMUXo.jpg?size=618x609&quality=96&sign=c869cb42ac9097a2acea280c65f2fa2b&type=album',
        'https://sun9-21.userapi.com/impg/VgoKXte_aYbzB4rjK5lko8-Fgk1J3kfFTcl5Ew/tHF0MJ_zdl8.jpg?size=640x480&quality=96&sign=5bc2094840ba4c2dd02abd8d54c44519&type=album',
        'https://sun9-87.userapi.com/impg/RiOXjfCBT3GVSKG7xLYz2LL9q34vhQnJv0jkww/OesK9lEYyhc.jpg?size=594x594&quality=96&sign=f525c28dd243cd95c30941be2b280aa1&type=album',
        'https://sun9-84.userapi.com/impg/OKv3RjKAqCUwuy0gkPsHeJdd5xxE46E4-ezndg/ZimQ-Hbw68Y.jpg?size=250x235&quality=96&sign=c2e9cc6a37c04999026a2674ec9d2f14&type=album',
        'https://sun9-1.userapi.com/impg/6RCu2e9tASiu-SrD7s24XPBggYRLI2SJmdkz5g/pJ8-bPOkuQc.jpg?size=450x450&quality=96&sign=f8fdb4699bef0599e6e8d74a92975828&type=album',
        'https://sun9-24.userapi.com/impg/qplcMVsdr3ga5q_rw-RPr9sXQDqSskWFOLNrmw/ivoDJ_hgER8.jpg?size=750x562&quality=96&sign=a0a426e4df55dfbdd0e996099f42c309&type=album',
        'https://sun9-81.userapi.com/impg/y_tnhgtSu9S97ocoufoCjJy16A0G82_NfOiFHg/gyoKoBNmAwo.jpg?size=748x748&quality=96&sign=a943ccb0b4aa6b8b8f32842a70b55616&type=album',
        'https://sun9-20.userapi.com/impg/RwlJYv1fGdCbj5NCYYeqx-c6oyyBqUPJgjFqQw/fh5YRTOK-h0.jpg?size=370x370&quality=96&sign=b3dc389de558f07b283a8b2b8dd86d85&type=album',
        'https://sun9-85.userapi.com/impg/Rl3a9kP911XPpRr8FVW9y0wCtkIZfsvBkkZOzw/sQkA23G-mDU.jpg?size=749x525&quality=96&sign=e6ea7e1649d384487e06b709b44245aa&type=album',
        'https://sun9-83.userapi.com/impg/cmWp2od3x_9ggzadt9r7-zA6fx2bOIRlNbp7lg/VG-rBfkNJ3A.jpg?size=560x420&quality=96&sign=0b8653e22f5ddab5fcfee6111db0fb2d&type=album',
        'https://sun9-37.userapi.com/impg/NYNopJmgHGtLJ-JbehXECwffLfEBvcgLD_7Ybw/1VMY1aQvW_Q.jpg?size=691x683&quality=96&sign=0a532528ed4816bb08f52923d3c6c4a8&type=album',
        'https://sun9-41.userapi.com/impg/PgU3tIMuKPT-1VlOqHIENZKzWcVjqvetmdS5ig/5KKOMpEPurM.jpg?size=750x739&quality=96&sign=953a000c03b080e8e7fd560a13df4c0a&type=album',
        'https://sun9-16.userapi.com/impg/_IZ4qVgPeucIMEHoW4Aa9McMMgY-lj98vMrySA/AcXMITLGiP8.jpg?size=749x422&quality=96&sign=2251a068e0c30aff0f7a339958ab71fc&type=album',
        'https://sun9-14.userapi.com/impg/QZx8Tf3a90GaldYAlAhSZzOtHsjWGKa7II8olg/gUB_BzFm-f4.jpg?size=749x562&quality=96&sign=0a73ec1c2ac9f7bbf3ed413cbc84f6d1&type=album',
        'https://sun9-87.userapi.com/impg/8fZkVE2SyE2c52xe_LLG128ZTePmYkYA1e0u0w/Lp8KxtT0S3s.jpg?size=749x749&quality=96&sign=c66bfa411dc8fef94f104a2c1c3c3ddf&type=album',
        'https://sun9-85.userapi.com/impg/9QBrO01VozbDpsLXuaALoNZKzIcfss5KazBj9Q/qakQVGRLcJc.jpg?size=746x746&quality=96&sign=b09300eba5396f2cfff8dae6ab58c051&type=album',
        'https://sun9-88.userapi.com/impg/c1c_xvTamvrsZMjyBSQXqpWqdlh7SwVXbdJIkw/8mRPETDppuI.jpg?size=654x552&quality=96&sign=f5be2a63a7727d52f974d34b7f63c830&type=album',
        'https://sun9-41.userapi.com/impg/CXnK2YOOPtgphnBA236iZEpRwGHmxk4eMzs7Pg/srM01TlnkEs.jpg?size=749x739&quality=96&sign=933768761c20d4723cf4ab8f347c624a&type=album',
        'https://sun9-52.userapi.com/impg/gZ42LIzrXbbEHlU8p2uMM0X11_7BrCIzWkDEEg/4SjbtLe33uE.jpg?size=640x602&quality=96&sign=6e537c6229238e1c981b62442fd9ceea&type=album',
        'https://sun9-80.userapi.com/impg/r3c_oZ3NJvGJlI2ZxmyvTxmQKFOf16k_o0ROGg/mlZYqVxnsAo.jpg?size=640x480&quality=96&sign=690b5d5aab08bf0e5502fb2bc97e8a76&type=album',
        'https://sun9-87.userapi.com/impg/whps2NFu9c3POZ1B7lJNiya_TSFFfZaSa3UB5A/GEC0paAunmM.jpg?size=1024x746&quality=96&sign=3a8fb05361a351d36d49ace21d6cb43e&type=album',
        'https://sun9-10.userapi.com/impg/kKrmzfNcqrnSGbVOwQ5eJOk7KY8jA3JqvWIQsQ/nfNUes_R5dE.jpg?size=794x794&quality=96&sign=1008a8254d236905c0baf5c5b910380d&type=album',
        'https://sun9-66.userapi.com/impg/IeZTPr-a4iQpbIn7lFhe78NRIpZwh72NVVD9Xw/frVhwyiqfzA.jpg?size=828x724&quality=96&sign=b647552689ce18d9fbff7842297021c6&type=album',
        'https://sun9-47.userapi.com/impg/HfJLxP6q-EixF9fssNHGsUQMCtcXYqdAlaOCUQ/ItnSDT6ChTE.jpg?size=828x828&quality=96&sign=b4ca054f943175a4a1b64db284e99f1e&type=album',
        'https://sun9-4.userapi.com/impg/HS08sZSbfPTrjX8jqWyGHU4eUOHPx8vivWcm6A/MEW_narGc-M.jpg?size=749x600&quality=96&sign=1c2e021c9618aa21b16f362822b3ffc0&type=album',
        'https://sun9-48.userapi.com/impg/nHhCQpNmCEPmtkYdBe-JcqtWjxdvAiJIk_ClPw/479orUQXkAM.jpg?size=749x750&quality=96&sign=c83f4284ea0800251dc884288ee21cd7&type=album'
    ]



    if (data === '1'){
        return bot.sendMessage(chatId, arrayRandElement(goodmorning))
    }
    if (data === '2'){
        return bot.sendMessage(chatId, arrayRandElement(goodnight))
    }
    if (data === '3'){
        return bot.sendMessage(chatId, arrayRandElement(remember))
    }
    if (data === '4'){
        return bot.sendPhoto(chatId, arrayRandElement(pussycat))
    }

})