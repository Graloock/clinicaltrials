'use client'

import fetchClinicalTrials from "@/app/api/clinicalTrials/fetchClinicalTrials";



export default async function trialCards(pageToken: string = "") {
  const trials = [];
  const data:Data = await fetchClinicalTrials(pageToken);
  const nextPage = data.nextPageToken;
  trials.push(
    <div key={data.nextPageToken} className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
      {data.studies.map((trial: Trial) => (
        <div
          className="card grid grid-rows-[auto_auto_1fr]"
          key={trial.protocolSection.identificationModule.nctId}
        >
          <p className="text-xl font-bold">
            {trial.protocolSection.identificationModule.briefTitle}
          </p>
          <p className="text-lg">
            Conditions:{" "}
            {trial.protocolSection.conditionsModule.conditions.join(", ")}
          </p>
          <p>NCT Number: {trial.protocolSection.identificationModule.nctId}</p>
          <div className="justify-self-center bottom">
            <button className="btn">Apply To Trial</button>
          </div>
        </div>
      ))}
      <div key={nextPage} className="flex justify-center items-center">
        <button className="btn text-xl">Show More</button>
      </div>
    </div>,
  );

  return trials;
}
