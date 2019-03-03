# Wavr - The Surfer's Weather App

## To-Do List
- Swell
    - secondary swell hidden as deafult
    - on hover of secondary swell box, secondary swell shown
- Wind compass and gauge (oscar)
    - There's an error occuring but not affecting perfomance
    - redefine grid > move temp on left, weather on right, gauge in middle
    - get icons and make function to show them
        - https://graphicburger.com/icons-set/
- Tide graph (toby)
    - Still need to group times into days for when there are 3 times per day
    - add point 6 hours before first point and 6 hours after next point
    - add grey rects to obscure the overlapping wave parts
- style head/menu component
    - show rating and time
    - location text bigger
- style loading screen
    - https://codepen.io/oxla/pen/VaWryB wave loader
    - https://www.npmjs.com/package/react-wave-progress
    - small logo in middle with animation
    - gif??
- style day selector
    - add average rating for each day
- style time selector
    - style the slider
- style change location button
- style swell component
    - make it responsive?
- style tide component
    - add another bar to show time window
- favicon/logo
- test cross browsers
- Comment everything (Everyone)

- SVG animations https://greensock.com/get-started-js

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
