import { model, Schema, Document } from "mongoose";

export interface Plan {
  name: string;
  monthlyPrice: number;
  videoQuality: string;
  resolution: string;
  multideviceViewing: boolean;
}

export interface UserDoc extends Document {
  email: string,
  password: string,
  activationLink: string,
  isActivated: boolean,
  plan: Plan
}

const UserSchema = new Schema<UserDoc>({
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  isActivated: {type: Boolean, default: false},
  activationLink: {type: String},
  plan: {
    type: {
      name: { type: String, required: true },
      monthlyPrice: { type: Number, required: true },
      videoQuality: { type: String, required: true },
      resolution: { type: String, required: true },
      multideviceViewing: { type: Boolean, required: true },
    },
    default: {
      name: 'Basic',
      videoQuality: 'Good',
      monthlyPrice: 4.99,
      resolution: '720p',
      multideviceViewing: true
    },
  }
});

export default model<UserDoc>('User', UserSchema);
