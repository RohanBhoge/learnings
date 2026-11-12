"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

const UPI_ID = "bhogerohan12@oksbi";
const PAYEE_NAME = "Rohan Bhoge";

export default function UpiQR({ amount = 1, invoiceId }) {
  const [src, setSrc] = useState("");

  useEffect(() => {
    const params = new URLSearchParams({
      pa: UPI_ID,
      pn: PAYEE_NAME,
      am: Number(amount).toFixed(2),
      cu: "INR",
      tn: `Invoice ${invoiceId}`,
      tr: String(invoiceId),
    });
    const link = `upi://pay?${params.toString()}`;
    QRCode.toDataURL(link, { width: 260, margin: 1 }).then(setSrc);
  }, [amount, invoiceId]);

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Pay ₹{Number(amount).toFixed(2)}</h3>
      {src && <img src={src} alt="UPI QR" width={260} height={260} />}
      <p>Scan with any UPI app. Invoice: {invoiceId}</p>
    </div>
  );
}
