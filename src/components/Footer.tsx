export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-6 text-center">
      <p className="text-xs text-white/30">
        © {new Date().getFullYear()} Michael Go. All rights reserved.
      </p>
    </footer>
  );
}
