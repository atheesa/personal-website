import React from 'react';

const JupyterNotebook = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0',
      margin: '20px 0',
      fontFamily: '"Fira Code", monospace',
      overflow: 'hidden'
    }}>
      <div style={{
        background: '#f5f5f5',
        padding: '8px 15px',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        gap: '15px',
        alignItems: 'center',
        fontSize: '0.8rem',
        color: '#555'
      }}>
        <span>Python 3 (ipykernel)</span>
        <span style={{color: '#ccc'}}>|</span>
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Run</span>
        <span style={{ marginLeft: 'auto', display: 'flex', gap: '5px' }}>
          <div style={{width: 8, height: 8, borderRadius: '50%', background: '#ff5f56'}}></div>
          <div style={{width: 8, height: 8, borderRadius: '50%', background: '#ffbd2e'}}></div>
        </span>
      </div>
      
      <div style={{ padding: '20px', background: '#fff', color: '#333' }}>
        {children}
      </div>
    </div>
  );
};

export default JupyterNotebook;