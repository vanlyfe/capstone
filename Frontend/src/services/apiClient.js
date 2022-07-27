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


    async loginUser(credentials){
        return await this.request({endpoint: `auth/login`, method: `POST`, data: credentials})
    }

    async signupUser(credentials){
        
        return await this.request({endpoint: `auth/register`, method: `POST`, data: credentials})

    }
  }

  async fetchUserFromToken() {
    return await this.request({ endpoint: `auth/me`, method: `GET` });
  }

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

  // added the logout user

  // async logoutUser() {
  //   this.setToken(null);
  //   localStorage.setItem(this.tokenName, "");
  // }
}

export default new ApiClient("http://localhost:3001");
