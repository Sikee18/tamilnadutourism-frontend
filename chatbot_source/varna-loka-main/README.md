# 🌍 Varna-Loka: The Pulse of Tamil Nadu

<p align="center">
  <img src="https://img.shields.io/badge/Status-Hackathon_MVP-brightgreen?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/Platform-Flutter%20|%20React%20|%20NestJS-blue?style=for-the-badge" alt="Platform">
  <img src="https://img.shields.io/badge/Database-PostgreSQL%20+%20pgvector-teal?style=for-the-badge&logo=postgresql" alt="Database">
  <img src="https://img.shields.io/badge/AI-Gemini_Pro-orange?style=for-the-badge&logo=google" alt="AI">
</p>

<p align="center">
  <strong>Engineering the Joy of Discovery for the Modern Traveler.</strong><br>
  <i>A Taste-First, Aura-Optimized, and Spiritually Synchronized Travel Ecosystem.</i>
</p>

---

## 📖 Overview

**Varna-Loka** is an AI-powered travel intelligence platform designed to eliminate **Tourist Fatigue** by transforming how travelers experience Tamil Nadu.  
Instead of generic recommendations, Varna-Loka delivers **context-aware, culturally rich, and emotionally resonant journeys**.

The platform is built on five core experience pillars:

- 🍱 **Taste DNA** — Culinary intelligence driven by flavor profiles, food lore, and local authenticity  
- 📸 **Aura Cam** — AR-powered photography guidance aligned with golden hour, light, and location  
- 🏍️ **Rider Mode** — Scenic, curve-optimized routing for explorers and riders  
- 🕉️ **Spiritual Sync** — Crowd-aware heritage and temple experiences with peak-moment alerts  
- 🔁 **Smart Re-Routing** — Context-aware alternative destinations when places get overcrowded  

---

## 🌟 Why Varna-Loka?

Modern travelers face:
- Overcrowded destinations  
- Repetitive, algorithmic recommendations  
- Loss of cultural depth in travel  

**Varna-Loka solves this by combining AI reasoning, real-time signals, and regional knowledge** to create journeys that feel personal, peaceful, and profound.

---

## 💡 Core Features

### 🍱 Taste DNA Engine

Uses **Gemini AI** to interpret user cravings and map them to **authentic local food experiences**.  
Instead of suggesting just a restaurant, Varna-Loka recommends *specific dishes, vendors, and their cultural stories*.

### 📸 Aura Cam (AR Guide)

A real-time AR camera overlay that:
- Calculates sun position using GPS and time  
- Suggests the best angles and moments for photography  
- Enhances visual storytelling at heritage sites like Mahabalipuram  

### 🏍️ Rider Mode

Designed for riders and road explorers:
- Curve-weighted scenic routing  
- Nature-first paths over fastest routes  
- Discovery-driven navigation for soulful travel  

### 🕉️ Spiritual & Festival Sync

Connected with live crowd and festival data:
- Alerts users about peak spiritual moments  
- Diverts travelers to calmer or lesser-known heritage sites  
- Ensures serene, respectful, and meaningful visits  

### 🔁 Smart Re-Routing Intelligence

When a destination becomes overcrowded, Varna-Loka **does not simply delay the visit** — it intelligently recommends **similar alternative destinations** based on terrain, climate, experience, and cultural vibe.

**Example:**
- If **Ooty** is overcrowded → Recommend **Kodaikanal**  
- If **Mahabalipuram** is congested → Suggest **Pichavaram Mangrove Forest**  
- If a major temple exceeds crowd thresholds → Guide users to spiritually equivalent heritage sites  

This ensures travelers never lose the *essence* of their journey — only the stress.

---

## 📂 Project Structure & Modules

### Server (`/server`)
The core logic resides in the NestJS application. Below is a breakdown of the implemented modules:

| Module | Description | Key Features |
| :--- | :--- | :--- |
| **AuthModule** | Authentication & Authorization | Wraps Supabase Auth. Syncs users to `profiles` table. Handles Roles (`ADMIN`, `EMP`, `USER`). |
| **UserContextModule** | Context Awareness | Manages stateful user context (preferences, current location, history) for personalized AI interactions. |
| **ChatBotModule** | AI Conversational Agent | Interfaces with Gemini Pro. Uses `UserContext` and `Destinations` data to provide smart travel advice. |
| **DestinationsModule** | Semantic Search Engine | Implements Vector Search. Finds destinations based on "vibe" (e.g., "Misty ancient ruins") rather than just keywords. |
| **GuideModule** | Guide Management | Endpoints for Tour Guides to manage their profiles and bookings. |
| **ShopkeeperModule** | Local Business Portal | Endpoints for Shopkeepers (EMP role) to manage promotions and store details. |
| **SupabaseModule** | Database Connection | Global module handling the connection to the Supabase instance. |

### Database Schema (Supabase / PostgreSQL)

The database setup is automated via SQL scripts found in `server/supabase/`.

#### 1. Profiles & Auth (`profiles_setup.sql`)
- **Table:** `public.profiles`
- **Link:** 1:1 relationship with `auth.users` (Supabase managed).
- **Triggers:** `handle_new_user` automatically creates a profile row when a user signs up.
- **Security:** RLS (Row Level Security) enabled. Users can only edit their own profile.

#### 2. Destinations & Vector Search (`destinations.sql`)
- **Table:** `public.destinations`
- **Columns:**
    - `description`: Raw text description.
    - `embedding`: `vector(768)` column storing embeddings generated by Gemini.
    - `theme_vibe`: Categorical tags (e.g., "Spiritual", "Coastal").
    - `location_coords`: PostGIS Geography Point.
- **Search:** Uses a custom RPC function `match_destinations` to perform cosine similarity search on the `embedding` column.

#### 3. Roles & Permissions (`roles_setup.sql`)
- **Enum:** `user_role` ('ADMIN', 'EMP', 'USER').
- **Logic:** Custom logic to enforce role-based access control (RBAC) across the platform.

---

## 🔄 Application Flow

### 1. **User Onboarding**
   - User signs up via the client.
   - Supabase Auth creates a user record.
   - Postgres Trigger fires `handle_new_user`, creating a `public.profiles` entry.

### 2. **Contextual AI Chat**
   - User asks: "I want a quiet place near the beach."
   - **ChatBotModule** receives the prompt.
   - **UserContextModule** provides user's history/preferences.
   - **DestinationsModule** converts the query to a Vector Embedding.
   - Database performs a semantic search via `match_destinations`.
   - Results are returned to Gemini to generate a natural language response.

### 3. **Role-Based Features**
   - **Guides** and **Shopkeepers** (EMP role) have specialized endpoints (`GuideModule`, `ShopkeeperModule`) to manage their specific assets, secured by Guards checking the `user_role`.

---

## 🌏 Vision

**Varna-Loka aims to become the cultural operating system for regional tourism in India**, starting with Tamil Nadu — preserving heritage, reducing crowd stress, empowering local ecosystems, and redefining discovery through intelligence.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Supabase Project (with `pgvector` enabled)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/varna-loka.git
cd varna-loka
```

### 2️⃣ Configure Environment Variables
Create a `.env` file in the `/server` directory:

```env
SUPABASE_URL=your_project_url
SUPABASE_KEY=your_anon_key
GEMINI_API_KEY=your_google_ai_key
```

### 3️⃣ Database Setup
Run the SQL scripts located in `/server/supabase/` in your Supabase SQL Editor in the following order:
1. `roles_setup.sql`
2. `profiles_setup.sql`
3. `destinations.sql`

### 4️⃣ Launch the Server
```bash
cd server
npm install
npm run start:dev
```
The server will start on `http://localhost:3000`.

---

<p align="center">
  Made with ❤️ for the <strong>Tamil Nadu Tourism Innovation Hackathon 2025</strong>
</p>
\# 🌍 Varna-Loka: The Pulse of Tamil Nadu

<p align="center">
  <img src="https://img.shields.io/badge/Status-Hackathon_MVP-brightgreen?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/Platform-NestJS%20|%20Supabase-blue?style=for-the-badge" alt="Platform">
  <img src="https://img.shields.io/badge/Database-PostgreSQL%20+%20pgvector-teal?style=for-the-badge&logo=postgresql" alt="Database">
  <img src="https://img.shields.io/badge/AI-Gemini_Pro-orange?style=for-the-badge&logo=google" alt="AI">
</p>

<p align="center">
  <strong>Engineering the Joy of Discovery for the Modern Traveler.</strong><br>
  <i>A Taste-First, Aura-Optimized, and Spiritually Synchronized Travel Ecosystem.</i>
</p>

---

## 📖 Overview

**Varna-Loka** is an AI-powered travel intelligence platform designed to eliminate "Tourist Fatigue." We focus on four core pillars to ensure every journey is meaningful, stress-free, and culturally deep.

- 🍱 **Taste DNA:** AI-driven culinary matching based on flavor profiles, not just ratings.
- 📸 **Aura Cam:** Real-time AR photography assistance for the perfect "Golden Hour" shots.
- 🏍️ **Rider Mode:** Scenic, curve-optimized routing for the wandering soul.
- 🕉️ **Spiritual Sync:** Live crowd-management and "Peak Moment" alerts for heritage sites.

This repository primarily contains the **Server-Side Implementation** (NestJS + Supabase) which powers the Varna-Loka ecosystem.

---

## 🛠️ Technology Stack

### Backend & Database
- **Framework:** [NestJS](https://nestjs.com/) (Node.js)
- **Database:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Vector Search:** `pgvector` implementation for Semantic Search
- **AI Integration:** Google Gemini Pro

### Frontend (Placeholders)
- **Client-Mobile:** Flutter (Placeholder in this repo)
- **Client-Web:** React (Placeholder in this repo)

---

## 📂 Project Structure & Modules

### Server (`/server`)
The core logic resides in the NestJS application. Below is a breakdown of the implemented modules:

| Module | Description | Key Features |
| :--- | :--- | :--- |
| **AuthModule** | Authentication & Authorization | Wraps Supabase Auth. Syncs users to `profiles` table. Handles Roles (`ADMIN`, `EMP`, `USER`). |
| **UserContextModule** | Context Awareness | Manages stateful user context (preferences, current location, history) for personalized AI interactions. |
| **ChatBotModule** | AI Conversational Agent | Interfaces with Gemini Pro. Uses `UserContext` and `Destinations` data to provide smart travel advice. |
| **DestinationsModule** | Semantic Search Engine | Implements Vector Search. Finds destinations based on "vibe" (e.g., "Misty ancient ruins") rather than just keywords. |
| **GuideModule** | Guide Management | Endpoints for Tour Guides to manage their profiles and bookings. |
| **ShopkeeperModule** | Local Business Portal | Endpoints for Shopkeepers (EMP role) to manage promotions and store details. |
| **SupabaseModule** | Database Connection | Global module handling the connection to the Supabase instance. |

### Database Schema (Supabase / PostgreSQL)

The database setup is automated via SQL scripts found in `server/supabase/`.

#### 1. Profiles & Auth (`profiles_setup.sql`)
- **Table:** `public.profiles`
- **Link:** 1:1 relationship with `auth.users` (Supabase managed).
- **Triggers:** `handle_new_user` automatically creates a profile row when a user signs up.
- **Security:** RLS (Row Level Security) enabled. Users can only edit their own profile.

#### 2. Destinations & Vector Search (`destinations.sql`)
- **Table:** `public.destinations`
- **Columns:**
    - `description`: Raw text description.
    - `embedding`: `vector(768)` column storing embeddings generated by Gemini.
    - `theme_vibe`: Categorical tags (e.g., "Spiritual", "Coastal").
    - `location_coords`: PostGIS Geography Point.
- **Search:** Uses a custom RPC function `match_destinations` to perform cosine similarity search on the `embedding` column.

#### 3. Roles & Permissions (`roles_setup.sql`)
- **Enum:** `user_role` ('ADMIN', 'EMP', 'USER').
- **Logic:** Custom logic to enforce role-based access control (RBAC) across the platform.

---

## 🔄 Application Flow

### 1. **User Onboarding**
   - User signs up via the client.
   - Supabase Auth creates a user record.
   - Postgres Trigger fires `handle_new_user`, creating a `public.profiles` entry.

### 2. **Contextual AI Chat**
   - User asks: "I want a quiet place near the beach."
   - **ChatBotModule** receives the prompt.
   - **UserContextModule** provides user's history/preferences.
   - **DestinationsModule** converts the query to a Vector Embedding.
   - Database performs a semantic search via `match_destinations`.
   - Results are returned to Gemini to generate a natural language response.

### 3. **Role-Based Features**
   - **Guides** and **Shopkeepers** (EMP role) have specialized endpoints (`GuideModule`, `ShopkeeperModule`) to manage their specific assets, secured by Guards checking the `user_role`.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Supabase Project (with `pgvector` enabled)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/varna-loka.git
cd varna-loka
```

### 2️⃣ Configure Environment Variables
Create a `.env` file in the `/server` directory:

```env
SUPABASE_URL=your_project_url
SUPABASE_KEY=your_anon_key
GEMINI_API_KEY=your_google_ai_key
```

### 3️⃣ Database Setup
Run the SQL scripts located in `/server/supabase/` in your Supabase SQL Editor in the following order:
1. `roles_setup.sql`
2. `profiles_setup.sql`
3. `destinations.sql`

### 4️⃣ Launch the Server
```bash
cd server
npm install
npm run start:dev
```
The server will start on `http://localhost:3000`.

---

<p align="center">
  Made with ❤️ for the Tamil Nadu Tourism Innovation Hackathon 2025
</p>


=======
# <p align="center">🌍 Varna-Loka: The Pulse of Tamil Nadu</p>
>>>>>>> 8cbf9e3dee7dc7a58ba2b094b59c72a44ecbd63c

<p align="center">
  <img src="https://img.shields.io/badge/Status-Hackathon_MVP-brightgreen?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/Platform-Flutter%20|%20React%20|%20NestJS-blue?style=for-the-badge" alt="Platform">
  <img src="https://img.shields.io/badge/Database-Supabase-teal?style=for-the-badge&logo=supabase" alt="Database">
  <img src="https://img.shields.io/badge/AI-Gemini_Pro-orange?style=for-the-badge&logo=google" alt="AI">
</p>

<p align="center">
  <strong>Engineering the Joy of Discovery for the Modern Traveler.</strong><br>
  <i>A Taste-First, Aura-Optimized, and Spiritually Synchronized Travel Ecosystem.</i>
</p>

---

## 📖 Overview

**Varna-Loka** is an AI-powered travel intelligence platform designed to eliminate **Tourist Fatigue** by transforming how travelers experience Tamil Nadu.  
Instead of generic recommendations, Varna-Loka delivers **context-aware, culturally rich, and emotionally resonant journeys**.

The platform is built on five core experience pillars:

- 🍱 **Taste DNA** — Culinary intelligence driven by flavor profiles, food lore, and local authenticity  
- 📸 **Aura Cam** — AR-powered photography guidance aligned with golden hour, light, and location  
- 🏍️ **Rider Mode** — Scenic, curve-optimized routing for explorers and riders  
- 🕉️ **Spiritual Sync** — Crowd-aware heritage and temple experiences with peak-moment alerts  
- 🔁 **Smart Re-Routing** — Context-aware alternative destinations when places get overcrowded  

---

## 🌟 Why Varna-Loka?

Modern travelers face:
- Overcrowded destinations  
- Repetitive, algorithmic recommendations  
- Loss of cultural depth in travel  

**Varna-Loka solves this by combining AI reasoning, real-time signals, and regional knowledge** to create journeys that feel personal, peaceful, and profound.

---

## 💡 Core Features

### 🍱 Taste DNA Engine

Uses **Gemini AI** to interpret user cravings and map them to **authentic local food experiences**.  
Instead of suggesting just a restaurant, Varna-Loka recommends *specific dishes, vendors, and their cultural stories*.

---

### 📸 Aura Cam (AR Guide)

A real-time AR camera overlay that:
- Calculates sun position using GPS and time  
- Suggests the best angles and moments for photography  
- Enhances visual storytelling at heritage sites like Mahabalipuram  

---

### 🏍️ Rider Mode

Designed for riders and road explorers:
- Curve-weighted scenic routing  
- Nature-first paths over fastest routes  
- Discovery-driven navigation for soulful travel  

---

### 🕉️ Spiritual & Festival Sync

Connected with live crowd and festival data:
- Alerts users about peak spiritual moments  
- Diverts travelers to calmer or lesser-known heritage sites  
- Ensures serene, respectful, and meaningful visits  

---

### 🔁 Smart Re-Routing Intelligence

When a destination becomes overcrowded, Varna-Loka **does not simply delay the visit** — it intelligently recommends **similar alternative destinations** based on terrain, climate, experience, and cultural vibe.

**Example:**
- If **Ooty** is overcrowded → Recommend **Kodaikanal**  
- If **Mahabalipuram** is congested → Suggest **Pichavaram Mangrove Forest**  
- If a major temple exceeds crowd thresholds → Guide users to spiritually equivalent heritage sites  

This ensures travelers never lose the *essence* of their journey — only the stress.

---

## 🛠️ Technology Stack

- **Flutter** — Mobile application  
- **React** — Web & admin interfaces  
- **NestJS** — Scalable backend services  
- **Supabase** — Database, authentication, and real-time data  
- **Gemini Pro** — Generative AI for reasoning and personalization  

---

## 🌏 Vision

**Varna-Loka aims to become the cultural operating system for regional tourism in India**, starting with Tamil Nadu — preserving heritage, reducing crowd stress, empowering local ecosystems, and redefining discovery through intelligence.

---

<p align="center">
  Made with ❤️ for the <strong>Tamil Nadu Tourism Innovation Hackathon 2025</strong>
</p>
