import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Heart } from "lucide-react";
import { hero } from "../data/content";

// Tách three.js ra chunk riêng → trang tải nhanh hơn
const Rose3D = lazy(() => import("./Rose3D"));

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-6 py-10">
      {/* Đốm sáng nền mềm */}
      <div className="pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-pink-300/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 -z-10 h-80 w-80 rounded-full bg-rose-300/40 blur-3xl" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-4 lg:grid-cols-2">
        {/* Hoa 3D */}
        <div className="order-1 h-[46svh] min-h-[300px] lg:order-2 lg:h-[78vh]">
          <Suspense
            fallback={
              <div className="grid h-full place-items-center">
                <Heart
                  size={48}
                  className="animate-pulse text-rose-300"
                  fill="currentColor"
                />
              </div>
            }
          >
            <Rose3D />
          </Suspense>
        </div>

        {/* Chữ */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="order-2 text-center lg:order-1 lg:text-left"
        >
          <motion.p
            variants={item}
            className="font-script text-2xl text-rose-400 sm:text-3xl"
          >
            {hero.greeting}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-3 font-script text-4xl font-bold text-rose-500 sm:text-5xl"
          >
            {hero.scriptLine}
          </motion.p>

          <motion.h1
            variants={item}
            className="bg-linear-to-r from-rose-400 via-pink-400 to-fuchsia-400 bg-clip-text font-display text-[5.5rem] font-bold leading-none text-transparent sm:text-[8rem] lg:text-[10rem]"
          >
            {hero.bigText}
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-5 max-w-md text-base font-light leading-relaxed text-rose-900/80 sm:text-lg lg:mx-0"
          >
            {hero.subtitle}
          </motion.p>

          <motion.a
            variants={item}
            href="#letter"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-rose-400 px-7 py-3 text-base font-medium text-white shadow-lg shadow-rose-300/50 transition hover:-translate-y-0.5 hover:bg-rose-500"
          >
            {hero.cta}
            <ChevronDown size={18} className="animate-bounce" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
