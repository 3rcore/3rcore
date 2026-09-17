'use client';
import { motion } from 'framer-motion';
import { useTranslations } from "next-intl";
import BrandOrb from "@/components/ui/BrandOrb";

export default function PageLoader() {
  const t = useTranslations('preload');

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white"
    >
      <div className="flex flex-col items-center">
        <BrandOrb state="searching" size={64} label={t('text')} />
        <p className="mt-4 font-light tracking-widest uppercase text-sm">{t('text')}</p>
      </div>
    </motion.div>
  );
}
