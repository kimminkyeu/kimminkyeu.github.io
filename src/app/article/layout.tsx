export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children} {/* 본문 (글 리스트 혹은 글한개 본문) */}
    </div>
  );
}
