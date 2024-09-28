import Navbar from "@/components/Navbar";
import "../styles/globals.css";
import Provider from "@/components/Provider";

export const metadata = {
  title: "Promptopia",
  description: "Discover and Share Ai Prompt ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className=" gradient" />
          </div>
          <main className=" app">
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
