import request from "@/utils/request";
import { encryptedData } from "@/utils/encrypt";
import { loginRSA, tokenName } from "@/config/settings";

export async function login(data) {
  return request({
    url: "/system/v0/user/login",
    method: "post",
    data,
  });
}

export function getUserInfo() {
  return request({
    url: "/system/v0/user/info",
    method: "get",
  });
}

export function logout() {
  return request({
    url: "/logout",
    method: "post",
  });
}

export function register() {
  return request({
    url: "/register",
    method: "post",
  });
}
