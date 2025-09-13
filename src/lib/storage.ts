export interface LessonPlan {
  id: string;
  title: string;
  subject: string;
  grade: string;
  duration: string;
  date: string;
  objectives: string;
  materials: string;
  studentNeeds: string;
  accommodations: string;
  activities: {
    introduction: string;
    development: string;
    conclusion: string;
  };
  assessment: string;
  reflection: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'special-education-lesson-plans';

export const storage = {
  getAllPlans: (): LessonPlan[] => {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting lesson plans:', error);
      return [];
    }
  },

  savePlan: (plan: Omit<LessonPlan, 'id' | 'createdAt' | 'updatedAt'>): LessonPlan => {
    if (typeof window === 'undefined') throw new Error('Storage not available');
    
    const plans = storage.getAllPlans();
    const now = new Date().toISOString();
    const newPlan: LessonPlan = {
      ...plan,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    
    plans.push(newPlan);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
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
      updatedAt: new Date().toISOString(),
    };
    
    plans[planIndex] = updatedPlan;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
    return updatedPlan;
  },

  deletePlan: (id: string): boolean => {
    if (typeof window === 'undefined') throw new Error('Storage not available');
    
    const plans = storage.getAllPlans();
    const filteredPlans = plans.filter(plan => plan.id !== id);
    
    if (filteredPlans.length === plans.length) return false;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPlans));
    return true;
  },

  getPlan: (id: string): LessonPlan | null => {
    const plans = storage.getAllPlans();
    return plans.find(plan => plan.id === id) || null;
  },

  exportPlans: (): string => {
    const plans = storage.getAllPlans();
    return JSON.stringify(plans, null, 2);
  },

  importPlans: (jsonData: string): boolean => {
    if (typeof window === 'undefined') throw new Error('Storage not available');
    
    try {
      const importedPlans: LessonPlan[] = JSON.parse(jsonData);
      const existingPlans = storage.getAllPlans();
      const allPlans = [...existingPlans, ...importedPlans];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allPlans));
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