"use client";

import {redirect, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";

export default function ApplicationPage() {
  const searchParams = useSearchParams();
  const [applicationData, setApplicationData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nctId: searchParams.get("nctId"),
  });
  const updateApplicationLetter = useCallback(() => {
    return (
      `I hope this message finds you well. My name is ${applicationData.firstName || "[First Name]"} ` +
      `${applicationData.lastName || "[Last Name]"}, and I am writing to express my strong interest in ` +
      `participating in your upcoming clinical trial ${applicationData.nctId}.` +
      `\nYou can contact me by replying directly to this email or reaching me by phone ` +
      `at ${applicationData.phone || "[Phone Number]"} or ${applicationData.email || "[Email Address]"} ` +
      `\nThank you for considering my interest!`
    );
  }, [
    applicationData.firstName,
    applicationData.lastName,
    applicationData.email,
    applicationData.phone,
    applicationData.nctId,
  ]);

  fetch(
    `https://clinicaltrials.gov/api/v2/studies/${applicationData.nctId}`,
  ).then((response) => {
    if (!response.ok) {
      redirect(`/notFound`);
    }
  });

  const [applicationLetter, setApplicationLetter] = React.useState(
    updateApplicationLetter(),
  );

  const handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApplicationData({
      ...applicationData,
      firstName: e.target.value,
    });
  };

  const handleLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApplicationData({
      ...applicationData,
      lastName: e.target.value,
    });
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApplicationData({
      ...applicationData,
      email: e.target.value,
    });
  };

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApplicationData({
      ...applicationData,
      phone: e.target.value,
    });
  };

  useEffect(() => {
    setApplicationLetter(updateApplicationLetter());
  }, [updateApplicationLetter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    return e;
  };

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="centered">
        <form onSubmit={handleSubmit} className="form-application">
          <div className="grid md:grid-cols-2 ">
            <div className="p-2">
              <label className="block mb-1 font-medium">First Name</label>
              <input
                className="input"
                type="text"
                name="firstName"
                placeholder="John"
                value={applicationData.firstName}
                onChange={handleFirstName}
                required
              />
            </div>
            <div className="p-2">
              <label className="block mb-1 font-medium">Last Name</label>
              <input
                className="input"
                type="text"
                name="lastName"
                placeholder="Doe"
                value={applicationData.lastName}
                onChange={handleLastName}
                required
              />
            </div>
            <div className="p-2">
              <label className="block mb-1 font-medium">E-mail</label>
              <input
                className="input"
                type="email"
                name="email"
                placeholder="johndoe@exapmle.com"
                value={applicationData.email}
                onChange={handleEmail}
                required
              />
            </div>
            <div className="p-2">
              <label className="block mb-1 font-medium">Phone Number</label>
              <input
                className="input"
                inputMode="numeric"
                pattern="[0-9]*"
                name="phone"
                placeholder="+"
                value={applicationData.phone}
                onChange={handlePhone}
                minLength={10}
                maxLength={13}
                required
              />
            </div>
          </div>
          <div className="p-2">
            <label className="block mb-1 font-medium">
              The following letter will be sent:
            </label>
            <textarea className="letter" readOnly value={applicationLetter} />
            <label>
              <input type="checkbox" name="agreementCheckBox" className="mr-1" required />
              I agree to privacy policy and terms of use
            </label>
          </div>
          <button className="btn w-full">Submit</button>
        </form>
      </main>
    </div>
  );
}
