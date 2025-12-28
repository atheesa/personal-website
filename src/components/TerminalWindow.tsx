import React from 'react';

const TerminalWindow = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{
      background: '#1e1e1e',
      borderRadius: '8px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      fontFamily: 'monospace',
      overflow: 'hidden',
      border: '1px solid #333',
      margin: '20px 0'
    }}>
      <div style={{
        background: '#252526',
        padding: '10px 15px',
        display: 'flex',
        gap: '8px',
        borderBottom: '1px solid #333'
      }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
        <span style={{ marginLeft: '10px', color: '#888', fontSize: '0.8rem' }}>bash — GraphQueryLang</span>
      </div>
      
      <div style={{ padding: '20px', color: '#d4d4d4', lineHeight: '1.6' }}>
        {children}
      </div>
    </div>
  );
};

export default TerminalWindow;