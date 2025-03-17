import mongoose, { Document, InferRawDocType } from 'mongoose';

export enum Gender {
  male = 'Male',
  female = 'Female',
  transgender = 'Transgender',
  other = 'Other',
  notDefined = 'NotDefined',
}

const favoriteArtistsSchema = new mongoose.Schema(
  {
    type: {
      mbid: String,
      name: String,
      genres: [String],
      imageUrl: String,
    },
  },
  { _id: false },
);

const userLocationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      default: [0.0, 0.0],
    },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    age: { type: Number, default: 0 },
    phoneNumber: { type: String, default: '' },
    gender: {
      type: String,
      enum: Gender,
      default: Gender.notDefined,
    },
    favoriteArtists: [favoriteArtistsSchema],
    location: userLocationSchema,
    refreshToken: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
);

userSchema.index({ location: '2dsphere' });
export const UserModel = mongoose.model('User', userSchema);
export type userType = InferRawDocType<typeof userSchema>;
