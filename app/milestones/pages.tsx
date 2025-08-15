// app/milestones/page.tsx

'use client';
import React from 'react';

const milestones = [
  { id: 1, label: '25% of Car Loan Paid', description: 'First quarter chunk gone from a major asset loan.', achieved: false },
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
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ color: '#0E27F5', fontSize: '2rem', marginBottom: '1rem' }}>Big Debt Milestones</h1>
      <p style={{ color: '#555', marginBottom: '2rem' }}>
        Celebrate your major financial wins! These are the big checkpoints you’ll unlock along your journey.
      </p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {milestones.map(m => (
          <li
            key={m.id}
            style={{
              background: m.achieved ? '#D7F9E9' : '#F7F9FF',
              border: '1px solid #E5E8F0',
              borderRadius: 12,
              padding: '1rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem'
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>{m.achieved ? '✅' : '🔒'}</span>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                {m.label}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#555' }}>{m.description}</div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
