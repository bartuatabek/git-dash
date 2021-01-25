//
//  routes.js
//  GitDash
//
//  Created by Bartu Atabek on 1/20/21.
//

import Dashboard from "views/Dashboard.js";
import Explore from "views/Explore";
import Archive from "views/Archive";
import Login from "views/auth/Login.js";
import RepoDetail from "views/RepoDetail.js";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-spaceship text-primary",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/explore",
    name: "Explore",
    icon: "ni ni-compass-04 text-blue",
    component: Explore,
    layout: "/admin"
  },
  {
    path: "/archive",
    name: "Archive",
    icon: "ni ni-bullet-list-67 text-red",
    component: Archive,
    layout: "/admin"
  },
  {
    path: "/repo-details",
    name: "Repository Detail",
    icon: "ni ni-single-02 text-yellow",
    component: RepoDetail,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  }
];
export default routes;
