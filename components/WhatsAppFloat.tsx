/* components/WhatsAppFloat.tsx */
"use client";
import Link from "next/link";
export default function WhatsAppFloat() {
  return (
    <Link
      href="https://wa.me/573123397154"
      className="fixed right-5 bottom-5 z-50"
      aria-label="Chatear por WhatsApp"
    >
      <img
        src="/whatsapp.svg"
        alt=""
        className="w-14 h-14 drop-shadow-lg hover:scale-110 transition"
      />
    </Link>
  );
}
