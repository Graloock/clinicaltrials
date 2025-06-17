import mongoose from "mongoose";

export interface TrialApplicationForm extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  nctId: string;
  applicationLetter: string;
}

const TrialApplicationFormSchema = new mongoose.Schema<TrialApplicationForm>({
  firstName: {
    type: String,
    required: [true, "You need to specify a first name."],
    maxLength: [60, "First name provided is too long."],
  },
  lastName: {
    type: String,
    required: [true, "You need to specify a last name."],
    maxLength: [60, "Last name provided is too long."],
  },
  email: {
    type: String,
    required: [true, "You need to specify a email."],
    maxLength: [60, "Email provided is too long."],
  },
  phoneNumber: {
    type: String,
    required: [true, "You need to specify a phone number."],
    minlength: [13, "Phone number provided is invalid."],
    maxlength: [13, "Phone number provided is invalid."],
  },
  applicationLetter: {
    type: String,
    required: [true, "Application letter was not generated."],
  },
});

export default mongoose.models.TrialApplicationForm || mongoose.model<TrialApplicationForm>("TrialApplicationForm", TrialApplicationFormSchema);