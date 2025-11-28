import qrcode from "qrcode"
export const generateQrcode = async (text) => {
  try {
    const url = await qrcode.toDataURL(text)
    return url
  } catch (error) {
    throw new Error("Failed to generate QR code")
  }
}