"""Draft Russian and Tajik translations.

DRAFT: a native speaker must proofread every line before launch (see plan.md).
Edit here, then run:  python manage.py build_locale
Strings missing here fall back to English on the site.
"""

# msgid: (ru, tg)
DRAFTS: dict[str, tuple[str, str]] = {
    # Navigation and footer
    "Program": ("Программа", "Барнома"),
    "Speak": ("Выступить", "Баромад кунед"),
    "Sponsors": ("Спонсоры", "Сарпарастон"),
    "Your suzani": ("Ваше сюзане", "Сӯзании шумо"),
    "Volunteer": ("Волонтёрам", "Ихтиёриён"),
    "Get a ticket": ("Купить билет", "Чипта гиред"),
    "Tickets": ("Билеты", "Чиптаҳо"),
    "Financial aid": ("Финансовая помощь", "Кӯмаки молиявӣ"),
    "News": ("Новости", "Хабарҳо"),
    "Live": ("Прямой эфир", "Пахши мустақим"),
    "Skip to content": ("Перейти к содержанию", "Гузариш ба мундариҷа"),
    "Made with Python and green tea in Dushanbe.": (
        "Сделано на Python и зелёном чае в Душанбе.",
        "Бо Python ва чойи кабуд дар Душанбе сохта шудааст.",
    ),
    "This site runs on Django.": ("Сайт работает на Django.", "Ин сомона бо Django кор мекунад."),
    "Read the code": ("Посмотреть код", "Кодро бинед"),
    "PyCon is a trademark of the Python Software Foundation.": (
        "PyCon является товарным знаком Python Software Foundation.",
        "PyCon тамғаи молии Python Software Foundation мебошад.",
    ),
    # Hero
    "Python at the Summit": ("Python на вершине", "Python дар қулла"),
    "at the Summit": ("на вершине", "дар қулла"),
    "The first PyCon in Tajikistan. One day of talks, workshops and friends in Dushanbe.": (
        "Первый PyCon в Таджикистане. Один день докладов, мастер-классов и друзей в Душанбе.",
        "Нахустин PyCon дар Тоҷикистон. Як рӯзи маърӯзаҳо, семинарҳо ва дӯстон дар Душанбе.",
    ),
    "Coming soon": ("Скоро", "Ба наздикӣ"),
    "Dushanbe Innovation Institute": (
        "Душанбинский инновационный институт",
        "Донишкадаи инноватсионии Душанбе",
    ),
    "Submit a talk": ("Подать доклад", "Маъруза пешниҳод кунед"),
    # Base camp
    "Base camp": ("Базовый лагерь", "Лагери асосӣ"),
    "Camp 1": ("Лагерь 1", "Лагери 1"),
    "Camp 2": ("Лагерь 2", "Лагери 2"),
    "Camp 3": ("Лагерь 3", "Лагери 3"),
    "Camp 4": ("Лагерь 4", "Лагери 4"),
    "Summit": ("Вершина", "Қулла"),
    "PyCon is a worldwide family of community conferences about Python. Now it has a home in Tajikistan.": (
        "PyCon — это всемирная семья конференций сообщества о Python. Теперь у неё есть дом в Таджикистане.",
        "PyCon оилаи ҷаҳонии конфронсҳои ҷомеа дар бораи Python аст. Акнун он дар Тоҷикистон хона дорад.",
    ),
    "The first PyCon ever held in the country": (
        "Первый PyCon в истории страны",
        "Нахустин PyCon дар таърихи кишвар",
    ),
    "100 Pythonistas in one hall, from school pupils to senior engineers": (
        "100 питонистов в одном зале, от школьников до опытных инженеров",
        "100 питонист дар як толор, аз хонандагон то муҳандисони ботаҷриба",
    ),
    "Talks in Tajik, Russian and English": (
        "Доклады на таджикском, русском и английском",
        "Маърузаҳо бо забонҳои тоҷикӣ, русӣ ва англисӣ",
    ),
    # Terminal
    "Say hello in Python": ("Скажите привет на Python", "Бо Python салом гӯед"),
    "This is real Python running in your browser. Start it, then try draw('your name') to weave your own suzani.": (
        "Это настоящий Python в вашем браузере. Запустите его и попробуйте draw('ваше имя'), чтобы соткать своё сюзане.",
        "Ин Python-и воқеӣ дар браузери шумост. Онро оғоз кунед ва draw('номи шумо')-ро санҷед, то сӯзании худро бофед.",
    ),
    "Start Python": ("Запустить Python", "Python-ро оғоз кунед"),
    "Starting downloads about 10 MB, once.": (
        "Запуск загрузит около 10 МБ, один раз.",
        "Оғоз тақрибан 10 МБ-ро як бор зеркашӣ мекунад.",
    ),
    # Camp 1
    "One day on the trail": ("Один день на тропе", "Як рӯз дар пайраҳа"),
    "Talks": ("Доклады", "Маърузаҳо"),
    "Practical stories from people who use Python at work, in research and in startups.": (
        "Практические истории людей, которые используют Python в работе, науке и стартапах.",
        "Ҳикояҳои амалии одамоне, ки Python-ро дар кор, илм ва стартапҳо истифода мебаранд.",
    ),
    "Workshops": ("Мастер-классы", "Семинарҳои амалӣ"),
    "Bring your laptop. Leave with working code.": (
        "Приходите с ноутбуком. Уходите с работающим кодом.",
        "Ноутбуки худро биёред. Бо коди корӣ баргардед.",
    ),
    "Tea and conversations": ("Чай и разговоры", "Чой ва суҳбат"),
    "The best talks happen between talks, over a cup of green tea.": (
        "Лучшие разговоры случаются между докладами, за чашкой зелёного чая.",
        "Беҳтарин суҳбатҳо дар байни маърӯзаҳо, бо пиёлаи чойи кабуд мешаванд.",
    ),
    "Student exhibition": ("Студенческая выставка", "Намоишгоҳи донишҷӯён"),
    "Robots, AI demos and apps made by students from Tajikistan.": (
        "Роботы, демо ИИ и приложения от студентов Таджикистана.",
        "Роботҳо, намоишҳои зеҳни сунъӣ ва барномаҳои донишҷӯёни Тоҷикистон.",
    ),
    "Lightning talks": ("Молниеносные доклады", "Маърузаҳои кӯтоҳ"),
    "Five minutes, any topic, sign up on the day. Your first talk could be here.": (
        "Пять минут, любая тема, запись в день события. Ваш первый доклад может быть здесь.",
        "Панҷ дақиқа, ҳар мавзӯъ, сабти ном дар рӯзи чорабинӣ. Маърӯзаи аввалини шумо метавонад ин ҷо бошад.",
    ),
    "See the program": ("Смотреть программу", "Барномаро бинед"),
    # Camp 2
    "Share what you know": ("Поделитесь знаниями", "Донистаҳои худро нақл кунед"),
    "You don't need to be an expert. If you learned something with Python, someone in the hall wants to hear it.": (
        "Не нужно быть экспертом. Если вы чему-то научились с Python, кто-то в зале хочет это услышать.",
        "Коршинос будан шарт нест. Агар шумо бо Python чизе омӯхта бошед, касе дар толор мехоҳад онро шунавад.",
    ),
    "Talk": ("Доклад", "Маъруза"),
    "Workshop": ("Мастер-класс", "Семинари амалӣ"),
    "Lightning talk": ("Молниеносный доклад", "Маърузаи кӯтоҳ"),
    "25 minutes and 5 for questions": (
        "25 минут и 5 на вопросы",
        "25 дақиқа ва 5 дақиқа барои саволҳо",
    ),
    "90 minutes, hands-on": ("90 минут практики", "90 дақиқа амалӣ"),
    "5 minutes, sign up on the day": (
        "5 минут, запись в день события",
        "5 дақиқа, сабти ном дар рӯзи чорабинӣ",
    ),
    "First time speaking? We'll pair you with a mentor.": (
        "Выступаете впервые? Мы найдём вам наставника.",
        "Бори аввал баромад мекунед? Мо ба шумо мураббӣ пайдо мекунем.",
    ),
    "The call for talks opens soon.": (
        "Приём докладов скоро откроется.",
        "Қабули маърӯзаҳо ба наздикӣ оғоз мешавад.",
    ),
    # Camp 3
    "Education Day": ("День образования", "Рӯзи маориф"),
    "We take Python to schools and universities: first programs, small robots, and a session for teachers on how to teach Python.": (
        "Мы приносим Python в школы и университеты: первые программы, маленькие роботы и занятие для учителей о том, как преподавать Python.",
        "Мо Python-ро ба мактабҳо ва донишгоҳҳо мебарем: барномаҳои аввал, роботҳои хурд ва машғулият барои муаллимон оид ба таълими Python.",
    ),
    "Bring Education Day to your school": (
        "Пригласите День образования в вашу школу",
        "Рӯзи маорифро ба мактаби худ даъват кунед",
    ),
    # Camp 4
    "Help us reach the summit": (
        "Помогите нам дойти до вершины",
        "Ба мо барои расидан ба қулла кӯмак кунед",
    ),
    "Sponsors keep tickets affordable and help students attend. Higher support, higher ledge.": (
        "Спонсоры делают билеты доступными и помогают студентам прийти. Больше поддержка, выше уступ.",
        "Сарпарастон чиптаҳоро арзон нигоҳ медоранд ва ба донишҷӯён кӯмак мекунанд. Дастгирии бештар, зинаи баландтар.",
    ),
    "Your logo here": ("Здесь ваш логотип", "Логотипи шумо дар ин ҷо"),
    "Become a sponsor": ("Стать спонсором", "Сарпараст шавед"),
    # Summit
    "You made it to the summit.": ("Вы на вершине.", "Шумо ба қулла расидед."),
    "One ticket, one day, a hundred new friends. Student tickets are paid for by our sponsors.": (
        "Один билет, один день, сто новых друзей. Студенческие билеты оплачивают наши спонсоры.",
        "Як чипта, як рӯз, сад дӯсти нав. Чиптаҳои донишҷӯёнро сарпарастони мо пардохт мекунанд.",
    ),
    "Apply for financial aid": ("Подать заявку на помощь", "Барои кӯмаки молиявӣ ариза диҳед"),
    # Tickets page
    "Student": ("Студенческий", "Донишҷӯӣ"),
    "Personal": ("Личный", "Шахсӣ"),
    "Supporter": ("Поддерживающий", "Дастгирикунанда"),
    "Pay it forward": ("Подарите билет", "Чипта ҳадя кунед"),
    "Buy a ticket": ("Купить билет", "Чипта харед"),
    # Suzani page
    "Your name": ("Ваше имя", "Номи шумо"),
    "Download as a profile picture": ("Скачать как аватар", "Ҳамчун акси профил зеркашӣ кунед"),
    # 404
    "You've lost the trail.": ("Вы сбились с тропы.", "Шумо аз пайраҳа гум шудед."),
    "Back to home": ("На главную", "Ба саҳифаи асосӣ"),
    # Redesign: "Salom, jahon!"
    "“Hello, world” in Tajik. The first PyCon in Tajikistan: talks, workshops and green tea for 100 Pythonistas in Dushanbe.": (
        "«Привет, мир» по-таджикски. Первый PyCon в Таджикистане: доклады, воркшопы и зелёный чай для 100 питонистов в Душанбе.",
        "Аввалин PyCon дар Тоҷикистон: маърӯзаҳо, семинарҳо ва чойи кабуд барои 100 барномасози Python дар Душанбе.",
    ),
    "The capital. The first PyCon in Tajikistan opens here soon.": (
        "Столица. Скоро здесь откроется первый PyCon в Таджикистане.",
        "Пойтахт. Ба наздикӣ дар ин ҷо аввалин PyCon дар Тоҷикистон кушода мешавад.",
    ),
    "One day of Python, in three languages": (
        "Один день Python на трёх языках",
        "Як рӯзи Python бо се забон",
    ),
    "Make your suzani": ("Создать своё сюзане", "Сӯзании худро созед"),
    "Sponsors keep it open to everyone": (
        "Спонсоры делают PyCon доступным для всех",
        "Сарпарастон PyCon-ро барои ҳама дастрас мекунанд",
    ),
    "Menu": ("Меню", "Меню"),
    "Language": ("Язык", "Забон"),
    "Code of Conduct": ("Кодекс поведения", "Кодекси рафтор"),
    "PyCon Tajikistan is a harassment-free event for everyone. Read the Code of Conduct and how to report an incident.": (
        "PyCon Tajikistan — мероприятие без притеснений для всех. Прочитайте кодекс поведения и узнайте, как сообщить о нарушении.",
        "PyCon Tajikistan чорабиниест, ки барои ҳама бе таҳқир мегузарад. Кодекси рафторро хонед ва бифаҳмед, ки чӣ тавр дар бораи вайронкунӣ хабар диҳед.",
    ),
    "On this page": ("На этой странице", "Дар ин саҳифа"),
    "Every attendee agrees to follow our": (
        "Каждый участник соглашается соблюдать наш",
        "Ҳар як иштирокчӣ розӣ мешавад, ки риоя кунад",
    ),
    "Switch to light theme": ("Включить светлую тему", "Мавзӯи равшанро фаъол кунед"),
    "Switch to dark theme": ("Включить тёмную тему", "Мавзӯи торикро фаъол кунед"),
    "Photos from Wikimedia Commons:": ("Фото с Wikimedia Commons:", "Аксҳо аз Wikimedia Commons:"),
}

PLURALS: dict[tuple[str, str], tuple[tuple[str, str, str], tuple[str, str]]] = {
    ("%(days)s day to go", "%(days)s days to go"): (
        ("%(days)s день до начала", "%(days)s дня до начала", "%(days)s дней до начала"),
        ("%(days)s рӯз монд", "%(days)s рӯз монд"),
    ),
    ("%(days)s day to the summit", "%(days)s days to the summit"): (
        ("%(days)s день до вершины", "%(days)s дня до вершины", "%(days)s дней до вершины"),
        ("%(days)s рӯз то қулла", "%(days)s рӯз то қулла"),
    ),
}

# ── Conference pages: speak, sponsors, volunteer, explore (DRAFT, proofread) ──
DRAFTS.update(
    {
        # Navigation, footer, shared
        "Sponsor": ("Спонсорам", "Сарпарастӣ"),
        "Call for speakers": ("Приём заявок на доклады", "Даъват барои маърӯзачиён"),
        "Call for volunteers": ("Набор волонтёров", "Даъват барои волонтёрон"),
        "Sponsors and exhibitors": ("Спонсоры и экспоненты", "Сарпарастон ва намоишгарон"),
        "Explore Tajikistan": ("Откройте Таджикистан", "Тоҷикистонро кашф кунед"),
        "Co-hosted with": ("Соорганизатор:", "Ҳамташкилотчӣ:"),
        "Plan your visit": ("Спланируйте поездку", "Сафари худро ба нақша гиред"),
        "Read the call for speakers": ("Условия для спикеров", "Шартҳо барои маърӯзачиён"),
        "Talks in Tajik, Russian or English. First time speaking? We'll pair you with a mentor.": (
            "Доклады на таджикском, русском или английском. Выступаете впервые? Мы найдём вам наставника.",
            "Маърӯзаҳо бо забонҳои тоҷикӣ, русӣ ё англисӣ. Бори аввал баромад мекунед? Мо ба шумо мураббӣ меёбем.",
        ),
        "Good to know": ("Полезно знать", "Донистан муфид аст"),
        "Main": ("Главное меню", "Менюи асосӣ"),
        "Footer": ("Подвал сайта", "Поёни сомона"),
        "home": ("главная", "саҳифаи асосӣ"),
        "Write to": ("Пишите на", "Нависед ба"),
        "Questions": ("Вопросы", "Саволҳо"),
        "Email": ("Эл. почта", "Почтаи электронӣ"),
        "Phone or Telegram": ("Телефон или Telegram", "Телефон ё Telegram"),
        "Send": ("Отправить", "Фиристодан"),
        "Message": ("Сообщение", "Паём"),
        # Call for speakers
        "Speak at the first PyCon in Tajikistan: talk formats, languages, deadline and how to send a proposal. First-time speakers welcome.": (
            "Выступите на первом PyCon в Таджикистане: форматы, языки, сроки и как подать заявку. Ждём и тех, кто выступает впервые.",
            "Дар аввалин PyCon дар Тоҷикистон баромад кунед: форматҳо, забонҳо, мӯҳлат ва тарзи фиристодани пешниҳод. Маърӯзачиёни навкор хуш омадед.",
        ),
        "We are looking for talks and workshops about Python. Whether you have spoken at ten conferences or never spoken in public, we want to hear what you have learned.": (
            "Мы ищем доклады и воркшопы о Python. Выступали вы на десяти конференциях или ни разу — нам интересно, чему вы научились.",
            "Мо маърӯзаҳо ва семинарҳо дар бораи Python меҷӯем. Дар даҳ конфронс баромад карда бошед ё ҳеҷ гоҳ — мо мехоҳем бишнавем, ки шумо чӣ омӯхтед.",
        ),
        "Proposals close": ("Приём заявок до", "Қабули пешниҳодҳо то"),
        "You hear back by": ("Ответ до", "Ҷавоб то"),
        "Languages": ("Языки", "Забонҳо"),
        "Tajik, Russian or English": (
            "Таджикский, русский или английский",
            "Тоҷикӣ, русӣ ё англисӣ",
        ),
        "Formats": ("Форматы", "Форматҳо"),
        "Talk or workshop": ("Доклад или воркшоп", "Маърӯза ё семинар"),
        "Send a proposal": ("Подать заявку", "Пешниҳод фиристед"),
        "On this page": ("На этой странице", "Дар ин саҳифа"),
        "First-time speakers": ("Новичкам", "Барои навкорон"),
        "What to send": ("Что прислать", "Чӣ фиристодан лозим"),
        "How we choose": ("Как мы выбираем", "Мо чӣ тавр интихоб мекунем"),
        "25 minutes, then 5 minutes for questions. Most of the program is talks.": (
            "25 минут и ещё 5 на вопросы. Большая часть программы — доклады.",
            "25 дақиқа ва 5 дақиқа барои саволҳо. Қисми зиёди барнома маърӯзаҳоянд.",
        ),
        "90 minutes, hands-on. Attendees bring laptops, so tell us what they should install first.": (
            "90 минут практики. Участники приходят с ноутбуками, поэтому напишите, что им нужно установить заранее.",
            "90 дақиқа амалӣ. Иштирокчиён бо ноутбук меоянд, пас нависед, ки пешакӣ чиро насб кунанд.",
        ),
        "5 minutes on anything. No proposal needed: sign up on the conference day.": (
            "5 минут на любую тему. Заявка не нужна: запишитесь в день конференции.",
            "5 дақиқа дар бораи ҳар чиз. Пешниҳод лозим нест: дар рӯзи конфронс номнавис шавед.",
        ),
        "Give your talk in Tajik, Russian or English, whichever you speak best. Slides in English help guests from abroad follow along, but they are not required.": (
            "Выступайте на таджикском, русском или английском — на том, на котором говорите лучше. Слайды на английском помогут гостям из-за рубежа, но это не обязательно.",
            "Бо тоҷикӣ, русӣ ё англисӣ баромад кунед — бо ҳар забоне, ки беҳтар медонед. Слайдҳо бо англисӣ ба меҳмонони хориҷӣ кӯмак мекунанд, вале ҳатмӣ нестанд.",
        ),
        "Any Python topic is welcome: web, data and machine learning, education, science, automation, testing, Python in Tajik and other local languages, and stories from your community or your first open-source contribution.": (
            "Подойдёт любая тема о Python: веб, данные и машинное обучение, образование, наука, автоматизация, тестирование, Python и таджикский и другие местные языки, истории вашего сообщества или ваш первый вклад в open source.",
            "Ҳар мавзӯи Python хуш аст: веб, маълумот ва омӯзиши мошинӣ, маориф, илм, автоматикунонӣ, санҷиш, Python ва забони тоҷикӣ ва дигар забонҳои маҳаллӣ, қиссаҳои ҷомеаи шумо ё нахустин саҳми шумо дар open source.",
        ),
        "First time? This call is for you.": (
            "Впервые? Этот призыв — для вас.",
            "Бори аввал? Ин даъват барои шумост.",
        ),
        "Many of the best talks come from people who have never spoken before. Tick the box in the form and we will pair you with an experienced speaker who helps with your proposal, your slides and a practice run. First-time speakers compete for the same slots as everyone else.": (
            "Многие лучшие доклады делают те, кто раньше не выступал. Отметьте галочку в форме, и мы найдём вам опытного спикера: он поможет с заявкой, слайдами и репетицией. Новички претендуют на те же слоты, что и все.",
            "Бисёре аз беҳтарин маърӯзаҳоро касоне мекунанд, ки қаблан баромад накардаанд. Дар форма аломат гузоред ва мо шуморо бо маърӯзачии ботаҷриба шинос мекунем: ӯ дар пешниҳод, слайдҳо ва машқ кӯмак мекунад. Навкорон барои ҳамон ҷойҳо мисли дигарон рақобат мекунанд.",
        ),
        "Title": ("Название", "Сарлавҳа"),
        "Short and clear. Say what the talk is about, not just something clever.": (
            "Коротко и ясно. Скажите, о чём доклад, а не просто что-то остроумное.",
            "Кӯтоҳ ва равшан. Гӯед, ки маърӯза дар бораи чист, на танҳо чизи ҷолиб.",
        ),
        "Abstract": ("Аннотация", "Аннотатсия"),
        "2 to 5 sentences on what people will learn. This goes in the program.": (
            "2–5 предложений о том, что узнают слушатели. Это попадёт в программу.",
            "2–5 ҷумла дар бораи он ки шунавандагон чӣ меомӯзанд. Ин ба барнома дохил мешавад.",
        ),
        "Intended audience": ("Для кого доклад", "Барои кӣ"),
        "Who it is for, their level, and what they should already know.": (
            "Для кого он, какой уровень и что слушателям нужно знать заранее.",
            "Барои кӣ аст, сатҳи онҳо ва чиро бояд аллакай донанд.",
        ),
        "Short bio": ("Краткая биография", "Тарҷумаи ҳоли мухтасар"),
        "2 or 3 sentences about you, in the third person.": (
            "2–3 предложения о вас, в третьем лице.",
            "2–3 ҷумла дар бораи худ, аз шахси сеюм.",
        ),
        "Contact details": ("Контакты", "Тамос"),
        "Your email, and a phone number or Telegram so we can reach you quickly.": (
            "Ваша почта и телефон или Telegram, чтобы мы могли быстро связаться.",
            "Почтаи шумо ва телефон ё Telegram, то зуд тамос гирем.",
        ),
        "Outline": ("План", "Нақша"),
        "Optional, for reviewers only: the main parts with rough minutes.": (
            "Необязательно, только для рецензентов: основные части с примерным временем.",
            "Ихтиёрӣ, танҳо барои баррасикунандагон: қисмҳои асосӣ бо вақти тахминӣ.",
        ),
        "You can send up to three proposals.": (
            "Можно подать до трёх заявок.",
            "То се пешниҳод фиристодан мумкин аст.",
        ),
        "The program committee reads every proposal.": (
            "Программный комитет читает каждую заявку.",
            "Кумитаи барнома ҳар як пешниҳодро мехонад.",
        ),
        "We look at what attendees will take away, not at your job title or how famous you are.": (
            "Мы смотрим на пользу для слушателей, а не на вашу должность или известность.",
            "Мо ба фоидаи шунавандагон менигарем, на ба вазифа ё машҳурии шумо.",
        ),
        "We write to every speaker by": ("Мы ответим каждому спикеру до", "Ба ҳар як маърӯзачӣ то"),
        "whether the proposal is accepted or not.": (
            "независимо от того, принята заявка или нет.",
            "ҷавоб менависем, новобаста ба он ки пешниҳод қабул шуд ё не.",
        ),
        "Accepted speakers confirm within a week.": (
            "Принятые спикеры подтверждают участие в течение недели.",
            "Маърӯзачиёни қабулшуда дар давоми як ҳафта тасдиқ мекунанд.",
        ),
        "Then we publish the program.": (
            "После этого мы публикуем программу.",
            "Баъд мо барномаро нашр мекунем.",
        ),
        "Accepted speakers get a free conference ticket.": (
            "Принятые спикеры получают бесплатный билет.",
            "Маърӯзачиёни қабулшуда чиптаи ройгон мегиранд.",
        ),
        "Talks may be recorded and published after the conference. If you prefer not to be recorded, say so in the form.": (
            "Доклады могут записываться и публиковаться после конференции. Если вы против записи, напишите об этом в форме.",
            "Маърӯзаҳо метавонанд сабт ва баъди конфронс нашр шаванд. Агар нахоҳед, ки сабт шавед, дар форма нависед.",
        ),
        "No sales pitches: talk about what you built and learned, not about a product.": (
            "Без рекламы: рассказывайте о том, что вы сделали и чему научились, а не о продукте.",
            "Бе реклама: дар бораи он чи сохтед ва омӯхтед гӯед, на дар бораи маҳсулот.",
        ),
        "Need help with travel costs?": (
            "Нужна помощь с дорогой?",
            "Барои хароҷоти сафар кӯмак лозим аст?",
        ),
        "All speakers follow our": (
            "Все спикеры соблюдают наш",
            "Ҳамаи маърӯзачиён риоя мекунанд:",
        ),
        "Questions before you send? Write to": (
            "Есть вопросы? Пишите на",
            "Савол доред? Нависед ба",
        ),
        "Send my proposal": ("Отправить заявку", "Пешниҳодро фиристед"),
        "Thank you! Your proposal is in. We'll write to you by email with the decision by the date on this page.": (
            "Спасибо! Заявка получена. Мы напишем вам о решении до даты, указанной на этой странице.",
            "Ташаккур! Пешниҳоди шумо расид. Қарорро то санаи дар ин саҳифа зикршуда ба почтаатон менависем.",
        ),
        # Proposal form fields and choices
        "Format": ("Формат", "Формат"),
        "Talk, 25 minutes + 5 for questions": (
            "Доклад, 25 минут + 5 на вопросы",
            "Маърӯза, 25 дақиқа + 5 барои саволҳо",
        ),
        "Workshop, 90 minutes": ("Воркшоп, 90 минут", "Семинар, 90 дақиқа"),
        "Language of the talk": ("Язык доклада", "Забони маърӯза"),
        "Level": ("Уровень", "Сатҳ"),
        "Beginner": ("Начальный", "Ибтидоӣ"),
        "Intermediate": ("Средний", "Миёна"),
        "Advanced": ("Продвинутый", "Пешрафта"),
        "Who is it for?": ("Для кого доклад?", "Барои кӣ?"),
        "For example: students who know a little Python, data analysts, web developers.": (
            "Например: студенты, немного знающие Python, аналитики данных, веб-разработчики.",
            "Масалан: донишҷӯёне, ки каме Python медонанд, таҳлилгарони маълумот, веб-барномасозон.",
        ),
        "What will people learn? 2 to 5 sentences. This goes in the program.": (
            "Что узнают слушатели? 2–5 предложений. Это попадёт в программу.",
            "Шунавандагон чӣ меомӯзанд? 2–5 ҷумла. Ин ба барнома дохил мешавад.",
        ),
        "Outline for reviewers": ("План для рецензентов", "Нақша барои баррасикунандагон"),
        "Optional: the main parts with rough minutes. Only the committee sees it.": (
            "Необязательно: основные части с примерным временем. Видит только комитет.",
            "Ихтиёрӣ: қисмҳои асосӣ бо вақти тахминӣ. Танҳо кумита мебинад.",
        ),
        "Your name": ("Ваше имя", "Номи шумо"),
        "This is my first talk at a conference": (
            "Это мой первый доклад на конференции",
            "Ин нахустин маърӯзаи ман дар конфронс аст",
        ),
        "I'd like a mentor to help me prepare": (
            "Хочу наставника для подготовки",
            "Мехоҳам мураббӣ дар омодагӣ кӯмак кунад",
        ),
        "Anything else for the committee?": (
            "Что-то ещё для комитета?",
            "Барои кумита боз чизе ҳаст?",
        ),
        "New": ("Новая", "Нав"),
        "Accepted": ("Принята", "Қабул шуд"),
        "Declined": ("Отклонена", "Рад шуд"),
        "Waiting list": ("Лист ожидания", "Рӯйхати интизорӣ"),
        # Sponsors
        "Sponsor or exhibit at the first PyCon in Tajikistan: packages, benefits, booth options and an organizer contact.": (
            "Станьте спонсором или экспонентом первого PyCon в Таджикистане: пакеты, преимущества, стенды и контакт организаторов.",
            "Сарпараст ё намоишгари аввалин PyCon дар Тоҷикистон шавед: бастаҳо, бартариҳо, стендҳо ва тамос бо ташкилотчиён.",
        ),
        "PyCon Tajikistan brings developers, students and companies from across Central Asia into one hall. Sponsors keep tickets affordable and pay for students to attend.": (
            "PyCon Tajikistan собирает в одном зале разработчиков, студентов и компании со всей Центральной Азии. Спонсоры делают билеты доступными и оплачивают участие студентов.",
            "PyCon Tajikistan барномасозон, донишҷӯён ва ширкатҳоро аз саросари Осиёи Марказӣ дар як толор ҷамъ меорад. Сарпарастон чиптаҳоро дастрас мекунанд ва иштироки донишҷӯёнро пардохт мекунанд.",
        ),
        "Alif is co-hosting the first PyCon in Tajikistan together with the local Python community.": (
            "Alif проводит первый PyCon в Таджикистане вместе с местным Python-сообществом.",
            "Alif аввалин PyCon дар Тоҷикистонро якҷо бо ҷомеаи маҳаллии Python баргузор мекунад.",
        ),
        "Why sponsor": ("Зачем спонсировать", "Чаро сарпарастӣ кунед"),
        "Packages": ("Пакеты", "Бастаҳо"),
        "Booths": ("Стенды", "Стендҳо"),
        "Contact the organizers": ("Связаться с организаторами", "Тамос бо ташкилотчиён"),
        "Meet people you could hire.": (
            "Познакомьтесь с будущими сотрудниками.",
            "Бо кормандони ояндаи худ шинос шавед.",
        ),
        "Python developers, data people and students who are about to start their careers.": (
            "Python-разработчики, специалисты по данным и студенты, которые начинают карьеру.",
            "Барномасозони Python, мутахассисони маълумот ва донишҷӯёне, ки фаъолияти касбиро оғоз мекунанд.",
        ),
        "Show your engineering.": ("Покажите свою инженерию.", "Муҳандисии худро нишон диҳед."),
        "Tell the community how your team uses Python, on stage or at your booth.": (
            "Расскажите сообществу, как ваша команда использует Python — со сцены или на стенде.",
            "Ба ҷомеа нақл кунед, ки дастаи шумо Python-ро чӣ тавр истифода мебарад — аз саҳна ё дар стенд.",
        ),
        "Help start something.": ("Помогите начать новое.", "Дар оғози чизи нав кӯмак кунед."),
        "This is the first PyCon in Tajikistan. Your support pays for student tickets and Education Day.": (
            "Это первый PyCon в Таджикистане. Ваша поддержка оплачивает студенческие билеты и День образования.",
            "Ин аввалин PyCon дар Тоҷикистон аст. Дастгирии шумо чиптаҳои донишҷӯён ва Рӯзи маорифро пардохт мекунад.",
        ),
        "Packages are named after the climb, from base camp to the summit. Prices and the full prospectus are sent on request.": (
            "Пакеты названы по этапам восхождения — от базового лагеря до вершины. Цены и полный проспект отправляем по запросу.",
            "Бастаҳо аз рӯи марҳилаҳои кӯҳнавардӣ ном гирифтаанд — аз лагери асосӣ то қулла. Нархҳо ва проспекти пурраро бо дархост мефиристем.",
        ),
        "Price on request": ("Цена по запросу", "Нарх бо дархост"),
        "Summit": ("Вершина", "Қулла"),
        "Peak": ("Пик", "Авҷ"),
        "Ridge": ("Хребет", "Қаторкӯҳ"),
        "Valley": ("Долина", "Водӣ"),
        "Base camp": ("Базовый лагерь", "Лагери асосӣ"),
        "Friends of the trail": ("Друзья тропы", "Дӯстони пайраҳа"),
        "Headline partner. Your name at the top of the mountain.": (
            "Генеральный партнёр. Ваше имя на вершине горы.",
            "Шарики асосӣ. Номи шумо дар қуллаи кӯҳ.",
        ),
        "Big logo on stage, booth, short talk slot, 4 tickets.": (
            "Большой логотип на сцене, стенд, короткий доклад, 4 билета.",
            "Логотипи калон дар саҳна, стенд, маърӯзаи кӯтоҳ, 4 чипта.",
        ),
        "Logo on stage and site, booth, 3 tickets.": (
            "Логотип на сцене и сайте, стенд, 3 билета.",
            "Логотип дар саҳна ва сомона, стенд, 3 чипта.",
        ),
        "Logo on site and screens, 2 tickets.": (
            "Логотип на сайте и экранах, 2 билета.",
            "Логотип дар сомона ва экранҳо, 2 чипта.",
        ),
        "Logo on site, 1 ticket. Made for local startups.": (
            "Логотип на сайте, 1 билет. Для местных стартапов.",
            "Логотип дар сомона, 1 чипта. Барои стартапҳои маҳаллӣ.",
        ),
        "Community partners, universities and individual supporters.": (
            "Партнёры из сообщества, университеты и частные сторонники.",
            "Шарикони ҷомеа, донишгоҳҳо ва тарафдорони инфиродӣ.",
        ),
        "Booths stand in the hall where attendees have tea and lunch, so people stop by all day. Book a booth on its own or add one to any package.": (
            "Стенды стоят в зале, где участники пьют чай и обедают, поэтому к ним подходят весь день. Стенд можно взять отдельно или добавить к любому пакету.",
            "Стендҳо дар толоре ҷойгиранд, ки иштирокчиён чой менӯшанд ва хӯроки нисфирӯзӣ мехӯранд, бинобар ин тамоми рӯз меоянд. Стендро алоҳида ё бо ҳар баста гирифтан мумкин аст.",
        ),
        "Booth": ("Стенд", "Стенд"),
        "A table, chairs, power and space for your banner. For companies that want to meet attendees and hire.": (
            "Стол, стулья, электричество и место для баннера. Для компаний, которые хотят знакомиться с участниками и нанимать.",
            "Миз, курсиҳо, барқ ва ҷой барои баннер. Барои ширкатҳое, ки мехоҳанд бо иштирокчиён шинос шаванд ва кормандон ёбанд.",
        ),
        "Startup table": ("Стол для стартапа", "Мизи стартап"),
        "A smaller table at a lower price, for young companies from Tajikistan.": (
            "Стол поменьше и дешевле — для молодых компаний из Таджикистана.",
            "Мизи хурдтар бо нархи арзонтар — барои ширкатҳои ҷавони Тоҷикистон.",
        ),
        "Community table": ("Стол сообщества", "Мизи ҷомеа"),
        "Free for user groups, universities and non-profits, while space lasts.": (
            "Бесплатно для сообществ, университетов и некоммерческих организаций, пока есть места.",
            "Ройгон барои ҷомеаҳо, донишгоҳҳо ва ташкилотҳои ғайритиҷоратӣ, то ҷой ҳаст.",
        ),
        "Tell us what you are interested in and we will send the prospectus. Or write directly to": (
            "Расскажите, что вам интересно, и мы пришлём проспект. Или напишите напрямую на",
            "Гӯед, ки ба шумо чӣ шавқовар аст ва мо проспектро мефиристем. Ё мустақиман нависед ба",
        ),
        "Organization": ("Организация", "Ташкилот"),
        "Contact person": ("Контактное лицо", "Шахси тамос"),
        "We are interested in": ("Нас интересует", "Моро шавқманд мекунад"),
        "Sponsorship": ("Спонсорство", "Сарпарастӣ"),
        "A booth": ("Стенд", "Стенд"),
        "Both": ("И то, и другое", "Ҳарду"),
        "Package": ("Пакет", "Баста"),
        "Optional. Not sure yet? Leave it empty.": (
            "Необязательно. Ещё не решили? Оставьте пустым.",
            "Ихтиёрӣ. Ҳоло қарор накардед? Холӣ гузоред.",
        ),
        "Not sure yet": ("Пока не решили", "Ҳоло маълум нест"),
        "Thank you! We'll send the prospectus and reply within three working days.": (
            "Спасибо! Мы пришлём проспект и ответим в течение трёх рабочих дней.",
            "Ташаккур! Мо проспектро мефиристем ва дар давоми се рӯзи корӣ ҷавоб медиҳем.",
        ),
        # Volunteers
        "Volunteer at the first PyCon in Tajikistan: registration, room support, photography, speaker assistance and more.": (
            "Станьте волонтёром первого PyCon в Таджикистане: регистрация, работа в залах, фотосъёмка, помощь спикерам и другое.",
            "Волонтёри аввалин PyCon дар Тоҷикистон шавед: бақайдгирӣ, кӯмак дар толорҳо, аксбардорӣ, кӯмак ба маърӯзачиён ва ғайра.",
        ),
        "The first PyCon in Tajikistan is run by volunteers. Give a few hours and get a free ticket, a crew T-shirt and a story about how it all started.": (
            "Первый PyCon в Таджикистане делают волонтёры. Подарите несколько часов и получите бесплатный билет, футболку команды и историю о том, как всё начиналось.",
            "Аввалин PyCon дар Тоҷикистонро волонтёрон мегузаронанд. Чанд соат вақт диҳед ва чиптаи ройгон, футболкаи даста ва қиссае дар бораи оғози ин ҳама гиред.",
        ),
        "Roles": ("Роли", "Нақшҳо"),
        "Registration desk": ("Стойка регистрации", "Мизи бақайдгирӣ"),
        "Welcome attendees, check tickets and hand out badges. Yours is the first face everyone sees.": (
            "Встречайте участников, проверяйте билеты и выдавайте бейджи. Вас все увидят первыми.",
            "Иштирокчиёнро пешвоз гиред, чиптаҳоро санҷед ва бейҷ диҳед. Шуморо ҳама аввал мебинанд.",
        ),
        "Room support": ("Работа в залах", "Кӯмак дар толорҳо"),
        "Keep a room running: start sessions on time, pass the microphone for questions and help people find seats.": (
            "Следите за залом: начинайте сессии вовремя, передавайте микрофон для вопросов и помогайте найти места.",
            "Толорро идора кунед: ҷаласаҳоро сари вақт оғоз кунед, микрофонро барои саволҳо диҳед ва ба одамон дар ёфтани ҷой кӯмак кунед.",
        ),
        "Speaker assistance": ("Помощь спикерам", "Кӯмак ба маърӯзачиён"),
        "Meet speakers, take them to their room and check their slides and timing before they go on stage.": (
            "Встречайте спикеров, провожайте в зал и проверяйте с ними слайды и тайминг перед выходом на сцену.",
            "Маърӯзачиёнро пешвоз гиред, ба толор баред ва пеш аз баромад слайдҳо ва вақтро якҷоя санҷед.",
        ),
        "Photography": ("Фотосъёмка", "Аксбардорӣ"),
        "Capture talks, hallway moments and the crowd. Bring your own camera or a good phone.": (
            "Снимайте доклады, общение в коридорах и зал. Возьмите свою камеру или хороший телефон.",
            "Маърӯзаҳо, лаҳзаҳои долон ва издиҳомро сабт кунед. Камераи худ ё телефони хуб биёред.",
        ),
        "Social media": ("Соцсети", "Шабакаҳои иҷтимоӣ"),
        "Share the day as it happens, in Tajik, Russian or English.": (
            "Рассказывайте о дне в реальном времени — на таджикском, русском или английском.",
            "Рӯзро ҳамон лаҳза нақл кунед — бо тоҷикӣ, русӣ ё англисӣ.",
        ),
        "Setup and teardown": ("Подготовка и сборы", "Омодасозӣ ва ҷамъоварӣ"),
        "Help set up the hall the day before and pack everything up at the end.": (
            "Помогите подготовить зал накануне и всё собрать в конце.",
            "Дар омода кардани толор як рӯз пеш ва ҷамъ кардани ҳама чиз дар охир кӯмак кунед.",
        ),
        "No experience needed. We run a short training before the conference.": (
            "Опыт не нужен. Перед конференцией проведём короткое обучение.",
            "Таҷриба лозим нест. Пеш аз конфронс омӯзиши кӯтоҳ мегузаронем.",
        ),
        "We plan shifts so you can still see the talks you care about.": (
            "Мы составляем смены так, чтобы вы успели на интересные вам доклады.",
            "Мо навбатҳоро тавре тартиб медиҳем, ки шумо маърӯзаҳои дилхоҳро бинед.",
        ),
        "Volunteers follow our": ("Волонтёры соблюдают наш", "Волонтёрон риоя мекунанд:"),
        "Join the crew": ("Присоединиться к команде", "Ба даста ҳамроҳ шавед"),
        "Choose the role you would like most and tell us when you can help.": (
            "Выберите роль, которая вам ближе, и укажите, когда сможете помочь.",
            "Нақши дилхоҳатонро интихоб кунед ва гӯед, ки кай кӯмак карда метавонед.",
        ),
        "Full name": ("Имя и фамилия", "Ному насаб"),
        "Preferred role": ("Желаемая роль", "Нақши дилхоҳ"),
        "Anything that helps": ("Любая помощь", "Ҳар кӯмак"),
        "When can you help?": ("Когда вы можете помочь?", "Кай кӯмак карда метавонед?"),
        "The day before, for setup": ("Накануне, для подготовки", "Як рӯз пеш, барои омодасозӣ"),
        "Conference day, morning": ("День конференции, утро", "Рӯзи конфронс, субҳ"),
        "Conference day, afternoon": (
            "День конференции, после обеда",
            "Рӯзи конфронс, баъд аз нисфирӯзӣ",
        ),
        "The whole conference day": ("Весь день конференции", "Тамоми рӯзи конфронс"),
        "Languages you speak": ("Языки, которыми вы владеете", "Забонҳое, ки медонед"),
        "Anything else we should know?": ("Что ещё нам нужно знать?", "Боз чӣ бояд донем?"),
        "Thank you! We'll write to you about training and your shift.": (
            "Спасибо! Мы напишем вам об обучении и вашей смене.",
            "Ташаккур! Дар бораи омӯзиш ва навбати шумо менависем.",
        ),
        # Explore Tajikistan
        "A first-timer's guide to Dushanbe, Tajik food and culture, and day trips and hikes around the conference.": (
            "Путеводитель для тех, кто впервые в Душанбе: еда и культура, поездки на день и походы вокруг конференции.",
            "Роҳнамо барои онҳое, ки бори аввал ба Душанбе меоянд: таом ва фарҳанг, сафарҳои якрӯза ва сайругашт атрофи конфронс.",
        ),
        "Coming to Tajikistan for the first time? Here is a short guide to Dushanbe, Tajik food and a few trips to take before or after the conference.": (
            "Впервые едете в Таджикистан? Вот короткий гид по Душанбе, таджикской кухне и нескольким поездкам до или после конференции.",
            "Бори аввал ба Тоҷикистон меоед? Ин роҳнамои кӯтоҳ дар бораи Душанбе, таомҳои тоҷикӣ ва чанд сафар пеш ё баъд аз конфронс аст.",
        ),
        "Dushanbe": ("Душанбе", "Душанбе"),
        "Food": ("Еда", "Таом"),
        "Culture": ("Культура", "Фарҳанг"),
        "Day trips": ("Поездки на день", "Сафарҳои якрӯза"),
        "A hike": ("Поход", "Сайругашт"),
        "Practical tips": ("Практические советы", "Маслиҳатҳои амалӣ"),
        "Dushanbe is a green, walkable capital with wide avenues, plane trees and mountains on the horizon. Most places worth seeing are on or near Rudaki Avenue.": (
            "Душанбе — зелёная столица, удобная для прогулок: широкие проспекты, чинары и горы на горизонте. Почти всё интересное — на проспекте Рудаки или рядом.",
            "Душанбе пойтахти сабз ва барои пиёдагардӣ қулай аст: хиёбонҳои васеъ, чинорҳо ва кӯҳҳо дар уфуқ. Қариб ҳамаи ҷойҳои дидании он дар хиёбони Рӯдакӣ ё наздики он ҷойгиранд.",
        ),
        "Rudaki Avenue and Rudaki Park": ("Проспект и парк Рудаки", "Хиёбон ва боғи Рӯдакӣ"),
        "The main street. Walk it in the evening, when the fountains are on and families are out.": (
            "Главная улица. Пройдитесь вечером, когда работают фонтаны и гуляют семьи.",
            "Кӯчаи асосӣ. Бегоҳ сайр кунед, вақте фаввораҳо кор мекунанд ва оилаҳо гардиш мекунанд.",
        ),
        "National Museum of Tajikistan": (
            "Национальный музей Таджикистана",
            "Осорхонаи миллии Тоҷикистон",
        ),
        "History and art from ancient Sogdiana to today, in one large modern building.": (
            "История и искусство от древней Согдианы до наших дней в одном большом современном здании.",
            "Таърих ва санъат аз Суғди қадим то имрӯз дар як бинои калони муосир.",
        ),
        "Navruz Palace": ("Дворец Навруз", "Кохи Наврӯз"),
        "Halls of carved wood, painted ceilings and stone, made by craftsmen from across the country.": (
            "Залы с резьбой по дереву, расписными потолками и камнем — работа мастеров со всей страны.",
            "Толорҳо бо кандакории чӯб, шифтҳои нақшин ва санг — кори ҳунармандон аз саросари кишвар.",
        ),
        "Mehrgon market": ("Рынок Мехргон", "Бозори Меҳргон"),
        "Dried apricots, nuts, spices, fresh bread and fruit. The best place to buy gifts to take home.": (
            "Курага, орехи, специи, свежий хлеб и фрукты. Лучшее место для подарков домой.",
            "Ғӯлинг, чормағз, ҳанут, нони тоза ва мева. Беҳтарин ҷой барои харидани тӯҳфа.",
        ),
        "The Rohat teahouse on Rudaki Avenue, with tall columns and a tiled panel on its wall": (
            "Чайхана «Рохат» на проспекте Рудаки с высокими колоннами и изразцовым панно на стене",
            "Чойхонаи «Роҳат» дар хиёбони Рӯдакӣ бо сутунҳои баланд ва панели кошинкорӣ дар девор",
        ),
        "Rohat, the big teahouse on Rudaki Avenue. Come for green tea and a long lunch.": (
            "«Рохат» — большая чайхана на проспекте Рудаки. Приходите на зелёный чай и долгий обед.",
            "«Роҳат» — чойхонаи калон дар хиёбони Рӯдакӣ. Барои чойи кабуд ва хӯроки нисфирӯзии дароз биёед.",
        ),
        "The arched facade of Mehrgon market in Dushanbe": (
            "Арочный фасад рынка Мехргон в Душанбе",
            "Пештоқи равоқдори бозори Меҳргон дар Душанбе",
        ),
        "Mehrgon market: dried fruit, nuts and spices to take home.": (
            "Рынок Мехргон: сухофрукты, орехи и специи с собой домой.",
            "Бозори Меҳргон: меваи хушк, чормағз ва ҳанут барои хона.",
        ),
        "Tajik food is made for sharing. Meals start with bread and tea and can go on for hours.": (
            "Таджикская еда создана, чтобы делиться. Застолье начинается с хлеба и чая и может длиться часами.",
            "Таоми тоҷикӣ барои ҳамроҳ хӯрдан аст. Дастурхон бо нон ва чой оғоз мешавад ва метавонад соатҳо давом кунад.",
        ),
        "Qurutob": ("Курутоб", "Қурутоб"),
        "The national dish: flatbread soaked in qurut, a salty sauce of dried yogurt, topped with onions and herbs. Eaten by hand from a shared wooden bowl.": (
            "Национальное блюдо: лепёшка, пропитанная курутом — солёным соусом из сушёного кисломолочного продукта, с луком и зеленью. Едят руками из общего деревянного блюда.",
            "Таоми миллӣ: фатир дар қурут — шӯрбои шӯри аз ҷурғоти хушк, бо пиёз ва сабзавот. Аз табақи чӯбии умумӣ бо даст мехӯранд.",
        ),
        "Oshi palav": ("Оши палав", "Оши палав"),
        "Plov: rice, carrots and meat cooked slowly in a big cauldron. The dish for guests and celebrations.": (
            "Плов: рис, морковь и мясо, медленно приготовленные в большом казане. Блюдо для гостей и праздников.",
            "Палав: биринҷ, сабзӣ ва гӯшт, ки оҳиста дар деги калон пухта мешаванд. Таом барои меҳмонон ва ҷашнҳо.",
        ),
        "Sambusa": ("Самбуса", "Самбӯса"),
        "Pastries filled with meat and onion, baked on the wall of a clay oven.": (
            "Пирожки с мясом и луком, испечённые на стенке глиняной печи.",
            "Самбӯса бо гӯшт ва пиёз, ки дар девори танӯр пухта мешавад.",
        ),
        "Non": ("Нон", "Нон"),
        "Round bread with a stamped pattern. It is treated with respect: never put it upside down or throw it away.": (
            "Круглый хлеб с узором. К нему относятся с уважением: не кладите его вверх дном и не выбрасывайте.",
            "Нони мудаввар бо нақш. Ба он бо эҳтиром муносибат мекунанд: онро чаппа нагузоред ва напартоед.",
        ),
        "Green tea": ("Зелёный чай", "Чойи кабуд"),
        "Served all day in small bowls called piyola. The host keeps refilling, so a small portion is a good sign.": (
            "Подают весь день в маленьких пиалах. Хозяин постоянно подливает, поэтому неполная пиала — хороший знак.",
            "Тамоми рӯз дар пиёлаҳои хурд медиҳанд. Соҳибхона доим илова мекунад, бинобар ин пиёлаи нопурра аломати хуб аст.",
        ),
        "A wooden bowl of qurutob with herbs, surrounded by sambusa and bread": (
            "Деревянное блюдо курутоба с зеленью, вокруг самбуса и хлеб",
            "Табақи чӯбии қурутоб бо сабзавот, дар атроф самбӯса ва нон",
        ),
        "Qurutob in a wooden bowl, with sambusa and bread around it.": (
            "Курутоб в деревянном блюде, вокруг самбуса и хлеб.",
            "Қурутоб дар табақи чӯбӣ, дар атрофаш самбӯса ва нон.",
        ),
        "Tajiks are famous for hospitality. If you are invited for tea, say yes.": (
            "Таджики славятся гостеприимством. Если вас позвали на чай, соглашайтесь.",
            "Тоҷикон бо меҳмоннавозӣ машҳуранд. Агар ба чой даъват кунанд, розӣ шавед.",
        ),
        "People greet with a hand on the heart. Салом (salom) means hello, and раҳмат (rahmat) means thank you.": (
            "Здороваются, приложив руку к сердцу. Салом — «здравствуйте», раҳмат — «спасибо».",
            "Ҳангоми салом дастро ба сина мегузоранд. Меҳмонон аввал калимаҳои «салом» ва «раҳмат»-ро меомӯзанд.",
        ),
        "Take your shoes off before you sit on a tapchan, the raised wooden platform in teahouses.": (
            "Снимайте обувь, прежде чем сесть на топчан — деревянный помост в чайханах.",
            "Пеш аз нишастан ба кат — суфаи чӯбии чойхона — пойафзолро кашед.",
        ),
        "Ask before you photograph people. Most will say yes.": (
            "Спрашивайте разрешения, прежде чем фотографировать людей. Почти все согласятся.",
            "Пеш аз аксгирии одамон иҷозат пурсед. Аксарият розӣ мешаванд.",
        ),
        "Dress modestly when you visit mosques and shrines.": (
            "В мечетях и святых местах одевайтесь скромно.",
            "Ҳангоми зиёрати масҷидҳо ва мазорҳо либоси хоксорона пӯшед.",
        ),
        "Tajik is a Persian language, written in Cyrillic. Many people also speak Russian, and younger people often speak English.": (
            "Таджикский — персидский язык на кириллице. Многие говорят по-русски, а молодёжь часто и по-английски.",
            "Забони тоҷикӣ забони форсист, ки бо хати кириллӣ навишта мешавад. Бисёриҳо русӣ медонанд ва ҷавонон аксар англисӣ ҳам.",
        ),
        "An embroidered suzani with red, pink and teal rosettes on white cloth": (
            "Вышитое сюзане с красными, розовыми и бирюзовыми розетками на белой ткани",
            "Сӯзанӣ бо гулҳои сурх, гулобӣ ва фирӯзаӣ дар матои сафед",
        ),
        "Suzani, embroidered cloth made for weddings and homes. The rosettes on this site are drawn from it.": (
            "Сюзане — вышитая ткань для свадеб и дома. Розетки на этом сайте нарисованы по её мотивам.",
            "Сӯзанӣ — матои гулдӯзӣ барои тӯйҳо ва хона. Гулҳои ин сомона аз он илҳом гирифтаанд.",
        ),
        "Green slopes and rocky peaks in the Varzob gorge, with a wooden pavilion": (
            "Зелёные склоны и скалистые вершины Варзобского ущелья с деревянной беседкой",
            "Нишебиҳои сабз ва қуллаҳои сангини дараи Варзоб бо айвони чӯбӣ",
        ),
        "The Varzob gorge, less than an hour north of the city.": (
            "Варзобское ущелье — меньше часа к северу от города.",
            "Дараи Варзоб — камтар аз як соат дар шимоли шаҳр.",
        ),
        "Iskanderkul lake with bare mountains of the Fann range behind it": (
            "Озеро Искандеркуль на фоне голых Фанских гор",
            "Кӯли Искандаркӯл дар заминаи кӯҳҳои бараҳнаи Фон",
        ),
        "Iskanderkul, a mountain lake in the Fann Mountains.": (
            "Искандеркуль — горное озеро в Фанских горах.",
            "Искандаркӯл — кӯли кӯҳӣ дар кӯҳҳои Фон.",
        ),
        "Varzob gorge": ("Варзобское ущелье", "Дараи Варзоб"),
        "30 to 60 minutes north by car. A cold mountain river, fresh air and teahouses where you eat on platforms over the water. Half a day is enough.": (
            "30–60 минут на машине к северу. Холодная горная река, свежий воздух и чайханы, где едят на помостах над водой. Хватит полдня.",
            "30–60 дақиқа бо мошин ба шимол. Дарёи хунуки кӯҳӣ, ҳавои тоза ва чойхонаҳое, ки дар катҳои болои об хӯрок мехӯранд. Ним рӯз кифоя аст.",
        ),
        "Hisor fortress": ("Гиссарская крепость", "Қалъаи Ҳисор"),
        "About 30 km west of Dushanbe. A restored fortress gate, an old madrasa and a small museum. Half a day.": (
            "Около 30 км к западу от Душанбе. Восстановленные ворота крепости, старое медресе и небольшой музей. Полдня.",
            "Тақрибан 30 км дар ғарби Душанбе. Дарвозаи барқароршудаи қалъа, мадрасаи кӯҳна ва осорхонаи хурд. Ним рӯз.",
        ),
        "Iskanderkul": ("Искандеркуль", "Искандаркӯл"),
        "A turquoise lake at about 2,200 m in the Fann Mountains, around three to four hours by car. Plan a long day, or stay a night.": (
            "Бирюзовое озеро на высоте около 2200 м в Фанских горах, три–четыре часа на машине. Запланируйте долгий день или останьтесь на ночь.",
            "Кӯли фирӯзаранг дар баландии тақрибан 2200 м дар кӯҳҳои Фон, се–чор соат бо мошин. Рӯзи дароз ба нақша гиред ё як шаб монед.",
        ),
        "A hike: Gusgarf waterfall": ("Поход: водопад Гусгарф", "Сайругашт: шаршараи Гусгарф"),
        "In the Varzob valley, a path climbs a side gorge to the Gusgarf waterfall. It is an easy half-day walk on a rocky trail. Take water, sun protection and good shoes, and go with a local guide or friends who know the way. Ask in our community chat and someone will likely join you.": (
            "В долине Варзоба тропа поднимается по боковому ущелью к водопаду Гусгарф. Это лёгкая прогулка на полдня по каменистой тропе. Возьмите воду, защиту от солнца и удобную обувь и идите с местным гидом или друзьями, которые знают дорогу. Спросите в нашем чате сообщества — наверняка кто-то составит компанию.",
            "Дар водии Варзоб пайраҳа аз дараи паҳлӯӣ ба шаршараи Гусгарф мебарояд. Ин сайри осони нимрӯза дар пайраҳаи сангин аст. Об, муҳофизат аз офтоб ва пойафзоли хуб гиред ва бо роҳбалади маҳаллӣ ё дӯстоне, ки роҳро медонанд, равед. Дар чати ҷомеаи мо пурсед — эҳтимол касе ҳамроҳ мешавад.",
        ),
        "Visa": ("Виза", "Раводид"),
        "Many nationalities can get an e-visa online at": (
            "Гражданам многих стран можно оформить электронную визу на сайте",
            "Шаҳрвандони бисёр кишварҳо метавонанд раводиди электрониро онлайн гиранд дар",
        ),
        "Check the rules for your passport before you book.": (
            "Проверьте правила для вашего паспорта до покупки билетов.",
            "Пеш аз хариди чипта қоидаҳоро барои шиносномаи худ санҷед.",
        ),
        "Money": ("Деньги", "Пул"),
        "The currency is the Tajik somoni (TJS). Carry cash: cards work in hotels and larger shops, and there are cash machines in the centre.": (
            "Валюта — таджикский сомони (TJS). Носите наличные: карты принимают в отелях и крупных магазинах, банкоматы есть в центре.",
            "Асъор — сомонии тоҷикӣ (TJS). Пули нақд дошта бошед: кортҳоро дар меҳмонхонаҳо ва мағозаҳои калон қабул мекунанд, банкоматҳо дар марказ ҳастанд.",
        ),
        "Weather in May": ("Погода в мае", "Обу ҳаво дар моҳи май"),
        "Warm and sunny, often 20 to 30 °C in the day. Bring a jacket for the mountains.": (
            "Тепло и солнечно, днём часто 20–30 °C. Возьмите куртку для гор.",
            "Гарм ва офтобӣ, рӯзона аксар 20–30 °C. Барои кӯҳ куртка гиред.",
        ),
        "Getting around": ("Транспорт", "Нақлиёт"),
        "Taxis are cheap. Use a ride app or agree the price before you get in.": (
            "Такси недорогое. Пользуйтесь приложением или договаривайтесь о цене до поездки.",
            "Такси арзон аст. Аз барнома истифода баред ё нархро пеш аз савор шудан муайян кунед.",
        ),
        "We are happy to help you plan.": (
            "Мы с радостью поможем спланировать поездку.",
            "Мо бо хурсандӣ дар банақшагирӣ кӯмак мекунем.",
        ),
        "Photos are resized.": ("Размер фотографий изменён.", "Андозаи аксҳо иваз карда шудааст."),
        # Older strings that were still in English
        "Add a donation and give a free ticket to a student who cannot afford one.": (
            "Добавьте пожертвование и подарите билет студенту, который не может его купить.",
            "Хайрия илова кунед ва ба донишҷӯе, ки имкони харидан надорад, чиптаи ройгон диҳед.",
        ),
        "All languages": ("Все языки", "Ҳамаи забонҳо"),
        "All levels": ("Все уровни", "Ҳамаи сатҳҳо"),
        "Application received. We'll reply by email within two weeks.": (
            "Заявка получена. Ответим по почте в течение двух недель.",
            "Ариза қабул шуд. Дар давоми ду ҳафта ба почта ҷавоб медиҳем.",
        ),
        "Back to the program": ("Назад к программе", "Бозгашт ба барнома"),
        "Cannot afford a ticket or travel?": (
            "Не можете оплатить билет или дорогу?",
            "Имкони пардохти чипта ё сафар надоред?",
        ),
        "City you travel from": ("Город, откуда вы едете", "Шаҳре, ки аз он меоед"),
        "Coming up": ("Далее", "Дар пеш"),
        "Estimated travel cost, if any": (
            "Примерная стоимость дороги, если есть",
            "Хароҷоти тахминии сафар, агар бошад",
        ),
        "Even snow leopards get lost sometimes. Let's go back to base camp.": (
            "Даже снежные барсы иногда теряются. Вернёмся в базовый лагерь.",
            "Ҳатто барфакон гоҳе гум мешаванд. Биёед ба лагери асосӣ баргардем.",
        ),
        "Every ticket includes all talks and workshops, lunch, tea all day, stickers and your personal suzani badge.": (
            "В каждый билет входят все доклады и воркшопы, обед, чай весь день, стикеры и ваш личный бейдж с сюзане.",
            "Ҳар чипта ҳамаи маърӯзаҳо ва семинарҳо, хӯроки нисфирӯзӣ, чой тамоми рӯз, стикерҳо ва бейҷи шахсии сӯзаниро дар бар мегирад.",
        ),
        "Filter": ("Фильтр", "Филтр"),
        "For people paying for themselves.": (
            "Для тех, кто платит за себя сам.",
            "Барои онҳое, ки худашон пардохт мекунанд.",
        ),
        "For school pupils and students, with ID. Paid for in part by our sponsors.": (
            "Для школьников и студентов с документом. Частично оплачивают наши спонсоры.",
            "Барои хонандагон ва донишҷӯён бо ҳуҷҷат. Қисман аз ҷониби сарпарастони мо пардохт мешавад.",
        ),
        "I need a free ticket": ("Мне нужен бесплатный билет", "Ба ман чиптаи ройгон лозим аст"),
        "Keynote": ("Ключевой доклад", "Маърӯзаи асосӣ"),
        "Leave empty to use the default.": (
            "Оставьте пустым для значения по умолчанию.",
            "Барои қимати пешфарз холӣ гузоред.",
        ),
        "Money should not stop you from coming. We give free tickets and pay back travel costs against receipts after the event. Aid is based on need, not on your CV.": (
            "Деньги не должны вас останавливать. Мы даём бесплатные билеты и возмещаем дорогу по чекам после конференции. Помощь зависит от нужды, а не от резюме.",
            "Пул набояд шуморо боздорад. Мо чиптаи ройгон медиҳем ва хароҷоти сафарро баъд аз конфронс бо чек бармегардонем. Кӯмак аз рӯи эҳтиёҷ аст, на аз рӯи резюме.",
        ),
        "No news yet. Follow our Telegram channel to hear first.": (
            "Новостей пока нет. Подпишитесь на наш Telegram-канал, чтобы узнать первыми.",
            "Ҳоло хабаре нест. Ба канали Telegram-и мо обуна шавед, то аввал бишнавед.",
        ),
        "Nothing on stage right now.": ("Сейчас на сцене никого.", "Ҳоло дар саҳна касе нест."),
        "Now on stage": ("Сейчас на сцене", "Ҳоло дар саҳна"),
        "Page not found": ("Страница не найдена", "Саҳифа ёфт нашуд"),
        "Send application": ("Отправить заявку", "Ариза фиристед"),
        "Talks appear here after the call for talks closes. Want to be on this list?": (
            "Доклады появятся здесь после окончания приёма заявок. Хотите оказаться в списке?",
            "Маърӯзаҳо баъд аз анҷоми қабули пешниҳодҳо дар ин ҷо пайдо мешаванд. Мехоҳед дар ин рӯйхат бошед?",
        ),
        "Talks in Tajik, Russian and English. Filter by language and level.": (
            "Доклады на таджикском, русском и английском. Фильтруйте по языку и уровню.",
            "Маърӯзаҳо бо тоҷикӣ, русӣ ва англисӣ. Аз рӯи забон ва сатҳ филтр кунед.",
        ),
        "Tea break": ("Чайный перерыв", "Танаффуси чой"),
        "The program is on its way": ("Программа скоро будет", "Барнома дар роҳ аст"),
        "Ticket sales open soon. Follow our Telegram channel to hear first.": (
            "Продажа билетов скоро откроется. Подпишитесь на Telegram-канал, чтобы узнать первыми.",
            "Фурӯши чипта ба наздикӣ оғоз мешавад. Ба канали Telegram обуна шавед, то аввал бишнавед.",
        ),
        "Type your name. Python weaves a rosette that belongs only to you. The same pattern is printed on your conference badge.": (
            "Введите имя. Python соткёт розетку, которая принадлежит только вам. Тот же узор будет на вашем бейдже.",
            "Номи худро нависед. Python гуле мебофад, ки танҳо аз они шумост. Ҳамин нақш дар бейҷи шумо чоп мешавад.",
        ),
        "Weave": ("Соткать", "Бофтан"),
        "When your employer pays. You help pay for student tickets.": (
            "Когда платит работодатель. Вы помогаете оплатить студенческие билеты.",
            "Вақте ки корфармо пардохт мекунад. Шумо дар пардохти чиптаҳои донишҷӯён кӯмак мекунед.",
        ),
        "Why do you want to come?": ("Почему вы хотите приехать?", "Чаро омадан мехоҳед?"),
    }
)

# ── Attend menu, visitors page, home doors (DRAFT, proofread) ──
DRAFTS.update(
    {
        "Attend": ("Посетителям", "Барои меҳмонон"),
        "Attend PyCon Tajikistan": (
            "Посетителям PyCon Tajikistan",
            "Барои меҳмонони PyCon Tajikistan",
        ),
        "Everything a visitor needs: tickets, financial aid, the Code of Conduct and a guide to Tajikistan.": (
            "Всё для посетителей: билеты, финансовая помощь, кодекс поведения и гид по Таджикистану.",
            "Ҳама чиз барои меҳмонон: чиптаҳо, кӯмаки молиявӣ, кодекси рафтор ва роҳнамо дар бораи Тоҷикистон.",
        ),
        "One day of talks, workshops and green tea in Dushanbe. Here is everything you need as a visitor.": (
            "Один день докладов, воркшопов и зелёного чая в Душанбе. Здесь всё, что нужно посетителю.",
            "Як рӯзи маърӯзаҳо, семинарҳо ва чойи кабуд дар Душанбе. Ин ҷо ҳама чизест, ки ба меҳмон лозим аст.",
        ),
        "When": ("Когда", "Кай"),
        "Where": ("Где", "Дар куҷо"),
        "Seats": ("Мест", "Ҷойҳо"),
        "Tajik, Russian and English": (
            "Таджикский, русский и английский",
            "Тоҷикӣ, русӣ ва англисӣ",
        ),
        "Student, personal and supporter tickets. Every ticket includes lunch and tea all day.": (
            "Студенческие, личные и билеты поддержки. В каждый билет входят обед и чай весь день.",
            "Чиптаҳои донишҷӯӣ, шахсӣ ва дастгирӣ. Ҳар чипта хӯроки нисфирӯзӣ ва чойро тамоми рӯз дар бар мегирад.",
        ),
        "Free tickets and travel support for people who could not come otherwise.": (
            "Бесплатные билеты и помощь с дорогой для тех, кто иначе не смог бы приехать.",
            "Чиптаҳои ройгон ва кӯмак барои сафар ба онҳое, ки бе он омада наметавонистанд.",
        ),
        "First time here? Dushanbe, food, culture and trips around the conference.": (
            "Впервые здесь? Душанбе, еда, культура и поездки вокруг конференции.",
            "Бори аввал ин ҷо? Душанбе, таом, фарҳанг ва сафарҳо атрофи конфронс.",
        ),
        "How we keep PyCon friendly and safe, and how to get help.": (
            "Как мы делаем PyCon дружелюбным и безопасным и где получить помощь.",
            "Чӣ тавр мо PyCon-ро дӯстона ва бехатар нигоҳ медорем ва аз куҷо кӯмак гирифтан мумкин аст.",
        ),
        "Talks and workshops, filtered by language and level.": (
            "Доклады и воркшопы с фильтром по языку и уровню.",
            "Маърӯзаҳо ва семинарҳо бо филтр аз рӯи забон ва сатҳ.",
        ),
        "Beginners are welcome. Many talks are made for people who are just starting with Python.": (
            "Новичкам рады. Многие доклады рассчитаны на тех, кто только начинает с Python.",
            "Навкорон хуш омадед. Бисёр маърӯзаҳо барои онҳое ҳастанд, ки Python-ро нав оғоз мекунанд.",
        ),
        "Bring a laptop if you join a workshop.": (
            "Возьмите ноутбук, если идёте на воркшоп.",
            "Агар ба семинар равед, ноутбук гиред.",
        ),
        "Want to give a 5-minute lightning talk? Sign up at the registration desk on the day.": (
            "Хотите выступить с 5-минутным блиц-докладом? Запишитесь на стойке регистрации в день конференции.",
            "Мехоҳед маърӯзаи 5-дақиқаӣ кунед? Дар рӯзи конфронс дар мизи бақайдгирӣ номнавис шавед.",
        ),
        "Questions? Write to": ("Вопросы? Пишите на", "Савол доред? Нависед ба"),
        "Find your way in": ("С чего начать", "Аз куҷо оғоз кунед"),
        "Visitors": ("Посетителям", "Меҳмонон"),
        "Tickets, financial aid and a guide to Tajikistan.": (
            "Билеты, финансовая помощь и гид по Таджикистану.",
            "Чиптаҳо, кӯмаки молиявӣ ва роҳнамо дар бораи Тоҷикистон.",
        ),
        "Speakers": ("Спикерам", "Маърӯзачиён"),
        "Share what you know. First-time speakers welcome.": (
            "Поделитесь знаниями. Ждём и тех, кто выступает впервые.",
            "Донишатонро нақл кунед. Маърӯзачиёни навкор хуш омадед.",
        ),
        "Packages, booths and how to reach the organizers.": (
            "Пакеты, стенды и как связаться с организаторами.",
            "Бастаҳо, стендҳо ва тарзи тамос бо ташкилотчиён.",
        ),
        "Volunteers": ("Волонтёрам", "Волонтёрон"),
        "Join the crew that runs the first PyCon here.": (
            "Присоединяйтесь к команде, которая проводит первый PyCon здесь.",
            "Ба дастае ҳамроҳ шавед, ки аввалин PyCon-ро дар ин ҷо мегузаронад.",
        ),
    }
)
