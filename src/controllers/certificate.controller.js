import { randomUUID } from "crypto";
import { Certificate } from "../models/certificate.js";
import { generateQrcode } from "../utils/generateQrcode.js";

export const createCertificate = async (req, res) => {
  try {
    const serial = "SF-" + randomUUID();
    const { studentName, courseName } = req.body;
    if (!studentName || !courseName) {
      return res
        .status(400)
        .json("Please provide student name and course name");
    }
    const verificationUrl = `${process.env.CLIENT_URL}/verify-certificate/${serial}`;

    const qrCodeUrl = await generateQrcode(verificationUrl);
    
    const certificate = await Certificate.create({
      studentName: studentName,
      courseName: courseName,
      serialNumber: serial,
      qrCodeUrl: qrCodeUrl,
    });

    res.status(201).json({
      message: "Certificate created successfully",
      certificate: certificate,
    });
  } catch (error) {
    res.status(500).json({
      message:"Something went wrong with certificate creation",
      error: error.message
    });
  }
};

export const verifyCertificate = async (req, res) => {
  try {
    const { serial } = req.params;

    const cert = await Certificate.findOne({ serialNumber: serial });

    if (!cert || !cert.isValid) {
      return res
        .status(404)
        .json({ valid: false, message: "Invalid certificate" });
    }

    return res.json({
      valid: true,
      student: cert.studentName,
      course: cert.courseName,
      issuedAt: cert.issuedAt,
    });
  } catch (error) {
    res.status(500).json({
      message:"Something went wrong with certificate verification",
      error: error.message
    });
  }
};

export const deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const cert = await Certificate.findByIdAndDelete(id);
    if (!cert) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    res.status(200).json({ message: "Certificate deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message:"Something went wrong with certificate deletion",
      error: error.message
    });
  }
};

export const getCertificates = async (req,res) => {
  try {
    const cert = await Certificate.find();
    res.status(200).json(cert);
  } catch (error) {
    res.status(500).json({
      message:"Something went wrong",
      error: error.message
    });
  }
}
