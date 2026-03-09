# Question & Answer

## 1. What is the difference between var, let, and const?

- **var** is a keyword which is used to declaring variable 
     - it is function scoped
     - can be re-declared and also can be updated
     - **Example**:
      ```javascript
        var name = "mira";
        var name = "Raj"; // redeclared
        name = "Ali";
- **let** keyword is a modern and flexible way to declare variables
    - Block scoped
    - Cannot be re-declared
    - Can be updated
    - **Example**:
      ```javascript
        let age = 20;
        age = 25; // allowed
        // let age = 30; // Error
- **const** declares block-scoped local variables. 
    - The value of a constant can't be changed
    - Block scoped
    - Cannot be re-declared
    - Cannot be updated
    - Must be initialized when declared
    - **Example**:
      ```javascript
        const PI = 3.14;
        // PI = 3.1416 

## 2. What is the spread operator (...)?

- **spread operator (...)** expand or copy all elements of an array or object 
     - Spread With Arrays : It expands the elements of an array.
       - **Example** :
        ```javascript
        const numbers = [1, 2, 3];
        const newNumbers = [...numbers]; // it will copy all element 
        console.log(newNumbers); // [1, 2, 3]
        // if i now push new number in "numbers" array it will take but now "numbers" and "newNumbers" array both are different
        numbers.push (8);
        console.log(numbers)
    - Spread with Objects : It expands the elements of an object.
      - **Example**:
        ```javascript
        const user = {name: "John", age: 25 };
        const newUser = {...user ,city: "London"};
        console.log(newUser);

## 3. What is the difference between map(), filter(), and forEach()?
- **map()** is used to transform each element of an array.
  - It returns a **new array**
  - The number of elements remains the same
  - **Example:**
   ```javascript
  const numbers = [1, 2, 3];
  const doubled = numbers.map(num => num * 2);
  console.log(doubled); // [2, 4, 6]

- **filter()** is used to select elements based on a condition.
  - It returns a new array
  - Only elements that match the condition are included
  - **Example:**
    ```javascript
    const numbers = [1, 2, 3, 4];
    const evenNumbers = numbers.filter(num => num % 2 === 0);
    console.log(evenNumbers); // [2, 4]

- **forEach()** is used to run a function for each element in an array.
    - It does not return a new array
    - It is mainly used to perform actions like print, or update something
    - **Example:**
      ```javascript 
       const numbers = [1, 2, 3];
       numbers.forEach(num => {
       console.log(num);
       });

## 4. What is an arrow function?

- **Arrow function** is a shorter syntax for writing functions in JavaScript.
   - It was introduced in **ES6**.
   - It uses the `=>` symbol instead of the `function` keyword.
   - **Example:**
    ```javascript
       // Normal function we call
       function add(a, b) {
       return a + b;
       }

       // Arrow function
       const add = (a, b) => {
       return a + b;
       };

## 5. What are template literals?

- **Template literals** are a way to write strings in JavaScript using backticks `` ` ``
  instead of single quote (' ') or double (" ") quotes.
    - They were introduced in **ES6**.
    - They allow **embedding variables and expressions** inside a string using `${}`.
    - **Example:**
         ```javascript
            const name = "Mira";
            const age = 20;
            const message = `My name is ${name} and I am ${age} years old.`;
            console.log(message);