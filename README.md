# Wavr - The Surfer's Weather App

## To-Do List
- Lorenzo
    1. Swell
        - add tootip to explain swell
    2. style slider
        - style the slider
        - https://www.cssportal.com/style-input-range/
    3. favicon/logo
- Oscar
    1. Wind compass and gauge
        - redefine grid > move temp on left, weather on right, gauge in middle
        - get icons and make function to show them 
        - https://graphicburger.com/icons-set/
        - add text "strong on shore wind"

Once done:
- test cross browsers
- transitions
- Comment everything, change variable names (Everyone)
- include contribution explaination as per the email

## Set-Up Guide
- [Installation](#installation)
- [Development Workflow](#development-workflow)

**0. Before doing any of this, if you're using your own laptop/desktop, make sure you've got the latest versions of node and npm installed (npm v: 4.0.5 & node v: 7.4.0) :**

```sh
node -v
npm -v
```

## Installation

**1. Clone this repository :**

```sh
git clone --depth 1 https://github.com/Juan-Alvarado/weatherapp-boilerplate.git weather-app
cd weather-app
```

**2. Make it your own :**

```sh
rm -rf .git && git init && npm init
```

> :information_source: Command above re-initializes the repo and sets up your NPM project.


**3. Install the dependencies :**

```sh
npm install
```

## Development Workflow


**4. Start a live-reload development server :**

```sh
npm run dev
```

> This is a full web server for your project. Any time you make changes within the `src` directory, it will rebuild and even refresh your browser.


**5. Generate a production build in `./build` :**

```sh
npm run build
```

**6. Start local production server with [serve](https://github.com/zeit/serve):**

```sh
npm start
```

> This simply serves up the contents of `./build`. Bear in mind, if you use this, the localhost port your server is running on will refresh, and you'll also need to restart it to see any changes you've made to the code in `src`.
