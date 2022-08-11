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

  async request({ endpoint, method = `GET`, data = {}, contentType = "application/json" }) {
    const url = `${this.remoteHostUrl}/${endpoint}`;
    const headers = {
      "Content-Type": contentType,
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

  async fetchUserFromId(userId) {
    return await this.request({ endpoint: `auth/` + userId, method: `GET` });
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

  async deleteUser(userId) {
    return await this.request({ endpoint: `auth/` + userId, method: `DELETE` });
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
      contentType: "multipart/form-data",
    });
  }

  async filterListings(data){
    return await this.request({
      endpoint : `listing/filter`,
      method: `POST`,
      data : data,
    })
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

  async fetchUserPastOrders(userId) {
    return await this.request({
      endpoint: `order/user/past/` + userId,
      method: `GET`,
    });
  }

  async fetchUserActiveOrders(userId) {
    return await this.request({
      endpoint: `order/user/active/` + userId,
      method: `GET`,
    });
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
      method: `POST`,
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

  
  //INDEX request

  //POST requests

  async requestreset(credentials){
    return await this.request({
      endpoint : `index/requestreset`,
      method: `POST`,
      data : credentials,
    })

  }

  //PUT requests

  async updatepassword(update){
    return await this.request({
      endpoint : `index/updatepassword`,
      method : `PUT`,
      data : update,
    })
  }


  async validate(token){
    return this.request({
      endpoint : `index/validate`,
      method : `POST`,
      data : token
    })
  }

  //FAVORITES requests

  //GET requests

  async getFavorites(userId){
    return this.request({
      endpoint : `favorite/` + userId,
      method : `GET`
    })
  }

  //POST requests

  async postFavorite(listingId){
    return this.request({
      endpoint : `favorite/` + listingId,
      method : `POST`
    })
  }

  //DELETE requests

  async deleteFavorite(id){
    return this.request({
      endpoint : `favorite/` + id,
      method : `DELETE`
    })
  }

}

export default new ApiClient("http://localhost:3001");
