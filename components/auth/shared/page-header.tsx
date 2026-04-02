export function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="w-full text-center lg:text-left">
      <h1 className="mb-4 text-4xl font-semibold">{title}</h1>
      <p className="text-secondary-foreground">{description}</p>
    </div>
  );
}
