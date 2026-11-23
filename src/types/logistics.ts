export type Language = 'fr' | 'en' | 'zh';

export type AxisId = 'cn-kin' | 'cn-lub' | 'kin-lub' | 'lub-kin';

export type FreightMode = 'air' | 'sea' | 'road';

export type UserRole = 'admin' | 'client';

export interface AuthSession {
  role: UserRole;
  name: string;
  identifier: string;
}

export interface OfficeContact {
  id: string;
  countryKey: 'rdc' | 'bzv' | 'angola' | 'china';
  city: string;
  labelFr: string;
  labelEn: string;
  labelZh: string;
  manager?: string;
  address?: string;
  addressZh?: string;
  phones: string[];
  landline?: string;
  email?: string;
  whatsappPhone?: string;
  isAddressConfigurable?: boolean;
}

export interface ConfigurableSettings {
  foundedYear: string;
  rccmNumber: string;
  idNatNumber: string;
  openingHoursFr: string;
  openingHoursEn: string;
  openingHoursZh: string;
  airLeadTime: string;
  seaLeadTime: string;
  interDrcLeadTime: string;
  indicativeAirRate: string;
  indicativeSeaRate: string;
  primaryWhatsapp: string;
  angolaAddress: string;
}

export interface ShipmentMilestone {
  step: string;
  location: string;
  date: string;
  completed: boolean;
}

export interface ShipmentRecord {
  trackingNumber: string;
  clientName: string;
  axis: AxisId;
  mode: FreightMode;
  status: 'received_origin' | 'in_transit' | 'customs_clearance' | 'arrived_hub' | 'delivered';
  origin: string;
  destination: string;
  weightOrVolume: string;
  updatedAt: string;
  notes: string;
  milestones: ShipmentMilestone[];
}

export interface QuoteRequest {
  id: string;
  createdAt: string;
  fullName: string;
  company?: string;
  phone: string;
  email?: string;
  axis: AxisId;
  mode: FreightMode;
  cargoDescription: string;
  estimatedWeightVolume: string;
  preferredBranch: 'kinshasa' | 'lubumbashi' | 'brazzaville' | 'guangzhou';
  status: 'new' | 'reviewed' | 'quoted';
}
