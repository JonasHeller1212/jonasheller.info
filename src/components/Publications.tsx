"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import MagneticButton from "./MagneticButton";

interface Paper {
  id: string;
  title: string;
  authors: string;
  year: number;
  venue: string;
  url: string;
}

const papers: Paper[] = [
  {
    id: "glebova2026",
    title: "Immersive environments",
    authors: "Glebova, E. & Heller, J.",
    year: 2026,
    venue: "International Encyclopedia of Business Management, Elsevier",
    url: "https://cris.maastrichtuniversity.nl/en/persons/jonas-heller",
  },
  {
    id: "barrett2025",
    title: "Customer engagement in utilitarian vs. hedonic service contexts",
    authors: "Barrett, J. A. M., Jaakkola, E., Heller, J., & Brüggen, E. C.",
    year: 2025,
    venue: "Journal of Service Research",
    url: "https://doi.org/10.1177/10946705241242901",
  },
  {
    id: "herold2025",
    title: "Brave new procurement deals: An experimental study of how generative artificial intelligence reshapes buyer–supplier negotiations",
    authors: "Herold, S., Heller, J., Rozemeijer, F., & Mahr, D.",
    year: 2025,
    venue: "Journal of Purchasing and Supply Management",
    url: "https://doi.org/10.1016/j.pursup.2025.101012",
  },
  {
    id: "dong2025",
    title: "Does using augmented reality in online shopping affect post-purchase product perceptions? A mixed design using machine-learning based sentiment analysis, lab experiments, and focus groups",
    authors: "Dong, X., Hu, C., Heller, J., & Deng, N.",
    year: 2025,
    venue: "International Journal of Information Management",
    url: "https://doi.org/10.1016/j.ijinfomgt.2024.102872",
  },
  {
    id: "dipalma2025",
    title: "Does using virtual reality to enhance students' presentation skills work? The role of feedback and presence",
    authors: "di Palma, R., Beausaert, S., Mahr, D., Heller, J., & Hilken, T.",
    year: 2025,
    venue: "Journal of Computer Assisted Learning",
    url: "https://doi.org/10.1111/jcal.70097",
  },
  {
    id: "becker2025",
    title: "Introducing Researchchatai: An easy-to-use, open-source tool to build conversational AI agents for management and leadership research",
    authors: "Becker, M., de Jong, D., Briker, R., Heller, J., & Grewal, D.",
    year: 2025,
    venue: "Preprint",
    url: "https://cris.maastrichtuniversity.nl/en/persons/jonas-heller",
  },
  {
    id: "mahr2025",
    title: "Immersion and regulation: Extended reality technologies, their impact on innovation and policy recommendations",
    authors: "Mahr, D., Heller, J., & Hilken, T.",
    year: 2025,
    venue: "SEM Policy Brief Collection, Maastricht University Press",
    url: "https://cris.maastrichtuniversity.nl/en/persons/jonas-heller",
  },
  {
    id: "windhausen2024",
    title: "Exploring the impact of augmented reality smart glasses on worker well-being in warehouse order picking",
    authors: "Windhausen, A., Heller, J., Hilken, T., Mahr, D., Di Palma, R., & Quintens, L.",
    year: 2024,
    venue: "Computers in Human Behavior",
    url: "https://doi.org/10.1016/j.chb.2024.108153",
  },
  {
    id: "rauschnabel2024",
    title: "The 4C framework: Towards a holistic understanding of consumer engagement with augmented reality",
    authors: "Rauschnabel, P. A., Felix, R., Heller, J., & Hinsch, C.",
    year: 2024,
    venue: "Computers in Human Behavior",
    url: "https://doi.org/10.1016/j.chb.2024.108105",
  },
  {
    id: "moonen2024",
    title: "Immersion or social presence? Investigating the effect of virtual reality immersive environments on sommelier learning experiences",
    authors: "Moonen, N., Heller, J., Hilken, T., Han, D. I., & Mahr, D.",
    year: 2024,
    venue: "Journal of Wine Research",
    url: "https://doi.org/10.1080/09571264.2024.2345678",
  },
  {
    id: "werf2024",
    title: "Challenges of automated financial advice: Definition and ethical considerations",
    authors: "van der Werf, M., Meacham, D., Brüggen, E., Hogreve, J., Heller, J., Gianni, R., & Post, T.",
    year: 2024,
    venue: "Netspar",
    url: "https://www.netspar.nl/en/",
  },
  {
    id: "ciuchita2023",
    title: "It is really not a game: An integrative review of gamification for service research",
    authors: "Ciuchita, R., Heller, J., Köcher, S., Leclercq, T., Sidaoui, K., & Stead, S.",
    year: 2023,
    venue: "Journal of Service Research",
    url: "https://doi.org/10.1177/10946705221076272",
  },
  {
    id: "heller2023",
    title: "An interdisciplinary co-authorship networking perspective on AR and human behavior: Taking stock and moving ahead",
    authors: "Heller, J., Mahr, D., de Ruyter, K., Schaap, E., Hilken, T., Keeling, D. I., Chylinski, M., Flavián, C., Jung, T., & Rauschnabel, P. A.",
    year: 2023,
    venue: "Computers in Human Behavior",
    url: "https://doi.org/10.1016/j.chb.2023.107681",
  },
  {
    id: "glebova2023",
    title: "Sports venue digital twin technology from a spectator virtual visiting perspective",
    authors: "Glebova, E., Book, R., Su, Y., Perić, M., & Heller, J.",
    year: 2023,
    venue: "Frontiers in Sports and Active Living",
    url: "https://doi.org/10.3389/fspor.2023.1289140",
  },
  {
    id: "golfpapez2022",
    title: "Embracing falsity through the metaverse: The case of synthetic customer experiences",
    authors: "Golf-Papez, M., Heller, J., Hilken, T., Chylinski, M., de Ruyter, K., Keeling, D. I., & Mahr, D.",
    year: 2022,
    venue: "Business Horizons",
    url: "https://doi.org/10.1016/j.bushor.2022.08.007",
  },
  {
    id: "hilken2022a",
    title: "Bridging imagination gaps on the path to purchase with augmented reality: Field and experimental evidence",
    authors: "Hilken, T., Heller, J., Keeling, D. I., Chylinski, M., Mahr, D., & de Ruyter, K.",
    year: 2022,
    venue: "Journal of Consumer Psychology",
    url: "https://doi.org/10.1177/10949968221083555",
  },
  {
    id: "hilken2022b",
    title: "How to strategically choose or combine augmented and virtual reality for improved online experiential retailing",
    authors: "Hilken, T., Chylinski, M., Keeling, D. I., Heller, J., de Ruyter, K., & Mahr, D.",
    year: 2022,
    venue: "Psychology & Marketing",
    url: "https://doi.org/10.1002/mar.21600",
  },
  {
    id: "hilken2022c",
    title: "Exploring the frontiers in reality-enhanced service communication: From augmented and virtual reality to neuro-enhanced reality",
    authors: "Hilken, T., Chylinski, M., de Ruyter, K., Heller, J., & Keeling, D. I.",
    year: 2022,
    venue: "Journal of Service Management",
    url: "https://doi.org/10.1108/JOSM-11-2021-0439",
  },
  {
    id: "heller2021",
    title: "Tangible service automation: Decomposing the technology-enabled engagement process (TEEP) for augmented reality",
    authors: "Heller, J., Chylinski, M., de Ruyter, K., Keeling, D. I., Hilken, T., & Mahr, D.",
    year: 2021,
    venue: "Journal of Service Research",
    url: "https://doi.org/10.1177/1094670520933692",
  },
  {
    id: "lammerding2021",
    title: "Too real for comfort: Measuring consumers' augmented reality information privacy concerns",
    authors: "Lammerding, L., Hilken, T., Mahr, D., & Heller, J.",
    year: 2021,
    venue: "Augmented Reality and Virtual Reality, Springer",
    url: "https://doi.org/10.1007/978-3-030-68086-2_8",
  },
  {
    id: "chylinski2020",
    title: "Augmented reality marketing: A technology-enabled approach to situated customer experience",
    authors: "Chylinski, M., Heller, J., Hilken, T., Keeling, D. I., Mahr, D., & de Ruyter, K.",
    year: 2020,
    venue: "Australasian Marketing Journal",
    url: "https://doi.org/10.1016/j.ausmj.2020.04.004",
  },
  {
    id: "deruyter2020",
    title: "Seeing with the customer's eye: Exploring the challenges and opportunities of AR advertising",
    authors: "de Ruyter, K., Heller, J., Hilken, T., Chylinski, M., Keeling, D. I., & Mahr, D.",
    year: 2020,
    venue: "Journal of Advertising",
    url: "https://doi.org/10.1080/00913367.2020.1740123",
  },
  {
    id: "jessen2020",
    title: "The playground effect: How augmented reality drives creative customer engagement",
    authors: "Jessen, A., Hilken, T., Chylinski, M., Mahr, D., Heller, J., Keeling, D. I., & de Ruyter, K.",
    year: 2020,
    venue: "Journal of Business Research",
    url: "https://doi.org/10.1016/j.jbusres.2020.05.002",
  },
  {
    id: "heller2019a",
    title: "Let me imagine that for you: Transforming the retail frontline through augmenting customer mental imagery ability",
    authors: "Heller, J., Chylinski, M., de Ruyter, K., Mahr, D., & Keeling, D. I.",
    year: 2019,
    venue: "Journal of Retailing",
    url: "https://doi.org/10.1016/j.jretai.2019.03.005",
  },
  {
    id: "heller2019b",
    title: "Touching the untouchable: Exploring multi-sensory augmented reality in the context of online retailing",
    authors: "Heller, J., Chylinski, M., de Ruyter, K., Mahr, D., & Keeling, D. I.",
    year: 2019,
    venue: "Journal of Retailing",
    url: "https://doi.org/10.1016/j.jretai.2019.10.008",
  },
  {
    id: "carrozzi2019",
    title: "What's mine is a hologram? How shared augmented reality augments psychological ownership",
    authors: "Carrozzi, A., Chylinski, M., Heller, J., Hilken, T., Keeling, D. I., & de Ruyter, K.",
    year: 2019,
    venue: "Journal of Interactive Marketing",
    url: "https://doi.org/10.1016/j.intmar.2019.05.004",
  },
  {
    id: "hilken2018",
    title: "Making omnichannel an augmented reality: The current and future state of the art",
    authors: "Hilken, T., Heller, J., Chylinski, M., Keeling, D. I., Mahr, D., & de Ruyter, K.",
    year: 2018,
    venue: "Journal of Research in Interactive Marketing",
    url: "https://doi.org/10.1108/JRIM-01-2018-0023",
  },
  {
    id: "vanesch2018",
    title: "The moderating influence of country of origin information seeking on homophily and product satisfaction",
    authors: "Van Esch, P., Northey, G., Duffy, S., Heller, J., & Striluk, M.",
    year: 2018,
    venue: "Journal of Promotion Management",
    url: "https://doi.org/10.1080/10496491.2018.1378307",
  },
  {
    id: "heller2017",
    title: "Augmented shopping in a socially situated context: The role of augmentation on purchase decision satisfaction in an online shopping environment",
    authors: "Heller, J., de Ruyter, K., & Chylinski, M.",
    year: 2017,
    venue: "ANZMAC Conference",
    url: "https://cris.maastrichtuniversity.nl/en/publications/augmented-shopping-in-a-socially-situated-context-the-role-of-aug",
  },
];

export default function Publications() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? papers : papers.slice(0, 6);

  return (
    <section id="publications" className="py-24 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "var(--color-accent-secondary)" }}
          >
            Publications
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: "var(--color-text)" }}
          >
            Selected Papers
          </h2>
          <div className="flex gap-6 text-sm" style={{ color: "var(--color-text-secondary)" }}>
            <span>{papers.length} Publications</span>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {displayed.map((paper) => (
            <motion.a
              key={paper.id}
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-xl p-6 hover:scale-[1.02] transition-transform group"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <h3
                className="font-semibold mb-2 leading-snug group-hover:underline decoration-1 underline-offset-4"
                style={{ color: "var(--color-text)" }}
              >
                {paper.title}
              </h3>
              <p className="text-xs mb-2" style={{ color: "var(--color-text-secondary)" }}>
                {paper.authors}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs" style={{ color: "var(--color-text-secondary)" }}>
                <span>{paper.year}</span>
                <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: "var(--color-border)" }}>
                  {paper.venue}
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {papers.length > 6 && (
          <div className="mt-8 text-center">
            <MagneticButton
              className="px-6 py-2 rounded-full text-sm font-semibold border transition-colors"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : `Show All ${papers.length} Papers`}
            </MagneticButton>
          </div>
        )}

        <div className="mt-6 flex justify-center gap-4">
          <a
            href="https://scholar.google.com/citations?user=NOSPtp8AAAAJ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:opacity-70 transition-opacity"
            style={{ color: "var(--color-accent)" }}
          >
            Google Scholar →
          </a>
        </div>
      </div>
    </section>
  );
}
