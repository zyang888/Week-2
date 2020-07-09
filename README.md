# Week 2

This week is a deeper dive into Express API development using MongoDB for data storage. The focus of this week will be on basic CRUD operations.

## Learning Objectives

At the end of this week, a student should:
- be able to create a MongoDB model
- be able to create basic CRUD HTTP routes for an entity
- be comfortable writing tests with 100% coverage for CRUD routes

## The assignment

The assignment this week is designed to introduce you to MongoDB and its basic functions. We will use MongoDB as the data source for two sets of CRUD routes within an Express server. We'll use these tools to write a Calendar API.

### Getting started

1. Make sure you have a recent version of [Node.js](https://nodejs.org/en/download/) installed on your computer. I am using Node v12.16, but anything above 12 will be fine.
2. Ensure you have git and github set up on your computer. If you do not, please follow this guide: https://help.github.com/en/github/getting-started-with-github.
3. Fork this repository and clone it locally. 
4. In your terminal, from inside this project directory, run `npm install` to install the project dependencies.
5. Download and install [MongoDB](https://www.mongodb.com/try/download/community). This project uses the default MongoDB configuration. If you run Mongo in a non-standard way you may need to update the configuration in `index.js` to match. If you have issues, reference the [Mongoose Connection Guide](https://mongoosejs.com/docs/connections.html).
6. Run `npm start` to start your local server. You should see a logged statement telling you `Server is listening on http://localhost:5000`.
7. Download [Postman](https://www.postman.com/) or an API client of your choice. Browse the various endpoints contained in this project. Practice calling all of them and getting 200 HTTP responses.
8. Run the unit tests of this project: `npm test`. Your test output should end in something like this:
```
Test Suites: 1 failed, 1 total
Tests:       3 failed, 4 passed, 7 total
```

### API definition

We are building a simple calendar API. There are two entities we are creating CRUD routes for: Calendars and Events.

* Calendars
  * GET /calendars/:id - returns calendar with provided id
  * POST /calendars - creates a calendar using the JSON in the request body
  * PUT /calendars/:id - updates calendar with the provided id to have the data in the request body
  * DELETE /calendars/:id - deletes a calendar with the provided id
  * GET /calendars - returns an array of all calendars
* Events
  * GET /calendars/:id/events/:id - returns event with provided id from specified calendar 
  * POST /calendars/:id/events - creates an event for the specified calendar using JSON from the request body
  * PUT /calendars/:id/events/:id - updates event with provided id from specified calendar to have data from request body
  * DELETE /calendars/:id/events/:id - deletes event with provided id from specified calendar
  * GET /calendars/:id/events - get an array for all the events for the specified calendar
    * Optional query parameters `from` and `to` to specify start and end dates, inclusively, that the returned events should be contained within

Calendar entity:
```js
{
  "name": string
}
```
Event entity:
```js
{
  "name": string,
  "date": Date
}
```

### Your Task

The desired API routes are only partially completed at the start. Your task will be to complete the API to the specifications.

There are two phases to the work:
1. As you can see, the unit tests for this project in `routes/calendars.test.js` are not all passing. However, the tests are all complete and do not need to be touched. There are three API routes that you need to define in `calendars.js`. Once you have completed your routes all of the calendar tests should be passing.
2. You need to complete the Event API routes as defined below, starting from scratch. Additionally, you should write a complete test suite for the Event API, similar to the one in `routes/calendars.test.js`. When you run `npm test` you should see a table with the test coverage for your code. You should have 100% coverage.


### Grading

Component | Points
--------- | --------
All tests, as originally given, passing in `routes/calendars.tests.js`. | 30
Routes for Events API completed as specified | 30
100% test coverage of Events routes | 20
Clear, organized project structure | 20

### Submission

- Create a pull request (PR) from your repository to the master branch of this repository. Make your name the title of the PR. 
- Continuous Integration is handled using Github Actions. This will automatically run your tests and show the results on your PR. If you see a red X and a message saying `All checks have failed` then you will not receive full credit. Ensure all tests are passing in order to receive full marks.