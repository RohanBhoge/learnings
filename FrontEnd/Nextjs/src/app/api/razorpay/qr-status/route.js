import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const authHeader = () =>
  "Basic " +
  Buffer.from(
    `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`,
  ).toString("base64");

export async function GET(req) {
  try {
    const id = new URL(req.url).searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "id required" }, { status: 400 });
    }

    const res = await fetch(
      `https://api.razorpay.com/v1/payments/qr_codes/${id}`,
      { headers: { Authorization: authHeader() }, cache: "no-store" },
    );
    const data = await res.json();
    console.log("razorpay response:", res.status, data); // <-- add

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.error?.description || "Razorpay error" },
        { status: res.status },
      );
    }

    const paid =
      data.payments_count_received > 0 || data.close_reason === "paid";

    return NextResponse.json({
      status: data.status, // "active" | "closed"
      close_reason: data.close_reason,
      paid,
      payments_amount_received: data.payments_amount_received,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
