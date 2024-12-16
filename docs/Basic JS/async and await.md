### **Async/Await in JavaScript: A Deep Dive**

---

#### **What is Async/Await?**

**`async/await`** is a syntactic sugar built on top of Promises that allows writing asynchronous code in a more readable, synchronous-like manner. Introduced in ECMAScript 2017 (ES8), `async/await` makes it easier to handle asynchronous operations without chaining `.then()` and `.catch()`.

---

### **Key Features of Async/Await**

1. **Async Functions**: 
   - Declared with the `async` keyword.
   - Always return a **Promise**.
   - The resolved value of the function becomes the value returned by the `async` function.

2. **Await Keyword**:
   - Used only inside `async` functions.
   - Pauses the execution of the function until the awaited `Promise` is resolved or rejected.

---

### **Basic Syntax**

#### **Async Function**

```javascript
async function fetchData() {
  return "Data loaded!"; // Implicitly returns a resolved Promise
}

fetchData().then(result => console.log(result)); // Output: "Data loaded!"
```

#### **Using Await**

```javascript
async function fetchData() {
  let promise = new Promise(resolve => setTimeout(() => resolve("Data fetched!"), 2000));
  let result = await promise; // Wait for the promise to resolve
  console.log(result); // Output: "Data fetched!"
}

fetchData();
```

---

### **Why Use Async/Await?**

1. **Improved Readability**: Avoids callback hell and simplifies promise chaining.
2. **Error Handling**: Errors can be handled using `try/catch` blocks.
3. **Sequential Execution**: Makes step-by-step execution easier to follow.

---

### **Async/Await in Action**

#### **Example 1: Fetching Data**

```javascript
async function fetchData() {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();
```

#### **Example 2: Simulating an API Request**

```javascript
async function apiRequest() {
  console.log("Request started...");

  let data = await new Promise(resolve =>
    setTimeout(() => resolve("API Response!"), 2000)
  );

  console.log(data);
}

apiRequest();
```

---

### **Understanding Async/Await Behind the Scenes**

- **Execution Context**:
  - When an `await` is encountered, the execution of the async function is paused.
  - The promise is resolved in the background, and the resolved value is returned.
  - Meanwhile, the main thread is free to execute other tasks.

- **Microtasks**:
  - Resolved promises are added to the **microtask queue**, ensuring that their callbacks are executed as soon as the current task completes.

Example:

```javascript
async function example() {
  console.log("Start");
  await Promise.resolve();
  console.log("End");
}
example();
console.log("Outside");

// Output:
// Start
// Outside
// End
```

---

### **Error Handling in Async/Await**

Errors in an `async` function can be caught using a `try/catch` block.

#### **Example: Handling Errors**

```javascript
async function fetchData() {
  try {
    let response = await fetch("https://invalid.url");
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}

fetchData();
```

---

### **Best Practices for Async/Await**

1. **Error Handling**:
   Always use `try/catch` blocks or `.catch()` for error handling.

2. **Avoid Blocking**:
   Use `await` only when necessary. For independent promises, use `Promise.all` to run them concurrently.

3. **Debugging**:
   Use tools like Chrome DevTools to debug async functions. Errors will point to the exact line, unlike traditional callbacks.

---

### **Common Patterns with Async/Await**

#### **1. Sequential vs Concurrent Execution**

- **Sequential Execution**: Each operation waits for the previous one to finish.

```javascript
async function sequential() {
  let result1 = await new Promise(resolve => setTimeout(() => resolve("One"), 1000));
  console.log(result1);

  let result2 = await new Promise(resolve => setTimeout(() => resolve("Two"), 1000));
  console.log(result2);
}

sequential();
```

- **Concurrent Execution**: Run multiple promises at the same time using `Promise.all`.

```javascript
async function concurrent() {
  let promise1 = new Promise(resolve => setTimeout(() => resolve("One"), 1000));
  let promise2 = new Promise(resolve => setTimeout(() => resolve("Two"), 1000));

  let results = await Promise.all([promise1, promise2]);
  console.log(results); // ["One", "Two"]
}

concurrent();
```

---

#### **2. Looping with Async/Await**

Using `for` loops with async/await:

```javascript
async function loopExample() {
  let items = [1, 2, 3];

  for (let item of items) {
    let result = await new Promise(resolve =>
      setTimeout(() => resolve(item * 2), 1000)
    );
    console.log(result);
  }
}

loopExample();
```

---

### **Semi-Project: Weather App**

#### **Objective**:
Create a small app where:
- Users can input a city name.
- Fetch the current weather using the OpenWeather API.
- Display the weather or an error message.

---

#### **Steps**:

1. **HTML**:

```html
<div id="app">
  <input type="text" id="city" placeholder="Enter city name" />
  <button id="fetchWeather">Get Weather</button>
  <div id="result"></div>
</div>
```

2. **JavaScript**:

```javascript
async function getWeather(city) {
  const apiKey = "your_api_key"; // Replace with your OpenWeather API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error("City not found!");
    let data = await response.json();

    return `Weather in ${data.name}: ${data.weather[0].description}, Temperature: ${
      data.main.temp - 273.15
    }°C`;
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

document.getElementById("fetchWeather").addEventListener("click", async () => {
  const city = document.getElementById("city").value;
  const result = document.getElementById("result");

  result.textContent = "Loading...";
  let weather = await getWeather(city);
  result.textContent = weather;
});
```

---