# Система мониторинга климатических параметров с помощью BLE датчиков

Этот проект представляет собой систему мониторинга температуры и влажности с использованием датчиков Bluetooth Low Energy (BLE). Данные собираются в реальном времени и отображаются на веб-интерфейсе с помощью различных технологий и инструментов, включая Firebase для хранения данных и визуализацию с помощью библиотеки Chart.js.

## Особенности

- **Мониторинг данных в реальном времени**: Система получает данные с BLE датчиков и отображает последние показания температуры и влажности на веб-странице в реальном времени.
- **Визуализация данных**: Для отображения изменений температуры и влажности используются интерактивные графики, созданные с помощью библиотеки `Chart.js`.
- **Анализ исторических данных**: Пользователи могут фильтровать данные по времени, чтобы анализировать изменения в окружающей среде за выбранный период.
- **Интеграция с мобильным приложением**: Система работает в связке с мобильным приложением для сбора и отправки данных, а веб-интерфейс служит для их отображения.
- **Пользовательский интерфейс**: Простой интерфейс для отображения таблиц с данными и графиков для анализа в реальном времени.

## Технологии

Проект использует следующие технологии и инструменты:

- **Firebase**: В качестве облачного хранилища данных используется Firebase Firestore. Это позволяет хранить и извлекать данные о температуре и влажности, собранные с датчиков BLE. Firebase предоставляет возможность работать с базой данных в реальном времени, что идеально подходит для задач мониторинга.
- **Chart.js**: Для визуализации данных используется библиотека `Chart.js`, которая позволяет строить интерактивные графики. Графики отображают изменения температуры и влажности за заданный период времени.
- **JavaScript (ES6)**: Для логики работы с данными используется современный JavaScript (ES6), включая модули, асинхронные операции с Firebase и обработку событий.
- **HTML/CSS**: Для создания веб-страниц и стилизации используется HTML5 и CSS. Интерфейс прост и адаптирован для разных устройств (мобильных и десктопных).
- **Bluetooth Low Energy (BLE)**: Для сбора данных используется технология Bluetooth Low Energy, которая позволяет передавать данные с датчиков в режиме реального времени.

## Структура проекта

Проект состоит из нескольких основных компонентов:

1. **HTML страницы**:
    - `index.html` — Главная страница, на которой отображаются данные в реальном времени.
    - `graphics.html` — Страница с графиками температуры и влажности.
    - `statistic.html` — Страница для анализа исторических данных с возможностью выбора периода времени.
    - `info.html` — Страница с информацией о проекте, часто задаваемыми вопросами и ссылкой на мобильное приложение.

2. **JavaScript файлы**:
    - `script.js` — Основной скрипт для отображения данных в реальном времени и обработки их с Firebase.
    - `graphics.js` — Скрипт для загрузки и отображения данных на графиках с использованием Chart.js.
    - `statistic.js` — Скрипт для работы с историческими данными, позволяющий фильтровать их по времени и отображать статистику.

3. **CSS стили**:
    - `styles.css` — Стили для веб-интерфейса. Все элементы имеют адаптивную верстку для разных экранов и устройств.

##Использование
###Веб-приложение состоит из нескольких страниц:
  - Главная: Отображает последние данные с датчиков и данные в реальном времени.
  - Графики: Показывает графики с изменениями температуры и влажности, построенные с помощью библиотеки Chart.js.
  - Статистика: Позволяет пользователям просматривать исторические данные с возможностью выбора периода времени для анализа.
  - Информация: Содержит подробности о проекте, описание используемых технологий и часто задаваемые вопросы.

Данные обновляются каждые 15 секунд для реального времени и последние записи, а исторические данные можно загружать, выбирая дату начала и окончания.

## Планы по развитию
  1. Поддержка дополнительных параметров: В будущем планируется добавление других параметров, таких как уровень кислорода и других экологических факторов.
  2. Дополнительные функции статистики: В проект будут добавлены новые графики и расширенная статистика, например, максимальные и минимальные значения, средние показатели за выбранный период времени.
