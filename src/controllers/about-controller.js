export const aboutController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "About Walk Trail Map",
      };
      return h.view("about-view", viewData);
    },
  },
};
