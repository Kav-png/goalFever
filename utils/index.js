import dayjs from "dayjs";

export const checkImageURL = (url) => {
  if (!url) return false;
  else {
    const pattern = new RegExp(
      "^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$",
      "i"
    );
    return pattern.test(url);
  }
};
// Check Image URL Function from online ( youtube )

export const dateFetch = () => {
  const today = dayjs();
  dates = [];
  dates.push(today.format("YYYY-MM-DD"));
  for (let i = 1; i < 5; i++) {
    const day = dayjs(today).add(i, "days").format("YYYY-MM-DD");
    dates.push(day);
  }
  return dates;
};
