import { getContent } from "@/lib/content";
import { ContentEditor } from "@/components/admin/ContentEditor";

export default async function AdminContentPage() {
  const result = await getContent();
  return (
    <ContentEditor
      initialContent={result.content}
      kvError={result.ok ? undefined : result.error}
    />
  );
}
