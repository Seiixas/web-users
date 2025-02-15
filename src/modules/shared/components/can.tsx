import { AbilityContext } from "@/contexts/ability.context";
import { createContextualCan } from "@casl/react";

export const Can = createContextualCan(AbilityContext.Consumer);
