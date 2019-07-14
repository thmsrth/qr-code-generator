import QRCode from "qrcode"

export async function generateQRCodeInCanvas(value, domId) {
    try {
        await QRCode.toCanvas(document.getElementById(domId), value);
      } catch (err) {
        console.error(err)
      }
}
