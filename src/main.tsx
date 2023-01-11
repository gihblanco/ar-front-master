import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import { useQuery, QueryClient, QueryClientProvider, } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}> 
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
)
