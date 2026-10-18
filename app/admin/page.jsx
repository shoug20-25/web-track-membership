import { auth, signOut } from "@/auth";
import { database } from "@/lib/db";
import { redirect } from "next/navigation";
import { decideMembership } from "./actions";

export default async function AdminPage() {
  const session = await auth();
  const email = session?.user?.email?.trim().toLowerCase();
  const owner = process.env.OWNER_EMAIL?.trim().toLowerCase();

  if (!email) redirect("/");
  if (!owner || email !== owner) redirect("/dashboard");

  const sql = database();

  const requests = await sql`
    SELECT email, full_name, status, created_at, updated_at
    FROM membership_requests
    ORDER BY created_at DESC
  `;

  const labels = {
    PENDING: "قيد المراجعة",
    APPROVED: "مقبول",
    REJECTED: "مرفوض",
    EXCLUDED: "مستبعد",
  };

  return (
    <main>
      <section className="card">
        <div className="tag">OWNER DASHBOARD</div>
        <h1>لوحة إدارة العضويات</h1>
        <p>أهلًا بمالك الموقع. هنا تراجع الطلبات وتتخذ القرار.</p>
        <p className="small">عدد الطلبات: {requests.length}</p>

        <div className="list">
          {requests.length === 0 && <p>لا توجد طلبات بعد.</p>}

          {requests.map((item) => (
            <div className="request" key={item.email}>
              <strong>{item.full_name}</strong>
              <p className="small">{item.email}</p>
              <p className="status">
                الحالة: {labels[item.status] || item.status}
              </p>

              <div className="actions">
                {[
                  ["APPROVED", "قبول", "accept"],
                  ["REJECTED", "رفض", "reject"],
                  ["EXCLUDED", "استبعاد", "exclude"],
                ].map(([value, title, cls]) => (
                  <form action={decideMembership} key={value}>
                    <input type="hidden" name="email" value={item.email} />
                    <input type="hidden" name="decision" value={value} />
                    <button type="submit" className={cls}>
                      {title}
                    </button>
                  </form>
                ))}
              </div>
            </div>
          ))}
        </div>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button className="button" type="submit">
            تسجيل الخروج
          </button>
        </form>
      </section>
    </main>
  );
}
