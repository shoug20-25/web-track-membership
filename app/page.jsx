import { auth, signIn } from "@/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <main>
      <section className="card">
        <div className="dots">
          <span className="dot blue" />
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>

        <div className="tag">WEB DEVELOPMENT TRACK</div>

        <h1>بوابة أعضاء مسار الويب</h1>

        <p>
          هذه الصفحة مخصصة لأعضاء مسار تصميم وتطوير مواقع الويب.
        </p>

        <p>سجّل دخولك باستخدام Google لإرسال طلب عضوية تجريبي.</p>

        {session?.user ? (
          <Link className="button primary" href="/dashboard">
            عرض حالة طلبي
          </Link>
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/dashboard" });
            }}
          >
            <button className="button primary" type="submit">
              المتابعة باستخدام Google
            </button>
          </form>
        )}

        <p className="small">
          Google تتحقق من هويتك، ومالك الموقع يقرر حالة عضويتك.
        </p>
      </section>
    </main>
  );
}
