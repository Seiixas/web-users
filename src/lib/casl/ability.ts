import { defineAbility, MongoAbility } from "@casl/ability";

export type Subjects = "User";
export type AppAbility = MongoAbility<[Permission, Subjects]>;

export enum Permission {
  READ = "READ",
  EDIT = "EDIT",
  DELETE = "DELETE",
  CREATE = "CREATE",
  READ_ANY = "READ_ANY",
  EDIT_ANY = "EDIT_ANY",
  EDIT_ALL = "EDIT_ALL",
  DELETE_ANY = "DELETE_ANY",
}

export const STANDARD_ACTIONS = [
  Permission.EDIT,
  Permission.READ,
  Permission.DELETE,
];
export const MANAGER_ACTIONS = [
  Permission.READ_ANY,
  Permission.EDIT_ANY,
  Permission.DELETE_ANY,
  ...STANDARD_ACTIONS,
];
export const ADMIN_ACTIONS = [
  Permission.CREATE,
  Permission.EDIT_ALL,
  ...MANAGER_ACTIONS,
];

export const createAbility = (role: string) =>
  defineAbility<AppAbility>((can) => {
    switch (role) {
      case "ADMIN":
        ADMIN_ACTIONS.forEach((action) => can(action, "User"));
        break;
      case "MANAGER":
        MANAGER_ACTIONS.forEach((action) => can(action, "User"));
        break;
      default:
        STANDARD_ACTIONS.forEach((action) => can(action, "User"));
        break;
    }
  });
