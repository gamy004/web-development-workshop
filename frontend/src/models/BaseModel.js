import { Model } from "@vuex-orm/core";

export class BaseModel extends Model {
  static get globalApiConfig() {
    const headers = {};

    const jwtToken = localStorage.getItem("jwt-token");

    if (jwtToken) {
      headers.Authorization = `Bearer ${jwtToken}`;
    }

    return {
      headers,
    };
  }
}

export default BaseModel;
