export interface EvaluationCriteria {
  area: string;           // 평가 영역
  description: string;    // 평가 기준
  levels: {
    high: string;         // 가 수준 기준
    middle: string;       // 나 수준 기준
    low: string;          // 다 수준 기준
  };
}

export interface LessonPlan {
  id: string;
  basicInfo: {
    title: string;           // 수업 주제
    subject: string;         // 과목
    unit: string;           // 단원
    lesson: string;         // 차시 (예: "3/8차시")
    grade: string;          // 학년
    duration: number;       // 수업 시간 (분)
    date: string;           // 수업 날짜
    teacher: string;        // 지도 교사
    students: {             // 수업 대상
      total: number;
      levels: {
        high: number;       // 가 수준
        middle: number;     // 나 수준
        low: number;        // 다 수준
      }
    }
  };

  objectives: {
    main: string;           // 주요 학습 목표
    byLevel: {
      high: string;         // 가 수준 목표
      middle: string;       // 나 수준 목표
      low: string;          // 다 수준 목표
    }
  };

  materials: {
    teacher: string[];      // 교사 준비물
    student: string[];      // 학생 준비물
    assistive: string[];    // 보조 도구 (AAC, 태블릿PC 등)
  };

  activities: {
    introduction: {         // 도입 (5분)
      greeting: string;     // 인사하기
      review: string;       // 전시학습 상기
      motivation: string;   // 동기유발
      objectives: string;   // 학습목표 제시
      preview: string;      // 활동 제시
    };

    development: {          // 전개 (30분)
      activity1: {
        title: string;
        content: string;
        materials: string;
        levelSupport: {
          high: string;
          middle: string;
          low: string;
        };
        behaviorSupport: {
          contract: string;
          modeling: string;
        };
        assessment: string;
      };
      activity2: {
        title: string;
        content: string;
        teamwork: string;
        demonstration: string;
        practice: string;
        feedback: string;
        scoring: string;
      };
    };

    closure: {              // 정리 (5분)
      evaluation: string;   // 평가 (O/X 카드 등)
      nextLesson: string;   // 차시예고
      farewell: string;     // 인사하기
    };
  };

  evaluation: {
    criteria: EvaluationCriteria[];
    reflection: {
      strengths: string;
      improvements: string;
      nextPlans: string;
    };
  };

  specialNeeds: {
    communicationSupport: string[];  // 의사소통 지원
    learningSupport: string[];       // 학습 지원
    behaviorSupport: string[];       // 행동 지원
    sensorySupport: string[];        // 감각 지원
    participationSupport: string[];  // 참여 지원
  };

  createdAt: Date;
  updatedAt: Date;
}

// 기존 인터페이스들 (하위 호환성을 위해 유지)
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

export interface LegacyLessonPlan {
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
  basicInfo?: {
    title: string;
    subject: string;
    unit: string;
    lesson: string;
    grade: string;
    duration: number;
    date: string;
    teacher: string;
    students: {
      total: number;
      levels: {
        high: number;
        middle: number;
        low: number;
      }
    }
  };
  objectives?: {
    main: string;
    byLevel: {
      high: string;
      middle: string;
      low: string;
    }
  };
  materials?: {
    teacher: string[];
    student: string[];
    assistive: string[];
  };
  activities?: {
    introduction: {
      greeting: string;
      review: string;
      motivation: string;
      objectives: string;
      preview: string;
    };
    development: {
      activity1: {
        title: string;
        content: string;
        materials: string;
        levelSupport: {
          high: string;
          middle: string;
          low: string;
        };
        behaviorSupport: {
          contract: string;
          modeling: string;
        };
        assessment: string;
      };
      activity2: {
        title: string;
        content: string;
        teamwork: string;
        demonstration: string;
        practice: string;
        feedback: string;
        scoring: string;
      };
    };
    closure: {
      evaluation: string;
      nextLesson: string;
      farewell: string;
    };
  };
  evaluation?: {
    criteria: EvaluationCriteria[];
    reflection: {
      strengths: string;
      improvements: string;
      nextPlans: string;
    };
  };
  specialNeeds?: {
    communicationSupport: string[];
    learningSupport: string[];
    behaviorSupport: string[];
    sensorySupport: string[];
    participationSupport: string[];
  };
  createdAt: string;
  updatedAt: string;

  // 기존 필드들 (하위 호환성)
  title?: string;
  subject?: string;
  grade?: string;
  duration?: number;
  learningObjectives?: string[];
  targetStudents?: TargetStudent[];
  teachingMethods?: string[];
  materials_legacy?: string[];
  activities_legacy?: Activity[];
  assessmentMethods?: string[];
  accommodations?: string[];
  notes?: string;
}

// Helper function to serialize dates
const serializeLessonPlan = (plan: LessonPlan): SerializedLessonPlan => ({
  ...plan,
  createdAt: plan.createdAt.toISOString(),
  updatedAt: plan.updatedAt.toISOString()
});

// Helper function to deserialize dates
const deserializeLessonPlan = (data: SerializedLessonPlan): LessonPlan => {
  // 새로운 형식의 데이터가 있는지 확인
  if (data.basicInfo) {
    // 새로운 형식 사용
    const plan: LessonPlan = {
      id: data.id || '',
      basicInfo: data.basicInfo || {
        title: '',
        subject: '',
        unit: '',
        lesson: '',
        grade: '',
        duration: 40,
        date: '',
        teacher: '',
        students: {
          total: 0,
          levels: { high: 0, middle: 0, low: 0 }
        }
      },
      objectives: data.objectives || {
        main: '',
        byLevel: { high: '', middle: '', low: '' }
      },
      materials: data.materials || {
        teacher: [],
        student: [],
        assistive: []
      },
      activities: data.activities || {
        introduction: {
          greeting: '',
          review: '',
          motivation: '',
          objectives: '',
          preview: ''
        },
        development: {
          activity1: {
            title: '',
            content: '',
            materials: '',
            levelSupport: { high: '', middle: '', low: '' },
            behaviorSupport: { contract: '', modeling: '' },
            assessment: ''
          },
          activity2: {
            title: '',
            content: '',
            teamwork: '',
            demonstration: '',
            practice: '',
            feedback: '',
            scoring: ''
          }
        },
        closure: {
          evaluation: '',
          nextLesson: '',
          farewell: ''
        }
      },
      evaluation: data.evaluation || {
        criteria: [],
        reflection: {
          strengths: '',
          improvements: '',
          nextPlans: ''
        }
      },
      specialNeeds: data.specialNeeds || {
        communicationSupport: [],
        learningSupport: [],
        behaviorSupport: [],
        sensorySupport: [],
        participationSupport: []
      },
      createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date()
    };
    return plan;
  } else {
    // 기존 형식을 새 형식으로 변환
    const plan: LessonPlan = {
      id: data.id || '',
      basicInfo: {
        title: data.title || '',
        subject: data.subject || '',
        unit: '',
        lesson: '',
        grade: data.grade || '',
        duration: data.duration || 40,
        date: '',
        teacher: '',
        students: {
          total: 0,
          levels: { high: 0, middle: 0, low: 0 }
        }
      },
      objectives: {
        main: data.learningObjectives?.[0] || '',
        byLevel: { high: '', middle: '', low: '' }
      },
      materials: {
        teacher: data.materials_legacy || [],
        student: [],
        assistive: []
      },
      activities: {
        introduction: {
          greeting: '',
          review: '',
          motivation: '',
          objectives: '',
          preview: ''
        },
        development: {
          activity1: {
            title: '',
            content: '',
            materials: '',
            levelSupport: { high: '', middle: '', low: '' },
            behaviorSupport: { contract: '', modeling: '' },
            assessment: ''
          },
          activity2: {
            title: '',
            content: '',
            teamwork: '',
            demonstration: '',
            practice: '',
            feedback: '',
            scoring: ''
          }
        },
        closure: {
          evaluation: '',
          nextLesson: '',
          farewell: ''
        }
      },
      evaluation: {
        criteria: [],
        reflection: {
          strengths: '',
          improvements: '',
          nextPlans: ''
        }
      },
      specialNeeds: {
        communicationSupport: [],
        learningSupport: [],
        behaviorSupport: [],
        sensorySupport: [],
        participationSupport: []
      },
      createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date()
    };
    return plan;
  }
};

export const storage = {
  getAllPlans: (): LessonPlan[] => {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      const rawPlans = JSON.parse(data);
      // Validate and convert data
      if (!Array.isArray(rawPlans)) return [];
      return rawPlans.map(plan => {
        try {
          return deserializeLessonPlan(plan);
        } catch (error) {
          console.error('Error deserializing plan:', error);
          return null;
        }
      }).filter(Boolean) as LessonPlan[];
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
      if (!Array.isArray(importedPlans)) {
        console.error('Invalid data format: expected array');
        return false;
      }

      const existingPlans = storage.getAllPlans();
      const deserializedImported = importedPlans.map(plan => {
        try {
          return deserializeLessonPlan(plan);
        } catch (error) {
          console.error('Error deserializing imported plan:', error);
          return null;
        }
      }).filter(Boolean) as LessonPlan[];

      if (deserializedImported.length === 0) {
        console.error('No valid plans found in import data');
        return false;
      }

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