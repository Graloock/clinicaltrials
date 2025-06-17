import dbConnect from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";
import TrialApplicationForm from "@/app/models/TrialApplicationForm";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      applicationData: { firstName, lastName, email, phoneNumber, nctId },
      applicationLetter,
    } = await body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !nctId ||
      !applicationLetter
    )
      return NextResponse.json(
        { error: "Missing required parameters." },
        { status: 400 },
      );

    await dbConnect();
    const newTrialApplicationForm = await TrialApplicationForm.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      nctId: nctId,
      applicationLetter: applicationLetter,
    });
    return NextResponse.json({
      success: true,
      id: newTrialApplicationForm._id,
    });
  } catch (e) {
    console.error("Damn, an error occurred:" + e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
