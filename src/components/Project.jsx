// src/components/Project.jsx
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const Project = () => {
  // Anda bisa membuat array of objects untuk data proyek
  return (
    <section id="projects" className="py-20">
       <h2 className="text-4xl font-bold text-center mb-12">My <span className="text-cyan-400">Projects</span></h2>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="p-6 bg-slate-800 rounded-lg"
        // Ulangi div ini untuk setiap proyek
      >
        {/* Ganti dengan gambar proyek Anda */}
                <div className="w-full h-56 bg-slate-700 rounded-t-lg"></div>
        <div className="p-4">
          <h3 className="text-2xl font-bold">Project Title</h3>
          <p className="mt-2 text-slate-300">Deskripsi singkat proyek Anda.</p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-cyan-400"><Github /></a>
            <a href="#" className="hover:text-cyan-400"><ExternalLink /></a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Project;