import { Schema, model } from 'mongoose';

const RolSchema = new Schema(
  {
    name: {
      type: String,
      requre: true,
      trim: true,
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);

export const Role = model('role', RolSchema);
