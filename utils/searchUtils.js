// searchUtils.js

// Function to sort by transfer value
export const sortByTransferValue = (data, ascending = true) => {
  return data.sort((a, b) => {
    if (ascending) {
      return a.market_value - b.market_value;
    } else {
      return b.market_value - a.market_value;
    }
  });
};

// Function to sort by age
export const sortByAge = (data, ascending = true) => {
  return data.sort((a, b) => {
    if (ascending) {
      return a.age - b.age;
    } else {
      return b.age - a.age;
    }
  });
};
