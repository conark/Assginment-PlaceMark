import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { countyController } from "./controllers/county-controller.js";
import { placeController } from "./controllers/place-controller.js";


export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/edituser/{userid}", config: accountsController.edit },
  { method: "POST", path: "/updateuser/{userid}", config: accountsController.update },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addcounty", config: dashboardController.addCounty },
  { method: "GET", path: "/dashboard/deletecounty/{id}", config: dashboardController.deleteCounty },

  { method: "GET", path: "/county/{id}", config: countyController.index },
  { method: "POST", path: "/county/{id}/addplace", config: countyController.addPlace },
  { method: "GET", path: "/county/{id}/deleteplace/{placeid}", config: countyController.deletePlace },

  { method: "GET", path: "/place/{id}/editplace/{placeid}", config: placeController.index },
  { method: "POST", path: "/place/{id}/updateplace/{placeid}", config: placeController.update },

  { method: "POST", path: "/county/{id}/uploadimage", config: countyController.uploadImage },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
];
