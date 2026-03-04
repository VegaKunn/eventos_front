import "./globals.css";
export const metadata = {
  title: "Sistema de Eventos",
  description: "Projeto Faculdade",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
        {children}
      </body>
    </html>
  );
}
