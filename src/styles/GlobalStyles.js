import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary: #00f2fe;
    --secondary: #4facfe;
    --accent: #f093fb;
    --dark: #0a0a0a;
    --darker: #050505;
    --light: #ffffff;
    --gray: #a0a0a0;
    --glass: rgba(255, 255, 255, 0.05);
    --glass-border: rgba(255, 255, 255, 0.1);
    --font-main: 'Inter', system-ui, -apple-system, sans-serif;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: var(--darker);
    color: var(--light);
    font-family: var(--font-main);
    overflow-x: hidden;
    line-height: 1.6;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    font-family: inherit;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: var(--darker);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--glass-border);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--primary);
  }
`;

export default GlobalStyles;
