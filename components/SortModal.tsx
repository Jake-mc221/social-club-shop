'use client'

import { SortBy } from '@/types';

interface Props {
    sortBy: SortBy;
    onSelect: (sort: SortBy) => void;
    onClose: () => void;
}

const OPTIONS: { label: string; value: SortBy }[] = [
  { label: 'Default',        value: 'default'    },
  { label: 'Price: Low → High', value: 'price-asc'  },
  { label: 'Price: High → Low', value: 'price-desc' },
  { label: 'Alphabetical',   value: 'alpha'      },
];

export default function SortModal({ sortBy, onSelect, onClose}: Props) {
    return (
    <>
      <div className="fixed inset-0 z-50 bg-black/60" onClick={onClose} />

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-72 bg-[#1a1a1a] border border-[#2e2e2e] rounded-2xl font-serif overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#2e2e2e]">
          <span className="text-white font-bold">Sort By</span>
          <button onClick={onClose} className="text-[#666] text-sm" style={{ WebkitTapHighlightColor: 'transparent' }}>
            Close
          </button>
        </div>
        <ul>
          {OPTIONS.map((opt) => (
            <li key={opt.value}>
              <button
                onClick={() => onSelect(opt.value)}
                className={`w-full text-left px-5 py-4 text-sm border-b border-[#2e2e2e] transition-colors ${
                  sortBy === opt.value ? 'text-white font-bold' : 'text-[#888]'
                }`}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
    );
}