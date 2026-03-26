# Gestor de Gastos - Aplicación Web Moderna

Una aplicación web moderna y responsive para gestionar gastos personales, desarrollada con React, Firebase y TailwindCSS.

## Características Principales

### Dashboard Inteligente
- Resumen visual de balance total
- Gráficos interactivos de gastos por categoría
- Comparación ingresos vs gastos
- Alertas de exceso de presupuesto

### Gestión de Transacciones
- Registro fácil de ingresos y gastos
- Edición y eliminación de registros
- Categorización con iconos y colores
- Búsqueda y filtrado avanzado

### Análisis Financiero
- Estadísticas detalladas con gráficos
- Tendencias de gastos mensuales
- Análisis por categorías
- Predicciones inteligentes (próximamente)

### Experiencia de Usuario
- Diseño moderno y minimalista
- 100% responsive (mobile-first)
- Modo oscuro/claro
- Animaciones suaves y transiciones

### Seguridad
- Autenticación con Firebase
- Login con Google
- Datos encriptados y seguros
- Sesión persistente

## Tecnologías Utilizadas

- **Frontend**: React 19 + Vite
- **Estilos**: TailwindCSS + CSS Modules
- **Gráficos**: Recharts
- **Iconos**: Lucide React
- **Backend**: Firebase (Auth + Firestore)
- **Routing**: React Router DOM
- **Fechas**: date-fns
- **Build**: Vite

## Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd gestor-de-gastos
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar Firebase**
   - Crear un proyecto en [Firebase Console](https://console.firebase.google.com/)
   - Habilitar Authentication y Firestore Database
   - Copiar las credenciales en `src/firebase/config.js`

4. **Iniciar aplicación**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Deploy

### Deploy en Vercel
```bash
npm run build
vercel --prod
```

### Variables de entorno requeridas
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes UI básicos
│   └── layout/         # Componentes de layout
├── context/            # Context API (Auth, Expenses)
├── pages/              # Páginas principales
├── hooks/              # Custom hooks
├── utils/              # Utilidades y formatters
├── firebase/           # Configuración de Firebase
└── assets/             # Recursos estáticos
```

## Diseño y UX

- **Mobile-first**: Diseño optimizado para móviles
- **Accesibilidad**: Cumple con WCAG 2.1
- **Performance**: Optimizado para carga rápida
- **Dark Mode**: Soporte completo para modo oscuro
- **Animaciones**: Transiciones suaves y micro-interacciones

## Funcionalidades Técnicas

### Estado Global
- React Context para gestión de estado
- Firebase Realtime Database para sincronización
- Estado local optimizado con hooks

### Rutas Protegidas
- Sistema de autenticación completo
- Redirección automática
- Persistencia de sesión

### Formularios
- Validación en tiempo real
- Feedback visual de errores
- Experiencia de usuario optimizada

## Métricas y Analytics

- Dashboard con KPIs financieros
- Gráficos interactivos con Recharts
- Exportación de datos (CSV/PDF)
- Análisis de tendencias

## Roadmap

- [ ] Notificaciones push
- [ ] Sincronización multi-dispositivo
- [ ] Predicciones con IA
- [ ] Exportación avanzada
- [ ] Integración con bancos
- [ ] Modo offline

## Contribuir

1. Fork del proyecto
2. Crear feature branch (`git checkout -b feature/amazing-feature`)
3. Commit cambios (`git commit -m 'Add amazing feature'`)
4. Push al branch (`git push origin feature/amazing-feature`)
5. Abrir Pull Request

## Licencia

Este proyecto está bajo licencia MIT License - ver el archivo [LICENSE](LICENSE) para detalles.

## Agradecimientos

- Equipo de React por el framework increíble
- Firebase por la infraestructura backend
- TailwindCSS por el sistema de diseño utilitario
- Vite por la experiencia de desarrollo superior

---

**Desarrollado con ❤️ para ayudar a las personas a controlar mejor sus finanzas**
