import { AbilityContext } from "@/contexts/ability.context";
import { useContext } from "react";

export const useAbility = () => {
  return useContext(AbilityContext);
};
