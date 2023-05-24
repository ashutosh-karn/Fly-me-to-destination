/* We can solve this problem by greedy approach.
    it can be done in Time O(n) & space O(1).

    Steps:
    1. we will take a variable 'planes' to keep track of the no. of planes hired.
    2. start from the first airport 'index 0' and initialize a variable 'currentFuel' to store the fuel units available at the current airport &
        Set it to the value at index 0 in the given array.
    3. traverse airport from index 1 to n-1 
    4. at every airport check if currFuel is > 0, if it is, make currentFuel-- & if its not we need to hire another plane & update the currentFuel to new value
    5. after traversing all airports check if currntFuel >= 0, if it is return value of planes &
        if it is not return -1
*/

//CODE WITH GREEDY APPROACH

function minimumPlanesRequired(array) {
  let planes = 0;
  let currentFuel = array[0];

  for (let i = 1; i < array.length; i++) {
    if (currentFuel <= 0) {
      return -1; //it will return -1 if currentFuel becomes 0 or negative
    }

    currentFuel--; //decrement currentFuel by 1 for flying to the next airport
    //it will check if there is any plane with more fuel
    if (array[i] > currentFuel) {
      planes++; // take a new plane
      currentFuel = array[i]; // it will update the currentFuel with the new plane's fuel
    }
  }

  return planes;
}

//checking with few examples given in the task
const array1 = [2, 1, 2, 3, 1];
console.log(minimumPlanesRequired(array1)); // Output: 2

const array2 = [1, 6, 3, 4, 5, 0, 0, 0, 6];
console.log(minimumPlanesRequired(array2)); // Output: 3







//It can also be done using Dynamic programming

/*
There is another approach to solve this problem known as the "dynamic programming" approach. 
The dynamic programming approach breaks down the problem into smaller subproblems and solves them iteratively, 
building up to the final solution.
It takes Time of O(n^2) & space O(n)

Steps:
1. Initialize a dp array of the same length as the input array, filled with large values to represent uninitialized values.
2. set the 1st element of dp array to 0 (no planes required to reach 1st airport)
3. iterate from 2nd airport to last airport 'n-1'
4. for each airport 'i' consider every 'j' airport
5. check if it is possible to reach i from j with that fuel. 'j + array[j] >= i'
6. if it is possible, update the dp array at index i
7. after completing, check if the last value in the dp array is still that largest value,
    if it is means it is not possible to reach the last airport, return -1
8. if it is not the large value then return it.
*/


//CODE - DP

function minimumPlanesRequired(array) {
    const n = array.length;
    const dp = new Array(n).fill(Infinity); // Initialize dp array with Infinity values
    dp[0] = 0; // Minimum planes required to reach the first airport is 0
  
    for (let i = 1; i < n; i++) {
      for (let j = 0; j < i; j++) {
        if (j + array[j] >= i) {
          dp[i] = Math.min(dp[i], dp[j] + 1);
        }
      }
    }
  
    if (dp[n - 1] === Infinity) {
      return -1;
    } else {
      return dp[n - 1];
    }
  }
  
  // Example usage:
  const array11 = [2, 1, 2, 3, 1];
  console.log(minimumPlanesRequired(array11)); // Output: 2
  
  const array22 = [1, 6, 3, 4, 5, 0, 0, 0, 6];
  console.log(minimumPlanesRequired(array22)); // Output: 3
  

