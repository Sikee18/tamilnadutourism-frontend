"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Utensils, MapPin, Calendar, Sparkles } from "lucide-react"

const regions = [
  {
    id: "chettinad",
    name: "Chettinad",
    title: "The Spice Kingdom",
    description:
      "Known for its fiery, aromatic cuisine, Chettinad food is a celebration of freshly ground spices and bold flavors. The Nattukotai Chettiars, merchant traders of yore, brought influences from across Asia to create dishes that are uniquely complex.",
    dishes: [
      { name: "Chettinad Chicken", description: "Star anise, fennel, and 20+ spices create this legendary dish" },
      { name: "Kavuni Arisi", description: "Black rice pudding with coconut milk and jaggery" },
      { name: "Karaikudi Biryani", description: "Fragrant rice layered with spiced meat and seeraga samba" },
    ],
    heritage:
      "The cuisine evolved from the Chettiars' trading routes across Southeast Asia, incorporating ingredients like star anise and tamarind in ways unique to this region.",
    season:
      "October to March offers the best weather for exploring Chettinad's palatial mansions and sampling authentic cuisine.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "madurai",
    name: "Madurai",
    title: "Temple Town Flavors",
    description:
      "The ancient city of Madurai offers a culinary experience deeply intertwined with temple traditions. Street food here is an art form, with recipes passed down through generations of vendors.",
    dishes: [
      { name: "Jigarthanda", description: "Iconic chilled drink with almond gum, milk, and ice cream" },
      { name: "Kari Dosai", description: "Thin crepe topped with spiced mutton keema" },
      { name: "Paruthi Paal", description: "Cottonseed milk, a protein-rich traditional drink" },
    ],
    heritage:
      "Food offerings at the Meenakshi Temple have influenced the city's vegetarian traditions, while the bustling streets showcase the non-vegetarian heritage of the region.",
    season: "Visit during the Chithirai Festival (April-May) to experience special temple prasadam and festive foods.",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "tanjore",
    name: "Thanjavur",
    title: "The Rice Bowl",
    description:
      "The fertile Cauvery delta has made Thanjavur the granary of Tamil Nadu. The cuisine here celebrates rice in countless forms, from fluffy steamed varieties to fermented delicacies.",
    dishes: [
      { name: "Thanjavur Sambhar", description: "Distinctive dal preparation with drumstick and local vegetables" },
      { name: "Degree Coffee", description: "Filter coffee brewed with chicory, served in brass vessels" },
      { name: "Adhirasam", description: "Deep-fried rice and jaggery sweet, a temple tradition" },
    ],
    heritage:
      "The Brihadeeswara Temple's daily offerings have preserved ancient recipes that date back to the Chola dynasty's golden age.",
    season:
      "Pongal (January) is the harvest festival when Thanjavur celebrates with special rice preparations and traditional sweets.",
    image: "https://images.unsplash.com/photo-1603766806347-54cdf3745953?fm=jpg&q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "coastal",
    name: "Coastal Tamil Nadu",
    title: "Gifts from the Sea",
    description:
      "From Rameswaram to Chennai, the coastline offers a seafood tradition that reflects both ancient fishing communities and colonial influences from the French and British.",
    dishes: [
      { name: "Meen Kuzhambu", description: "Tamarind-based fish curry with coastal spices" },
      { name: "Crab Masala", description: "Fresh mud crabs in a thick, spicy gravy" },
      { name: "Eral Thokku", description: "Dry prawn preparation with curry leaves and chillies" },
    ],
    heritage:
      "Fishing communities along the coast have developed preservation techniques and recipes that make the most of each day's catch.",
    season:
      "September to February brings the freshest catches and pleasant coastal weather for exploring fishing villages.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "kongunadu",
    name: "Kongunadu",
    title: "Western Ghats Cuisine",
    description:
      "The Kongu region around Coimbatore blends hill station influences with traditional farming communities. The food is hearty, featuring local millets and unique preparations.",
    dishes: [
      { name: "Kola Urundai", description: "Spiced meatballs in a thick, aromatic gravy" },
      { name: "Kelvaragu Dosai", description: "Ragi crepes, rich in iron and traditional to the hills" },
      { name: "Thengai Paal Kurma", description: "Coconut milk-based vegetable stew" },
    ],
    heritage:
      "The Kongu Vellalar community's agricultural traditions have shaped a cuisine that celebrates local produce and seasonal eating.",
    season:
      "The monsoon months (June-August) bring fresh vegetables and make for a perfect time to explore the region's comfort foods.",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop",
  },
]

const foodTrails = [
  {
    id: "street-food",
    title: "Street Food Trail",
    subtitle: "From dawn to dusk through Tamil Nadu's iconic street eats",
    locations: [
      {
        place: "Marina Beach, Chennai",
        dish: "Sundal & Murukku",
        time: "Evening",
        context: "Beach vendors have sold these evening snacks for generations",
      },
      {
        place: "Madurai",
        dish: "Jigarthanda & Kari Dosai",
        time: "Night",
        context: "The original Jigarthanda was created here in the 1970s",
      },
      {
        place: "Coimbatore",
        dish: "Angannan Bun & Filter Coffee",
        time: "Morning",
        context: "Soft buns paired with strong filter coffee, a mill worker tradition",
      },
    ],
  },
  {
    id: "temple-food",
    title: "Temple Food Trail",
    subtitle: "Sacred offerings and prasadam across ancient shrines",
    locations: [
      {
        place: "Palani Murugan Temple",
        dish: "Panchamirtham",
        time: "Morning",
        context: "Divine mixture of banana, jaggery, ghee, honey, and cardamom",
      },
      {
        place: "Madurai Meenakshi Temple",
        dish: "Temple Prasadam",
        time: "Afternoon",
        context: "Vegetarian sattvic food prepared with ancient recipes",
      },
      {
        place: "Srirangam Temple",
        dish: "Iyengar Puliyogare",
        time: "Morning",
        context: "Tamarind rice perfected by temple cooks over centuries",
      },
    ],
  },
  {
    id: "coastal-food",
    title: "Coastal Food Trail",
    subtitle: "Fresh catches and fishing village traditions",
    locations: [
      {
        place: "Rameswaram",
        dish: "Seeraga Samba Fish Biryani",
        time: "Lunch",
        context: "Made with freshly caught fish and aromatic short-grain rice",
      },
      {
        place: "Nagapattinam",
        dish: "Crab Masala",
        time: "Evening",
        context: "Mud crabs prepared with coastal spices by fishing families",
      },
      {
        place: "Pondicherry",
        dish: "Fish Curry with French Influence",
        time: "Dinner",
        context: "Unique fusion of Tamil and French colonial cooking",
      },
    ],
  },
]

const culturalContext = [
  {
    title: "Pongal Celebrations",
    season: "January",
    description:
      "The harvest festival where sweet Pongal (rice and jaggery) is cooked outdoors in clay pots, symbolizing prosperity and abundance.",
    significance:
      "Celebrates the Tamil month of Thai when the sun moves northward. The first rice of the harvest is offered to the Sun God.",
  },
  {
    title: "Temple Prasadam",
    season: "Year-round",
    description:
      "Food offerings made to deities and distributed to devotees. Each temple has signature dishes prepared using ancient recipes.",
    significance:
      "Not just food but blessed sustenance. Temple kitchens follow strict purity protocols and vegetarian traditions dating back centuries.",
  },
  {
    title: "Chettinad Feasts",
    season: "Weddings & Festivals",
    description:
      "Multi-course meals served on banana leaves featuring 20+ dishes, showcasing the region's spice mastery and hospitality traditions.",
    significance:
      "The Chettiars' trading wealth and travels brought global influences. Each feast is a culinary performance passed through generations.",
  },
  {
    title: "Tiffin Culture",
    season: "Daily",
    description:
      "Morning tiffin (breakfast) includes idli, dosa, pongal, and vada - fermented rice and lentil preparations that define Tamil mornings.",
    significance:
      "These dishes require preparation the night before, reflecting the culture of planning and the science of fermentation for health.",
  },
]

export default function CulinaryPage() {
  const [activeSection, setActiveSection] = useState("regions")
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map())

  const [userLocation, setUserLocation] = useState("Chennai")
  const [visitTime, setVisitTime] = useState("Winter")

  const getRecommendation = () => {
    const recommendations: Record<string, { dishes: string[]; reason: string }> = {
      "Chennai-Winter": {
        dishes: ["Filter Coffee at Mylapore", "Sundal at Marina Beach", "Kothu Parotta in Triplicane"],
        reason: "Winter is perfect for beach-side snacks and hot filter coffee in Chennai's cultural heart.",
      },
      "Chennai-Summer": {
        dishes: ["Tender Coconut", "Jigarthanda", "Lemon Rice"],
        reason: "Beat the summer heat with refreshing drinks and cooling comfort foods.",
      },
      "Madurai-Winter": {
        dishes: ["Jigarthanda", "Kari Dosai", "Paruthi Paal"],
        reason: "Winter is ideal for exploring Madurai's iconic street food without the intense heat.",
      },
      "Madurai-Summer": {
        dishes: ["Jigarthanda", "Panagam (Jaggery drink)", "Watermelon Juice"],
        reason: "Summer calls for Madurai's legendary cooling beverages and refreshing treats.",
      },
      "Ooty-Winter": {
        dishes: ["Hot Chocolate", "Varkey (Flaky bread)", "Homemade Chocolates"],
        reason: "Winter in the hills is perfect for warm beverages and hill station specialties.",
      },
    }

    const key = `${userLocation}-${visitTime}`
    return recommendations[key] || recommendations["Chennai-Winter"]
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-id")
          if (id) {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => new Set(prev).add(id))
              if (entry.intersectionRatio > 0.3) {
                setActiveSection(id)
              }
            }
          }
        })
      },
      { threshold: [0.1, 0.3, 0.5] },
    )

    sectionRefs.current.forEach((section) => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = sectionRefs.current.get(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const recommendation = getRecommendation()

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=2670&auto=format&fit=crop"
          alt="Tamil Nadu Culinary Heritage"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" />

        <div className="relative z-10 text-center px-6">
          <p className="text-temple-gold text-sm tracking-[0.3em] uppercase mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            A Culinary Archive
          </p>
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-serif font-light mb-6 text-balance animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Culinary Tamil Nadu
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 text-balance">
            Explore the flavors, traditions, and stories behind Tamil Nadu's legendary cuisine
          </p>
        </div>
      </section>

      {/* Sticky Navigation */}
      <div className="sticky top-16 z-40 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-8 overflow-x-auto py-4 scrollbar-hide">
            {["Regional Cuisines", "Food Trails", "Cultural Context"].map((section, idx) => {
              const id = ["regions", "trails", "culture"][idx]
              return (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`whitespace-nowrap text-sm tracking-wide uppercase transition-all duration-300 pb-1 border-b-2 font-sans ${activeSection === id
                    ? "text-primary border-primary"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                    }`}
                >
                  {section}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Personalized Recommendation Section */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-16 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground">Personalized for You</h2>
            </div>

            <div className="bg-card rounded-xl p-8 border border-border shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-sans font-medium text-foreground mb-2">Where are you?</label>
                  <select
                    value={userLocation}
                    onChange={(e) => setUserLocation(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-sm text-foreground font-sans focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="Chennai">Chennai</option>
                    <option value="Madurai">Madurai</option>
                    <option value="Ooty">Ooty</option>
                    <option value="Coimbatore">Coimbatore</option>
                    <option value="Pondicherry">Pondicherry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-sans font-medium text-foreground mb-2">
                    When are you visiting?
                  </label>
                  <select
                    value={visitTime}
                    onChange={(e) => setVisitTime(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-sm text-foreground font-sans focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="Winter">Winter (Oct-Mar)</option>
                    <option value="Summer">Summer (Apr-Sep)</option>
                  </select>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="text-lg font-sans font-semibold text-foreground mb-3">Recommended for You</h3>
                <p className="text-sm font-sans text-muted-foreground mb-4">{recommendation.reason}</p>
                <div className="space-y-2">
                  {recommendation.dishes.map((dish, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-sans text-foreground font-medium">{dish}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Cuisines Section */}
      <div
        ref={(el) => {
          if (el) sectionRefs.current.set("regions", el)
        }}
        data-id="regions"
        className="container mx-auto px-6 py-16"
      >
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground mb-4">Regional Cuisines</h2>
          <p className="text-muted-foreground font-sans leading-relaxed max-w-3xl">
            Each region of Tamil Nadu tells its culinary story through unique ingredients, techniques, and traditions
            shaped by geography, history, and community.
          </p>
        </div>

        {regions.map((region, index) => (
          <section
            key={region.id}
            className={`py-16 border-b border-border last:border-b-0 transform transition-all duration-700 ${visibleSections.has("regions") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
            >
              {/* Image */}
              <div
                className={`relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg ${index % 2 === 1 ? "lg:order-2" : ""}`}
              >
                <Image
                  src={region.image}
                  alt={region.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <p className="text-primary text-sm tracking-[0.3em] uppercase mb-2 font-sans">{region.name}</p>
                <h3 className="text-3xl md:text-4xl font-serif font-light text-foreground mb-4">{region.title}</h3>
                <p className="text-muted-foreground font-sans leading-relaxed mb-8">{region.description}</p>

                {/* Signature Dishes */}
                <div className="mb-8">
                  <h4 className="text-lg font-sans font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-primary" />
                    Signature Dishes
                  </h4>
                  <div className="space-y-4">
                    {region.dishes.map((dish) => (
                      <div key={dish.name} className="border-l-2 border-primary pl-4">
                        <h5 className="font-sans font-medium text-foreground">{dish.name}</h5>
                        <p className="text-sm font-sans text-muted-foreground">{dish.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Heritage */}
                <div className="bg-muted/50 rounded-lg p-6 mb-6">
                  <h4 className="text-sm font-sans tracking-wide uppercase text-primary mb-2">Culinary Heritage</h4>
                  <p className="text-muted-foreground font-sans text-sm leading-relaxed">{region.heritage}</p>
                </div>

                {/* Best Season */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-sans font-medium text-foreground mb-1">Best Time to Visit</h4>
                    <p className="text-sm font-sans text-muted-foreground">{region.season}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Food Trails Section */}
      <div
        ref={(el) => {
          if (el) sectionRefs.current.set("trails", el)
        }}
        data-id="trails"
        className="bg-muted/30 py-24"
      >
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground mb-4">Food Trails</h2>
            <p className="text-muted-foreground font-sans leading-relaxed max-w-3xl">
              Curated culinary journeys that take you through Tamil Nadu's most iconic food experiences, from street
              corners to temple kitchens.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {foodTrails.map((trail, index) => (
              <div
                key={trail.id}
                className={`bg-card rounded-xl p-8 border border-border shadow-md transform transition-all duration-700 hover:shadow-xl ${visibleSections.has("trails") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <h3 className="text-2xl font-serif text-foreground mb-2">{trail.title}</h3>
                <p className="text-sm font-sans text-muted-foreground mb-8">{trail.subtitle}</p>

                <div className="space-y-6">
                  {trail.locations.map((location, idx) => (
                    <div
                      key={idx}
                      className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:rounded-full before:bg-primary/30 before:ring-4 before:ring-primary/10"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-sans font-medium text-foreground">{location.dish}</h4>
                        <span className="text-xs font-sans text-muted-foreground whitespace-nowrap ml-2">
                          {location.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-sans text-muted-foreground mb-2">
                        <MapPin className="w-3 h-3" />
                        {location.place}
                      </div>
                      <p className="text-xs font-sans text-muted-foreground leading-relaxed">{location.context}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cultural Context Section */}
      <div
        ref={(el) => {
          if (el) sectionRefs.current.set("culture", el)
        }}
        data-id="culture"
        className="py-24"
      >
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground mb-4">When & Why We Eat</h2>
            <p className="text-muted-foreground font-sans leading-relaxed max-w-3xl">
              Tamil cuisine is deeply intertwined with seasons, festivals, and spiritual practices. Understanding the
              context enriches the experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {culturalContext.map((context, index) => (
              <div
                key={context.title}
                className={`bg-card rounded-xl p-8 border border-border transform transition-all duration-700 ${visibleSections.has("culture") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-serif text-foreground">{context.title}</h3>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-sans rounded-full">
                    {context.season}
                  </span>
                </div>
                <p className="text-muted-foreground font-sans leading-relaxed mb-4">{context.description}</p>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-sans text-muted-foreground leading-relaxed italic">
                    {context.significance}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
