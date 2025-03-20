import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router';
import { Root } from './Root.tsx';

createRoot(document.getElementById('root')!).render(
  <Router>
    <Root />
  </Router>
);
