# GitDash (SPA GitHub Application)
[![Netlify Status](https://api.netlify.com/api/v1/badges/f5c9c1d6-e2b6-46a9-aaba-415227711daf/deploy-status)](https://app.netlify.com/sites/romantic-bassi-78afb9/deploys)

GithDash is a Single Page Application that retrieves data from Github endpoints and displays it.
The application will be a dashboard application, which will display statuses of the selected GitHub projects.

## Design Decisions
- Used *create-react-app* to fast-forward project creation & foundations.
- Used css templates from multiple resources in order to have responsive & elegant design system which is coherent across the application.
-Customized many provided templates to create a unique design & style.
- Added various improvements and new features;
  - Added GitHub authentication for security purposes.
  - Added pagination for searching GitHub repos.
  - Added search for saved repos.
  - Added stats and repo info in dashboard.
- I haven't used react for almost 2.5 years and felt a bit rusty at times and I didn't have any prior knowledge of the testing workflow in react therefore I skipped tests.
- Tried to implement base designs provided in the Figma file.
- Since the application uses an auth server and open credentials for the GitHub O2Auth pipeline deployment is a bit tricky. I'm working on it still.


## Website
Explore the application from the following URL: <br>
[**GitDash (Coming Soon)**](https://gitdash.cf)

#### Used Resources
During the development of this dashboard, I have used many existing resources from awesome developers.
+ [node-sass v4.11.0](https://github.com/sass/node-sass)
+ [prop-types v15.7.2](https://www.npmjs.com/package/prop-types)
+ [react v16.8.6](https://reactjs.org/?ref=creativetim)
+ [react-bootstrap-sweetalert v4.4.1](http://djorg83.github.io/react-bootstrap-sweetalert/)
+ [react-bootstrap-table-next v3.1.0](https://react-bootstrap-table.github.io/react-bootstrap-table2/)
+ [react-bootstrap-table2-paginator v2.0.5](https://www.npmjs.com/package/react-bootstrap-table2-paginator)
+ [react-bootstrap-table2-toolkit v1.4.0](https://www.npmjs.com/package/react-bootstrap-table2-toolkit)
+ [react-datetime v2.16.3](https://github.com/YouCanBookMe/react-datetime)
+ [react-dom v16.8.6](https://reactjs.org/docs/react-dom.html)
+ [react-notification-alert v0.0.12](https://github.com/creativetimofficial/react-notification-alert#readme)
+ [react-perfect-scrollbar v1.4.4](https://github.com/goldenyz/react-perfect-scrollbar)
+ [react-quill v1.3.3](https://github.com/zenoamaro/react-quill)
+ [react-router v5.0.0](https://reacttraining.com/react-router/)
+ [react-router-dom v5.0.0](https://reacttraining.com/react-router/)
+ [react-scripts v2.1.8](https://github.com/facebook/create-react-app)
+ [react-select2-wrapper v1.0.4-beta6](https://github.com/rkit/react-select2-wrapper)
+ [react-tagsinput v3.19.0](https://github.com/olahol/react-tagsinput)
+ [react-to-print v2.1.0](https://github.com/gregnb/react-to-print#readme)
+ [reactstrap v8.0.0](https://reactstrap.github.io/)

## Table of Contents

* [Quick Start](#quick-start)
* [File Structure](#file-structure)
* [Browser Support](#browser-support)
* [Design](#design)
* [Licensing](#licensing)

## Quick start

## File Structure

Within the git-dash directory you'll find the following directories and files:

```
Git-Dash
.
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── index.js
    ├── routes.js
    ├── assets
    │   ├── css
    │   │   ├── argon-dashboard-pro-react.css
    │   │   ├── argon-dashboard-pro-react.css.map
    │   │   └── argon-dashboard-pro-react.min.css
    │   ├── fonts
    │   │   └── nucleo
    │   ├── img
    │   │   ├── brand
    │   │   ├── icons
    │   │   └── theme
    │   ├── scss
    │   │   ├── argon-dashboard-pro-react.scss
    │   │   ├── bootstrap
    │   │   ├── core
    │   │   ├── custom
    │   │   └── react
    │   └── vendor
    │       ├── @fortawesome
    │       │   └── fontawesome-free
    │       ├── animate.css
    │       ├── fullcalendar
    │       │   └── dist
    │       ├── nucleo
    │       ├── quill
    │       │   └── dist
    │       ├── select2
    │       │   └── dist
    │       └── sweetalert2
    │           └── dist
    ├── layouts
    │   ├── Admin.js
    │   └── Auth.js
    ├── components
    │   ├── Footers
    │   │   ├── AdminFooter.js
    │   │   └── AuthFooter.js
    │   ├── Headers
    │   │   ├── RepoDetail.js
    │   │   ├── AuthHeader.js
    │   ├── Navbars
    │   │   ├── AdminNavbar.js
    │   │   ├── AuthNavbar.js
    │   ├── Spinner
    │   │   ├── Spinner.js
    │   └── Sidebar
    │       └── Sidebar.js
    └── views
        ├── Dashboard.js
        ├── Explore.js
        ├── Archive.js
        ├── RepoDetail.js
        └── pages
            ├── Login.js
```

## Browser Support

At present, I tired to support the last two versions of the following browsers:

<img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/chrome.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/firefox.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/edge.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/safari.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/opera.png" width="64" height="64">


## Design

Design resources includina a Figma/Sketch file can be accessed from the repository.

## Features
  - Search and add new GitHub projects to the project list. Remove project from the project list.
    - The list of the projects are stored at local storage for the next visit.
    - GitHub account integration to access private repositories.
  - List the projects in a single page. The list can contain some summaries (project description, project link etc.)
    - Interface offers paginated results for the ease of surfing.
  - Display project details such as latest activities (last commits, last issues etc.) or general status (open PR count, open issue count etc.). Each project detail page should be bookmarked on its own.
    - Saved projects' data represented at dashboard as additional information

## GitHub API Documentation
[**GitHub API Documentation**](https://docs.github.com/en/rest)

## Build
- Clone this repo. Go into the root folder and run *npm install* to install the dependencies.

  ```
  $ npm install
  ```

- In order to use GitHub O2Auth you need to create O2Auth credentials for your app. For the purpose of demonstrating sample credentials are provided.

- Login to your Github account and create an OAuth app by following the steps provided here (https://docs.github.com/en/free-pro-team@latest/developers/apps/creating-an-oauth-app). Note: For this example, while creating the OAuth app, you can set your Homepage URL to http://localhost:3000/ and Authorization callback URL to http://localhost:3000/login if you are running your app locally.
- Create a .env file in the root folder and set these variables:
  ```
  REACT_APP_CLIENT_ID=Your Client ID from Github
  REACT_APP_CLIENT_SECRET=Your Client Secret from Github
  REACT_APP_REDIRECT_URI=http://localhost:3000/login
  REACT_APP_PROXY_URL=http://localhost:5000/authenticate
  SERVER_PORT=5000
  ```

## Run

Run *npm start* to start the app
```
$ npm start
```

Open the browser to see if the app is working!

## License
GitDash is licensed under the GNU Public License, version 2.0. See [LICENSE](LICENSE) for more information.
