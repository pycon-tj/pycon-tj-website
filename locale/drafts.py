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
    "12 December 2026": ("12 декабря 2026", "12 декабри 2026"),
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
    "The capital. On 12 December the first PyCon in Tajikistan opens here.": (
        "Столица. 12 декабря здесь откроется первый PyCon в Таджикистане.",
        "Пойтахт. 12 декабр дар ин ҷо аввалин PyCon дар Тоҷикистон кушода мешавад.",
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
    "Welcome to Dushanbe": ("Добро пожаловать в Душанбе", "Ба Душанбе хуш омадед"),
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
