import { configure } from "vee-validate";
import { setLocale } from "@vee-validate/i18n";
import { localize } from "@vee-validate/i18n";
import en from "@vee-validate/i18n/dist/locale/en.json ";
import ka from "@vee-validate/i18n/dist/locale/ka.json ";

configure({
  generateMessage: localize({
    en: {
      ...en,
      messages: {
        required: "This field is required",
        email: "This input is not in email format",
        min: "{field} must have at least 0:{min} symbols",
        max: "{field} must have max. 15 letters",
        lowercase: "{field} must have only lowercase letters",
        confirmed: "{field} doesn't match",
      },
      names: {
        username: "Username",
        password: "Password",
        email: "Email",
        password_confirmation: "Password confirmation",
      },
    },
    ka: {
      ...ka,
      messages: {
        required: "გთხოვთ შეავსოთ მოცემული ველი",
        email: "ტექსტი არ აკმაყოფილებს მეილის ფორმატს",
        min: "{field} უნდა შეიცავდეს მინ: 0:{min} სიმბოლოს",
        max: "{field} უნდა შეიცავდეს მაქს: 0:{max} სიმბოლოს",
        lowercase: "{field} უნდა შეიცავდეს მხოლოდ დაბალ ასოებს",
        confirmed: "{field} არ ემთხვევა პაროლს",
      },
      names: {
        password: "პაროლი",
        username: "სახელი",
        email: "მეილი",
        password_confirmation: "პაროლის დამტკიცება",
      },
    },
  }),
});

setLocale(localStorage.getItem("locale") || "en");
