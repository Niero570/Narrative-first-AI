import React from 'react';
import './PaywallModal.css';

export default function PaywallModal({ onSubscribe, onDismiss, onSave, hasMessages }) {
  return (
    <div className="pw-overlay" onClick={onDismiss}>
      <div className="pw-card" onClick={e => e.stopPropagation()}>
        <div className="pw-mark">✦</div>
        <h2 className="pw-heading">You've been in this.</h2>
        <p className="pw-sub">
          Twenty messages in — that's not small talk. Keep going for $9/month.
        </p>

        <button className="pw-btn-primary" onClick={onSubscribe}>
          Continue for $9/month
        </button>

        {hasMessages && (
          <button className="pw-btn-secondary" onClick={() => { onSave(); onDismiss(); }}>
            Save what I have first
          </button>
        )}

        <button className="pw-btn-ghost" onClick={onDismiss}>
          Not right now
        </button>

        <p className="pw-note">
          Cancel anytime. Your diary entries are always yours.
        </p>
      </div>
    </div>
  );
}
