import { NextResponse } from "next/server";

const authHeader = () =>
  "Basic " +
  Buffer.from(
    `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`,
  ).toString("base64");

export async function POST(req) {
  try {
    const { amount } = await req.json();
    console.log("amount received:", amount);
    const rupees = Number(amount);

    if (!rupees || rupees <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const paise = Math.round(rupees * 100); // Razorpay needs paise
    // 2 hours is the max for single_use; subtract 60s as a safety margin
    const closeBy = Math.floor(Date.now() / 1000) + 2 * 60 * 60 - 60;

    const res = await fetch("https://api.razorpay.com/v1/payments/qr_codes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader(),
      },
      body: JSON.stringify({
        type: "upi_qr",
        name: "Order Payment",
        usage: "single_use",
        fixed_amount: true,
        payment_amount: paise,
        description: `Payment of INR ${rupees}`,
        close_by: closeBy,
        notes: { purpose: "nextjs-qr-test" },
      }),
    });

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.error?.description || "Razorpay error" },
        { status: res.status },
      );
    }

    return NextResponse.json({
      id: data.id,
      image_url: data.image_url,
      payment_amount: data.payment_amount,
      close_by: data.close_by, // use Razorpay's returned value
      status: data.status,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
