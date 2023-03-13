import axios from "axios";
import { maggie, serviceUrl } from "../fixtures.js";

export const walktrailService = {
  walktrailUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.walktrailUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.walktrailUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    try {
      const res = await axios.get(`${this.walktrailUrl}/api/users`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.walktrailUrl}/api/users`);
    return res.data;
  },

  async createCounty(county) {
    const res = await axios.post(`${this.walktrailUrl}/api/counties`, county);
    return res.data;
  },

  async deleteAllCounties() {
    const response = await axios.delete(`${this.walktrailUrl}/api/counties`);
    return response.data;
  },

  async deleteCounty(id) {
    const response = await axios.delete(`${this.walktrailUrl}/api/counties/${id}`);
    return response;
  },

  async getAllCounties() {
    const res = await axios.get(`${this.walktrailUrl}/api/counties`);
    return res.data;
  },

  async getCounty(id) {
    const res = await axios.get(`${this.walktrailUrl}/api/counties/${id}`);
    return res.data;
  },

  async getAllPlaces() {
    const res = await axios.get(`${this.walktrailUrl}/api/places`);
    return res.data;
  },

  async createPlace(id, place) {
    const res = await axios.post(`${this.walktrailUrl}/api/counties/${id}/places`, place);
    return res.data;
  },

  async deleteAllPlaces() {
    const res = await axios.delete(`${this.walktrailUrl}/api/places`);
    return res.data;
  },

  async getPlace(id) {
    const res = await axios.get(`${this.walktrailUrl}/api/places/${id}`);
    return res.data;
  },

  async deletePlace(id) {
    const res = await axios.delete(`${this.walktrailUrl}/api/places/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.walktrailUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  },
};
