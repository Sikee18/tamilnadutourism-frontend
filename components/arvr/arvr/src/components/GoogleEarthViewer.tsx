// @ts-nocheck
import { useEffect, useRef, useState } from 'react';

/**
 * ==================================================================================
 *  GOOGLE EARTH-STYLE EXPLORER (OFFICIAL API IMPLEMENTATION)
 *  v2.2 - Robust Search & Cinematic Orbit (Decoded)
 * ==================================================================================
 */

const GOOGLE_MAPS_API_KEY = "AIzaSyAPWCmV8QoZFtnK5dgBg732HxTTwxX4V2E";
const MAP_ID = "DEMO_MAP_ID";

// LANDMARK DATA MAPPING (District -> Major Place Coordinates)
const LANDMARKS = {
    "madurai": { lat: 9.9195, lng: 78.1193, name: "Meenakshi Amman Temple" },
    "chennai": { lat: 13.0475, lng: 80.2824, name: "Marina Beach / Lighthouse" },
    "thanjavur": { lat: 10.7828, lng: 79.1318, name: "Brihadisvara Temple" },
    "kanyakumari": { lat: 8.0780, lng: 77.5550, name: "Vivekananda Rock Memorial" },
    "rameswaram": { lat: 9.2881, lng: 79.3174, name: "Ramanathaswamy Temple" },
    "nilgiris": { lat: 11.4160, lng: 76.7113, name: "Ooty Botanical Gardens" },
    "coimbatore": { lat: 11.0456, lng: 76.9248, name: "Marudamalai Temple" },
    "tiruchirappalli": { lat: 10.8284, lng: 78.6974, name: "Rockfort Temple" },
    "salem": { lat: 11.7862, lng: 78.2093, name: "Yercaud Lake" },
    "tirunelveli": { lat: 8.7275, lng: 77.6896, name: "Nellaiappar Temple" },
    "vellore": { lat: 12.9234, lng: 79.1325, name: "Vellore Fort" },
};

export default function GoogleEarthViewer({ targetLocation }) {
    const mapRef = useRef(null);
    const streetViewRef = useRef(null);
    const inputRef = useRef(null);

    // Core References
    const [mapInstance, setMapInstance] = useState(null);
    const [streetViewInstance, setStreetViewInstance] = useState(null);

    // State
    const [isOrbiting, setIsOrbiting] = useState(false);
    const [isInStreetView, setIsInStreetView] = useState(false);
    const [customImageUrl, setCustomImageUrl] = useState("");
    const [selectedPlaceName, setSelectedPlaceName] = useState("");
    const [humanPos, setHumanPos] = useState(null);
    const orbitRef = useRef(0);
    const [errorMsg, setErrorMsg] = useState("");
    const [searchValue, setSearchValue] = useState("");

    // 1. LOAD SCRIPT & INIT MAP
    useEffect(() => {
        window.gm_authFailure = () => {
            setErrorMsg("GOOGLE AUTH FAILED: Check API Key, Billing, or Maps JS API enablement.");
        };

        const loadScript = () => {
            if (document.getElementById('googleMapsScript')) {
                // If already loaded, just try to init map if ref exists
                if (window.google && mapRef.current && !mapInstance) initMap();
                return;
            }

            const script = document.createElement('script');
            script.id = 'googleMapsScript';
            // IMPORTANT: v=beta is required for WebGL features (Tilt > 45, Vector Map)
            script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=beta&libraries=places,maps,marker,streetView`;
            script.async = true;

            script.onload = () => initMap();
            script.onerror = () => setErrorMsg("Network Error: Failed to load Google Maps.");
            document.body.appendChild(script);
        };

        const initMap = async () => {
            if (!mapRef.current || !window.google) return;
            try {
                const { Map } = await google.maps.importLibrary("maps");

                const map = new Map(mapRef.current, {
                    center: { lat: 20.5937, lng: 78.9629 }, // Initial India View
                    zoom: 4,
                    mapTypeId: "satellite",
                    tilt: 0,
                    heading: 0,
                    mapId: MAP_ID, // Required for Vector Map features
                    renderingType: 'VECTOR',
                    disableDefaultUI: true,
                    zoomControl: false,
                    rotateControl: false,
                });

                setMapInstance(map);

                const panorama = new google.maps.StreetViewPanorama(streetViewRef.current, {
                    visible: false,
                    disableDefaultUI: true,
                });
                map.setStreetView(panorama);
                setStreetViewInstance(panorama);

            } catch (err) {
                setErrorMsg(err.message);
            }
        };

        loadScript();
    }, []);

    // 2. SETUP SEARCH (DEPENDS ON MAP INSTANCE)
    useEffect(() => {
        if (!mapInstance || !inputRef.current || !window.google) return;

        const setupSearch = async () => {
            // Basic autocomplete setup preserved for manual search
            try {
                const { Autocomplete } = await google.maps.importLibrary("places");
                const autocomplete = new Autocomplete(inputRef.current, {
                    fields: ["geometry", "name", "location"],
                    types: ["establishment", "geocode"]
                });
                autocomplete.bindTo("bounds", mapInstance);

                autocomplete.addListener("place_changed", () => {
                    const place = autocomplete.getPlace();
                    handlePlaceSelection(place);
                });
            } catch (e) {
                console.error("Search Setup Failed", e);
            }
        };

        setupSearch();
    }, [mapInstance]);

    // 3. TARGET LOCATION PROP LISTENER
    useEffect(() => {
        if (!mapInstance || !targetLocation) return;

        const cleanTarget = decodeURIComponent(targetLocation).toLowerCase();

        // 1. Check if it matches a District Key directly (e.g. "madurai")
        let locData = LANDMARKS[cleanTarget];

        // 2. If not, check if it matches a Landmark Name (e.g. "Meenakshi Amman Temple")
        if (!locData) {
            const foundKey = Object.keys(LANDMARKS).find(key =>
                LANDMARKS[key].name.toLowerCase() === cleanTarget ||
                cleanTarget.includes(LANDMARKS[key].name.toLowerCase()) ||
                LANDMARKS[key].name.toLowerCase().includes(cleanTarget)
            );
            if (foundKey) locData = LANDMARKS[foundKey];
        }

        if (locData) {
            // Simulate a place object
            const place = {
                geometry: {
                    location: new google.maps.LatLng(locData.lat, locData.lng)
                },
                name: locData.name
            };
            handlePlaceSelection(place);
        } else {
            console.warn(`Location not found in landmarks: ${targetLocation} (Cleaned: ${cleanTarget})`);

            // Fallback: Try to search for it manually if not in our curated list
            setSearchValue(cleanTarget);

            // Trigger manual search as fallback
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: cleanTarget }, (results, status) => {
                if (status === 'OK' && results && results[0]) {
                    handlePlaceSelection({
                        geometry: results[0].geometry,
                        name: cleanTarget
                    });
                }
            });
        }

    }, [mapInstance, targetLocation]);

    // 4. CORE FLY-TO LOGIC
    const handlePlaceSelection = (place) => {
        if (!place.geometry || !place.geometry.location || !mapInstance) {
            console.warn("Invalid place geometry");
            return;
        }

        const targetLoc = place.geometry.location;
        setSearchValue(place.name || "");
        setSelectedPlaceName(place.name || "");

        // STOP ORBIT
        setIsOrbiting(false);

        // --- ROBUST FLY SEQUENCE ---
        // 1. Move Center First (Guarantees we are looking at the right spot)
        mapInstance.panTo(targetLoc);

        // 2. Animate Zoom & Tilt
        // We use a simple frame loop to ensure it doesn't get 'stuck'
        let currentZoom = mapInstance.getZoom() || 4;
        const targetZoom = 19; // Close up for major landmarks
        let progress = 0;

        const animateFly = () => {
            progress += 0.015; // Speed adjustment
            if (progress >= 1) {
                // FINISH
                mapInstance.moveCamera({
                    center: targetLoc,
                    zoom: targetZoom,
                    tilt: 67.5, // High tilt for 3D effect
                    heading: 0
                });
                // Update Human Logic
                setHumanPos({ lat: targetLoc.lat(), lng: targetLoc.lng() });
                setIsOrbiting(true); // START ORBIT AUTOMATICALLY
                return;
            }

            // Interpolate
            const newZoom = currentZoom + (targetZoom - currentZoom) * progress;
            // Tilt increases as we get closer
            const newTilt = progress * 67.5;

            mapInstance.moveCamera({
                center: targetLoc,
                zoom: newZoom,
                tilt: newTilt
            });

            requestAnimationFrame(animateFly);
        };

        requestAnimationFrame(animateFly);
    };

    // 5. MANUAL SEARCH FALLBACK
    const handleManualSearch = async () => {
        if (!searchValue || !window.google || !mapInstance) return;
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: searchValue }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
                handlePlaceSelection({
                    geometry: results[0].geometry,
                    name: searchValue
                });
            }
        });
    };

    // 6. ORBIT ANIMATION
    useEffect(() => {
        if (!mapInstance || !isOrbiting || isInStreetView) {
            if (orbitRef.current) cancelAnimationFrame(orbitRef.current);
            return;
        }
        const animate = () => {
            const currentHeading = mapInstance.getHeading() || 0;
            // Smooth orbit
            mapInstance.moveCamera({ heading: currentHeading + 0.1 });
            orbitRef.current = requestAnimationFrame(animate);
        };
        orbitRef.current = requestAnimationFrame(animate);
        return () => {
            if (orbitRef.current) cancelAnimationFrame(orbitRef.current);
        };
    }, [isOrbiting, mapInstance, isInStreetView]);

    // 7. STREET VIEW LOGIC
    const enterStreetView = () => {
        if (!humanPos || !mapInstance || !streetViewInstance) return;
        const svService = new google.maps.StreetViewService();
        svService.getPanorama({ location: humanPos, radius: 100 }, (data, status) => {
            if (status === 'OK' && data && data.location && data.location.pano) {
                setIsOrbiting(false);
                setIsInStreetView(true);
                streetViewInstance.setPano(data.location.pano);
                streetViewInstance.setVisible(true);
                setCustomImageUrl("");
            } else {
                alert("No Street View found nearby. Try flying closer to a road.");
            }
        });
    };

    const exitStreetView = () => {
        setIsInStreetView(false);
        setCustomImageUrl("");
        if (streetViewInstance) streetViewInstance.setVisible(false);
        setIsOrbiting(true);
    };

    return (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', fontFamily: 'sans-serif' }}>
            {/* ERROR */}
            {errorMsg && <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10000, background: 'red', color: 'white', padding: 20 }}>{errorMsg}</div>}

            {/* MAP */}
            <div ref={mapRef} style={{ width: '100%', height: '100%', background: '#111' }} />

            {/* SV CONTAINER */}
            <div ref={streetViewRef} style={{ position: 'absolute', inset: 0, zIndex: isInStreetView ? 500 : -1, opacity: isInStreetView ? 1 : 0, pointerEvents: isInStreetView ? 'all' : 'none' }} />
            {isInStreetView && customImageUrl && (
                <img src={customImageUrl} alt="Heritage View" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 600 }} />
            )}

            {/* UI */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1000, pointerEvents: 'none' }}>

                {/* SEARCH BAR (Overlay) - Moved down to clear the top header */}
                {!isInStreetView && (
                    <div style={{ position: 'absolute', top: 120, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'auto', display: 'flex', gap: 10, zIndex: 1005 }}>
                        <input ref={inputRef} type="text" placeholder="Search a place or landmark..."
                            value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleManualSearch()}
                            style={{
                                padding: '12px 24px', width: '320px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.2)',
                                background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(10px)', color: 'white', outline: 'none', fontSize: '14px',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                            }}
                        />
                        <button onClick={handleManualSearch} style={{
                            padding: '0 20px', borderRadius: '30px', border: 'none',
                            background: '#3b82f6', color: 'white', fontWeight: 'bold', cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(59,130,246,0.5)'
                        }}>{'>'}</button>
                    </div>
                )}

                {/* HUMAN ICON (Only show when target is set) */}
                {(!isInStreetView && humanPos) && (
                    <div onClick={enterStreetView} style={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -100%)',
                        cursor: 'pointer', pointerEvents: 'auto', animation: 'float 2s infinite ease-in-out'
                    }}>
                        <div style={{
                            width: '40px', height: '40px', background: '#eab308', borderRadius: '50%',
                            border: '3px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
                            boxShadow: '0 0 20px rgba(234, 179, 8, 0.6)'
                        }}>🚶</div>
                    </div>
                )}

                {/* ORBIT CONTROL */}
                {!isInStreetView && humanPos && (
                    <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'auto' }}>
                        <button onClick={() => setIsOrbiting(!isOrbiting)} style={{
                            padding: '10px 20px', borderRadius: '30px',
                            background: isOrbiting ? '#ef4444' : '#3b82f6',
                            color: 'white', border: 'none', fontWeight: 'bold', fontSize: '12px', letterSpacing: '1px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                        }}>
                            {isOrbiting ? 'PAUSE ORBIT' : 'RESUME ORBIT'}
                        </button>
                    </div>
                )}

                {/* EXIT SV */}
                {isInStreetView && (
                    <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'auto' }}>
                        <button onClick={exitStreetView} style={{ padding: '12px 24px', borderRadius: '30px', background: 'white', color: 'black', border: 'none', fontWeight: 'bold' }}>
                            EXIT STREET VIEW
                        </button>
                    </div>
                )}
            </div>
            <style>{`@keyframes float { 0% { transform: translate(-50%, -100%) translateY(0px); } 50% { transform: translate(-50%, -100%) translateY(-10px); } 100% { transform: translate(-50%, -100%) translateY(0px); } }`}</style>
        </div>
    );
}
