/* components/WhatsAppFloat.tsx */
"use client";
import Link from "next/link";
export default function WhatsAppFloat() {
  return (
    <Link
      aria-label="Chatear por WhatsApp"
      className="fixed right-5 bottom-5 z-50"
      href="https://wa.me/573123397154"
    >
      <img
        alt=""
        className="w-14 h-14 drop-shadow-lg hover:scale-110 transition"
        src="/whatsapp.svg"
      />
    </Link>
  );
}
