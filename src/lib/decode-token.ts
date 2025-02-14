import { decode } from "jsonwebtoken";

export function extractIdFromToken(token: string): any {
  console.log("token =>> ", token);
  const test = decode(token);
  return test;
}
