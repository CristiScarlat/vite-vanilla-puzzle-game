export const fisherYatesShuffle = (arr) => {
  const newArr = Array.from(arr);
  for (let i = newArr.length -1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i+1));
    let k = newArr[i];
    newArr[i] = newArr[j];
    newArr[j] = k;
  }
  return newArr
}