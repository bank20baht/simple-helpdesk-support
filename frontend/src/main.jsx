import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClientProvider, QueryClient } from 'react-query'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import Login from './pages/Login'
import KanbanBoard from './components/KanbanBoard.jsx'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/Login",
    element: <Login />
  }, {
    path: "/",
    element: <KanbanBoard />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
