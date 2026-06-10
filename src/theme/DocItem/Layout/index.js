import React, { useState, useEffect } from 'react';
import Layout from '@theme-original/DocItem/Layout';
import { useLocation } from '@docusaurus/router';

const FINTECH_PASSWORD = 'fintech2025';
const STORAGE_KEY = 'fintech_auth';

function PasswordGate({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem(STORAGE_KEY) === 'true') {
      setAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === FINTECH_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (authenticated) {
    return children;
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
    }}>
      <div style={{
        padding: '2rem',
        borderRadius: '8px',
        border: '1px solid var(--ifm-color-emphasis-300)',
        width: '100%',
        maxWidth: '360px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔒</div>
        <h2 style={{ marginBottom: '0.5rem' }}>此頁面受到保護</h2>
        <p style={{ color: 'var(--ifm-color-emphasis-600)', marginBottom: '1.5rem' }}>
          請輸入密碼以查看 Fintech 內容
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(false); }}
            placeholder="輸入密碼"
            autoFocus
            style={{
              width: '100%',
              padding: '0.6rem 1rem',
              fontSize: '1rem',
              borderRadius: '6px',
              border: `1px solid ${error ? 'var(--ifm-color-danger)' : 'var(--ifm-color-emphasis-300)'}`,
              marginBottom: '0.75rem',
              boxSizing: 'border-box',
              background: 'var(--ifm-background-color)',
              color: 'var(--ifm-font-color-base)',
            }}
          />
          {error && (
            <p style={{ color: 'var(--ifm-color-danger)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
              密碼錯誤，請再試一次
            </p>
          )}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.6rem',
              fontSize: '1rem',
              borderRadius: '6px',
              border: 'none',
              background: 'var(--ifm-color-primary)',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            確認
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LayoutWrapper(props) {
  const location = useLocation();
  const isProtected =
    location.pathname.includes('/fintech/') ||
    location.pathname.includes('/daily_report/');

  if (isProtected) {
    return (
      <PasswordGate>
        <Layout {...props} />
      </PasswordGate>
    );
  }

  return <Layout {...props} />;
}
