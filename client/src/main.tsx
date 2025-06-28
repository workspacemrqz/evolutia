import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './lib/i18n'

import { createRoot } from "react-dom/client";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);