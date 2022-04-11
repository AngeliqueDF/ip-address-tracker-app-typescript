# Project name

![Screenshot of the IP address tracker app.](./placeholder.jpg)

<div align="center">
  <img src="./logo-html5.svg">
  <img src="./logo-css3.svg">
  <img src="./logo-javascript-img.svg">
</div>

## Overview

_Locate any IP address on a map!_

[![Under Development](https://img.shields.io/badge/under-development-orange.svg)](https://github.com/) ![Security Headers](https://img.shields.io/security-headers?url=https%3A%2F%2Fadf.dev)

<hr />

<br />

## Links

<p>
<a href="/.github/README.md">GitHub repo</a> • <a href="/.github/CONTRIBUTING.md">Live demo </a> • <a href="/.github/PULL_REQUEST_TEMPLATE.md">Project board</a>
</p>

## Features

- Responsive design.
- Accessiblity.
- Locates any IP address and displays its information in a readable table.

## Technologies

- HTML
- CSS
- JavaScript

<!-- <br /> -->

## How to run the project

1. `git clone HTTPS_REPO_URL MY-FOLDER-NAME`
2. `cd MY-FOLDER-NAME`
3. `npm install`
4. `npm start`
5. visit `http://localhost:1234`

<!-- <br /> -->

### If you encounter a CORS error.

On localhost, some browsers will block the request to IPIFY and throw a [CORS error](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSDidNotSucceed). The request is never sent and the app doesn't work (no relevant information is displayed in the table and the map).

#### Workarounds to the CORS error.

- Use Safari.
- Use a browser in incognito mode to test the app (worked in Chrome, Firefox Developer Edition).


## Description

Thanks to this project, I learned to use new APIs:

- IPIFY to locate the IP address.

- Leaflet which renders a map and offers everything needed to meet the app's requirements out of the box!

Using Leaflet was a good practice on using OOP concepts, by taking advantage of the classes the API offers.

<br />

### How I built this project

#### HTML/CSS
  1. With a mobile first approach, write a responsive static page at the 375px and 1440px breakpoints.

#### JavaScript
  1. Use the IPIFY API to get information to display in the table and the coordinates Leaflet will use.
  2. Integrate Leaflet to display and update the map using IPIFY's response.

 <br />

### What I learned

At first I was stuck trying to solve it with loops or using global variables (which should have been faster but created bugs easily).

Then it became clear that a robust solution needed to be inspired from OOP concepts, and take advantage of closures. Scoping, closures, OOP, and private fields.

Doing this, I avoided

- Writing extra code just to create new tiles/layers and then clean up after every search.
- Using global variables
- Writing my own, potentially buggy code instead of taking advantage of the classes offered by Leaflet.

To see how you can add code snippets, see below:

```html
<h1>Some HTML code I'm proud of</h1>
```

```css
.proud-of-this-css {
	color: papayawhip;
}
```

```js
const proudOfThisFunc = () => {
	console.log("🎉");
};
```

<br />

### Recommended technologies and tools

I didn't use a particular tool to write this app. But the following helped me during development.

- Leaflet's documentation.
- VS Code type hints.

<br />

## Status

The app works. But the code needs reviewing and some changes are planned.

### Planned changes

- [ ] Make the app work when the user searches a domain name. I am thinking of creating a small Node API to use its `URL` core module to validate domains and IP addresses.
- [ ] Just to practice, use Bulma CSS to build the interface.

[See the advancement of the project here. PRs welcome!]()

## Sources

- [IP Address Tracker by Frontend Mentor.](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0)


## Useful references

1. https://onestepcode.com/leaflet-markers-svg-icons/
2. Resource
3. Resource

## Inspiration

## Author

- [@AngeliqueDF on GitHub.](https://github.com/AngeliqueDF)
- [Visit my website.](https://adf.dev)
- [View my Frontend Mentor profile.](https://www.frontendmentor.io/profile/AngeliqueDF)
