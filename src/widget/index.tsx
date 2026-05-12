import React from 'react';
import { createRoot } from 'react-dom/client';
import WidgetApp from './WidgetApp';

/**
 * GetPriced Widget Loader
 * Finds a container with id 'getpriced-audit-widget' and injects the audit tool.
 */
function initWidget() {
  const container = document.getElementById('getpriced-audit-widget');
  if (!container) {
    console.warn('GetPriced Widget: Container #getpriced-audit-widget not found.');
    return;
  }

  // Create Shadow Root for style isolation
  const shadow = container.attachShadow({ mode: 'open' });
  
  // Create a mounting point inside shadow DOM
  const mountPoint = document.createElement('div');
  mountPoint.id = 'gp-widget-root';
  shadow.appendChild(mountPoint);

  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
    :host {
      display: block;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }
    #gp-widget-root {
      all: initial; /* Reset all styles for the container */
      display: block;
      font-family: inherit;
    }
    /* Add basic Tailwind-like utilities or pre-compiled CSS here */
  `;
  shadow.appendChild(style);

  // Render React App
  const root = createRoot(mountPoint);
  root.render(<WidgetApp />);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWidget);
} else {
  initWidget();
}
