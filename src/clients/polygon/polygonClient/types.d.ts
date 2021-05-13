interface PolygonState {
  polygonStockDetails: PolygonStockDetails | Record<string, never>;
  loading: boolean;
  errors: string;
}

interface PolygonStockDetails {
  logo: string;
  listdate: string;
  cik: string;
  bloomberg: string;
  figi: string;
  lei: string;
  sic: number;
  country: string;
  industry: string;
  sector: string;
  marketcap: number;
  employees: number;
  phone: string;
  ceo: string;
  url: string;
  description: string;
  exchange: string;
  name: string;
  symbol: string;
  exchangeSymbol: string;
  hq_address: string;
  hq_state: string;
  hq_country: string;
  type: string;
  updated: string;
  tags: string[];
  similar: string[];
  active: boolean;
}

export { PolygonState };
