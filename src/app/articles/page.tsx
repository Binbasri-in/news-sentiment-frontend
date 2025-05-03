import { Suspense } from "react";
import ArticlesClient from "../../components/ArticlesClient";

export default function ArticlesPageWrapper() {
  return (
    <Suspense fallback={<p style={{ textAlign: "center", marginTop: "2rem" }}>Loading articles...</p>}>
      <ArticlesClient />
    </Suspense>
  );
}
