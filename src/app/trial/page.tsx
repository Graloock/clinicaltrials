"use client";

import { redirect } from "next/navigation";
import React, { useCallback, useEffect } from "react";

type formStatus = "idle" | "submitting" | "success" | "fail";

export default function ApplicationPage() {
  const [status, setStatus] = React.useState<formStatus>("idle");
  const [isDisabled, setDisabled] = React.useState(false);
  const [applicationData, setApplicationData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "+",
    nctId: "",
  });
  const updateApplicationLetter = useCallback(() => {
    return (
      `I hope this message finds you well. My name is ${applicationData.firstName || "[First Name]"} ` +
      `${applicationData.lastName || "[Last Name]"}, and I am writing to express my strong interest in ` +
      `participating in your upcoming clinical trial ${applicationData.nctId}.` +
      `\nYou can contact me by replying directly to this email or reaching me by phone ` +
      `at ${applicationData.phoneNumber.length > 1 ? applicationData.phoneNumber : "[phone Number]"} ` +
      `or ${applicationData.email || "[Email Address]"} ` +
      `\nThank you for considering my interest!`
    );
  }, [applicationData]);

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
  const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^\+?\d*$/.test(e.target.value)) {
      if (e.target.value[0] !== "+") return;

      if (e.target.value.length <= 13)
        setApplicationData({
          ...applicationData,
          phoneNumber: e.target.value,
        });
    }
  };
  useEffect(() => {
    setApplicationLetter(updateApplicationLetter());

    const nctId =
      new URLSearchParams(window.location.search).get("nctId") || "";

    if (applicationData.nctId !== nctId)
      setApplicationData({
        ...applicationData,
        nctId: nctId,
      });

    fetch(
      `https://clinicaltrials.gov/api/v2/studies/${nctId}`,
    ).then((response) => {
      if (!response.ok) {
        redirect(`/notFound`);
      }
    });
  }, [applicationData, updateApplicationLetter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDisabled(true);
    setStatus("submitting");
    await fetch("/api/trial/application/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        applicationData,
        applicationLetter,
      }),
    })
      .then(() => setStatus("success"))
      .catch((e) => {
        console.error(e);
        setStatus("fail");
      });
  };

  const getButtonText = () => {
    switch (status) {
      case "submitting":
        return "Submitting...";
      case "success":
        return "Application Submitted!";
      case "fail":
        return "Application Failed!";
      default:
        return "Submit";
    }
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
                pattern="^\+[\d]{12}$"
                name="phoneNumber"
                placeholder=""
                value={applicationData.phoneNumber}
                onChange={handlePhoneNumber}
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
              <input
                type="checkbox"
                name="agreementCheckBox"
                className="mr-1"
                required
              />
              I agree to privacy policy and terms of use
            </label>
          </div>
          <button
            className={`btn w-full ${
              status === "submitting"
                ? "btn-submitting"
                : status === "success"
                  ? "btn-success"
                  : status === "fail"
                    ? "btn-fail"
                    : ""
            }`}
            disabled={isDisabled}
          >
            {getButtonText()}
          </button>
        </form>
      </main>
    </div>
  );
}
