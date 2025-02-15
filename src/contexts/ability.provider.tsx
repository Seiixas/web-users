import { useSecureRole } from "@/hooks/use-secure-role";
import { AbilityContext, createEmptyAbility } from "./ability.context";
import { createAbility } from "@/lib/casl/ability";
import { PropsWithChildren } from "react";

export function AbilityProvider({ children }: PropsWithChildren) {
  const role = useSecureRole();
  const ability = role ? createAbility(role) : createEmptyAbility();

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
}
