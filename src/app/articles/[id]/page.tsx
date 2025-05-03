import ArticleDetail from "@/components/ArticleDetail";
import LottieClientWrapper from '@/components/LottieClientWrapper';


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
        <LottieClientWrapper
          src="/lottie/video-marketing.json"
          width="300px"
          height="300px"
        />      
        </div>

      <ArticleDetail id={idNumber} />
    </div>
  );
}

