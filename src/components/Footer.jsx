import { Heart } from "lucide-react";
import { footerText } from "../data/content";

export default function Footer() {
  return (
    <footer className="pb-12 text-center">
      <Heart
        size={28}
        fill="currentColor"
        className="mx-auto animate-pulse text-rose-400"
      />
      <p className="mt-3 font-script text-2xl text-rose-400 sm:text-3xl">
        {footerText}
      </p>
    </footer>
  );
}
