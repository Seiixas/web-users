type THeaderProps = {
  title: string;
  subtitle: string;
};

export function Header({ title, subtitle }: THeaderProps) {
  return (
    <header className="border-b mb-8 px-8 py-4">
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="text-muted-foreground text-sm">{subtitle}</p>
    </header>
  );
}
