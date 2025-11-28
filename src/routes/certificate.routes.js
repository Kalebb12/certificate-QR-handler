import express from "express"
import { createCertificate, deleteCertificate, getCertificates, verifyCertificate } from "../controllers/certificate.controller.js";

const router = express.Router();

router.get("/",getCertificates)
router.post("/create",createCertificate)
router.get("/verify/:serial",verifyCertificate)
router.delete("/delete/:id",deleteCertificate)

export default router