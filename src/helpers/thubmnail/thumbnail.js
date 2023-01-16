const url_thumbnail = "http://127.0.0.1:8000/storage/";
export const thumbnail = (x) => {
  return x == null
    ? "/images/avatar.jpg"
    : x.includes("https")
    ? x
    : url_thumbnail + x;
};
