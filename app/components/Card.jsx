export default function Card({ children }) {
  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
      {children}
    </div>
  );
}
