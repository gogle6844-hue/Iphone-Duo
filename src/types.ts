export type PhoneColorId = 'nightsky' | 'starwhite';

export interface PhoneColorConfig {
  id: PhoneColorId;
  name: string;
  nameEn: string;
  tagline: string;
  description: string;
  chassisBg: string;
  chassisBorder: string;
  glareColor: string;
  hingeBg: string;
  glowBg: string;
  accent: string;
  accentGlow: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  textColor: string;
  subtextColor: string;
  chipLuster: string;
}

export type FoldPreset = 'folded' | 'flex' | 'unfolded';

export type DuoOSTask = 'multitask' | 'dragdrop' | 'laptop';
