<!-- Answers to the Short Answer Essay Questions go here -->

1.  In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?
    In brief, `before` is run once before all the tests in a describe and `after` is run once after all the tests in a describe, whereas `beforeEach` is run before each test in a describe, and `afterEach` after each test. Which one you want to use depends on your actual test.

2.  What is the point of Test Driven Development? What do you personally think about this approach?
    The point of Test Driven Development is to test your code as you are coding to make sure that it is all in proper working order. I personally think that it is a great thing to do. You want to make sure that the block of code you just wrote works properly before you have your whole project coded and find out that its not working. It takes a little bit more time to code out your tests but will save you time in the long run because you will know where your mistakes and errors are as you code vs coding it all out and then trying to debug.

3.  What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?
    A test spy is a function that records arguments, return value, the value of `this` and exception thrown (if any) for all its calls. There are two types of spies: Some are anonymous functions, while others wrap methods that already exist in the system under test.
