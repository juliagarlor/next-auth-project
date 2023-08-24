import { deleteCookie } from "cookies-next";

export function deleteCookies(): void {
  deleteCookie("name");
  deleteCookie("userId");
  deleteCookie("roles");
  deleteCookie("refreshToken");
  deleteCookie("accessToken");
}
