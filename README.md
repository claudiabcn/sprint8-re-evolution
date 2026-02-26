# ⚡️ SPRINT 8: Re-evolución

This project is a modern web space created to document my personal evolution. It’s more than a tracker; it’s a daily reflection on movement and recovery. By logging every gym session and rehab appointment, I’m building a visual story of how staying active impacts my evolution.

## 🎯 Objectives:

- Build a React app with navigation and routing across multiple views (Home, Map, Calendar, Charts)
- Create and consume a real CRUD API connected to a database (Supabase)
- Integrate interactive tools: Leaflet maps, FullCalendar and Chart.js with real data
- Implement marker categories with filters on the map
- Enable event editing from a modal with API synchronization

## 💻 Technology Stack:

- **React** 
- **TypeScript** 
- **Vite** 
- **Supabase** 
- **Tailwind CSS**
- **React Router** 
- **Leaflet** 
- **FullCalendar** 
- **Chart.js**

## 📋 Files:

```
├── src/
│   ├── assets/
│   ├── config/
│   ├── features/
│   │   ├── auth/
│   │   ├── calendar/
│   │   ├── chart/
│   │   ├── home/
│   │   ├── maps/
│   │   └── records/
│   ├── lib/
│   ├── routes/
│   ├── shared/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx        
```
## 🛠 Installation:

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/claudiabcn/sprint8-re-evolution
    ```

2.  **Install Dependencies:**

    ```bash
    cd sprint8-re-evolution
    npm install
    ```

3. **Environment Variables:**
   
    Create a `.env` file in the root directory:
   
    ```
    VITE_SUPABASE_URL
    VITE_SUPABASE_ANON_KEY
    ```

4. **Run Development Server:**
   ```npm run dev```
   
    The app will be available at `http://localhost:5173`

## 📸 Demo:

https://vercel.com/claudiabcns-projects/sprint8-re-evolution

<img width="1235" height="1027" alt="Captura de pantalla 2026-02-26 101702" src="https://github.com/user-attachments/assets/acfb1aef-e518-4107-b004-98b9af91463f" />


## ⭐ Learnings and challenges:

This sprint pushed me beyond building features and into thinking about how to structure them. 
Integrating tools like Supabase, Leaflet, FullCalendar and Chart.js taught me that the real 
challenge isn't making things work — it's keeping the codebase clean as it grows. I started 
applying the Single Responsibility Principle across components, hooks and services, learning to 
ask "should this really live here?" before writing a single line. The biggest shift was 
architectural: understanding the difference between data access, business logic and UI state, 
and giving each its own place.


   
