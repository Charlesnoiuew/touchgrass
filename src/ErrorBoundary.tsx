import { Component, type ReactNode } from 'react';
import logo from './assets/logo.png';

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('[ErrorBoundary]', error);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div style={{ minHeight: '100svh', background: '#060806', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px', padding: '24px', textAlign: 'center' }}>
        <img src={logo} alt="Touch Grass Music Fest" style={{ height: '48px', width: 'auto' }} />
        <p style={{ color: 'rgba(255,255,255,.5)', fontSize: '14px', letterSpacing: '.05em' }}>Something went wrong. Please refresh the page.</p>
        <button
          onClick={() => window.location.reload()}
          style={{ background: '#aaff00', color: '#000', border: 'none', borderRadius: '4px', padding: '10px 28px', fontWeight: 700, fontSize: '13px', letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer' }}
        >
          Refresh
        </button>
      </div>
    );
  }
}
