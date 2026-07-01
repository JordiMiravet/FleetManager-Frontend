# Fleet Manager

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-TS-blue?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=for-the-badge)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

![PrimeNG](https://img.shields.io/badge/PrimeNG-6C2BD9?style=for-the-badge&logo=primeng&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)
![FullCalendar](https://img.shields.io/badge/FullCalendar-3788D8?style=for-the-badge&logo=fullcalendar&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![Tests](https://img.shields.io/badge/Tests-Jasmine-8A4Baf?style=for-the-badge&logo=jasmine&logoColor=white)

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Firebase Auth](https://img.shields.io/badge/Firebase_Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

## Table of Contents

- [Application Overview](#application-overview)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Project Preview](#project-preview)
- [Tests](#tests)
- [Contribution](#contribution)
- [GitHub Pages](#github-pages)
- [Author](#author)

---

## Application Overview

Fleet Manager is an Angular 20 application designed to help users manage their personal vehicle garage. It allows each user to organize their vehicles, track their locations, schedule vehicle usage through an interactive calendar, and visualize detailed usage statistics.

The application follows a modular architecture based on reusable components and integrates user authentication, route guards, API communication, state management, reactive forms with validation, and data persistence.

- **User Authentication:** Register and sign in using an email address and password. Each user has an independent account with their own personal data.
- **Vehicle Management (CRUD):** Create, view, update, and delete vehicles within your personal garage. The vehicle table includes search and sorting capabilities to quickly find and organize vehicles. Vehicle owners have full control over their vehicles and their configuration.
- **Vehicle Sharing and Permissions:** Share vehicles with other users and manage access levels. Users with granted access can view vehicle information, update locations, create and manage usage events, and access statistics, while owner-only actions such as editing or deleting the vehicle remain restricted to the owner.
- **Interactive Map:** View all registered vehicles on an interactive map. Vehicle locations can be updated by dragging and dropping markers or by using the geolocation feature to automatically set a vehicle's location based on the user's current position. The map also supports filtering vehicles to display a specific vehicle.
- **Vehicle Usage Calendar:** Schedule vehicle usage events with specific start and end dates and times.
- **Event Management (CRUD):** Create, view, update, and delete usage events directly from the calendar.
- **Usage Validation:** Prevent overlapping usage events for the same vehicle and validate that event time ranges are logically consistent, avoiding invalid schedules where the end time occurs before the start time.
- **Dynamic Filtering:** Filter usage events by vehicle or display events from the entire garage.
- **Comments:** Add comments to scheduled events.
- **Statistics Dashboard:**
  - Total accumulated usage hours per vehicle.
  - Most-used vehicle.
  - Distribution of usage hours by day of the week.

Fleet Manager combines vehicle management, interactive mapping, scheduling, and statistical analysis into a single integrated platform.

## Technologies

### Frontend
- `Angular 20`
- `TypeScript`
- `SCSS`
- `HTML5`

### UI and Visualization Libraries
- `PrimeNG`
- `Leaflet`
- `FullCalendar`
- `Chart.js`

### Backend
- `NestJS`
- `MongoDB`

### Authentication
- `Firebase Authentication`

### Testing
- `Jasmine & Karma`

---

## Project Structure

```bash
src/
├─ app/
│  ├─ core/                         # Global application infrastructure
│  │  ├─ guards/
│  │  ├─ layout/                    # Header, navigation, global UI components
│  │  └─ services/                  # Global services (auth, geolocation, theme)
│  │
│  ├─ features/                     # Main application features
│  │  ├─ auth/                      # Login, registration, interceptors
│  │  ├─ vehicle/                   # Vehicle management (CRUD, state, modals)
│  │  ├─ map/                       # Interactive map (Leaflet)
│  │  ├─ calendar/                  # Events and scheduling (FullCalendar)
│  │  └─ graphics/                  # Statistics and data visualization (Chart.js)
│  │
│  ├─ shared/                       # Reusable components
│  │  ├─ ui/                        # Buttons, modals, generic UI components
│  │  ├─ pipes/
│  │  ├─ directives/
│  │  └─ models/
│  │
│  ├─ app.config.ts
│  ├─ app.routes.ts
│  ├─ main.ts
│  └─ app.html / app.scss / app.ts
│
├─ assets/
│  ├─ icons/
│  └─ readme/
│
├─ environments/
├─ styles/                          # Global SCSS styling system
│  ├─ abstracts/                    # Variables and mixins
│  ├─ base/                         # Reset and base typography
│  ├─ themes/                       # Light / dark themes
│  ├─ tokens/                       # Design system (spacing, colors, radius, etc.)
│  └─ utilities/                    # SCSS helpers
│
└─ index.html
```

---

## Installation

The application is divided into two repositories:
- Frontend → Angular 20 https://github.com/JordiMiravet/FleetManager-Frontend.git
- Backend → NestJS https://github.com/JordiMiravet/FleetManager-Backend.git

Both repositories need to be running for the application to work correctly.

#### Prerequisites

- Node.js v20 or higher
- Angular CLI (`npm install -g @angular/cli`)
- MongoDB running

#### 1. Frontend

Clone the repository:

```bash
    git clone https://github.com/JordiMiravet/FleetManager-Frontend.git
    cd fleetmanager-frontend
    npm install
```
Firebase Authentication configuration:

- Configure Firebase Authentication:
    - Create a project in Firebase Console
    - Enable Email/Password Authentication
    - Add a web application and copy the configuration
    - Create src/environments/environment.ts with your configuration

Inside src, create the environments folder and add the file:

```bash
    src/environments/environment.ts
```

With the following content, replacing the values with your project configuration:

```typescript
    export const environment = {
        production: true,
        firebaseConfig: {
            apiKey: "YOUR_API_KEY",
            authDomain: "YOUR_AUTH_DOMAIN",
            projectId: "YOUR_PROJECT_ID",
            storageBucket: "YOUR_STORAGE_BUCKET",
            messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
            appId: "YOUR_APP_ID"
        }
    };
```

#### 2. Backend

Clone the backend repository:

```bash
    git clone https://github.com/JordiMiravet/FleetManager-Backend.git
    cd fleetmanager-backend
    npm install
```

Create a .env file in the project root with the following content:

```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/whereismycar

    FIREBASE_PROJECT_ID=your_project_id
    FIREBASE_CLIENT_EMAIL=your_client_email
    FIREBASE_PRIVATE_KEY=your_private_key
```

Firebase credentials can be obtained from:

Firebase Console → Project Settings → Service Accounts → Generate new private key.

From the downloaded JSON file, you need:

- project_id
- client_email
- private_key

The private_key must remain on a single line and preserve the \n characters.

#### 3. Run the application

First, start the backend:

```code
    npm run start:dev
```

Then, in another terminal inside the frontend project, start the frontend:

```bash
    ng serve
```

Open the application in your browser:

```bash
    http://localhost:4200
```


Notes
- Node.js must be installed.
- Angular CLI must be installed globally:
```bash
    npm install -g @angular/cli
```
- Real credentials are not included in the repository.
- Each developer must use their own Firebase project.

---

## Usage

1. Abrir la aplicación en el navegador: http://localhost:4200  
2. Registrar un nuevo usuario con email y contraseña  
3. Iniciar sesión con tus credenciales  
4. Crear, editar o eliminar un vehículo desde el panel de gestión de vehículos  
5. Visualizar y gestionar vehículos en el mapa (Map)  
   - Por defecto se muestran todos los vehículos  
   - Es posible filtrar un vehículo concreto para ver solo su ubicación  
6. Crear, editar o eliminar eventos en el calendario para cada vehículo (Calendar)  
   - La aplicación evita conflictos de horario entre eventos del mismo vehículo  
   - Por defecto se muestran los eventos de todos los vehículos  
   - Es posible filtrar por vehículo  
7. Visualizar estadísticas en la sección de gráficos (Graphics)  
   - Los datos pueden filtrarse por período: This Month, This Year y All Time  

---

## Project Preview

A continuación se muestra una vista previa de la aplicación en funcionamiento:

#### Registro de usuario
![Register](src/assets/readme/FM-register.gif)
#### Login de usuario
![Login](src/assets/readme/FM-login.gif)
#### Gestión de vehículos (CRUD)
![Create Vehicle](src/assets/readme/FM-vehicle-create.gif)
![Edit Vehicle](src/assets/readme/FM-vehicle-edit.gif)
![Delete Vehicle](src/assets/readme/FM-vehicle-delete.gif)
#### Gestión de vehículos (Filtrado de vehiculos)
![Vehicle Filter](src/assets/readme/FM-vehicle-filter.gif)
#### Mapa interactivo (drag & drop y filtrado por coches)
![Drag & Drop](src/assets/readme/FM-map-dragdrop.gif)
![Geolocation Update Button](src/assets/readme/FM-map-geolocation-button.gif)
#### Calendario de eventos (CRUD)
![Create Event](src/assets/readme/FM-event-create.gif)
![Edit Event](src/assets/readme/FM-event-edit.gif)
#### Calendario de eventos (filtrado de eventos)
![Event filter](src/assets/readme/FM-event-filter.gif)
#### Calendario de eventos (validaciones: control de solapamientos)
![Overlap validation](src/assets/readme/FM-event-valid-overlap.gif)
![Event time validation](src/assets/readme/FM-event-valid-time.gif)
#### Panel de estadísticas (gráficos)
![Graphics](src/assets/readme/FM-graphics.gif)

---

## Tests

La aplicación incluye tests unitarios desarrollados con Jasmine, ejecutables mediante Angular CLI:

```bash
    ng test
```
- Componentes y servicios principales testeados:
    - Componentes: `VehicleTableComponent`, `CalendarViewComponent`, `MapViewComponent`, `GraphicsViewComponent`
    - Servicios: `VehicleService`, `CalendarService`, `MapService`, `GraphicsService`
- Cobertura:

```markdown
=============================== Coverage summary ===============================
Statements   : 96.6% ( 853/883 )
Branches     : 89.14% ( 156/175 )
Functions    : 95.51% ( 234/245 )
Lines        : 97.11% ( 775/798 )
================================================================================

TOTAL: 691 SUCCESS
```

#### Ejemplo destacado y explicación por líneas

El siguiente test es uno de los más interesantes, ya que combina asincronía, manejo de errores y fallback logic dentro del método saveVehicle del MapComponent:

```typescript
it('should use fallback location when geolocation fails', async () => {

    // 1. Mock del vehículo que se va a guardar
    const vehicle = {
        name: 'Mercedes GLC Coupe',
        model: 'GLC Coupe',
        plate: '3447VHZ',
    };

    // 2. Establecemos el modo de modal en 'create'
    vehicleModalStateServiceMock.mode.set('create');

    // 3. Simulamos que la geolocalización falla
    geolocationServiceMock.getCurrentLocation.and.rejectWith(new Error('geolocation failed'));

    // 4. Reiniciamos los spies de addVehicles
    vehicleServiceMock.addVehicles.calls.reset();

    // 5. Llamamos a saveVehicle
    await component.saveVehicle(vehicle as any);

    // 6. Se espera que se haya intentado obtener la geolocalización
    expect(geolocationServiceMock.getCurrentLocation).toHaveBeenCalled();

    // 7. Se espera que el vehículo se haya añadido usando la ubicación fallback
    expect(vehicleServiceMock.addVehicles).toHaveBeenCalled();
    const addedVehicle = vehicleServiceMock.addVehicles.calls.mostRecent().args[0];
    expect(addedVehicle.location).toEqual({ lat: 41.478, lng: 2.310 });

    // 8. Se espera que se cierre el modal al finalizar
    expect(vehicleModalStateServiceMock.close).toHaveBeenCalled();
});
```

#### Ejemplo de test de template

Este test asegura que el mapa se renderiza correctamente cuando la lista de vehículos no está vacía:
```Typescript
it('should render map view when vehicle list is not empty', () => {
    vehicleServiceMock.vehicles.set([{
        name: 'Mercedes GLC Coupe',
        model: 'GLC Coupe',
        plate: '3447VHZ',
        location: { lat: 41.486, lng: 2.311 }
    }]);
    fixture.detectChanges();

    const mapView = fixture.nativeElement.querySelector('app-map-view');
    expect(mapView).toBeTruthy();
});
```

También se testean casos de estado vacío y apertura/cierre de modales para asegurar la correcta interacción del usuario con la interfaz.

---

## Contribution

Si quieres contribuir a este proyecto, puedes:

1. Hacer un fork de los repositorios. 
   - Frontend: https://github.com/JordiMiravet/FleetManager-Frontend.git
   - Backend: https://github.com/JordiMiravet/FleetManager-Backend.git
2. Crear una rama con la nueva funcionalidad o corrección de bug (`git checkout -b feature/nueva-funcionalidad`).
3. Hacer commits claros y descriptivos.
4. Hacer push a tu rama.
5. Crear un Pull Request describiendo tus cambios.

---

## GitHub Pages

Actualmente, la aplicación no está desplegada en GitHub Pages. 

## Author

[**Jordi Miravet**](https://www.linkedin.com/in/jordimiravet-dev/)