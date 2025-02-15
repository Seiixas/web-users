import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

type THeaderProps = {
  title: string;
  subtitle: string;
};

export function Header({ title, subtitle }: THeaderProps) {
  const isMobile = useIsMobile();

  return (
    <header className="border-b p-4">
      {isMobile && <SidebarTrigger />}
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="text-muted-foreground text-sm">{subtitle}</p>
    </header>
  );
}
