export default function Navbar({ onSearch }: { onSearch: (q: string) => void }) {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold">My Items App</h1>
      <input
        className="rounded p-1 text-black"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </nav>
  );
}
