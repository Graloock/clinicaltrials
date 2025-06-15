
import fetchClinicalTrials from "@/app/lib/clinicalTrials/fetchClinicalTrials";

export default async function Home() {

  const trials = await fetchClinicalTrials();


  return (
    <div className="items-center justify-items-center max-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {await fetchClinicalTrials()}
      </main>
    </div>
  );
}
