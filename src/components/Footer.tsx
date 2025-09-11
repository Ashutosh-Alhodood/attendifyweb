export default function Footer() {
  return (
    <footer className="py-10 text-center text-xs text-neutral-500">
      © {new Date().getFullYear()} Attendify. All rights reserved.
    </footer>
  );
}