'use client';
import React from 'react';

const milestones = [
  { id: 1, label: '25% of Car Loan Paid', desc: 'First quarter chunk gone from a major asset loan.', achieved: true, icon: '🚗' },
  { id: 2, label: '20% of All Debt Portfolio Repaid', desc: 'Across all credit cards, loans, mortgage.', achieved: false, icon: '💳' },
  { id: 3, label: 'Pay Off First Entire Debt Account', desc: 'Smallest credit card or personal loan fully cleared.', achieved: false, icon: '🎯' },
  { id: 4, label: '$25,000 of Personal Loan Principal Cleared', desc: 'Big round-number achievement.', achieved: false, icon: '💰' },
  { id: 5, label: '50% (Halfway) of Mortgage or Major Loan', desc: 'Halfway home moment.', achieved: false, icon: '🏠' },
  { id: 6, label: '75% of Credit Card Debt Paid Off', desc: 'Most of your high-interest debt eliminated.', achieved: false, icon: '📉' },
  { id: 7, label: 'All High-Interest Debt Cleared', desc: 'Psychologically huge milestone.', achieved: false, icon: '✨' },
  { id: 8, label: '$50,000 Total Debt Paid Off', desc: 'Lifetime total tracker milestone.', achieved: false, icon: '🏆' },
  { id: 9, label: '95% of Overall Debt Gone', desc: 'Final stretch to zero.', achieved: false, icon: '🚩' },
  { id: 10, label: '100% Debt Cleared – Debt-Free Celebration', desc: 'You’re debt-free! 🎉', achieved: false, icon: '🎉' }
];

export default function MilestonesPage() {
  return (
    <main
      style={{
        maxWidth: 650,
        margin: '0 auto',
        padding: '2.5rem 1rem',
        background: 'var(--background)',
        color: 'var(--foreground)',
        fontFamily: 'var(--font-family, system-ui)',
        minHeight: '100vh'
      }}
    >
      <h1
        style={{
          fontSize: '2.2rem',
          fontWeight: 700,
          marginBottom: '0.5rem',
          color: 'var(--foreground)'
        }}
      >
        Big Debt Milestones
      </h1>

      <p
        style={{
          fontSize: '1.06rem',
          marginBottom: '1.8rem',
          color: 'var(--card-foreground)'
        }}
      >
        Celebrate your major financial wins! These are the big checkpoints you’ll unlock along your journey.
      </p>

      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '1.1rem'
        }}
      >
        {milestones.map(m => (
          <li
            key={m.id}
            style={{
              background: m.achieved ? 'var(--popover)' : 'var(--card)',
              color: 'var(--card-foreground)',
              border: m.achieved ? '2px solid #19ebc2' : '1px solid var(--border, #E5E8F0)',
              boxShadow: m.achieved
                ? '0 3px 18px -8px #7dfad899'
                : '0 2px 8px -6px #d8dbe680',
              borderRadius: 14,
              padding: '1.15rem 1.35rem',
              transition: 'background 0.2s, border 0.22s, box-shadow 0.24s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              opacity: m.achieved ? 1 : 0.88
            }}
          >
            {/* Left side: Text */}
            <div style={{ flex: 1, paddingRight: '1rem' }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: '1.11rem',
                  color: m.achieved ? '#0E27F5' : 'var(--card-foreground)'
                }}
              >
                {m.label}
              </div>
              <div
                style={{
                  fontSize: '0.96rem',
                  color: '#555',
                  marginTop: 2
                }}
              >
                {m.desc}
              </div>
              {m.achieved && (
                <div
                  style={{
                    fontSize: '0.89rem',
                    color: '#19ebc2',
                    marginTop: 6,
                    fontWeight: 500
                  }}
                >
                  Milestone unlocked!
                </div>
              )}
            </div>

            {/* Right side: Status icon */}
            <div style={{ fontSize: '1.8rem', minWidth: 38, textAlign: 'right' }}>
              {m.achieved ? (
                '✅'
              ) : (
                <span style={{ color: '#0E27F5', fontSize: '2rem' }}>🔒</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
