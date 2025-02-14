import { decode } from "jsonwebtoken";

export function extractIdFromToken(token: string): any {
  const test = decode(token);
  return test;
}
