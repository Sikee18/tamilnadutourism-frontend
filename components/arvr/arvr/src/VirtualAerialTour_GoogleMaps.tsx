// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';

// CONSTANTS
const API_KEY = "AIzaSyAPWCmV8QoZFtnK5dgBg732HxTTwxX4V2E";

// Location Data Configuration
const LOCATION_DATA: Record<string, { startPos: { lat: number, lng: number }, viewpoints: any[] }> = {
    "madurai": {
        startPos: { lat: 9.9195, lng: 78.1193 },
        viewpoints: [
            { id: 0, label: "South Gopuram", position: { lat: 9.9184, lng: 78.1193 }, zoom: 20, heading: 0, tilt: 45 },
            { id: 1, label: "Golden Lotus Tank", position: { lat: 9.9196, lng: 78.1190 }, zoom: 21, heading: 90, tilt: 45 },
            { id: 2, label: "Sundareswarar Shrine", position: { lat: 9.9202, lng: 78.1198 }, zoom: 20, heading: 180, tilt: 45 },
            { id: 3, label: "Full Complex", position: { lat: 9.9195, lng: 78.1193 }, zoom: 18, heading: 0, tilt: 45 }
        ]
    },
    "thanjavur": {
        startPos: { lat: 10.7828, lng: 79.1318 },
        viewpoints: [
            { id: 0, label: "Vimana", position: { lat: 10.7828, lng: 79.1318 }, zoom: 20, heading: 0, tilt: 45 },
            { id: 1, label: "Nandi", position: { lat: 10.7832, lng: 79.1325 }, zoom: 20, heading: 270, tilt: 45 },
            { id: 2, label: "Entrance", position: { lat: 10.7840, lng: 79.1330 }, zoom: 19, heading: 180, tilt: 45 }
        ]
    },
    "kanyakumari": {
        startPos: { lat: 8.0780, lng: 77.5550 }, // Vivekananda Rock
        viewpoints: [
            { id: 0, label: "Vivekananda Rock", position: { lat: 8.0780, lng: 77.5550 }, zoom: 19, heading: 90, tilt: 45 },
            { id: 1, label: "Thiruvalluvar Statue", position: { lat: 8.0777, lng: 77.5552 }, zoom: 20, heading: 45, tilt: 45 },
            { id: 2, label: "Shore View", position: { lat: 8.0800, lng: 77.5450 }, zoom: 17, heading: 120, tilt: 45 }
        ]
    },
    "rameswaram": {
        startPos: { lat: 9.2881, lng: 79.3174 }, // Ramanathaswamy Temple
        viewpoints: [
            { id: 0, label: "Temple Main", position: { lat: 9.2881, lng: 79.3174 }, zoom: 19, heading: 0, tilt: 45 },
            { id: 1, label: "Pamban Bridge", position: { lat: 9.2830, lng: 79.2050 }, zoom: 16, heading: 90, tilt: 45 },
            { id: 2, label: "Dhanushkodi", position: { lat: 9.1770, lng: 79.4480 }, zoom: 15, heading: 90, tilt: 45 }
        ]
    },
    "chennai": {
        startPos: { lat: 13.0400, lng: 80.2700 }, // Kapaleeshwarar Temple area
        viewpoints: [
            { id: 0, label: "Kapaleeshwarar", position: { lat: 13.0335, lng: 80.2699 }, zoom: 20, heading: 0, tilt: 45 },
            { id: 1, label: "Marina Beach", position: { lat: 13.0500, lng: 80.2824 }, zoom: 16, heading: 0, tilt: 45 },
            { id: 2, label: "San Thome", position: { lat: 13.0315, lng: 80.2770 }, zoom: 19, heading: 270, tilt: 45 }
        ]
    },
    "coimbatore": {
        startPos: { lat: 11.0330, lng: 76.9300 }, // Marudhamalai
        viewpoints: [
            { id: 0, label: "Marudhamalai", position: { lat: 11.0330, lng: 76.9300 }, zoom: 19, heading: 0, tilt: 45 },
            { id: 1, label: "Adiyogi", position: { lat: 10.9720, lng: 76.7380 }, zoom: 18, heading: 90, tilt: 45 }
        ]
    },
    "ooty": {
        startPos: { lat: 11.4110, lng: 76.6960 }, // Ooty Lake area
        viewpoints: [
            { id: 0, label: "Ooty Lake", position: { lat: 11.4080, lng: 76.6960 }, zoom: 17, heading: 0, tilt: 45 },
            { id: 1, label: "Botanical Garden", position: { lat: 11.4170, lng: 76.7100 }, zoom: 18, heading: 270, tilt: 45 }
        ]
    }
};

interface VirtualAerialTourProps {
    locationId?: string;
}

export default function VirtualAerialTour({ locationId = "madurai" }: VirtualAerialTourProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const googleMapRef = useRef<google.maps.Map | null>(null);
    const [isPlaying, setIsPlaying] = useState(true); // Auto-start
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [loadError, setLoadError] = useState<string | null>(null);

    // Get Data for current location
    const currentData = LOCATION_DATA[locationId.toLowerCase()] || LOCATION_DATA["madurai"];
    const { startPos: START_POS, viewpoints: VIEWPOINTS } = currentData;

    // --- MANUAL SCRIPT INJECTION (Zero Dependency) ---
    useEffect(() => {
        // Reset state on location change
        setIsMapLoaded(false);
        setIsPlaying(true);
        setCurrentIndex(0);

        // Check if script already exists
        if (window.google && window.google.maps) {
            initMap();
            return;
        }

        const existingScript = document.getElementById('google-maps-script');
        if (existingScript) {
            existingScript.addEventListener('load', initMap);
            return;
        }

        const script = document.createElement('script');
        script.id = 'google-maps-script';
        // Load Maps library with `places` and `satellite` capabilities implied
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=&v=weekly`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
            initMap();
        };

        script.onerror = () => {
            setLoadError("Failed to load Google Maps script. Check connection/blocking.");
        };

        document.head.appendChild(script);

        return () => {
            // Cleanup not really needed for global script
        };
    }, [locationId]); // Re-run if locationId changes

    const initMap = () => {
        if (!mapRef.current) return;

        try {
            // Re-fetch current data inside init to ensure freshness if closure is stale (though useEffect handles it)
            const data = LOCATION_DATA[locationId.toLowerCase()] || LOCATION_DATA["madurai"];

            const map = new window.google.maps.Map(mapRef.current, {
                center: data.startPos,
                zoom: 19,
                mapTypeId: 'satellite',
                heading: 0,
                tilt: 45,
                disableDefaultUI: true, // We draw our own HUD
                backgroundColor: '#000',
                gestureHandling: 'greedy', // 1-Finger/Mouse interaction immediately
            });

            googleMapRef.current = map;

            // Listeners
            map.addListener('dragstart', () => stopAutoTour());
            map.addListener('heading_changed', () => stopAutoTour());
            map.addListener('tilt_changed', () => stopAutoTour());

            setIsMapLoaded(true);
        } catch (e) {
            console.error(e);
            setLoadError("Error initializing Map: " + (e as Error).message);
        }
    };

    const stopAutoTour = () => {
        // Only stop if explicitly playing to avoid flicker
        if (isPlaying) setIsPlaying(false);
    };

    // --- ANIMATION LOOP (Smooth Flyover) ---
    useEffect(() => {
        let animationFrameId: number;

        if (isPlaying && isMapLoaded && googleMapRef.current) {
            const animate = () => {
                if (!googleMapRef.current) return;

                // Get current center
                const center = googleMapRef.current.getCenter();
                if (!center) return;

                // Move slowly North-East (simulate drone flight)
                // Adjust speed: 0.000005 is very slow and smooth
                const newLat = center.lat() + 0.000002;
                const newLng = center.lng() + 0.000002;

                // Pan to new tiny offset (panTo is smooth, setCenter is instant)
                // For continuous RAF, setCenter is actually better to avoid "catch up" lag
                googleMapRef.current.setCenter({ lat: newLat, lng: newLng });

                // Ensure 3D tilt is maintained
                if (googleMapRef.current.getTilt() === 0) {
                    googleMapRef.current.setTilt(45);
                }

                animationFrameId = requestAnimationFrame(animate);
            };

            animationFrameId = requestAnimationFrame(animate);
        }

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [isPlaying, isMapLoaded]);

    // --- MANUAL 3D CONTROLS ---
    const adjustHeading = (delta: number) => {
        stopAutoTour();
        if (googleMapRef.current) {
            const current = googleMapRef.current.getHeading() || 0;
            // Native smooth rotation
            googleMapRef.current.setHeading(current + delta);
        }
    };

    const adjustTilt = (angle: number) => {
        stopAutoTour();
        if (googleMapRef.current) {
            if (angle > 0) {
                // 45 degrees imagery requires high zoom
                const currentZoom = googleMapRef.current.getZoom() || 19;
                if (currentZoom < 18) googleMapRef.current.setZoom(19);

                setTimeout(() => {
                    googleMapRef.current?.setTilt(angle);
                    // Sometimes heading needs a nudge to trigger the 45 view
                    if (googleMapRef.current?.getHeading() === 0) {
                        googleMapRef.current?.setHeading(0);
                    }
                }, 300);
            } else {
                googleMapRef.current.setTilt(0);
            }
        }
    };


    // --- UI ---
    const handlePlayToggle = () => {
        setIsPlaying(!isPlaying);
    };

    const jumpToViewpoint = (index: number) => {
        stopAutoTour();
        setCurrentIndex(index);
        const vp = VIEWPOINTS[index];
        if (googleMapRef.current) {
            const map = googleMapRef.current;
            map.panTo(vp.position);
            map.setZoom(vp.zoom);
            map.setHeading(vp.heading);
            map.setTilt(vp.tilt);
        }
    };

    return (
        <div style={{ position: 'fixed', inset: 0, background: '#000', fontFamily: 'sans-serif' }}>

            {/* MAP */}
            <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

            {/* OVERLAYS */}
            {!isMapLoaded && !loadError && (
                <div style={{
                    position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
                    color: 'rgba(255,255,255,0.7)', zIndex: 10
                }}>
                    CONNECTING TO SATELLITE...
                </div>
            )}

            {loadError && (
                <div style={{
                    position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
                    color: '#ff5252', zIndex: 10, padding: 20, textAlign: 'center'
                }}>
                    {loadError}
                </div>
            )}

            {/* HUD */}
            <div style={{
                position: 'absolute', top: 80, left: 20, right: 20, pointerEvents: 'none',
                display: 'flex', justifyContent: 'space-between', color: 'white', zIndex: 20
            }}>
                <div>
                    <div style={{ fontSize: '10px', letterSpacing: '2px', opacity: 0.8 }}>LIVE 3D FEED</div>
                    <div style={{ fontSize: '20px', fontWeight: 'bold', textTransform: 'uppercase' }}>{locationId}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '10px' }}>STATUS</div>
                    <div style={{ fontWeight: 'bold', color: isPlaying ? '#2ecc71' : '#3498db' }}>
                        {isPlaying ? 'AUTO PILOT' : 'MANUAL CONTROL'}
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE 3D CONTROLS */}
            <div style={{
                position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
                display: 'flex', flexDirection: 'column', gap: 10, zIndex: 20
            }}>
                <button onClick={() => adjustHeading(-45)} style={btnStyle('↻ L')}>Rotate Left</button>
                <button onClick={() => adjustHeading(45)} style={btnStyle('↻ R')}>Rotate Right</button>
                <div style={{ height: 10 }} />
                <button onClick={() => adjustTilt(45)} style={btnStyle('3D')}>3D View</button>
                <button onClick={() => adjustTilt(0)} style={btnStyle('2D')}>Top View</button>
            </div>

            {/* BOTTOM CONTROLS */}
            <div style={{
                position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
                display: 'flex', gap: 10, zIndex: 20,
                background: 'rgba(0,0,0,0.8)', padding: '10px 20px', borderRadius: 40,
                border: '1px solid rgba(255,255,255,0.1)'
            }}>
                <button onClick={handlePlayToggle} style={{
                    background: isPlaying ? '#ff5252' : '#fff', borderRadius: '50%',
                    width: 36, height: 36, border: 'none', cursor: 'pointer',
                    fontWeight: 'bold', fontSize: 16
                }}>
                    {isPlaying ? '⏸' : '▶'}
                </button>
                {VIEWPOINTS.map((vp, i) => (
                    <button key={i} onClick={() => jumpToViewpoint(i)} style={{
                        background: 'transparent', border: 'none', color: '#fff',
                        cursor: 'pointer', fontSize: 11,
                        opacity: currentIndex === i ? 1 : 0.5,
                        borderBottom: currentIndex === i ? '1px solid #fff' : '1px solid transparent'
                    }}>
                        {vp.label}
                    </button>
                ))}
            </div>

        </div>
    );
}

const btnStyle = (text: string) => ({
    width: 50, height: 50, borderRadius: '50%', border: 'none',
    background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(5px)',
    color: '#fff', cursor: 'pointer', fontSize: '10px',
    display: 'grid', placeItems: 'center', fontWeight: 'bold'
});
