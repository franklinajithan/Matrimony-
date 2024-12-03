
import Layout from "./components/Layout";
import React from 'react';
import AppRoutes from './routes/AppRoutes'; // Import centralized routing

const App: React.FC = () => {
  return (
    <div>
     <Layout>
      <AppRoutes />
    </Layout>
    </div>
  );
};

export default App;
