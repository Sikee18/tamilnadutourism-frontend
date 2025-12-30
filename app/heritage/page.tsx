"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Play, Eye, Info, ChevronRight } from "lucide-react"

const heritageSites = [
  {
    id: "mahabalipuram",
    name: "Mahabalipuram",
    subtitle: "UNESCO World Heritage Site",
    era: "7th Century CE",
    dynasty: "Pallava Dynasty",
    heroImage: "https://images.unsplash.com/photo-1586708682826-4256fe5b68b6?q=80&w=1920&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/foRUxDm0-IM",
    description:
      "Mahabalipuram stands as a testament to the architectural brilliance of the Pallava dynasty. These rock-cut monuments along the Coromandel Coast showcase the evolution of Dravidian temple architecture, blending artistic expression with religious devotion. The Shore Temple, kissed by the waves of the Bay of Bengal, represents one of the earliest structural stone temples in South India.",
    sections: {
      what: "Mahabalipuram, also known as Mamallapuram, is a historic port city that flourished under the Pallava kings. The monuments here include the iconic Shore Temple with its twin spires, the Five Rathas (monolithic temples carved from single granite boulders), and the world's largest open-air rock relief known as Arjuna's Penance.",
      why: "These monuments are living textbooks of stone carving artistry. The Shore Temple demonstrates advanced understanding of structural engineering in the 7th century, while the Five Rathas showcase five distinct architectural styles in miniature. Arjuna's Penance, measuring 27 meters by 9 meters, depicts over 100 figures including gods, humans, and animals in intricate detail.",
      observe: [
        "The Shore Temple's twin spires dedicated to Shiva and Vishnu, showing religious harmony",
        "The Five Rathas, each carved from a single granite boulder in different architectural styles",
        "Arjuna's Penance - the world's largest open-air rock relief depicting the descent of the Ganges",
        "Krishna's Butterball - a massive boulder defying gravity on a steep slope",
      ],
      significance:
        "The artistic techniques developed at Mahabalipuram influenced temple architecture across Southeast Asia, from Angkor Wat in Cambodia to Prambanan in Java. The stone carving methods and architectural proportions became templates for centuries of temple construction.",
    },
  },
  {
    id: "thanjavur",
    name: "Brihadeeswara Temple",
    subtitle: "The Great Living Chola Temple",
    era: "11th Century CE",
    dynasty: "Chola Dynasty",
    heroImage: "https://images.unsplash.com/photo-1701665837448-cdbb9fab5a0d?q=80&w=1920&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/MtaMt3xRiuk",
    description:
      "The Brihadeeswara Temple represents the zenith of Chola architectural achievement. Built by Raja Raja Chola I in 1010 CE, this architectural marvel showcases innovative engineering techniques that remain impressive even by modern standards. The temple's vimana towers 66 meters high, crowned by an 80-ton granite capstone - a feat that continues to puzzle engineers today.",
    sections: {
      what: "Built entirely of granite, the temple complex features a massive vimana (temple tower), a 16-foot Nandi statue carved from a single rock, and walls adorned with frescoes from the Chola and later Nayak periods. The temple demonstrates perfect proportions and advanced engineering knowledge.",
      why: "The temple's construction required transporting the 80-ton capstone to the top of the 66-meter tower without modern machinery. Theories suggest the use of a 6-kilometer-long ramp. The temple walls feature 108 Bharatanatyam poses, making it an encyclopedia of classical dance preserved in stone.",
      observe: [
        "The 66-meter vimana crowned by a single 80-ton granite capstone",
        "The colossal Nandi statue carved from a single 25-ton rock",
        "The 108 Bharatanatyam dance poses carved on the temple walls",
        "The ancient frescoes revealing stories from the Ramayana and Mahabharata",
      ],
      significance:
        "This temple established architectural standards that influenced temple construction throughout South India and Southeast Asia. It represents the political power and cultural refinement of the Chola empire at its peak.",
    },
  },
  {
    id: "madurai",
    name: "Meenakshi Temple",
    subtitle: "The Living Temple City",
    era: "12th-17th Century CE",
    dynasty: "Pandya & Nayak Dynasties",
    heroImage: "https://images.unsplash.com/photo-1692173248120-59547c3d4653?q=80&w=1920&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/uGHfjT_ny8Q",
    description:
      "The Meenakshi Amman Temple forms the sacred heart of Madurai, one of the oldest continuously inhabited cities in the world. With 14 towering gopurams adorned with 33,000 colorful sculptures, the temple is a living monument where ancient rituals continue unbroken for over a millennium. Daily ceremonies, annual festivals, and constant devotee presence make this truly a 'living temple.'",
    sections: {
      what: "Dedicated to Goddess Meenakshi (Parvati) and Lord Sundareswarar (Shiva), the temple complex covers 45 acres. The 14 gopurams rise between 45 to 52 meters, each surface covered with painted stucco figures depicting gods, demons, humans, and animals in vivid colors.",
      why: "The temple represents the culmination of Dravidian architecture and the integration of art, religion, and daily life. The Hall of a Thousand Pillars features musical columns that produce different notes when tapped, demonstrating advanced acoustic engineering. The Golden Lotus Tank serves as a sacred bathing pool believed to judge the quality of literary works.",
      observe: [
        "The 14 gopurams covered with thousands of painted stucco sculptures",
        "The Hall of a Thousand Pillars with musical columns producing distinct notes",
        "The Golden Lotus Tank where manuscripts were traditionally tested",
        "The shrine of Meenakshi with its emerald-green idol adorned with jewels",
      ],
      significance:
        "The temple embodies the essence of Tamil culture and Shaivite tradition. It has been a center of Tamil literature, learning, and devotion for centuries, influencing religious practices across Tamil Nadu.",
    },
  },
  {
    id: "rameswaram",
    name: "Ramanathaswamy Temple",
    subtitle: "The Sacred Corridor",
    era: "12th Century CE onwards",
    dynasty: "Pandya & Setupathi",
    heroImage: "https://images.unsplash.com/photo-1701665836329-57c6a17a2daf?q=80&w=1920&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/YVsNPlIhuU0",
    description:
      "The Ramanathaswamy Temple on Rameswaram Island holds unique religious significance as both a Jyotirlinga shrine and one of the Char Dham pilgrimage sites. Its architectural highlight is the longest temple corridor in India, featuring 1,212 intricately carved granite pillars. The temple's 22 sacred wells, each with water of different taste and temperature, represent a geological marvel.",
    sections: {
      what: "Located on a small island connected to mainland India, this temple is dedicated to Lord Shiva. According to legend, this is where Lord Rama worshipped Shiva to absolve himself of killing Ravana. The temple's corridors stretch 197 meters, creating a mesmerizing perspective.",
      why: "The temple uniquely combines Shaiva and Vaishnava traditions, symbolizing religious harmony in Hindu philosophy. The 22 theerthams (sacred wells) are believed to have medicinal properties, and pilgrims ritually bathe in each well. The architectural achievement of the corridors with perfect alignment and proportion is remarkable.",
      observe: [
        "The third corridor - the longest in any Indian temple at 197 meters",
        "The 1,212 massive granite pillars, each uniquely carved",
        "The 22 sacred wells (theerthams) with water of varying taste and temperature",
        "The Gandhamadana Parvatham offering panoramic views of the island",
      ],
      significance:
        "The temple represents the synthesis of mythology, architecture, and devotion. It demonstrates how religious beliefs shaped monumental architecture and how pilgrimage traditions have been preserved for centuries.",
    },
  },
]

export default function HeritagePage() {
  const [selectedSite, setSelectedSite] = useState(heritageSites[0])
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [selectedSite])

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2600&auto=format&fit=crop"
          alt="Tamil Nadu Heritage"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />

        <div className="relative z-10 text-center px-6">
          <p className="text-temple-gold text-sm tracking-[0.3em] uppercase mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Digital Museum Experience
          </p>
          <h1 className="text-white text-4xl md:text-6xl font-light mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Heritage of Tamil Nadu
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            Explore the architectural marvels and living traditions of ancient Tamil civilization
          </p>
        </div>
      </section>

      {/* Site Selection */}
      <section className="py-8 border-b border-border bg-card">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
            {heritageSites.map((site) => (
              <button
                key={site.id}
                onClick={() => setSelectedSite(site)}
                className={`whitespace-nowrap px-5 py-3 rounded-sm transition-all ${selectedSite.id === site.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent text-foreground hover:bg-muted"
                  }`}
              >
                {site.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Site Content */}
      <section ref={sectionRef} className="py-16">
        <div className="container mx-auto px-6">
          {/* Hero Image */}
          <div
            className={`relative aspect-[21/9] rounded-sm overflow-hidden mb-12 transform transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <Image
              src={selectedSite.heroImage}
              alt={selectedSite.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-temple-gold text-sm tracking-widest uppercase mb-2">
                {selectedSite.dynasty} • {selectedSite.era}
              </p>
              <h2 className="text-white text-3xl md:text-4xl font-light mb-2">{selectedSite.name}</h2>
              <p className="text-white/80">{selectedSite.subtitle}</p>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* What */}
              <div
                className={`transform transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
              >
                <h3 className="text-xl font-medium text-foreground mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  What This Place Is
                </h3>
                <p className="text-muted-foreground leading-relaxed">{selectedSite.sections.what}</p>
              </div>

              {/* Why */}
              <div
                className={`transform transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
              >
                <h3 className="text-xl font-medium text-foreground mb-4">Why It Matters</h3>
                <p className="text-muted-foreground leading-relaxed">{selectedSite.sections.why}</p>
              </div>

              {/* What to Observe */}
              <div
                className={`transform transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
              >
                <h3 className="text-xl font-medium text-foreground mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-secondary" />
                  What to Observe While Visiting
                </h3>
                <ul className="space-y-3">
                  {selectedSite.sections.observe.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-secondary text-sm">{index + 1}</span>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cultural Significance */}
              <div
                className={`bg-accent/5 border border-accent/20 rounded-sm p-8 transform transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
              >
                <h3 className="text-xl font-medium text-accent mb-4">Cultural & Architectural Significance</h3>
                <p className="text-foreground leading-relaxed">{selectedSite.sections.significance}</p>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Video Player */}
              <div
                className={`bg-card border border-border rounded-sm p-6 transform transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
              >
                <h3 className="font-medium text-foreground mb-4">Experience This Place Immersively</h3>

                {/* Video Player */}
                <div className="relative aspect-video rounded-sm overflow-hidden mb-4 bg-muted">
                  <iframe
                    width="100%"
                    height="100%"
                    src={selectedSite.videoUrl}
                    title={`${selectedSite.name} Video Tour`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full object-cover"
                  ></iframe>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  Watch this immersive video tour of {selectedSite.name} showcasing its architectural details and
                  cultural significance.
                </p>
              </div>

              {/* Quick Facts */}
              <div className="bg-card border border-border rounded-sm p-6">
                <h3 className="font-medium text-foreground mb-4">Quick Facts</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Era</span>
                    <span className="text-foreground">{selectedSite.era}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dynasty</span>
                    <span className="text-foreground">{selectedSite.dynasty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">UNESCO Status</span>
                    <span className="text-foreground">World Heritage</span>
                  </div>
                </div>
              </div>

              {/* Related Sites */}
              <div className="bg-card border border-border rounded-sm p-6">
                <h3 className="font-medium text-foreground mb-4">Explore More</h3>
                <div className="space-y-3">
                  {heritageSites
                    .filter((site) => site.id !== selectedSite.id)
                    .slice(0, 3)
                    .map((site) => (
                      <button
                        key={site.id}
                        onClick={() => setSelectedSite(site)}
                        className="w-full flex items-center justify-between p-3 bg-muted rounded-sm hover:bg-muted/80 transition-colors text-left"
                      >
                        <span className="text-sm text-foreground">{site.name}</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </button>
                    ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
