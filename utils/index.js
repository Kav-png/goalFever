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
  for (let i = 1; i < 7; i++) {
    const day = dayjs(today).add(i, "days").format("YYYY-MM-DD");
    dates.push(day);
  }
  return dates;
};

export const dateFetchWordFormat = () => {
  const today2 = dayjs();
  dates = [];
  dates.push(today2.format("MMM DD"));
  for (let i = 1; i < 7; i++) {
    const day = dayjs(today2).add(i, "days").format("MMM DD");
    dates.push(day);
  }
  return dates;
};

// removes emoji from the string and returns without emojis to avoid server errors
function removeEmojis(str) {
  var emojiRE = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu;
  return str.replace(emojiRE, "");
}
