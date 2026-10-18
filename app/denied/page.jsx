import Link from "next/link";

export default function Denied() {
  return (
    <main>
      <section className="card">
        <h1>تعذر إكمال تسجيل الدخول</h1>

        <p>تأكد من إعدادات Google وحاول مرة أخرى.</p>

        <Link className="button primary" href="/">
          العودة إلى الصفحة الرئيسية
        </Link>
      </section>
    </main>
  );
}
