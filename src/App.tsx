
import Layout from "./components/Layout";
import React from 'react';
import AppRoutes from './routes/AppRoutes'; // Import centralized routing
import { app, analytics } from "./services/firebase";
import './App.css';

const App: React.FC = () => {

  console.log("Firebase App Initialized:", app);

  return (
    <div>
      <Layout>
        <AppRoutes />
      </Layout>
    </div>
  );
};

export default App;
