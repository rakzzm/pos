import { MenuDisplay } from '../../../components/MenuDisplay';

export default async function TableMenuPage({ params }: { params: Promise<{ tableId: string }> }) {
  const { tableId } = await params;
  return <MenuDisplay tableId={tableId} />;
}
