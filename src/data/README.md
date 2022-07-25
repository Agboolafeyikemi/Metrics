# TUNE Front End Coding Challenge

## The Setup

Two sets of data are attached that represent 30 days of impressions, conversions, and revenue, as well as the user accounts associated with the activity.

`users.json`

An array of user objects. Each user has an id, name, avatar, and occupation.

`logs.json`

Event information about the traffic. Each item has a type (either 'impression' or 'conversion'), date and time of the event, user ID of the account the event is related to, and any revenue associated.

## The Task

Write a client-side application that implements the attached mockup in the framework of your choice, using any libraries that are appropriate. The provided mockup is just a guide. Feel free to improve the design within the requirements:

* Each card should have the user's avatar, name, and occupation. For users with no image avatar, display the first letter of their first name in place of an image.

* Each card should display the sum of all impressions, conversions, and revenue.

* Each card should display a simple chart of of conversions per day.

## Bonus Items

* Implement the ability for the user to sort the cards by name and by total impressions, conversions, or revenue
* Write unit tests for testable portions of your code
