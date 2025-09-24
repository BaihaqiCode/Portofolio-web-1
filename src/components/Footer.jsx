// src/components/Footer.jsx
import { motion } from 'framer-motion';
// PERUBAHAN 1: Impor ikon baru dan hapus yang tidak dipakai
import { Github, Linkedin, Instagram, MessageSquare } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.2 }}
      className="border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center p-8 gap-4">
        <p className="text-slate-400 text-sm text-center md:text-left">
          © {currentYear} BaihaqiCode. All Rights Reserved.
        </p>
        
        {/* --- PERUBAHAN 2: Ganti link dan ikon sosial media --- */}
        <div className="flex gap-6">
          {/* Ganti 'username-anda' dengan username GitHub Anda */}
          <a href="https://github.com/BaihaqiCode?tab=overview&from=2025-06-01&to=2025-06-30" target="_blank" rel="noopener noreferrer" aria-label="Github" className="text-slate-400 hover:text-cyan-400 transition-colors">
            <Github />
          </a>
          
          {/* Ganti 'username-anda' dengan username LinkedIn Anda */}
          <a href="https://www.linkedin.com/in/baihaqi-abdul-hakim-61b7ba284 " target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-400 hover:text-cyan-400 transition-colors">
            <Linkedin />
          </a>
          
          {/* Ganti 'username-anda' dengan username Instagram Anda */}
          <a href="https://www.instagram.com/baihaqi_abha?igsh=dmljeWZpcG5sY2Rw" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-slate-400 hover:text-cyan-400 transition-colors">
            <Instagram />
          </a>

          {/* Ganti 62... dengan nomor WhatsApp Anda diawali kode negara */}
          <a href="https://wa.me/6285959305145" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-slate-400 hover:text-cyan-400 transition-colors">
            <MessageSquare />
          </a>
        </div>
        {/* --- AKHIR PERUBAHAN --- */}
        
      </div>
    </motion.footer>
  );
};

export default Footer;