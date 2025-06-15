"use client";

import React from "react";

export default function ClinicalTrialsSearch() {
  const [query, setQuery] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;
    window.location.href = `/?cond=${query}`;
  }

  return (
    <header className="fixed header">
      <div className="flex items-center justify-between">
        <div className="text-2xl">ClinicalTrials</div>
        <form onSubmit={handleSubmit} className="relative font-light">
          <input
            className="bg-amber-50 rounded-xl text-black m-1 text-sm w-52 h-6 pl-3 pr-6"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search conditions..."
          />
          <button type="submit" className="search-btn">🔍</button>
        </form>
      </div>
    </header>
  );
}
