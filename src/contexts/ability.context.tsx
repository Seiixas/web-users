import { createContext, useContext } from "react";
import { defineAbility } from "@casl/ability";
import { AppAbility } from "@/lib/casl/ability";

export const createEmptyAbility = () => {
  return defineAbility<AppAbility>(() => {});
};

export const AbilityContext = createContext<AppAbility>(createEmptyAbility());

export const useAbility = () => {
  return useContext(AbilityContext);
};
