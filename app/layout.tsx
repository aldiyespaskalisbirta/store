import "../styles/globals.css";
import Navbar from "./Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="light">
      <head />
      <body>
        <Navbar />
        <div className="app w-full grid justify-center">
          <main className="justify-center">{children}</main>
        </div>
      </body>
    </html>
  );
}
