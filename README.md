<a id="english"></a>
## 🇬🇧 English

RentalCar 🚗
RentalCar is a car rental web application built with Next.js App Router and TypeScript. Users can browse available cars, filter the catalog, view vehicle details, and submit booking requests.
Features
- Home page: hero section with a View Catalog call to action.
- Car catalog: vehicles fetched from a REST API, with backend-powered filtering by brand, hourly price, and minimum/maximum mileage.
- Load More: paginated results powered by TanStack Query's useInfiniteQuery, preserving the selected filters.
- Car details: dedicated /catalog/[carId] page opened in a new browser tab from each card.
- Booking form: validated form that sends a booking request to the backend and displays success/error notifications.
- User experience: loading states, error handling, empty states, a light/dark theme toggle, and a Back to top button.
- SEO: page-specific metadata, including dynamic titles for individual cars.
- Responsive styling: CSS Modules for desktop, tablet, and mobile layouts.
  
  Tech Stack
- Next.js 16 (App Router)
- React 19 and TypeScript
- TanStack Query (useInfiniteQuery)
- Axios and REST API
- CSS Modules
- React Hook Form and Zod
- React Select
- React Hot Toast
- React Icons

Routes 
Route	              Description
/	                  Home page with a hero section
/catalog	          Searchable car catalog with Load More pagination
/catalog/[carId]	  Car information and booking form

Getting Started
Requirements: Node.js and npm.

1.Clone the repository: git clone git@github.com:Liliia-Fodorova/RENTAL-CAR.git
  cd RENTAL-CAR

2.Install dependencies:
  npm install

3.Start the development server:
  npm run dev

4.Open http://localhost:3000.

API
The application uses the RentalCar API for vehicle listings, available filter values, car details, and booking requests. Filtering and pagination are performed through API requests rather than only filtering the loaded cards in the browser.

Design
The interface is based on the RentalCar Figma design.

Deployment
Vercel: https://rental-car-sepia-seven.vercel.app/.

Author
Liliia Fodorova
GitHub: Liliia-Fodorova

Repository
https://github.com/Liliia-Fodorova/RENTAL-CAR




<a id="українська"></a>
## 🇺🇦 Українська

🚗 RentalCar

RentalCar — це вебзастосунок для пошуку та оренди автомобілів, розроблений із використанням Next.js, TypeScript та сучасних технологій фронтенд-розробки.Користувачі можуть переглядати доступні автомобілі, фільтрувати каталог, ознайомлюватися з характеристиками авто та надсилати заявки на оренду.

Проєкт реалізований відповідно до технічного завдання GoIT та дизайну у Figma.

✨ Основні можливості

- Головна сторінка — Hero-секція з кнопкою View Catalog для переходу до каталогу автомобілів.
- Каталог автомобілів — відображення доступних автомобілів, отриманих із бекенду.
- Фільтрація — пошук за брендом, ціною та діапазоном пробігу з перевіркою введених значень.
- Load More — поступове завантаження додаткових автомобілів за допомогою useInfiniteQuery із TanStack    Query з урахуванням активних фільтрів.
- Детальна сторінка автомобіля — окрема сторінка /catalog/[carId], яка відкривається в новій вкладці     після натискання Read more, фотографія, технічні характеристики, комплектація та умови оренди.
- Форма бронювання — надсилання заявки на бекенд та повідомлення про успішне відправлення.
- Світла та темна теми — можливість перемикання оформлення інтерфейсу.
- Back to Top — кнопка для повернення до початку сторінки.
- Адаптивний інтерфейс — підтримка різних розмірів екрана.

🛠 Технології

Next.js (App Router)
React
TypeScript
TanStack Query (useInfiniteQuery)
Axios
CSS Modules
React Select
React Hot Toast

📂 Сторінки застосунку

Маршрут              Призначення

/                    Головна сторінка
/catalog             Каталог автомобілів
/catalog/[carId]     Детальна інформація про автомобіл

🚀 Встановлення та запуск

1. Клонуйте репозиторій: git clone git@github.com:Liliia-Fodorova/RENTAL-CAR.git
2. Перейдіть до папки проєкту: cd RENTAL-CAR
3. Встановіть залежності: npm install
4. Запустіть сервер розробки: npm run dev
5. Відкрийте застосунок у браузері: http://localhost:3000

📖 Використання

1.На головній сторінці натисніть View Catalog.
2.Виберіть бренд, максимальну ціну або задайте діапазон пробігу.
3.Натисніть Search, щоб переглянути результати.
4.Використовуйте Load More для завантаження наступних автомобілів.
5.Натисніть Read more, щоб відкрити сторінку автомобіля в новій вкладці.
6.Заповніть форму бронювання та натисніть Send.

🔗 Корисні посилання
  GitHub: https://github.com/Liliia-Fodorova/RENTAL-CAR
  Live Demo: https://rental-car-sepia-seven.vercel.app/
  Swagger document: https://car-rental-api.goit.study/api-docs/#/

  👩‍💻 Автор

Liliia Fodorova
GitHub: Liliia-Fodorova
Проєкт створено в межах навчання веброзробці в GoIT.
