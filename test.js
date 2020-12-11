function largestOfFour(arr) {
  const largestArray = [];
  const largestNumInSubArr = 0;

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (largestNumInSubArr < arr[i][j]) {
        largestNumInSubArr = arr[i][j]
        largestArray.push(largestNumInSubArr)
      }
    }
  }

   return largestArray;
}
console.log(largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]));

