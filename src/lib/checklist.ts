import { LessonPlan } from './storage';

export interface ChecklistItem {
  id: string;
  category: string;
  title: string;
  description: string;
  required: boolean;
  weight: number;
}

export interface ChecklistResult {
  itemId: string;
  completed: boolean;
  notes?: string;
}

export interface LessonPlanChecklist {
  lessonPlanId: string;
  results: ChecklistResult[];
  completionRate: number;
  requiredItemsCompleted: number;
  totalRequiredItems: number;
  allRequiredCompleted: boolean;
  checkedAt: Date;
}

export const mandatoryChecklist: ChecklistItem[] = [
  // 기본 정보
  {
    id: 'basic-title',
    category: '기본 정보',
    title: '수업 제목',
    description: '구체적이고 명확한 수업 제목이 작성되었는가?',
    required: true,
    weight: 1
  },
  {
    id: 'basic-subject',
    category: '기본 정보',
    title: '교과목',
    description: '교과목이 명시되었는가?',
    required: true,
    weight: 1
  },
  {
    id: 'basic-grade',
    category: '기본 정보',
    title: '대상 학년',
    description: '대상 학년이 명시되었는가?',
    required: true,
    weight: 1
  },
  {
    id: 'basic-duration',
    category: '기본 정보',
    title: '수업 시간',
    description: '수업 소요 시간이 설정되었는가?',
    required: true,
    weight: 1
  },

  // 학습목표
  {
    id: 'objectives-exist',
    category: '학습목표',
    title: '학습목표 작성',
    description: '최소 2개 이상의 학습목표가 작성되었는가?',
    required: true,
    weight: 3
  },
  {
    id: 'objectives-specific',
    category: '학습목표',
    title: '구체적 목표',
    description: '학습목표가 구체적이고 측정 가능한 형태로 작성되었는가?',
    required: true,
    weight: 3
  },
  {
    id: 'objectives-appropriate',
    category: '학습목표',
    title: '수준 적합성',
    description: '학습목표가 학생의 현재 수준에 적합한가?',
    required: true,
    weight: 2
  },

  // 학습자 분석
  {
    id: 'students-info',
    category: '학습자 분석',
    title: '대상 학생 정보',
    description: '대상 학생의 기본 정보가 작성되었는가?',
    required: true,
    weight: 3
  },
  {
    id: 'students-disability',
    category: '학습자 분석',
    title: '장애 특성',
    description: '학생의 장애 유형과 특성이 기술되었는가?',
    required: true,
    weight: 3
  },
  {
    id: 'students-level',
    category: '학습자 분석',
    title: '현재 수준',
    description: '학생의 현재 수행 수준이 구체적으로 분석되었는가?',
    required: true,
    weight: 3
  },
  {
    id: 'students-goals',
    category: '학습자 분석',
    title: '개별 목표',
    description: '학생별 개별 교육 목표가 설정되었는가?',
    required: true,
    weight: 2
  },

  // 교수방법
  {
    id: 'methods-appropriate',
    category: '교수방법',
    title: '적절한 교수방법',
    description: '장애 특성에 적합한 교수방법이 선택되었는가?',
    required: true,
    weight: 3
  },
  {
    id: 'methods-multiple',
    category: '교수방법',
    title: '다양한 방법',
    description: '2가지 이상의 교수방법이 계획되었는가?',
    required: false,
    weight: 2
  },
  {
    id: 'methods-evidence',
    category: '교수방법',
    title: '근거기반 방법',
    description: '특수교육에서 효과가 입증된 교수방법을 포함하는가?',
    required: true,
    weight: 2
  },

  // 교수자료
  {
    id: 'materials-list',
    category: '교수자료',
    title: '교수자료 목록',
    description: '필요한 교수자료가 구체적으로 나열되었는가?',
    required: true,
    weight: 2
  },
  {
    id: 'materials-appropriate',
    category: '교수자료',
    title: '자료 적합성',
    description: '교수자료가 학습목표와 학생 특성에 적합한가?',
    required: true,
    weight: 2
  },
  {
    id: 'materials-accessible',
    category: '교수자료',
    title: '접근 가능성',
    description: '학생이 쉽게 조작하고 이해할 수 있는 자료인가?',
    required: true,
    weight: 2
  },

  // 수업활동
  {
    id: 'activities-structure',
    category: '수업활동',
    title: '활동 구조',
    description: '도입-전개-정리의 구조로 활동이 계획되었는가?',
    required: true,
    weight: 3
  },
  {
    id: 'activities-time',
    category: '수업활동',
    title: '시간 배분',
    description: '각 활동별 소요 시간이 적절히 배분되었는가?',
    required: true,
    weight: 2
  },
  {
    id: 'activities-detailed',
    category: '수업활동',
    title: '활동 상세성',
    description: '각 활동의 구체적인 진행 방법이 기술되었는가?',
    required: true,
    weight: 2
  },
  {
    id: 'activities-engagement',
    category: '수업활동',
    title: '학생 참여',
    description: '학생의 적극적 참여를 유도하는 활동이 포함되었는가?',
    required: true,
    weight: 2
  },

  // 평가
  {
    id: 'assessment-methods',
    category: '평가',
    title: '평가방법',
    description: '적절한 평가방법이 계획되었는가?',
    required: true,
    weight: 3
  },
  {
    id: 'assessment-criteria',
    category: '평가',
    title: '평가기준',
    description: '평가기준이 학습목표와 일치하는가?',
    required: true,
    weight: 2
  },
  {
    id: 'assessment-multiple',
    category: '평가',
    title: '다양한 평가',
    description: '2가지 이상의 평가방법이 포함되었는가?',
    required: false,
    weight: 1
  },

  // 교육적 조치
  {
    id: 'accommodations-list',
    category: '교육적 조치',
    title: '지원 계획',
    description: '필요한 교육적 지원과 조치가 계획되었는가?',
    required: true,
    weight: 3
  },
  {
    id: 'accommodations-specific',
    category: '교육적 조치',
    title: '구체적 조치',
    description: '교육적 조치가 구체적으로 기술되었는가?',
    required: true,
    weight: 2
  },
  {
    id: 'accommodations-individualized',
    category: '교육적 조치',
    title: '개별화',
    description: '학생별 개별적 요구에 맞는 조치가 포함되었는가?',
    required: true,
    weight: 2
  },

  // 추가 고려사항
  {
    id: 'safety-considerations',
    category: '안전',
    title: '안전 고려사항',
    description: '수업 중 안전에 대한 고려사항이 포함되었는가?',
    required: false,
    weight: 1
  },
  {
    id: 'generalization',
    category: '일반화',
    title: '일반화 계획',
    description: '학습 내용의 일반화 방안이 고려되었는가?',
    required: false,
    weight: 1
  },
  {
    id: 'parent-involvement',
    category: '가정연계',
    title: '가정과의 연계',
    description: '가정에서의 연계 학습 방안이 고려되었는가?',
    required: false,
    weight: 1
  }
];

export function checkLessonPlan(lessonPlan: LessonPlan): LessonPlanChecklist {
  const results: ChecklistResult[] = [];
  let completedItems = 0;
  let requiredCompleted = 0;
  const totalRequired = mandatoryChecklist.filter(item => item.required).length;

  mandatoryChecklist.forEach(item => {
    const completed = checkIndividualItem(lessonPlan, item);
    
    results.push({
      itemId: item.id,
      completed,
      notes: completed ? undefined : getImprovementNote(item.id)
    });

    if (completed) {
      completedItems++;
      if (item.required) {
        requiredCompleted++;
      }
    }
  });

  const completionRate = Math.round((completedItems / mandatoryChecklist.length) * 100);
  const allRequiredCompleted = requiredCompleted === totalRequired;

  return {
    lessonPlanId: lessonPlan.id,
    results,
    completionRate,
    requiredItemsCompleted: requiredCompleted,
    totalRequiredItems: totalRequired,
    allRequiredCompleted,
    checkedAt: new Date()
  };
}

function checkIndividualItem(lessonPlan: LessonPlan, item: ChecklistItem): boolean {
  switch (item.id) {
    case 'basic-title':
      return lessonPlan.title.length > 5;
    
    case 'basic-subject':
      return lessonPlan.subject.length > 0;
    
    case 'basic-grade':
      return lessonPlan.grade.length > 0;
    
    case 'basic-duration':
      return lessonPlan.duration > 0;
    
    case 'objectives-exist':
      return lessonPlan.learningObjectives.length >= 2;
    
    case 'objectives-specific':
      return lessonPlan.learningObjectives.some(obj => 
        obj.includes('할 수 있다') || obj.includes('수 있다')
      );
    
    case 'objectives-appropriate':
      return lessonPlan.learningObjectives.every(obj => obj.length > 10);
    
    case 'students-info':
      return lessonPlan.targetStudents.length > 0;
    
    case 'students-disability':
      return lessonPlan.targetStudents.length > 0 && 
             lessonPlan.targetStudents[0].disability.length > 0;
    
    case 'students-level':
      return lessonPlan.targetStudents.length > 0 && 
             lessonPlan.targetStudents[0].currentLevel.length > 5;
    
    case 'students-goals':
      return lessonPlan.targetStudents.length > 0 && 
             lessonPlan.targetStudents[0].goals.length > 0;
    
    case 'methods-appropriate':
      return lessonPlan.teachingMethods.length > 0;
    
    case 'methods-multiple':
      return lessonPlan.teachingMethods.length >= 2;
    
    case 'methods-evidence':
      const evidenceBasedMethods = ['개별화', '구체물', '다감각', '단계적', '체계적', '반복'];
      return lessonPlan.teachingMethods.some(method =>
        evidenceBasedMethods.some(evidence => method.includes(evidence))
      );
    
    case 'materials-list':
      return lessonPlan.materials.length >= 3;
    
    case 'materials-appropriate':
      return lessonPlan.materials.every(material => material.length > 2);
    
    case 'materials-accessible':
      return lessonPlan.materials.some(material => 
        material.includes('카드') || material.includes('블록') || 
        material.includes('구체물') || material.includes('교구')
      );
    
    case 'activities-structure':
      return lessonPlan.activities.length >= 3;
    
    case 'activities-time':
      const totalTime = lessonPlan.activities.reduce((sum, activity) => sum + activity.time, 0);
      return Math.abs(totalTime - lessonPlan.duration) <= 5;
    
    case 'activities-detailed':
      return lessonPlan.activities.every(activity => activity.activity.length > 10);
    
    case 'activities-engagement':
      return lessonPlan.activities.some(activity => 
        activity.activity.includes('참여') || activity.activity.includes('활동') ||
        activity.activity.includes('조작') || activity.activity.includes('발표')
      );
    
    case 'assessment-methods':
      return lessonPlan.assessmentMethods.length > 0;
    
    case 'assessment-criteria':
      return lessonPlan.assessmentMethods.some(method => 
        method.includes('목표') || method.includes('기준') || method.includes('평가')
      );
    
    case 'assessment-multiple':
      return lessonPlan.assessmentMethods.length >= 2;
    
    case 'accommodations-list':
      return lessonPlan.accommodations.length > 0;
    
    case 'accommodations-specific':
      return lessonPlan.accommodations.every(acc => acc.length > 5);
    
    case 'accommodations-individualized':
      return lessonPlan.accommodations.some(acc => 
        acc.includes('개별') || acc.includes('개인') || acc.includes('맞춤')
      );
    
    case 'safety-considerations':
      return lessonPlan.notes.includes('안전') || 
             lessonPlan.accommodations.some(acc => acc.includes('안전'));
    
    case 'generalization':
      return lessonPlan.notes.includes('일반화') || lessonPlan.notes.includes('적용') ||
             lessonPlan.activities.some(activity => activity.notes?.includes('일반화'));
    
    case 'parent-involvement':
      return lessonPlan.notes.includes('가정') || lessonPlan.notes.includes('부모') ||
             lessonPlan.accommodations.some(acc => acc.includes('가정'));
    
    default:
      return false;
  }
}

function getImprovementNote(itemId: string): string {
  const noteMap: Record<string, string> = {
    'basic-title': '더 구체적이고 명확한 제목을 작성해주세요',
    'basic-subject': '교과목을 명시해주세요',
    'basic-grade': '대상 학년을 명시해주세요',
    'basic-duration': '수업 소요 시간을 설정해주세요',
    'objectives-exist': '최소 2개 이상의 학습목표를 작성해주세요',
    'objectives-specific': '구체적이고 측정 가능한 목표로 작성해주세요',
    'objectives-appropriate': '학습목표를 더 구체적으로 작성해주세요',
    'students-info': '대상 학생 정보를 추가해주세요',
    'students-disability': '학생의 장애 특성을 기술해주세요',
    'students-level': '학생의 현재 수준을 구체적으로 분석해주세요',
    'students-goals': '학생별 개별 목표를 설정해주세요',
    'methods-appropriate': '적절한 교수방법을 선택해주세요',
    'methods-multiple': '다양한 교수방법을 포함해주세요',
    'methods-evidence': '근거기반 교수방법을 포함해주세요',
    'materials-list': '더 많은 교수자료를 준비해주세요',
    'materials-appropriate': '교수자료명을 더 구체적으로 작성해주세요',
    'materials-accessible': '학생이 조작할 수 있는 구체적 자료를 포함해주세요',
    'activities-structure': '도입-전개-정리 구조로 활동을 계획해주세요',
    'activities-time': '활동별 시간 배분을 조정해주세요',
    'activities-detailed': '각 활동을 더 구체적으로 기술해주세요',
    'activities-engagement': '학생 참여를 유도하는 활동을 포함해주세요',
    'assessment-methods': '적절한 평가방법을 계획해주세요',
    'assessment-criteria': '평가기준을 명확히 해주세요',
    'assessment-multiple': '다양한 평가방법을 포함해주세요',
    'accommodations-list': '필요한 교육적 지원을 계획해주세요',
    'accommodations-specific': '교육적 조치를 더 구체적으로 기술해주세요',
    'accommodations-individualized': '개별화된 지원 방안을 포함해주세요',
    'safety-considerations': '안전 고려사항을 추가해주세요',
    'generalization': '학습 내용의 일반화 방안을 고려해주세요',
    'parent-involvement': '가정과의 연계 방안을 고려해주세요'
  };
  
  return noteMap[itemId] || '해당 항목을 확인해주세요';
}

export function getChecklistByCategory(): Record<string, ChecklistItem[]> {
  const grouped: Record<string, ChecklistItem[]> = {};
  
  mandatoryChecklist.forEach(item => {
    if (!grouped[item.category]) {
      grouped[item.category] = [];
    }
    grouped[item.category].push(item);
  });
  
  return grouped;
}