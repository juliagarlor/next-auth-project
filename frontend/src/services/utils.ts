import { deleteCookie } from "cookies-next";

export function deleteCookies(): void {
  deleteCookie("refreshToken");
  deleteCookie("accessToken");
}
