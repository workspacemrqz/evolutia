import { motion } from "framer-motion";

export default function HelpSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 bg-[#060606] help-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={itemVariants} className="mt-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 uppercase">
              Sua empresa está parada? A IA faz ela evoluir.
            </h2>

            <p className="text-[#BCBCBC] mb-8 leading-relaxed">
              Processos manuais, decisões lentas e custos altos travam seu crescimento. Com nossos agentes de IA, você automatiza tarefas, entende seus dados e economiza. Mais agilidade, decisões mais certeiras e lucro maior
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <img
              src="https://i.ibb.co/VY7jGhYT/TV.png"
              alt="Transforme sua empresa"
              className="w-96 h-auto rounded-lg"
            />
          </motion.div>
        </motion.div>


      </div>
    </section>
  );
}
