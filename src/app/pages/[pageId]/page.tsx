import { Suspense } from 'react';

import { PageEditorSkeleton } from '../../../features/page/components/page-editor/page-editor-skeleton';
import { PageEditorContainer } from '../../../features/page/components/page-editor/page-editor.container';

type Params = PageProps<'/pages/[pageId]'>['params'];

const PageEditorByParams = async ({ params }: { params: Params }) => {
  const { pageId } = await params;
  return <PageEditorContainer pageId={pageId} />;
};

export default function PageDetailPage({
  params,
}: PageProps<'/pages/[pageId]'>) {
  return (
    <Suspense fallback={<PageEditorSkeleton />}>
      <PageEditorByParams params={params} />
    </Suspense>
  );
}
