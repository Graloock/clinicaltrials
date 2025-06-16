"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import Input, { type Value } from "react-phone-number-input/input";

export default function ApplicationPage() {
  const searchParams = useSearchParams();
  const [applicationData, setApplicationData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nctId: searchParams.get("nctId"),
  });

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

  const handlePhone = (e: Value) => {
    setApplicationData({
      ...applicationData,
      phone: e,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {};

    return (
      <div>
        <main className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
          <form
            onSubmit={handleSubmit}
            className="bg-blue-200 rounded-2xl shadow-2xl p-4 w-full max-w-md"
          >
            <div className="grid md:grid-cols-2">
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
                <Input
                  className="input"
                  type="phone"
                  name="phoneNumber"
                  placeholder="+"
                  value={applicationData.phone}
                  onChange={handlePhone}
                  required
                />
              </div>
            </div>
            <button className="btn w-full">Submit</button>
          </form>
        </main>
      </div>
    );
}
