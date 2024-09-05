# E-Commerce Web App

A simple E-Commerce web application built using React and Redux.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## Introduction

This project is a E-Commerce web application where users can view, add, and manage products. 
The data can be add and fetched in real time and tackle to fetch information from API in Redux
It's built using React for the frontend and utilizes Redux for state management.

## Features

- View a list of products
- Add new products
- Edit existing products
- Delete products
- Add products to the shopping cart

## Installation
- Clone the repository:

 ```
git clone https://github.com/Abhoredaj/eCommerce.git
```

- Install dependencies:

```
cd eCommerce
npm install
```

## Usage

-- Start the development server:

```
npm start
```

Open your browser and navigate to http://localhost:3000 to view the application.

## Folder Structure

```
C:.
│   package-lock.json
│   package.json
│   README.md
│
├───public
│       favicon.ico
│       icons8-cart-64.ico
│       index.html
│       logo192.png
│       logo512.png
│       manifest.json
│       robots.txt
│
└───src
    │   App.css
    │   App.js
    │   App.test.js
    │   index.css
    │   index.js
    │   logo.svg
    │   reportWebVitals.js
    │   setupTests.js
    │   store.js
    │
    ├───components
    │   ├───cart
    │   │       cartcard.js
    │   │
    │   ├───home
    │   │       AddButton.js
    │   │       card.js
    │   │       form.js
    │   │       SortButton.js
    │   │       StarRating.js
    │   │
    │   ├───loader
    │   │       loader.js
    │   │
    │   └───navbar
    │           navbar.js
    │
    ├───pages
    │       cart.js
    │       error.js
    │       home.js
    │       productdetails.js
    │
    ├───redux
    │   ├───middlewares
    │   │       loggerMiddleware.js
    │   │
    │   └───reducers
    │           productReducer.js
    │
    └───styles
            card.module.css
            form.module.css
            navbar.module.css
            ProductDetail.module.css

```

## Technologies Used
- React
- Redux
- React Router
...

## Contributing
Contributions are welcome! Feel free to open issues and pull requests.
Feel free to add or modify sections based on your project's specifics. If you have additional technologies, dependencies, or specific instructions for setting up the project, include them in the relevant sections.






