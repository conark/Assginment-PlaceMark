import { db } from "../models/db.js";
import { UserSpec } from "../models/joi-schemas.js";

export const admindashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const users = await db.userStore.getAllUsers();
      const viewData = {
        title: "Admin Dashboard",
        user: loggedInUser,
        users: users,
      };
      return h.view("admin-dashboard-view", viewData);
    },
  },

  addUser: {
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("admin-dashboard-view", { title: "Add user error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const newUser = {
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
        email: request.payload.email,
        password: request.payload.password,
        admin: request.payload.admin
      };
      await db.userStore.addUser(newUser);
      return h.redirect("/admindashboard");
    },
  },

  deleteUser: {
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.id);
      await db.userStore.deleteUserById(request.params.id);
      return h.redirect("/admindashboard");
    },

  },  
  
  admineditUser: {
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.id);
      const viewData = {
        title: "Edit User",
        user: user,
      };
      return h.view("admin-user-view", viewData);
      
    },
},
  adminupdateUser: {
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("admin-user-view", { title: "Edit user error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.id);
      const newUser = {
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
        email: request.payload.email,
        password: request.payload.password,
        admin: boolean(request.payload.admin),
      };
      await db.userStore.updateUser(user, newUser);
      const viewData = {
        title: "User updated",
        user,
      };
      return h.redirect("/admindashboard");

    },
  },

};

