# Wavr - The Surfer's Weather App

## To-Do List
- Swell graph (lorenzo)
    - Make it change with state
    - draw secondary swell
- Wind compass and gauge (oscar)
    - There's an error occuring but not affecting perfomance
    - lower the calibraton of speed gauge as values are often off scale
- Tide graph (toby)
    - Still need to group times into days for when there are 3 times per day
- style head/menu component
    - show rating and time 
- style loading screen 
    - https://www.npmjs.com/package/react-wave-progress
- style day selector
    - add average rating for each day
- style time selector
    - style the slider
- style change location button
- style swell component
    - make it responsive?
- style wind component
    - put correct colours in
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
