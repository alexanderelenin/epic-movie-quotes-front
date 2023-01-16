import { defineRule } from "vee-validate";
import {
  required,
  email,
  min,
  max,
  alpha,
  confirmed,
} from "@vee-validate/rules";

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
defineRule("alpha", alpha);
defineRule("confirmed", confirmed);

defineRule("lowercase", (value) => {
  if (!/^[a-z0-9]+$/.test(value)) {
    return false;
  }
  return true;
});
defineRule("login", (value) => {
  if (
    !/^(?:[A-Z\d][A-Z\d_-]{5,10}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i.test(
      value
    )
  ) {
    return false;
  }
  return true;
});

defineRule("geo_film", (value) => {
  if (!/^[ა-ჰა-ჰ\s]/.test(value)) {
    return false;
  }
  return true;
});

defineRule("director_en", (value) => {
  if (!/^[a-z ,.'-]+$/i.test(value)) {
    return false;
  }
  return true;
});
defineRule("director_ka", (value) => {
  if (!/^[ა-ჰა–ჰ ,.'-]+$/i.test(value)) {
    return false;
  }
  return true;
});

defineRule("year", (value) => {
  if (value < 1910 || value > 2023) {
    return false;
  }
  return true;
});

defineRule("description_ka", (value) => {
  const regex = /^[ა-ჰა-ჰ0-9-_.,';?!:"\s]*$/;
  if (!regex.test(value)) {
    return false;
  }
  return true;
});
defineRule("description_en", (value) => {
  const regex = /^[a-zA-Z0-9-_.,';?!:"\s]*$/;
  if (!regex.test(value)) {
    return false;
  }
  return true;
});
