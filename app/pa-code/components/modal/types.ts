export type EligibilityStatus = 'idle' | 'checking' | 'eligible' | 'not_eligible' | 'not_found';
export type Channel = 'whatsapp' | 'email' | 'web' | 'sms';

export interface NewRequestSlideOverProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface Patient {
  id: string;
  patientId: string;
  name: string;
  enrolleeId: string;
  hmo: string;
  role: string;
  plan: string;
}
  
export interface Service {
  id: string;
  name: string;
  code: string;
  price: number;
  quantity: number;
  category: string;
}