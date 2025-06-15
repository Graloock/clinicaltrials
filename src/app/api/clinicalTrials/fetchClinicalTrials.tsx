

export default async function fetchClinicalTrials(searchQuery?: string) {
  const url = new URL("https://clinicaltrials.gov/api/v2/studies");
  url.searchParams.set("fields",
    "protocolSection.identificationModule.nctId," +
    "protocolSection.identificationModule.briefTitle," +
    "protocolSection.conditionsModule.conditions");
  url.searchParams.set("pageSize", "10");
  url.searchParams.set("countTotal", "true");
  if (searchQuery) url.searchParams.set("query.cond", searchQuery);

  const response = await fetch(url.toString(), {cache: "no-store"});
  const data = await response.json();

  const trials = data.studies.map((trial: Trial) => {

  })
}
