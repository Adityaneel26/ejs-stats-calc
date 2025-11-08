const express = require("express");
const app = express();
const port = 3000;

// To parse form data
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { results: null });
});

// START: New POST Route
app.post("/calculate", (req, res) => {
  const numbersStr = req.body.numbers;

  // 1. Convert string to array of numbers and sort it
  const nums = numbersStr.split(',')    // "1,5,2" -> ["1", "5", "2"]
                       .map(Number)     // ["1", "5", "2"] -> [1, 5, 2]
                       .filter(n => !isNaN(n)) // Remove any bad input
                       .sort((a, b) => a - b); // [1, 5, 2] -> [1, 2, 5]

  if (nums.length === 0) {
    return res.render("index", { results: null }); // or an error
  }

  // 2. Calculate Mean
  const sum = nums.reduce((total, num) => total + num, 0);
  const mean = sum / nums.length;

  // 3. Calculate Median
  const mid = Math.floor(nums.length / 2);
  let median;
  if (nums.length % 2 === 0) {
    // Even length
    median = (nums[mid - 1] + nums[mid]) / 2;
  } else {
    // Odd length
    median = nums[mid];
  }

  // 4. Send data back to the EJS page
  const results = {
    mean: mean.toFixed(2), // 2 decimal places
    median: median,
    originalInput: numbersStr
  };

  res.render("index", { results: results });
});
// END: New POST Route

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});