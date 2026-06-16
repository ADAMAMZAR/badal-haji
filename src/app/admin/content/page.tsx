import { getContent } from "@/lib/content";
import { ContentEditor } from "@/components/admin/ContentEditor";

export default async function AdminContentPage() {
  const content = await getContent();
  return <ContentEditor initialContent={content} />;
}
