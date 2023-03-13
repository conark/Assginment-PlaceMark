export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret"
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret"
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret"
    }
  },
  counties: {
    _model: "County",
    cork: {
      countyname: "Cork",
      userid: "->users.bart"
    }
  },
  places: {
    _model : "Place",
    place_1 : {
      placename: "Cork River Park No. 1",
      description: "River Park",
      latitude: 15,
      longitude: 1,
      countyid: "->counties.cork"
    },
    place_2 : {
      placename: "Cork River Park No. 2",
      description: "River Park",
      latitude: 11,
      longitude: 1,
      countyid: "->counties.cork"
    },
    place_3 : {
      placename: "Cork River Park No. 3",
      description: "River Park",
      latitude: 23,
      longitude: 1,
      countyid: "->counties.cork"
    }
  }
};
