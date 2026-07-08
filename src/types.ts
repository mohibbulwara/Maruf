export interface EducationItem {
  degree: string;
  department?: string;
  institute: string;
  result: string;
  year: string;
  board: string;
  highlights: string[];
}

export interface TrainingItem {
  institute: string;
  subject: string;
  duration: string;
  year: string;
  details: string[];
}

export interface SkillItem {
  name: string;
  category: 'Technical' | 'Biomedical' | 'Interpersonal';
  level: number; // 1-100
  description: string;
}

export interface PersonalInfo {
  label: string;
  value: string;
}

export interface ReferenceItem {
  name: string;
  designation: string;
  department: string;
  institute: string;
  phone: string;
}
