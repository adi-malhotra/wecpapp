# Image Search and Track User Activity

This is a full stack application, made as a part of **task** of **WeCreateProblems** *Summer'18 Internship* role for *Software Development Engineer*.

## Purpose

On appending a string to *http://localhost:3000*, it displays 5 images related to that string with labels.

It tracks **hover** and **click** events on the images.

On appending */admin* to the already modified URL, it displays the tracked activity such as timestamps of hover and click for respective images in the form of a table.


## Getting Started

Inside *config/database.js*, change the following line:
```
database: 'mongodb://localhost:27017/aditya'
```
to the name of the database you will create in MongoDB as follows:
```
database: 'mongodb://localhost:27017/YOUR_DATABASE_NAME'
```
### Prerequisites

- **MongoDB**: Database used
- **Mongoose**: MongoDB Object Modeling Tool
- **NodeJS**: JavaScript run-time environment
- **Angular**: JavaScript framework

### Installing
Download [NodeJS](https://nodejs.org/en/download/) and run the following commands to check:
```
node --v
npm --v
```
After this, check into the project directory and run:
```
npm install
```
to install the dependencies.

### Running

```
npm start
```
or
```
npm install nodemon
nodemon
```

## Limitations

- Hover events occur quickly and it takes time for the request to complete.
- Presentation of images can be bettered.


## Authors

**Aditya Malhotra** - [LinkedIn](https://www.linkedin.com/in/adityamalhotra02/)
