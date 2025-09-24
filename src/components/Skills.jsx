// src/components/Skills.jsx
import { motion } from "framer-motion";

// Impor ikon dari devicons-react
import ReactOriginal from 'devicons-react/icons/ReactOriginal';
import TailwindcssOriginal from 'devicons-react/icons/TailwindcssOriginal';
import JavascriptOriginal from 'devicons-react/icons/JavascriptOriginal';
import TypescriptOriginal from 'devicons-react/icons/TypescriptOriginal';
import FigmaOriginal from 'devicons-react/icons/FigmaOriginal';
import PhpOriginal from 'devicons-react/icons/PhpOriginal';
import LaravelOriginal from 'devicons-react/icons/LaravelOriginal';
import NodejsOriginalWordmark from 'devicons-react/icons/NodejsOriginalWordmark';
import MysqlOriginalWordmark from 'devicons-react/icons/MysqlOriginalWordmark';
import FramermotionOriginal from 'devicons-react/icons/FramermotionOriginal';
import Html5Original from 'devicons-react/icons/Html5Original';
import SupabaseOriginal from 'devicons-react/icons/SupabaseOriginal';
import VitejsOriginal from 'devicons-react/icons/VitejsOriginal';
import GitOriginal from 'devicons-react/icons/GitOriginal';
import BunOriginal from 'devicons-react/icons/BunOriginal';

// Kita tidak perlu properti 'color' lagi, karena ikon sudah punya warna sendiri
const skills = [
  { name: "React JS", icon: <ReactOriginal size="100%"/> },
  { name: "Tailwind CSS", icon: <TailwindcssOriginal size="100%"/> },
  { name: "Javascript", icon: <JavascriptOriginal size="100%"/> },
  { name: "Typescript", icon: <TypescriptOriginal size="100%"/> },
  { name: "HTML", icon: <Html5Original size="100%"/> },
  { name: "PHP", icon: <PhpOriginal size="100%"/> },
  { name: "Laravel", icon: <LaravelOriginal size="100%"/> },
  { name: "Node JS", icon: <NodejsOriginalWordmark size="100%"/> },
  { name: "MySQL", icon: <MysqlOriginalWordmark size="100%"/> },
  { name: "Supabase", icon: <SupabaseOriginal size="100%"/> },
  { name: "Vite JS", icon: <VitejsOriginal size="100%"/> },
  { name: "Framer Motion", icon: <FramermotionOriginal size="100%"/> },
  { name: "Figma", icon: <FigmaOriginal size="100%"/> },
  { name: "Git", icon: <GitOriginal size="100%"/> },
  { name: "Bun JS", icon: <BunOriginal size="100%"/> },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 px-4 bg-gray-900"> {/* Ganti background agar lebih kontras */}
      <h2 className="text-4xl font-bold text-center mb-12 text-white">
        My <span className="text-cyan-400">Skills</span>
      </h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto"
      >
        {skills.map((skill) => (
          <motion.div
            key={skill.name}
            variants={itemVariants}
            className="group flex flex-col items-center justify-center p-6 bg-gray-800 rounded-xl hover:shadow-cyan-400/20 hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
          >
            {/* INI BAGIAN UTAMA PERUBAHANNYA */}
            <div className="w-20 h-20 filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-300">
              {skill.icon}
            </div>
            <p className="mt-4 text-center font-semibold text-white">
              {skill.name}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;