export default function Footer() {
  return (
    <footer className="w-full py-4">
      <div className="container flex items-center justify-center px-4 md:px-6">
        New Gen Performance &copy; {new Date().getFullYear().toString()}. All
        rights
      </div>
    </footer>
  );
}
