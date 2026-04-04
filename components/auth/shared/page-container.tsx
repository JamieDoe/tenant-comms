import { PageHeader } from './page-header';

type PageContainerProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function PageContainer({
  title,
  description,
  children,
}: PageContainerProps) {
  return (
    <section className="flex h-full flex-col items-center justify-center">
      <div className="flex w-full max-w-lg flex-col items-center gap-12">
        <PageHeader title={title} description={description} />

        <div className="flex w-full flex-col items-center gap-6">
          {children}
        </div>
      </div>
    </section>
  );
}
