'use client';
import React from 'react';

// Mock milestone data
const milestones = [
  { id: 1, label: '25% of Car Loan Paid', description: 'First quarter chunk gone from a major asset loan.', achieved: true },
  { id: 2, label: '20% of All Debt Portfolio Repaid', description: 'Across all credit cards, loans, mortgage.', achieved: false },
  { id: 3, label: 'Pay Off First Entire Debt Account', description: 'Smallest credit card or personal loan fully cleared.', achieved: false },
  { id: 4, label: '$25,000 of Personal Loan Principal Cleared', description: 'Big round-number achievement.', achieved: false },
  { id: 5, label: '50% (Halfway) of Mortgage or Major Loan', description: 'Halfway home moment.', achieved: false },
  { id: 6, label: '75% of Credit Card Debt Paid Off', description: 'Most of your high-interest debt eliminated.', achieved: false },
  { id: 7, label: 'All High-Interest Debt Cleared', description: 'Psychologically huge milestone.', achieved: false },
  { id: 8, label: '$50,000 Total Debt Paid Off', description: 'Lifetime total tracker milestone.', achieved: false },
  { id: 9, label: '95% of Overall Debt Gone', description: 'Final stretch to zero.', achieved: false },
  { id: 10, label: '100% Debt Cleared – Debt-Free Celebration', description: 'You’re debt-free! 🎉', achieved: false }
];

export default function MilestonesPage() {
  return (
    <main
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '2rem',
        background: 'var(--background)',
        color: 'var(--foreground)',
        fontFamily: 'var(--font-family, system-ui)' // Matches pages.tsx font
      }}
    >
      <h1
        style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          color: 'var(--foreground)'
        }}
      >
        Big Debt Milestones
      </h1>

      <p style={{ marginBottom: '2rem', fontSize: '1rem', color: 'var(--card-foreground)' }}>
        Celebrate your major financial wins! These are the big checkpoints you’ll unlock along your journey.
      </p>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {milestones.map(m => (
          <li
            key={m.id}
            style={{
              background: m.achieved ? 'var(--popover)' : 'var(--card)',
              color: 'var(--card-foreground)',
              border: '1px solid var(--border, #E5E8F0)',
              borderRadius: '12px',
              padding: '1rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              transition: 'background 0.3s ease'
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>{m.achieved ? '✅' : '🔒'}</span>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                {m.label}
              </div>
              <div style={{ fontSize: '0.9rem' }}>
                {m.description}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
