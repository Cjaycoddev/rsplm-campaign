export const STATE_DATA = [
  { short: "Jonglei",  full: "Jonglei",                capital: "Bor",      voters: 1180000, supporters: 1620000, agents: 3120 },
  { short: "Unity",    full: "Unity",                  capital: "Bentiu",   voters: 620000,  supporters: 840000,  agents: 1850 },
  { short: "E. Eq.",   full: "Eastern Equatoria",      capital: "Torit",    voters: 540000,  supporters: 730000,  agents: 1420 },
  { short: "U. Nile",  full: "Upper Nile",             capital: "Malakal",  voters: 490000,  supporters: 680000,  agents: 1390 },
  { short: "C. Eq.",   full: "Central Equatoria",      capital: "Juba",     voters: 440000,  supporters: 650000,  agents: 1650 },
  { short: "Warrap",   full: "Warrap",                 capital: "Kuajok",   voters: 380000,  supporters: 510000,  agents: 980  },
  { short: "Lakes",    full: "Lakes",                  capital: "Rumbek",   voters: 290000,  supporters: 410000,  agents: 810  },
  { short: "N. BEG",   full: "Northern Bahr el Ghazal",capital: "Aweil",    voters: 210000,  supporters: 290000,  agents: 580  },
  { short: "W. Eq.",   full: "Western Equatoria",      capital: "Yambio",   voters: 110000,  supporters: 160000,  agents: 350  },
  { short: "W. BEG",   full: "Western Bahr el Ghazal", capital: "Wau",      voters: 90226,   supporters: 110250,  agents: 252  },
] as const;

export const ENGAGEMENT = [
  { name: "Supporters", value: 5400225, color: "#0E6B2F" },
  { name: "Volunteers", value: 300012,  color: "#C9A227" },
  { name: "Agents",     value: 180008,  color: "#0F47AF" },
  { name: "Donors",     value: 60005,   color: "#C8102E" },
] as const;

// Projected momentum  aspirational trajectory to election day
export const PROJECTION = [
  { month: "Q1",      supporters: 3200000, type: "actual" },
  { month: "Q2",      supporters: 4500000, type: "actual" },
  { month: "Q3",      supporters: 6000250, type: "current" },
  { month: "Q4",      supporters: 6750000, type: "projected" },
  { month: "Dec '26", supporters: 7500000, type: "projected" },
] as const;

export const TOTALS = {
  supporters: 6000250,
  voters: 4350226,
  agents: 12402,
  states: 10,
} as const;

export const DATA_SOURCE_NOTE =
  "Figures drawn from internal campaign records (Q3 2026). Projections are aspirational targets, not verified forecasts.";