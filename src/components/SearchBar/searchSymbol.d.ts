interface CompanyList {
  company: company;
  status: string;
}

type company = {
  symbol: string;
  instrument_name: string;
  exchange: string;
  exchange_timezone: string;
  instrument_type: string;
  country: string;
  currency: string;
};

export { CompanyList, company };
