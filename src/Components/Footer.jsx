import React from 'react';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#282c34', color: 'white', padding: '20px', textAlign: 'center' }}>
      <p>© 2025 Your Company. All rights reserved.</p>
      <div style={{ marginTop: '10px' }}>
        <a href="/privacy" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Privacy Policy</a>
        <a href="/terms" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Terms of Service</a>
      </div>
    </footer>
  );
}

export default Footer;
