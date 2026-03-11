"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import MagneticButton from "./MagneticButton";
import { useI18n } from "@/lib/i18n";

interface Paper {
  id: string;
  title: string;
  authors: string;
  year: number;
  venue: string;
  url?: string;
}

function citationUrl(citationId: string): string {
  return `https://scholar.google.com/citations?view_op=view_citation&hl=en&user=NOSPtp8AAAAJ&citation_for_view=${citationId}`;
}

const papers: Paper[] = [
  // 2026
  {
    id: "bos2026",
    title: "Perspective-taking and meaning-making among public policy professionals experiencing an immersive poverty narrative",
    authors: "Bos, S. G., Brüggen, L., van der Werf, M., & Heller, J.",
    year: 2026,
    venue: "Forthcoming",
    url: citationUrl("NOSPtp8AAAAJ:rO6llkc54NcC"),
  },
  {
    id: "glebova2026",
    title: "Immersive environments",
    authors: "Glebova, E. & Heller, J.",
    year: 2026,
    venue: "International Encyclopedia of Business Management",
    url: "https://doi.org/10.1016/b978-0-443-13701-3.00395-9",
  },
  // 2025
  {
    id: "barrett2025",
    title: "Customer engagement in utilitarian vs. hedonic service contexts",
    authors: "Barrett, J. A. M., Jaakkola, E., Heller, J., & Brüggen, E. C.",
    year: 2025,
    venue: "Journal of Service Research 28 (4), 614-633",
    url: "https://doi.org/10.1177/10946705241242901",
  },
  {
    id: "dipalma2025",
    title: "Does using virtual reality to enhance students' presentation skills work? The role of feedback and presence",
    authors: "Di Palma, R., Beausaert, S., Mahr, D., Heller, J., & Hilken, T.",
    year: 2025,
    venue: "Journal of Computer Assisted Learning 41 (5), e70097",
    url: "https://doi.org/10.1111/jcal.70097",
  },
  {
    id: "dong2025",
    title: "Does using augmented reality in online shopping affect post-purchase product perceptions? A mixed design using machine-learning based sentiment analysis, lab experiments, and focus groups",
    authors: "Dong, X., Hu, C., Heller, J., & Deng, N.",
    year: 2025,
    venue: "International Journal of Information Management 82, 102872",
    url: "https://doi.org/10.1016/j.ijinfomgt.2025.102872",
  },
  {
    id: "mahr2025",
    title: "Immersion and regulation: Extended reality technologies, their impact on innovation and policy recommendations",
    authors: "Mahr, D., Heller, J., Hilken, T., & GUMBI Center",
    year: 2025,
    venue: "SEM Policy Brief Collection, 69-76",
    url: citationUrl("NOSPtp8AAAAJ:pqnbT2bcN3wC"),
  },
  {
    id: "herold2025",
    title: "Brave new procurement deals: An experimental study of how generative artificial intelligence reshapes buyer–supplier negotiations",
    authors: "Herold, S., Heller, J., Rozemeijer, F., & Mahr, D.",
    year: 2025,
    venue: "Journal of Purchasing and Supply Management, 101012",
    url: "https://doi.org/10.1016/j.pursup.2025.101012",
  },
  {
    id: "becker2025",
    title: "Introducing Researchchatai: An easy-to-use, open-source tool to build conversational AI agents for management and leadership research",
    authors: "Becker, M., De Jong, D., Briker, R., Mennens, K., Heller, J., Mahr, D., & Grewal, D.",
    year: 2025,
    venue: "Preprint",
    url: "https://doi.org/10.2139/ssrn.5188853",
  },
  // 2024
  {
    id: "windhausen2024",
    title: "Exploring the impact of augmented reality smart glasses on worker well-being in warehouse order picking",
    authors: "Windhausen, A., Heller, J., Hilken, T., Mahr, D., Di Palma, R., & Quintens, L.",
    year: 2024,
    venue: "Computers in Human Behavior 155, 108153",
    url: "https://doi.org/10.1016/j.chb.2024.108153",
  },
  {
    id: "rauschnabel2024",
    title: "The 4C framework: Towards a holistic understanding of consumer engagement with augmented reality",
    authors: "Rauschnabel, P. A., Felix, R., Heller, J., & Hinsch, C.",
    year: 2024,
    venue: "Computers in Human Behavior 154, 108105",
    url: "https://doi.org/10.1016/j.chb.2023.108105",
  },
  {
    id: "moonen2024",
    title: "Immersion or social presence? Investigating the effect of virtual reality immersive environments on sommelier learning experiences",
    authors: "Moonen, N., Heller, J., Hilken, T., Danny Han, D. I., & Mahr, D.",
    year: 2024,
    venue: "Journal of Wine Research 35 (2), 101-118",
    url: "https://doi.org/10.1080/09571264.2024.2310297",
  },
  {
    id: "werf2024",
    title: "Challenges of automated financial advice: Definition and ethical considerations",
    authors: "Werf, M., Meacham, D., Brüggen, E., Hogreve, J., Heller, J., Gianni, R., & Post, T.",
    year: 2024,
    venue: "Netspar",
    url: citationUrl("NOSPtp8AAAAJ:ns9cj8rnVeAC"),
  },
  // 2023
  {
    id: "glebova2023",
    title: "Sports venue digital twin technology from a spectator virtual visiting perspective",
    authors: "Glebova, E., Book, R., Su, Y., Perić, M., & Heller, J.",
    year: 2023,
    venue: "Frontiers in Sports and Active Living 5, 1289140",
    url: "https://doi.org/10.3389/fspor.2023.1289140",
  },
  {
    id: "hilken2023",
    title: "Closing the customer imagination gap with augmented and virtual reality",
    authors: "Hilken, T., Heller, J., & Mahr, D.",
    year: 2023,
    venue: "NIM Marketing Intelligence Review 15 (2), 30-35",
    url: "https://doi.org/10.2478/nimmir-2023-0014",
  },
  {
    id: "mahr2023a",
    title: "Die Innovation synthetischer Kundenerlebnisse: Machen ist wichtiger als Denken",
    authors: "Mahr, D., Heller, J., Hilken, T., & Wigger, M.",
    year: 2023,
    venue: "Transfer: Zeitschrift für Kommunikation & Markenmanagement 69 (3)",
    url: citationUrl("NOSPtp8AAAAJ:r0BpntZqJG4C"),
  },
  {
    id: "pfeifer2023",
    title: "More than meets the eye: In-store retail experiences with augmented reality smart glasses",
    authors: "Pfeifer, P., Hilken, T., Heller, J., Alimamy, S., & Di Palma, R.",
    year: 2023,
    venue: "Computers in Human Behavior 146, 107816",
    url: "https://doi.org/10.1016/j.chb.2023.107816",
  },
  {
    id: "mahr2023b",
    title: "Augmented reality (AR): The blurring of reality in human-computer interaction",
    authors: "Mahr, D., Heller, J., & de Ruyter, K.",
    year: 2023,
    venue: "Book Chapter",
    url: "https://doi.org/10.1016/j.chb.2023.107755",
  },
  {
    id: "herold2023",
    title: "Dynamic capabilities for digital procurement transformation: A systematic literature review",
    authors: "Herold, S., Heller, J., Rozemeijer, F., & Mahr, D.",
    year: 2023,
    venue: "International Journal of Physical Distribution & Logistics Management 53 (4)",
    url: "https://doi.org/10.1108/IJPDLM-12-2021-0535",
  },
  {
    id: "heller2023",
    title: "An interdisciplinary co-authorship networking perspective on AR and human behavior: Taking stock and moving ahead",
    authors: "Heller, J., Mahr, D., de Ruyter, K., Schaap, E., Hilken, T., Keeling, D. I., Chylinski, M., Flavián, C., Jung, T., & Rauschnabel, P. A.",
    year: 2023,
    venue: "Computers in Human Behavior 143, 107697",
    url: "https://doi.org/10.1016/j.chb.2023.107697",
  },
  {
    id: "ciuchita2023",
    title: "It is really not a game: An integrative review of gamification for service research",
    authors: "Ciuchita, R., Heller, J., Köcher, S., Leclercq, T., Sidaoui, K., & Stead, S.",
    year: 2023,
    venue: "Journal of Service Research 26 (1), 3-20",
    url: "https://doi.org/10.1177/10946705221076272",
  },
  // 2022
  {
    id: "chylinski2022",
    title: "The customer loyalty journey: Technology-enabled loyalty touchpoints",
    authors: "Chylinski, M. & Heller, J.",
    year: 2022,
    venue: "Handbook of Research on Customer Loyalty, 42-54",
    url: "https://doi.org/10.4337/9781800371637.00009",
  },
  {
    id: "hilken2022c",
    title: "Exploring the frontiers in reality-enhanced service communication: From augmented and virtual reality to neuro-enhanced reality",
    authors: "Hilken, T., Chylinski, M., de Ruyter, K., Heller, J., & Keeling, D. I.",
    year: 2022,
    venue: "Journal of Service Management 33 (4-5), 657-674",
    url: "https://doi.org/10.1108/JOSM-11-2021-0439",
  },
  {
    id: "golfpapez2022",
    title: "Embracing falsity through the metaverse: The case of synthetic customer experiences",
    authors: "Golf-Papez, M., Heller, J., Hilken, T., Chylinski, M., de Ruyter, K., Keeling, D. I., & Mahr, D.",
    year: 2022,
    venue: "Business Horizons",
    url: "https://doi.org/10.1016/j.bushor.2022.07.007",
  },
  {
    id: "hilken2022d",
    title: "Disrupting marketing realities: A research agenda for investigating the psychological mechanisms of next-generation experiences with reality-enhancing technologies",
    authors: "Hilken, T., Keeling, D. I., Chylinski, M., de Ruyter, K., Heller, J., Mahr, D., & Rauschnabel, P. A.",
    year: 2022,
    venue: "Psychology & Marketing",
    url: "https://doi.org/10.1002/mar.21678",
  },
  {
    id: "hilken2022a",
    title: "Bridging imagination gaps on the path to purchase with augmented reality: Field and experimental evidence",
    authors: "Hilken, T., Heller, J., Keeling, D. I., Chylinski, M., Mahr, D., & de Ruyter, K.",
    year: 2022,
    venue: "Journal of Interactive Marketing 57 (2), 356-375",
    url: "https://doi.org/10.1177/10949968221083555",
  },
  {
    id: "hilken2022b",
    title: "How to strategically choose or combine augmented and virtual reality for improved online experiential retailing",
    authors: "Hilken, T., Chylinski, M., Keeling, D. I., Heller, J., de Ruyter, K., & Mahr, D.",
    year: 2022,
    venue: "Psychology & Marketing 39 (3), 495-507",
    url: "https://doi.org/10.1002/mar.21600",
  },
  // 2021
  {
    id: "lammerding2021",
    title: "Too real for comfort: Measuring consumers' augmented reality information privacy concerns",
    authors: "Lammerding, L., Hilken, T., Mahr, D., & Heller, J.",
    year: 2021,
    venue: "Augmented Reality and Virtual Reality, Springer",
    url: "https://doi.org/10.1007/978-3-030-68086-2_8",
  },
  {
    id: "heller2021",
    title: "Tangible service automation: Decomposing the technology-enabled engagement process (TEEP) for augmented reality",
    authors: "Heller, J., Chylinski, M., de Ruyter, K., Keeling, D. I., Hilken, T., & Mahr, D.",
    year: 2021,
    venue: "Journal of Service Research 24 (1), 84-103",
    url: "https://doi.org/10.1177/1094670520933692",
  },
  // 2020
  {
    id: "chylinski2020",
    title: "Augmented reality marketing: A technology-enabled approach to situated customer experience",
    authors: "Chylinski, M., Heller, J., Hilken, T., Keeling, D. I., Mahr, D., & de Ruyter, K.",
    year: 2020,
    venue: "Australasian Marketing Journal 28 (4), 374-384",
    url: "https://doi.org/10.1016/j.ausmj.2020.04.004",
  },
  {
    id: "jessen2020",
    title: "The playground effect: How augmented reality drives creative customer engagement",
    authors: "Jessen, A., Hilken, T., Chylinski, M., Mahr, D., Heller, J., Keeling, D. I., & de Ruyter, K.",
    year: 2020,
    venue: "Journal of Business Research 116, 85-98",
    url: "https://doi.org/10.1016/j.jbusres.2020.05.002",
  },
  {
    id: "vanesch2020",
    title: "The moderating influence of country of origin information seeking on homophily and product satisfaction",
    authors: "Van Esch, P., Northey, G., Duffy, S., Heller, J., & Striluk, M.",
    year: 2020,
    venue: "Country of Origin Effect, Springer, 40-56",
    url: "https://doi.org/10.1080/10496491.2018.1378300",
  },
  {
    id: "deruyter2020",
    title: "Seeing with the customer's eye: Exploring the challenges and opportunities of AR advertising",
    authors: "de Ruyter, K., Heller, J., Hilken, T., Chylinski, M., Keeling, D. I., & Mahr, D.",
    year: 2020,
    venue: "Journal of Advertising 49 (2), 109-124",
    url: "https://doi.org/10.1080/00913367.2020.1740123",
  },
  // 2019
  {
    id: "heller2019b",
    title: "Touching the untouchable: Exploring multi-sensory augmented reality in the context of online retailing",
    authors: "Heller, J., Chylinski, M., de Ruyter, K., Mahr, D., & Keeling, D. I.",
    year: 2019,
    venue: "Journal of Retailing 95 (4), 228-244",
    url: "https://doi.org/10.1016/j.jretai.2019.10.008",
  },
  {
    id: "vanesch2019a",
    title: "The effects of inner packaging color on the desirability of food",
    authors: "Van Esch, P., Heller, J., & Northey, G.",
    year: 2019,
    venue: "Journal of Retailing and Consumer Services 50, 94-102",
    url: "https://doi.org/10.1016/j.jretconser.2019.05.003",
  },
  {
    id: "vanesch2019b",
    title: "ExerStart: Helping seniors be active and independent for less",
    authors: "Van Esch, P., Duffy, S. M., Teufel, J., Northey, G., Elder, E., Frethey-Bentham, C., & Heller, J.",
    year: 2019,
    venue: "Journal of Social Marketing 9 (2), 146-160",
    url: "https://doi.org/10.1108/JSOCM-06-2018-0065",
  },
  {
    id: "carrozzi2019",
    title: "What's mine is a hologram? How shared augmented reality augments psychological ownership",
    authors: "Carrozzi, A., Chylinski, M., Heller, J., Hilken, T., Keeling, D. I., & de Ruyter, K.",
    year: 2019,
    venue: "Journal of Interactive Marketing 48, 71-88",
    url: "https://doi.org/10.1016/j.intmar.2019.05.004",
  },
  {
    id: "heller2019a",
    title: "Let me imagine that for you: Transforming the retail frontline through augmenting customer mental imagery ability",
    authors: "Heller, J., Chylinski, M., de Ruyter, K., Mahr, D., & Keeling, D. I.",
    year: 2019,
    venue: "Journal of Retailing 95 (2), 94-114",
    url: "https://doi.org/10.1016/j.jretai.2019.03.005",
  },
  {
    id: "mahr2019",
    title: "A review of AR and VR interventions in retail industry",
    authors: "Mahr, D., Heller, J., & Foxman, M.",
    year: 2019,
    venue: "Working Paper",
    url: citationUrl("NOSPtp8AAAAJ:vV6vV6tmYwMC"),
  },
  // 2018
  {
    id: "hilken2018",
    title: "Making omnichannel an augmented reality: The current and future state of the art",
    authors: "Hilken, T., Heller, J., Chylinski, M., Keeling, D. I., Mahr, D., & de Ruyter, K.",
    year: 2018,
    venue: "Journal of Research in Interactive Marketing 12 (4), 509-523",
    url: "https://doi.org/10.1108/JRIM-01-2018-0023",
  },
];

export default function Publications() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [showAll, setShowAll] = useState(false);
  const { t } = useI18n();

  const displayed = showAll ? papers : papers.slice(0, 6);

  return (
    <section id="publications" className="py-14 sm:py-16 px-6">
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
            {t("pub.eyebrow")}
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: "var(--color-text)" }}
          >
            {t("pub.title")}
          </h2>
          <div className="flex gap-6 text-sm" style={{ color: "var(--color-text-secondary)" }}>
            <span>{papers.length} {t("pub.count")}</span>
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
              href={paper.url ?? `https://scholar.google.com/scholar?q=${encodeURIComponent(`"${paper.title}"`)}`}
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
              {showAll ? t("pub.showLess") : `${t("pub.showAll")} ${papers.length} ${t("pub.papers")}`}
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
