type THeaderProps = {
  title: string;
  subtitle: string;
};

export function Header({ title, subtitle }: THeaderProps) {
  return (
    <header className="border-b p-4">
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="text-muted-foreground text-sm">{subtitle}</p>
    </header>
  );
}
