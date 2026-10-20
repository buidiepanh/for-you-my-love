import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Flower2, Heart } from "lucide-react";
import { letter } from "../data/content";

/* ---------- Trục cuộn (trên & dưới) ---------- */
function Roller() {
  return (
    <div className="relative z-10 h-7 sm:h-8">
      <div
        className="absolute inset-0 rounded-full shadow-lg shadow-pink-300/60"
        style={{
          background:
            "linear-gradient(180deg,#fda4c3 0%,#fff1f6 38%,#f9a8d4 62%,#e879a8 100%)",
        }}
      />
      {["-left-1.5", "-right-1.5"].map((pos) => (
        <span
          key={pos}
          className={`absolute ${pos} top-1/2 h-[140%] w-3.5 -translate-y-1/2 rounded-full shadow-md shadow-pink-300/70`}
          style={{
            background:
              "radial-gradient(circle at 35% 30%,#fff1f6 0%,#f472b6 55%,#be185d 100%)",
          }}
        />
      ))}
    </div>
  );
}

/* ---------- Animation chữ ---------- */
const content = {
  hidden: {},
  show: { transition: { staggerChildren: 0.28, delayChildren: 0.9 } },
};
const child = {
  hidden: { opacity: 0, y: 16, transition: { duration: 0.25 } },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Letter() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false); // luôn đóng lúc đầu

  const toggle = () => setOpen((v) => !v);

  // Nút "Mở thư của anh" (href="#letter") ở Hero: cuộn xuống rồi mở thư
  useEffect(() => {
    let timer;
    const onClick = (e) => {
      if (e.target.closest?.('a[href="#letter"]')) {
        clearTimeout(timer);
        timer = setTimeout(() => setOpen(true), 450);
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      clearTimeout(timer);
    };
  }, []);

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <section id="letter" className="relative px-5 py-24 sm:py-32">
      <div
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-label={open ? "Cuộn thư lại" : "Mở thư"}
        onClick={toggle}
        onKeyDown={onKeyDown}
        className="relative mx-auto max-w-3xl cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
      >
        <Roller />

        {/* Giấy thư: height 0 <-> auto */}
        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0 }}
          transition={{
            duration: reduce ? 0 : open ? 2.6 : 1.5,
            ease: [0.65, 0, 0.35, 1],
          }}
          className="mx-4 overflow-hidden border-x border-pink-100 sm:mx-6"
          style={{
            background: "linear-gradient(180deg,#fff9fb 0%,#fff3f7 100%)",
            boxShadow:
              "inset 0 12px 16px -12px rgba(244,114,182,.35), inset 0 -12px 16px -12px rgba(244,114,182,.35)",
          }}
        >
          <motion.div
            variants={content}
            initial="hidden"
            animate={open ? "show" : "hidden"}
            className="px-6 py-12 sm:px-14 sm:py-16"
          >
            <motion.div variants={child} className="flex justify-center">
              <Flower2
                size={44}
                className="rounded-full bg-pink-100 p-2.5 text-rose-400"
              />
            </motion.div>

            <motion.h2
              variants={child}
              className="mt-6 text-center font-script text-5xl font-bold text-rose-500 sm:text-6xl"
            >
              {letter.greeting}
            </motion.h2>

            <div className="mt-10 space-y-6 font-letter text-lg leading-[1.9] text-rose-950/80 sm:text-xl">
              {letter.paragraphs.map((text, i) => (
                <motion.p key={i} variants={child}>
                  {text}
                </motion.p>
              ))}
            </div>

            <motion.div variants={child} className="mt-12 text-right">
              <p className="font-script text-3xl text-rose-400">
                {letter.closing}
              </p>
              <p className="mt-1 flex items-center justify-end gap-2 font-script text-4xl font-bold text-rose-500">
                {letter.signature}
                <Heart
                  size={22}
                  fill="currentColor"
                  className="animate-pulse"
                />
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        <Roller />

        {/* Dấu niêm: chỉ hiện khi thư đang cuộn */}
        <AnimatePresence>
          {!open && (
            <motion.span
              key="seal"
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.3 } }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="absolute left-1/2 top-7 z-20 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-white shadow-xl shadow-rose-400/50 sm:top-8 sm:h-[4.5rem] sm:w-[4.5rem]"
              style={{
                background:
                  "radial-gradient(circle at 35% 30%,#fb7185 0%,#e11d48 60%,#9f1239 100%)",
              }}
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-rose-400/40" />
              <Heart size={28} fill="currentColor" className="relative" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Gợi ý nhỏ */}
        <AnimatePresence>
          {!open && (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute left-0 right-0 top-full mt-10 text-center font-script text-2xl text-rose-400"
            >
              Chạm vào lá thư để mở nhé
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
