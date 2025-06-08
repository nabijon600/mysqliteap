import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  uz: {
    translation: {
      "Home": "Asosiy",
      "Settings": "Sozlamalar",
      "Name": "Ism",
      "Email": "Elektron pochta",
      "Save": "Saqlash",
      "Update": "O‘zgartirish",
      "Delete": "O`chirish",
      "Back": "Ortga qaytish",
      "ItemModal": "Ma'lumot oynasi",
      "EnterName": "Ismingizni kiriting",
      "EnterEmail": "Email manzilingizni kiriting",
      "InvalidEmail": "Iltimos, to'g'ri email manzil kiriting.",
      "UserAdded": "Foydalanuvchi muvaffaqiyatli qo'shildi!",
      "SomethingWentWrong": "Nimadir xato ketdi!",
      "PasSeria": "Pasport seriya",
      "PasNumber": "Pasport raqam",
      "Adress": "Manzil",
      "Phone": "Telefon raqam",
    },
  },
  en: {
    translation: {
      "Home": "Home",
      "Settings": "Settings",
      "Name": "Name",
      "Email": "Email",
      "Save": "Save",
      "Update": "Update",
      "Delete": "Delete",
      "Back": "Back",
      "ItemModal": "Item Modal",
      "EnterName": "Enter your name",
      "EnterEmail": "Enter your email",
      "InvalidEmail": "Please enter a valid email address.",
      "UserAdded": "User added successfully!",
      "SomethingWentWrong": "Something went wrong!",
      "PasSeria": "Pasport seria",
      "PasNumber": "Passport number",
      "Adress": "Adress",
      "Phone": "Phone",
    },
  },
  ru: {
    translation: {
      "Home": "Дом",
      "Settings": "Настройки",
      "Name": "Имя",
      "Email": "Эл. почта",
      "Save": "Сохранить",
      "Update": "Обновить",
      "Delete": "Удалить",
      "Back": "Назад",
      "ItemModal": "Модальное окно",
      "EnterName": "Введите ваше имя",
      "EnterEmail": "Введите ваш email",
      "InvalidEmail": "Пожалуйста, введите корректный email.",
      "UserAdded": "Пользователь успешно добавлен!",
      "SomethingWentWrong": "Что-то пошло не так!",
      "PasSeria": "Серия паспорта",
      "PasNumber": "Номер паспорта",
      "Adress": "Адрес",
      "Phone": "Телефон",
    },
  },
};

const LANGUAGE_KEY = 'language';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    resources,
    fallbackLng: 'en',
    lng: Localization.locale, // vaqtinchalik default
    interpolation: {
      escapeValue: false,
    },
  });

// Oxirgi tanlangan tilni AsyncStorage orqali yuklab sozlash
AsyncStorage.getItem(LANGUAGE_KEY).then(lang => {
  if (lang) {
    i18n.changeLanguage(lang);
  }
});

export default i18n;