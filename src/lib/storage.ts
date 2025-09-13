export interface TargetStudent {
  name: string;
  disability: string;
  currentLevel: string;
  goals: string;
  accommodations: string;
}

export interface Activity {
  phase: string;
  time: number;
  activity: string;
  materials: string;
  notes?: string;
}

export interface LessonPlan {
  id: string;
  title: string;
  subject: string;
  grade: string;
  duration: number;
  learningObjectives: string[];
  targetStudents: TargetStudent[];
  teachingMethods: string[];
  materials: string[];
  activities: Activity[];
  assessmentMethods: string[];
  accommodations: string[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const STORAGE_KEY = 'special-education-lesson-plans';

interface SerializedLessonPlan {
  id: string;
  title: string;
  subject: string;
  grade: string;
  duration: number;
  learningObjectives: string[];
  targetStudents: TargetStudent[];
  teachingMethods: string[];
  materials: string[];
  activities: Activity[];
  assessmentMethods: string[];
  accommodations: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

// Helper function to serialize dates
const serializeLessonPlan = (plan: LessonPlan): SerializedLessonPlan => ({
  ...plan,
  createdAt: plan.createdAt.toISOString(),
  updatedAt: plan.updatedAt.toISOString()
});

// Helper function to deserialize dates
const deserializeLessonPlan = (data: SerializedLessonPlan): LessonPlan => ({
  ...data,
  createdAt: new Date(data.createdAt),
  updatedAt: new Date(data.updatedAt)
});

export const storage = {
  getAllPlans: (): LessonPlan[] => {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      const rawPlans = JSON.parse(data);
      return rawPlans.map(deserializeLessonPlan);
    } catch (error) {
      console.error('Error getting lesson plans:', error);
      return [];
    }
  },

  savePlan: (plan: Omit<LessonPlan, 'id' | 'createdAt' | 'updatedAt'>): LessonPlan => {
    if (typeof window === 'undefined') throw new Error('Storage not available');
    
    const plans = storage.getAllPlans();
    const now = new Date();
    const newPlan: LessonPlan = {
      ...plan,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    
    plans.push(newPlan);
    const serializedPlans = plans.map(serializeLessonPlan);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializedPlans));
    return newPlan;
  },

  updatePlan: (id: string, updates: Partial<Omit<LessonPlan, 'id' | 'createdAt'>>): LessonPlan | null => {
    if (typeof window === 'undefined') throw new Error('Storage not available');
    
    const plans = storage.getAllPlans();
    const planIndex = plans.findIndex(plan => plan.id === id);
    
    if (planIndex === -1) return null;
    
    const updatedPlan: LessonPlan = {
      ...plans[planIndex],
      ...updates,
      updatedAt: new Date(),
    };
    
    plans[planIndex] = updatedPlan;
    const serializedPlans = plans.map(serializeLessonPlan);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializedPlans));
    return updatedPlan;
  },

  deletePlan: (id: string): boolean => {
    if (typeof window === 'undefined') throw new Error('Storage not available');
    
    const plans = storage.getAllPlans();
    const filteredPlans = plans.filter(plan => plan.id !== id);
    
    if (filteredPlans.length === plans.length) return false;
    
    const serializedPlans = filteredPlans.map(serializeLessonPlan);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializedPlans));
    return true;
  },

  getPlan: (id: string): LessonPlan | null => {
    const plans = storage.getAllPlans();
    return plans.find(plan => plan.id === id) || null;
  },

  exportPlans: (): string => {
    const plans = storage.getAllPlans();
    return JSON.stringify(plans.map(serializeLessonPlan), null, 2);
  },

  importPlans: (jsonData: string): boolean => {
    if (typeof window === 'undefined') throw new Error('Storage not available');
    
    try {
      const importedPlans: SerializedLessonPlan[] = JSON.parse(jsonData);
      const existingPlans = storage.getAllPlans();
      const deserializedImported = importedPlans.map(deserializeLessonPlan);
      const allPlans = [...existingPlans, ...deserializedImported];
      const serializedPlans = allPlans.map(serializeLessonPlan);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(serializedPlans));
      return true;
    } catch (error) {
      console.error('Error importing plans:', error);
      return false;
    }
  },

  clearAllPlans: (): void => {
    if (typeof window === 'undefined') throw new Error('Storage not available');
    localStorage.removeItem(STORAGE_KEY);
  }
};

// Export individual functions for compatibility with new features
export const loadLessonPlan = (id: string): LessonPlan | null => {
  return storage.getPlan(id);
};

export const saveLessonPlan = (plan: LessonPlan): void => {
  if (typeof window === 'undefined') throw new Error('Storage not available');
  
  const plans = storage.getAllPlans();
  const existingIndex = plans.findIndex(p => p.id === plan.id);
  
  if (existingIndex !== -1) {
    plans[existingIndex] = { ...plan, updatedAt: new Date() };
  } else {
    plans.push(plan);
  }
  
  const serializedPlans = plans.map(serializeLessonPlan);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(serializedPlans));
};

export const getAllLessonPlans = (): LessonPlan[] => {
  return storage.getAllPlans();
};