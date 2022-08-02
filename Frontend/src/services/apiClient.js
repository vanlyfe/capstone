import axios from "axios";

class ApiClient {
  constructor(remoteHostUrl) {
    this.remoteHostUrl = remoteHostUrl;
    this.token = null;
    this.tokenName = "vanlyfe_token";
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem(this.tokenName, token);
  }

  async request({ endpoint, method = `GET`, data = {} }) {
    const url = `${this.remoteHostUrl}/${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    try {
      const res = await axios({ url, method, data, headers });
      return { data: res.data, error: null };
    } catch (error) {
      console.error({ errorResponse: error.response });
      const message = error?.response?.data?.error?.message;
      return { data: null, error: message || String(error) };
    }
  }

  //AUTH requests

  // GET Requests

  async fetchUserFromToken() {
    return await this.request({ endpoint: `auth/me`, method: `GET` });
  }

  async fetchUserFromId() {
    return await this.request({ endpoint: `auth/:userId`, method: `GET` });
  }

  // POST requests

  async loginUser(credentials) {
    return await this.request({
      endpoint: `auth/login`,
      method: `POST`,
      data: credentials,
    });
  }

  async signupUser(credentials) {
    return await this.request({
      endpoint: `auth/register`,
      method: `POST`,
      data: credentials,
    });
  }

  //PUT requests

  async updateUser(userUpdate, userId) {
    return await this.request({
      endpoint: `auth/` + userId,
      method: `PUT`,
      data: userUpdate,
    });
  }

  //DELETE requests

  async deleteUser() {
    return await this.request({ endpoint: `auth/:userId`, method: `DELETE` });
  }

  //LISTINGS requests

  //GET requests

  async fetchListings() {
    return await this.request({
      endpoint: `listing`,
      method: `GET`,
    });
  }

  async fetchBestListings() {
    return await this.request({
      endpoint: `listing/best`,
      method: `GET`,
    });
  }

  async fetchUserListings(userId) {
    return await this.request({
      endpoint: `listing/user/` + userId,
      method: `GET`,
    });
  }

  async fetchListingById(listingId) {
    return await this.request({
      endpoint: `listing/` + listingId,
      method: `GET`,
    });
  }

  //POST requests

  async postListing(listing) {
    return await this.request({
      endpoint: `listing`,
      method: `POST`,
      data: listing,
    });
  }

  // DELETE requests

  async deleteListing(listingId) {
    return await this.request({
      endpoint: `listing/` + listingId,
      method: `DELETE`,
    });
  }

  //PUT requests

  async updateListing(listingUpdate, listingId) {
    return await this.request({
      endpoint: `listing/` + listingId,
      method: `PUT`,
      data: listingUpdate,
    });
  }

  //ORDERS requests

  // GET requests
  async fetchOrders() {
    return await this.request({ endpoint: `order`, method: `GET` });
  }

  async fetchUserOrders(userId) {
    return await this.request({
      endpoint: `order/user/` + userId,
      method: `GET`,
    });
  }

  async fetchOrder(orderId) {
    return await this.request({ endpoint: `order/` + orderId, method: `GET` });
  }

  // POST requests

  async postOrder(order, listingId) {
    return await this.request({
      endpoint: `order/` + listingId,
      method: `POST`,
      data: order,
    });
  }

  //RATINGS requests

  // GET requests
  async getRating(listingId) {
    return await this.request({
      endpoint: `rating/` + listingId,
      method: `GET`,
    });
  }
  // POST requests

  async postRating(listingId, rating) {
    return await this.request({
      endpoint: `rating/` + listingId,
      method: `POST`,
      data: rating,
    });
  }

  //REVIEWS requests

  // GET requests

  async getReviewsForListing(listingId) {
    return await this.request({
      endpoint: `review/` + listingId,
      method: `GET`,
    });
  }

  async getReviewsForUser(userId) {
    return await this.request({
      endpoint: `review/user/` + userId,
      method: `GET`,
    });
  }

  // POST requests

  async postReview(listingId, review) {
    return await this.request({
      endpoint: `review/` + listingId,
      method: `GET`,
      data: review,
    });
  }

  // DELETE requests

  async deleteReview(reviewId) {
    return await this.request({
      endpoint: `review/` + reviewId,
      method: `DELETE`,
    });
  }
  // PUT requests

  async updateReview(reviewId, reviewUpdate) {
    return await this.request({
      endpoint: `review/` + reviewId,
      method: `PUT`,
      data: reviewUpdate,
    });
  }

  // Logging out a user

  async logoutUser() {
    this.setToken(null);
    localStorage.setItem(this.tokenName, "");
  }

  //RATINGS requests

  // GET requests
  async getRating(listingId) {
    return await this.request({
      endpoint: `rating/` + listingId,
      method: `GET`,
    });
  }
  // POST requests

  async postRating(listingId, rating) {
    return await this.request({
      endpoint: `rating/` + listingId,
      method: `POST`,
      data: rating,
    });
  }

  //REVIEWS requests

  // GET requests

  async getReviews(listingId) {
    return await this.request({
      endpoint: `review/` + listingId,
      method: `GET`,
    });
  }

  // POST requests

  async postReview(listingId, review) {
    return await this.request({
      endpoint: `review/` + listingId,
      method: `GET`,
      data: review,
    });
  }

  // DELETE requests

  async deleteReview(reviewId) {
    return await this.request({
      endpoint: `review/` + reviewId,
      method: `DELETE`,
    });
  }
  // PUT requests

  async updateReview(reviewId, reviewUpdate) {
    return await this.request({
      endpoint: `review/` + reviewId,
      method: `PUT`,
      data: reviewUpdate,
    });
  }
}

export default new ApiClient("http://localhost:3001");
