const numberOfLibs = 6;

const generateRandomNumber = () => {
  return Math.ceil(Math.random() * numberOfLibs);
};

const generateUniqueRandomNumber = (oldRandomNumber, newRandomNumber) => {
  // if the same, run function for another try at getting new number
  if (oldRandomNumber === newRandomNumber) {
    newRandomNumber = Math.ceil(Math.random() * numberOfLibs);
    generateUniqueRandomNumber(oldRandomNumber, newRandomNumber);
  }
  return newRandomNumber;
};


export { generateRandomNumber, generateUniqueRandomNumber };