"use server";

import { auth } from "@/auth";
import { database } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function decideMembership(formData) {
  const session = await auth();
  const email = session?.user?.email?.trim().toLowerCase();
  const owner = process.env.OWNER_EMAIL?.trim().toLowerCase();

  if (!email || !owner || email !== owner) {
    throw new Error("Not authorized");
  }

  const target = String(formData.get("email") || "")
    .trim()
    .toLowerCase();

  const decision = String(formData.get("decision") || "");
  const valid = ["APPROVED", "REJECTED", "EXCLUDED"];

  if (!target || !valid.includes(decision) || target === owner) {
    throw new Error("Invalid request");
  }

  const sql = database();

  await sql`
    UPDATE membership_requests
    SET status = ${decision}, updated_at = NOW()
    WHERE email = ${target}
  `;

  revalidatePath("/admin");
}
