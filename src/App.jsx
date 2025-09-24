// src/App.jsx

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ParticlesComponent from "./components/ParticlesComponent";

// Impor semua komponen Anda
import Loader from "./components/Loader.jsx";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Project from "./components/Project";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoaderFinished = () => {
    setLoading(false);
  };

  return (
    // POINT 1: Container utama harus 'relative' untuk menjadi acuan
    // bagi partikel yang posisinya 'absolute'.
    <div className="relative bg-slate-900 text-white min-h-screen">
      <AnimatePresence>
        {loading ? (
          <motion.div key="loader">
            <Loader onLoaded={handleLoaderFinished} />
          </motion.div>
        ) : (
          // POINT 2: Kita bungkus semua konten yang sudah di-load
          // dengan satu motion.div agar AnimatePresence bekerja dengan baik
          // dan struktur lapisan kita benar.
          <motion.div key="content">
            <ParticlesComponent />

            {/* Konten aplikasi sekarang akan dirender di atas partikel */}
            <Navbar />
            {/* Kita buat 'main' menjadi relative juga untuk memastikan
                ia punya stacking context sendiri di atas partikel. */}
            <main className="relative px-8 md:px-20 lg:px-32">
              <Hero />
              <Skills />
              <Project />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Kesalahan ketik {" "} sudah dihapus */}
    </div>
  );
}

export default App;