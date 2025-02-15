import { useEffect } from "react";
import { Permission } from "@/lib/casl/ability";
import { useRouter } from "next/navigation";
import { useAbility } from "./use-ability";

export function usePermissionRedirect(
  action: Permission,
  redirectPath: string = "/403"
) {
  const ability = useAbility();
  const router = useRouter();

  useEffect(() => {
    if (!ability.can(action, "User")) {
      router.push(redirectPath);
    }
  }, [ability, action, redirectPath, router]);

  return ability.can(action, "User");
}
