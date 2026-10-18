import "./globals.css";

export const metadata = {
  title: "بوابة أعضاء مسار الويب",
  description: "تجربة Google Login وإدارة طلبات العضوية",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
