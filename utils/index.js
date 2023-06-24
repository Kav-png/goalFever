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
export function getCurrentDate(separator = "") {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${year}-${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}-${date}`;
}

export function getNextDate({ dayIncrement }) {
  let separator = "-";
  let newDate = new Date();
  let date = newDate.getDate() + dayIncrement;
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  if (date > 31) {
    date = 1;
    month = month + 1;
  }
  if (month > 12) {
    month = 1;
    year = year + 1;
  }

  return `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${date}`;
}
