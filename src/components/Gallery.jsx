import { motion } from "framer-motion";
import { Image } from "antd";
import { Maximize2 } from "lucide-react";
import { gallery } from "../data/content";

export default function Gallery() {
  return (
    <section className="px-5 pb-24 pt-10 sm:pb-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto mb-12 max-w-2xl text-center"
      >
        <h2 className="font-display text-4xl font-bold text-rose-500 sm:text-5xl">
          {gallery.title}
        </h2>
        <p className="mt-4 font-script text-2xl text-rose-400 sm:text-3xl">
          {gallery.subtitle}
        </p>
      </motion.div>

      <Image.PreviewGroup>
        <div className="mx-auto max-w-5xl columns-2 gap-4 sm:gap-6 md:columns-3">
          {gallery.photos.map((p, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08 }}
              className={`mb-4 break-inside-avoid rounded-2xl bg-white p-2 shadow-lg shadow-pink-200/60 transition-transform duration-300 hover:rotate-0 sm:mb-6 sm:p-3 ${
                i % 2 ? "rotate-1" : "-rotate-1"
              }`}
            >
              <div
                className="photo overflow-hidden rounded-xl"
                style={{ aspectRatio: `${p.w} / ${p.h}` }}
              >
                <Image
                  src={p.src}
                  alt={p.caption}
                  loading="lazy"
                  decoding="async"
                  preview={{
                    mask: (
                      <span className="flex items-center gap-1 text-sm">
                        <Maximize2 size={14} /> Xem ảnh
                      </span>
                    ),
                  }}
                />
              </div>
              <figcaption className="px-1 pb-1 pt-3 text-center">
                <p className="font-script text-xl font-bold text-rose-500 sm:text-2xl">
                  {p.caption}
                </p>
                <p className="text-xs text-rose-300">{p.date}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Image.PreviewGroup>
    </section>
  );
}
