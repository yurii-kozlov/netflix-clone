import { model, Schema, Document } from "mongoose";

export interface UserDoc extends Document {
  email: string,
  password: string,
  activationLink: string,
  isActivated: boolean
}

const UserSchema = new Schema<UserDoc>({
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  isActivated: {type: Boolean, default: false},
  activationLink: {type: String},
});

export default model<UserDoc>('User', UserSchema);
