import ClinicalTrials from "@/app/components/clinicalTrials";
import ClinicalTrialsSearch from "@/app/components/clinicalTrialsSearch";

export default async function Page({
  searchParams,
}: {
  searchParams: { cond?: string };
}) {
  const query = searchParams.cond || '';
  const url = new URL("https://clinicaltrials.gov/api/v2/studies");
  url.searchParams.set(
    "fields",
    "protocolSection.identificationModule.nctId," +
      "protocolSection.identificationModule.briefTitle," +
      "protocolSection.conditionsModule.conditions",
  );
  url.searchParams.set("pageSize", "10");
  url.searchParams.set("countTotal", "true");
  if (query) url.searchParams.set("query.cond", query);

  const response = await fetch(url.toString(), { cache: "no-store" });
  const data = await response
    .json()
    .catch((e) => console.error("An error occured: " + e));

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <ClinicalTrialsSearch />
      <main className="p-8">
        <ClinicalTrials
          studies={data.studies}
          nextPageToken={data.nextPageToken}
          query={query}
        />
      </main>
    </div>
  );
}
