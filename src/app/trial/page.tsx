"use client";

import React from "react";
import PhoneInput from "react-phone-number-input/input";

export default function ApplicationPage() {
  const handleSubmit = (e: React.FormEvent) => {};
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <div>
      <main className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-blue-200 rounded-md shadow-md p-4 w-full max-w-md"
        >
          {" "}
          <div className="grid md:grid-cols-2">
            <div className="p-2">
              <label className="block mb-1 font-medium">First Name</label>
              <input
                className="input"
                type="text"
                name="firstName"
                placeholder="John"
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
                required
              />
            </div>
            <div className="p-2">
              <label className="block mb-1 font-medium">Phone Number</label>
            </div>
          </div>
          <button className="btn w-full">Submit</button>
        </form>
      </main>
    </div>
  );
}
