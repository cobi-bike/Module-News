# News DevKit module for COBI.bike

The News DevKit module displays the latest news headlines and allows to add them to your read later list.
Its part of a collection of Open Source [modules](https://cobi.bike/devkit) for the [COBI.bike](https://cobi.bike) system.

<img src="screenshot.png" width="500px" alt="COBI.bike News module">

## Quickstart: Interactive Demo

The quickest way to test the module:

[<img src="https://cdn.cobi.bike/static/devkit-assets/github/open_demo_button.png" width="170px" alt="Open demo button">](https://glitch.com/edit/#!/import/github/cobi-bike/Module-News)

## Installation and Setup

You can easily deploy the module on your own:

### Step 1: Clone repository

Clone this repository and install Node.js dependencies with:

``` bash
npm install
```  

### Step 2: Install COBI.bike DevKit

Follow the [instructions](https://github.com/cobi-bike/DevKit#-test-your-module) to install the COBI.bike Google Chrome Simulator and get familiar with the basics of module development on the COBI plattform.


### Step 3: Create a twilio account

This module relies on [newsapi.org](https://newsapi.org/register) to poll the latest news from various news outlets. Create an account and retrieve your api key.

### Step 4: Set environment variables

Set the environment variable `NEWSAPI_KEY` with your credentials for newsapi.org


### Step 5: Run Node.js server

The module is accessible under [localhost:8888](http://localhost:8888/) after starting the Node.js server with:
``` bash
PORT=8888 NEWSAPI_KEY=... node server.js
```  
The settings menu can be accessed with the [?state=edit](http://localhost:8888/?state=edit) suffix.


## Useful DevKit links

* [Debugging Tips & Tricks](https://github.com/cobi-bike/DevKit#debugging-tips--tricks)
* [Inspiration & Examples](https://github.com/cobi-bike/DevKit#inspiration--examples)
* [Interface Guidelines](https://github.com/cobi-bike/DevKit#interface-guidelines)
* [More DevKit Resources](https://github.com/cobi-bike/DevKit#inspiration--examples)
* [Other Tools & Resources](https://github.com/cobi-bike/DevKit#other-tools--resources)


## Contributing to this project

Anyone and everyone is welcome to contribute to this project, the [DevKit Simulator](https://github.com/cobi-bike/DevKit-Simulator) and the [COBI.bike DevKit UI Components](https://github.com/cobi-bike/DevKit-UI). Please take a moment to review the [guidelines for contributing](https://github.com/cobi-bike/DevKit/blob/master/CONTRIBUTING.md).

* [Bug reports](https://github.com/cobi-bike/DevKit/blob/master/CONTRIBUTING.md#bugs)
* [Feature requests](https://github.com/cobi-bike/DevKit/blob/master/CONTRIBUTING.md#features)
* [Pull requests](https://github.com/cobi-bike/DevKit/blob/master/CONTRIBUTING.md#pull-requests)

Copyright © 2018 COBI.bike GmbH