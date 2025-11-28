import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  courseName: { type: String, required: true },
  issuedAt: { type: Date, default: Date.now },
  serialNumber: { type: String, required: true, unique: true },
  qrCodeUrl: { type: String, required: true, unique: true },
  isValid: { type: Boolean, default: true },
});

certificateSchema.index(
  { serialNumber: 1 },
  { unique: true, sparse: true, expireAfterSeconds: 3600 }
);
export const Certificate = mongoose.model("Certificate", certificateSchema);
