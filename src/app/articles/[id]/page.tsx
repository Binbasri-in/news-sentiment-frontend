import ArticleDetail from "@/components/ArticleDetail";


export default async function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Await the promise to get the actual params
  const { id } = await params;
  // Convert the id to a number
  const idNumber = Number(id);
  // Check if the id is a valid number
  const isValidId = !isNaN(idNumber) && idNumber > 0;
  // If the id is not valid, you can handle it accordingly
  if (!isValidId) {
    return <div>Invalid article ID</div>;
  }
  
  return (
    <div style={{ marginTop: "2rem" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
      <img
          src="/gifs/reading-news.gif"
          alt="Reading News Animation"
          style={{ width: '200px', height: '200px', margin: '0 auto' }}
        />
      </div>

      <ArticleDetail id={idNumber} />
    </div>
  );
}

