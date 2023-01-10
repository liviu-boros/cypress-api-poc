# Introduction

Welcome to the Cypress API project! This project is a collection of tests that verify data on the Steam marketplace using the Steam API. The Steam API contains a wealth of data that is displayed on the Steam website, the project uses this API data to verify the accuracy of the front-end.

# Prerequisites

To use this project, you will need to have the following software installed:

> **Node.js**: https://nodejs.org/en/download/

# Installation

To install this project, follow these steps:

1.  Clone the repository to your local machine:

        git clone https://github.com/liviu-boros/cypress-api-poc.git

2.  Navigate to the project directory:

        cd cypress-api-poc

3.  Install the necessary dependencies:

        npm install

# Testing

To run the tests for this project, use the following command:

    npm run cy:open

# Steam Class

The Steam class in this project is a collection of wrapper functions that make it easier to verify various pieces of data about games on the Steam marketplace. These functions abstract away the complexity of navigating the website and allow you to easily verify specific values with a single function call.

- `searchItem(itemId, itemLabel)`: Searches for a specific item using its ID and verifies the correct item is returned in a popup.
- `verifyItemTitle(label)`: Verifies that the item's title matches the expected value.
- `verifyItemGlanceDetails(headerImage, shortDescription, releaseDate, developer, publisher)`: Verifies the accuracy of the item's at glance details.
- `verifyItemPrice(itemName, originalPrice, discount, finalPrice)`: Verifies the accuracy of the item's pricing information, it can verify both normal and discounted prices depending on it's input.
- `verifyRequirements(requirementType, ...items)`: Verifies the accuracy of the item's minimum and recommended system requirements,.
- `addItemToCart(itemName)`: Adds the specified item to the cart.
- `verifyCartTotal(totalPrice)`: Verifies that the total price in the cart matches the expected value.

# Cypress Methods

This project uses several Cypress traversal methods to locate elements on the page and perform actions on them. These include .next(), .children(), .siblings() and .parents().

# Item Array

The items array in this project is an array of IDs for games on the Steam marketplace. When the tests are run, they iterate through this array and use the ID of each game to retrieve data from the Steam API and verify its accuracy on the front-end.
