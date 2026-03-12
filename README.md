# React + Vite

1. Cloner le repo
Bash : git clone https://github.com/chebbimohamed/tunisiMed-.git
cd tunisiMed-
2. Installer les dépendances
Bash : npm install
3. Lancer en mode dev
Bash : npm run dev
 Commandes Importantes
npm run dev : Lance le projet sur http://localhost:5173.

npm run build : Compile le projet pour la mise en ligne.

npm run preview : Teste le build localement.

 Structure du Projet (Vite)
Plaintext
tunisiMed-/
 ├── src/
 │    ├── components/    # CourseBuilder, Sidebar, QuizEngine
 │    ├── pages/         # Dashboard, LoginPage, CourseView
 │    ├── App.jsx        # Routing principal
 │    └── main.jsx       # Entry point
 ├── public/             # Assets statiques
 └── vite.config.js      # Configuration Vite
