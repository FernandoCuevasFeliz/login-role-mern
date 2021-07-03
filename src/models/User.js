import { model, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      require: true,
      trim: true,
    },

    lastname: {
      type: String,
      require: true,
      trim: true,
    },

    username: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },

    displayname: {
      type: String,
      require: true,
      trim: true,
    },

    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      trim: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      ref: 'role',
      type: Schema.Types.ObjectId,
    },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model('User', UserSchema);
