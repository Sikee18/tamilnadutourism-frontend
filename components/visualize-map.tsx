"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Users, MapPin, Compass, AlertTriangle, ArrowRight, X, Sparkles, Navigation } from "lucide-react"

// --- DATA & LOGIC ---

type DistrictData = {
    id: string
    name: string
    tagline: string
    description: string
    majorPlace: string
    majorPlaceName: string
    image: string
    crowdLevel: "calm" | "moderate" | "busy" | "very-busy"
    alternatives: { name: string; reason: string; type: "alternative" | "hidden-gem" | "nearby" }[]
}

const TAMIL_NADU_DATA: DistrictData[] = [
    {
        id: "chennai",
        name: "Chennai",
        tagline: "The Soul of the South",
        description: "A bustling metropolis where ancient temples meet the world's second-longest urban beach. Experience the vibrant culture, colonial history, and modern energy.",
        majorPlace: "Marina Beach",
        majorPlaceName: "Marina Beach & Lighthouse",
        crowdLevel: "very-busy",
        image: "https://images.unsplash.com/photo-1644852037516-95c8fba481f9?fm=jpg&q=80&w=1600",
        alternatives: [
            { name: "Besant Nagar Beach", reason: "Cleaner, quieter, and hip cafes", type: "alternative" },
            { name: "DakshinaChitra", reason: "immersive cultural craft village", type: "hidden-gem" }
        ]
    },
    {
        id: "madurai",
        name: "Madurai",
        tagline: "The City That Never Sleeps",
        description: "The cultural capital of Tamil Nadu, centered around the majestic Meenakshi Amman Temple. A city of festivals, food, and ancient heritage.",
        majorPlace: "Meenakshi Amman Temple",
        majorPlaceName: "Meenakshi Amman Temple",
        crowdLevel: "busy",
        image: "https://images.unsplash.com/photo-1646056385288-46b2ce4ca4f8?fm=jpg&q=80&w=1600",
        alternatives: [
            { name: "Thirumalai Nayakkar Mahal", reason: "Stunning Dravidian-Islamic architecture", type: "alternative" },
            { name: "Alagar Kovil", reason: "Scenic hill temple with monkeys", type: "nearby" }
        ]
    },
    {
        id: "nilgiris",
        name: "Nilgiris (Ooty)",
        tagline: "Queen of Hill Stations",
        description: "Rolling tea gardens, misty peaks, and the charm of the colonial era. The perfect escape into nature's lap.",
        majorPlace: "Ooty Botanical Gardens",
        majorPlaceName: "Ooty Botanical Gardens",
        crowdLevel: "very-busy",
        image: "https://images.unsplash.com/photo-1724501920728-fb24ac284760?fm=jpg&q=80&w=1600&auto=format&fit=crop",
        alternatives: [
            { name: "Kotagiri", reason: "Untouched tea estates, zero crowds", type: "alternative" },
            { name: "Avalanche Lake", reason: "Pristine eco-tourism spot", type: "hidden-gem" }
        ]
    },
    {
        id: "kanyakumari",
        name: "Kanyakumari",
        tagline: "Where Three Oceans Meet",
        description: "The southernmost tip of India, famous for its sunrise, the Thiruvalluvar Statue, and the confluence of the Indian Ocean, Arabian Sea, and Bay of Bengal.",
        majorPlace: "Vivekananda Rock Memorial",
        majorPlaceName: "Vivekananda Rock",
        crowdLevel: "busy",
        image: "https://images.unsplash.com/photo-1657265284292-ac60361140a5?fm=jpg&q=80&w=1600",
        alternatives: [
            { name: "Vattakottai Fort", reason: "Seaside fort with panoramic views", type: "nearby" },
            { name: "Mathur Aqueduct", reason: "Asia's tallest trough bridge", type: "hidden-gem" }
        ]
    },
    {
        id: "thanjavur",
        name: "Thanjavur",
        tagline: "Rice Bowl of Tamil Nadu",
        description: "Home to the Great Living Chola Temples. A city synonymous with art, architecture, and the famous Tanjore paintings.",
        majorPlace: "Brihadisvara Temple",
        majorPlaceName: "Brihadisvara Temple",
        crowdLevel: "moderate",
        image: "https://images.unsplash.com/photo-1686310894901-d326b8722c13?fm=jpg&q=80&w=1600&auto=format&fit=crop",
        alternatives: [
            { name: "Gangaikonda Cholapuram", reason: "Similar grandeur, peaceful atmosphere", type: "nearby" },
            { name: "Saraswathi Mahal Library", reason: "Ancient palm-leaf manuscripts", type: "hidden-gem" }
        ]
    },
    {
        id: "coimbatore",
        name: "Coimbatore",
        tagline: "Manchester of South India",
        description: "A major industrial hub nestled near the Western Ghats. Known for its pleasant weather, textiles, and motorsport.",
        majorPlace: "Marudamalai Temple",
        majorPlaceName: "Marudamalai Hill Temple",
        crowdLevel: "moderate",
        image: "https://images.unsplash.com/photo-1609609830354-8f615d61b9c8?fm=jpg&q=80&w=1600",
        alternatives: [
            { name: "Adiyogi Shiva Statue", reason: "Largest bust sculpture in the world", type: "nearby" },
            { name: "Vydehi Falls", reason: "Deep forest waterfall trek", type: "hidden-gem" }
        ]
    },
    {
        id: "rameswaram",
        name: "Rameswaram",
        tagline: "Island of Legends",
        description: "A sacred island connecting mythology with reality. Famous for its long temple corridors and the ghost town of Dhanushkodi.",
        majorPlace: "Ramanathaswamy Temple",
        majorPlaceName: "Ramanathaswamy Temple",
        crowdLevel: "moderate",
        image: "https://images.unsplash.com/photo-1700737993312-3edc3cf4b18b?fm=jpg&q=80&w=1600&auto=format&fit=crop",
        alternatives: [
            { name: "Dhanushkodi", reason: "hauntingly beautiful ghost town", type: "hidden-gem" },
            { name: "Pamban Bridge", reason: "scenic rail bridge over sea", type: "nearby" }
        ]
    },
    {
        id: "tiruchirappalli",
        name: "Tiruchirappalli",
        tagline: "The Rock Fort City",
        description: "Dominated by the massive Rockfort Temple perched 83m high on an ancient rock. A hub of education and industry.",
        majorPlace: "Rockfort Temple",
        majorPlaceName: "Rockfort Ucchi Pillayar",
        crowdLevel: "busy",
        image: "https://images.unsplash.com/photo-1660122405026-02206229acc5?fm=jpg&q=80&w=1600",
        alternatives: [
            { name: "Jambukeswarar Temple", reason: "Water element Shiva temple", type: "alternative" },
            { name: "Butterfly Park", reason: "Great for families and nature lovers", type: "nearby" }
        ]
    },
]

export function VisualizeMap() {
    const [selectedDistrict, setSelectedDistrict] = useState<DistrictData | null>(null)
    const router = useRouter()

    const handleDistrictClick = (district: DistrictData) => {
        setSelectedDistrict(district)
    }

    const navigateToARVR = (placeName: string) => {
        router.push(`/visualize/arvr/${encodeURIComponent(placeName)}`)
    }

    return (
        <div className="w-full h-full p-6 lg:p-12 overflow-y-auto custom-scrollbar pt-40"> {/* INCREASED PADDING */}

            {/* --- HEADER --- */}
            <div className="mb-16 text-center">
                <h1 className="text-4xl lg:text-7xl font-serif text-white mb-6 drop-shadow-lg">VISUALIZE</h1>
                <p className="text-blue-200/60 text-sm lg:text-base max-w-xl mx-auto font-sans tracking-wide uppercase">
                    Select a destination to explore immersive 3D Views & Real-Time Rerouting
                </p>
            </div>

            {/* --- GRID LAYOUT --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-32">
                {TAMIL_NADU_DATA.map((district, index) => (
                    <motion.div
                        key={district.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        onClick={() => handleDistrictClick(district)}
                        className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-2xl border border-white/5 hover:border-blue-400/50 transition-all duration-300 hover:scale-[1.02]"
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            <img
                                src={district.image}
                                alt={district.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                        {/* Content */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-end">
                            <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-2xl font-bold text-white font-serif">{district.name}</h3>
                                    {/* Crowd Indicator Dot */}
                                    <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_currentColor] animate-pulse ${district.crowdLevel.includes('busy') ? 'bg-red-500 text-red-500' :
                                        district.crowdLevel === 'moderate' ? 'bg-amber-500 text-amber-500' : 'bg-green-500 text-green-500'
                                        }`} title="Live Crowd Status" />
                                </div>

                                <p className="text-white/60 text-xs font-sans mb-4 uppercase tracking-wider border-l-2 border-blue-500 pl-3">
                                    {district.tagline}
                                </p>

                                <div className="flex items-center gap-2 text-blue-300 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                    <span>Plan Trip</span>
                                    <ArrowRight size={14} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* --- DISTRICT DETAIL MODAL (Enhanced) --- */}
            <AnimatePresence>
                {selectedDistrict && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-24 pb-8">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedDistrict(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                        />

                        {/* Card */}
                        <motion.div
                            layoutId={`card-${selectedDistrict.id}`}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[85vh]"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedDistrict(null)}
                                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-white/10 text-white transition-colors border border-white/10"
                            >
                                <X size={20} />
                            </button>

                            {/* Left: Hero Image & Title */}
                            <div className="w-full md:w-5/12 relative h-48 md:h-auto shrink-0">
                                <img
                                    src={selectedDistrict.image}
                                    alt={selectedDistrict.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0a0a0a]" />

                                <div className="absolute bottom-6 left-6 right-6 hidden md:block">
                                    <h2 className="text-5xl font-serif text-white mb-2">{selectedDistrict.name}</h2>
                                    <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
                                        <MapPin size={14} />
                                        <span>Tamil Nadu Series</span>
                                    </div>

                                    {/* BIG VR BUTTON (Desktop) */}
                                    {/* Ensures prominence on desktop layouts */}
                                    <button
                                        onClick={() => navigateToARVR(selectedDistrict.majorPlace)}
                                        className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold uppercase tracking-wide flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-[0_0_30px_rgba(37,99,235,0.3)]"
                                    >
                                        <Compass size={20} />
                                        Launch 3D Experience (Visit Now)
                                    </button>
                                </div>
                            </div>

                            {/* Right: Info, Rerouting & Actions */}
                            <div className="w-full md:w-7/12 p-8 md:p-12 overflow-y-auto custom-scrollbar flex flex-col">

                                {/* Mobile Title */}
                                <h2 className="text-3xl font-serif text-white mb-2 md:hidden">{selectedDistrict.name}</h2>
                                <p className="text-white/60 text-sm mb-4 md:hidden flex items-center gap-2"><MapPin size={14} /> Tamil Nadu Series</p>

                                {/* BIG VR BUTTON (Mobile) */}
                                <button
                                    onClick={() => navigateToARVR(selectedDistrict.majorPlace)}
                                    className="w-full py-3 mb-8 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold uppercase tracking-wide flex md:hidden items-center justify-center gap-2 transition-all shadow-lg"
                                >
                                    <Compass size={18} />
                                    Launch 3D Experience
                                </button>

                                <div className="mb-8">
                                    <h3 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-3">Overview</h3>
                                    <p className="text-lg text-white/80 leading-relaxed font-light">
                                        {selectedDistrict.description}
                                    </p>
                                </div>

                                {/* --- SMART REROUTING & ALTERNATIVES --- */}
                                <div className="mt-auto">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`p-2 rounded-lg ${selectedDistrict.crowdLevel.includes('busy') ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'
                                            }`}>
                                            {selectedDistrict.crowdLevel.includes('busy') ? <AlertTriangle size={20} /> : <Sparkles size={20} />}
                                        </div>
                                        <div>
                                            <h4 className={`font-bold ${selectedDistrict.crowdLevel.includes('busy') ? 'text-red-200' : 'text-emerald-200'}`}>
                                                {selectedDistrict.crowdLevel.includes('busy') ? 'Smart Rerouting Active' : 'Optimal Visiting Time'}
                                            </h4>
                                            <p className="text-xs text-white/40">
                                                {selectedDistrict.crowdLevel.includes('busy')
                                                    ? `High footfall at ${selectedDistrict.majorPlaceName}. Try these:`
                                                    : `Great conditions. Also explore these:`
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3">
                                        {selectedDistrict.alternatives.map((alt, i) => (
                                            <div
                                                key={i}
                                                onClick={() => navigateToARVR(alt.name)}
                                                className="group/alt flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 cursor-pointer transition-all"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover/alt:text-blue-400 group-hover/alt:scale-110 transition-all">
                                                        <Navigation size={14} />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-white group-hover/alt:text-blue-300 transition-colors">
                                                            {alt.name}
                                                        </div>
                                                        <div className="text-[10px] text-white/40 uppercase tracking-wide">{alt.reason}</div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 opacity-0 group-hover/alt:opacity-100 transition-opacity">
                                                    <span className="text-[10px] text-blue-300 uppercase font-bold">3D View</span>
                                                    <ArrowRight size={12} className="text-blue-300" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
