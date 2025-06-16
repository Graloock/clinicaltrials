"use client";

import { useEffect, useRef, useState } from "react";

export default function ClinicalTrials({ studies, nextPageToken, query}: Data) {
  const [trials, setTrials] = useState(studies);
  const [pageToken, setPageToken] = useState(nextPageToken);
  const [isLoading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(!!nextPageToken);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchMore = async () => {
    if (!pageToken || isLoading) return;
    setLoading(true);

    const url = new URL("https://clinicaltrials.gov/api/v2/studies");
    url.searchParams.set(
      "fields",
      "protocolSection.identificationModule.nctId," +
        "protocolSection.identificationModule.briefTitle," +
        "protocolSection.conditionsModule.conditions",
    );
    url.searchParams.set("pageToken", pageToken);
    url.searchParams.set("pageSize", "10");
    url.searchParams.set("countTotal", "true");
    if (query) url.searchParams.set("query.cond", query);

    const response = await fetch(url.toString(), { cache: "no-store" });
    const data = await response
      .json()
      .catch((e) => console.error("An error occurred: " + e));

    setTrials((oldTrials) => [...oldTrials, ...data.studies]);
    setPageToken(data.nextPageToken || "");
    setHasMore(!!data.nextPageToken);
    setLoading(false);
  };

  useEffect(() => {
    if (!observerRef.current || !hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) fetchMore().catch((e) => console.error(e));
    });

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  });

  return (
    <div
      key={nextPageToken}
      className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mt-14"
    >
      {trials.map(
        ({
          protocolSection: {
            identificationModule: { nctId, briefTitle },
            conditionsModule: { conditions },
          },
        }: Trial) => (
          <div className="card grid grid-rows-[auto_auto_1fr]" key={nctId}>
            <p className="text-xl font-bold">{briefTitle}</p>
            <p className="text-lg">Conditions: {conditions.join(", ")}</p>
            <p>NCT Number: {nctId}</p>
            <div className="justify-self-center bottom">
              <button className="btn" value={nctId}>Apply To Trial</button>
            </div>
          </div>
        ),
      )}
      {hasMore && <div ref={observerRef} className="h-10" />}
    </div>
  );
}
