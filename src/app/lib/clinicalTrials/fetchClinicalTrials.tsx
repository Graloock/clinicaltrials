const fetchURL: string = "https://clinicaltrials.gov/api/v2/studies?";
const searchParams = new URLSearchParams({
  pageSize: "10",
  fields:
    "protocolSection.identificationModule.nctId," +
    "protocolSection.identificationModule.briefTitle," +
    "protocolSection.conditionsModule.conditions",
});

declare interface Trial {
  protocolSection: {
    identificationModule: {
      briefTitle: string;
      nctId: string;
    };
    conditionsModule: {
      conditions: string[];
    };
  };
}

export default async function fetchClinicalTrials(PageToken:string = "") {
  if (PageToken !== "") {
    searchParams.append("pageToken", PageToken);
  }
  return await fetch(fetchURL + searchParams)
    .then((res) => res.json())
    .then((data) => data);
}
