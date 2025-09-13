import { LessonPlan } from './storage';

export interface EvaluationCriteria {
  id: string;
  category: string;
  title: string;
  description: string;
  weight: number;
  maxScore: number;
}

export interface EvaluationResult {
  criteriaId: string;
  score: number;
  feedback: string;
  suggestions: string[];
}

export interface LessonPlanEvaluation {
  lessonPlanId: string;
  overallScore: number;
  maxPossibleScore: number;
  percentage: number;
  grade: string;
  results: EvaluationResult[];
  overallFeedback: string;
  improvementSuggestions: string[];
  evaluatedAt: Date;
}

export const evaluationCriteria: EvaluationCriteria[] = [
  {
    id: 'learning-objectives',
    category: '학습목표',
    title: '학습목표의 명확성',
    description: '학습목표가 구체적이고 측정 가능하며 학생 수준에 적합한가?',
    weight: 20,
    maxScore: 5
  },
  {
    id: 'student-analysis',
    category: '학습자 분석',
    title: '학생 특성 반영',
    description: '학생의 장애 특성, 현재 수준, 개별 요구가 잘 분석되고 반영되었는가?',
    weight: 20,
    maxScore: 5
  },
  {
    id: 'teaching-methods',
    category: '교수방법',
    title: '교수방법의 적절성',
    description: '장애 특성에 맞는 효과적인 교수방법이 선택되었는가?',
    weight: 15,
    maxScore: 5
  },
  {
    id: 'materials',
    category: '교수자료',
    title: '교수자료의 적합성',
    description: '학습목표 달성과 학생 특성에 적합한 교수자료가 준비되었는가?',
    weight: 10,
    maxScore: 5
  },
  {
    id: 'activities',
    category: '수업활동',
    title: '수업활동의 체계성',
    description: '수업활동이 논리적으로 구성되고 시간 배분이 적절한가?',
    weight: 15,
    maxScore: 5
  },
  {
    id: 'assessment',
    category: '평가',
    title: '평가방법의 타당성',
    description: '학습목표와 일치하는 적절한 평가방법이 계획되었는가?',
    weight: 10,
    maxScore: 5
  },
  {
    id: 'accommodations',
    category: '교육적 조치',
    title: '교육적 조치의 충분성',
    description: '학생의 성공적 학습을 위한 충분한 지원과 조치가 마련되었는가?',
    weight: 10,
    maxScore: 5
  }
];

export function evaluateLessonPlan(lessonPlan: LessonPlan): LessonPlanEvaluation {
  const results: EvaluationResult[] = [];
  let totalWeightedScore = 0;
  let totalPossibleWeightedScore = 0;

  // 각 평가 기준별 점수 계산
  evaluationCriteria.forEach(criteria => {
    const score = calculateCriteriaScore(lessonPlan, criteria);
    const weightedScore = score * criteria.weight;
    const maxWeightedScore = criteria.maxScore * criteria.weight;
    
    totalWeightedScore += weightedScore;
    totalPossibleWeightedScore += maxWeightedScore;

    results.push({
      criteriaId: criteria.id,
      score,
      feedback: generateFeedback(criteria.id, score, lessonPlan),
      suggestions: generateSuggestions(criteria.id, score, lessonPlan)
    });
  });

  const percentage = Math.round((totalWeightedScore / totalPossibleWeightedScore) * 100);
  const grade = calculateGrade(percentage);

  return {
    lessonPlanId: lessonPlan.id,
    overallScore: Math.round(totalWeightedScore),
    maxPossibleScore: totalPossibleWeightedScore,
    percentage,
    grade,
    results,
    overallFeedback: generateOverallFeedback(percentage, lessonPlan),
    improvementSuggestions: generateOverallSuggestions(results, lessonPlan),
    evaluatedAt: new Date()
  };
}

function calculateCriteriaScore(lessonPlan: LessonPlan, criteria: EvaluationCriteria): number {
  switch (criteria.id) {
    case 'learning-objectives':
      return evaluateLearningObjectives(lessonPlan);
    case 'student-analysis':
      return evaluateStudentAnalysis(lessonPlan);
    case 'teaching-methods':
      return evaluateTeachingMethods(lessonPlan);
    case 'materials':
      return evaluateMaterials(lessonPlan);
    case 'activities':
      return evaluateActivities(lessonPlan);
    case 'assessment':
      return evaluateAssessment(lessonPlan);
    case 'accommodations':
      return evaluateAccommodations(lessonPlan);
    default:
      return 3;
  }
}

function evaluateLearningObjectives(lessonPlan: LessonPlan): number {
  let score = 1;
  
  // 학습목표 개수 확인
  if (lessonPlan.learningObjectives.length >= 2) score += 1;
  
  // 구체적이고 측정 가능한 목표인지 확인
  const hasSpecificObjectives = lessonPlan.learningObjectives.some(obj => 
    obj.includes('할 수 있다') || obj.includes('수 있다') || obj.includes('한다')
  );
  if (hasSpecificObjectives) score += 1;
  
  // 학습목표가 상세한지 확인
  const hasDetailedObjectives = lessonPlan.learningObjectives.some(obj => obj.length > 15);
  if (hasDetailedObjectives) score += 1;
  
  // 모든 목표가 작성되었는지 확인
  if (lessonPlan.learningObjectives.length >= 3 && hasSpecificObjectives && hasDetailedObjectives) {
    score += 1;
  }
  
  return Math.min(score, 5);
}

function evaluateStudentAnalysis(lessonPlan: LessonPlan): number {
  let score = 1;
  
  // 대상 학생 정보 확인
  if (lessonPlan.targetStudents.length > 0) score += 1;
  
  const student = lessonPlan.targetStudents[0];
  if (student) {
    // 장애 정보 확인
    if (student.disability && student.disability.length > 0) score += 1;
    
    // 현재 수준 확인
    if (student.currentLevel && student.currentLevel.length > 5) score += 1;
    
    // 개별 목표 및 지원 계획 확인
    if (student.goals && student.accommodations) score += 1;
  }
  
  return Math.min(score, 5);
}

function evaluateTeachingMethods(lessonPlan: LessonPlan): number {
  let score = 1;
  
  // 교수방법 개수 확인
  if (lessonPlan.teachingMethods.length >= 2) score += 1;
  if (lessonPlan.teachingMethods.length >= 3) score += 1;
  
  // 특수교육에 적합한 방법 포함 여부
  const specialEducationMethods = ['개별화', '구체물', '다감각', '단계적', '반복', '시각적', '체계적'];
  const hasSpecialMethods = lessonPlan.teachingMethods.some(method =>
    specialEducationMethods.some(special => method.includes(special))
  );
  if (hasSpecialMethods) score += 1;
  
  // 교수방법의 구체성
  const hasDetailedMethods = lessonPlan.teachingMethods.some(method => method.length > 8);
  if (hasDetailedMethods) score += 1;
  
  return Math.min(score, 5);
}

function evaluateMaterials(lessonPlan: LessonPlan): number {
  let score = 1;
  
  // 교수자료 개수 확인
  if (lessonPlan.materials.length >= 3) score += 1;
  if (lessonPlan.materials.length >= 5) score += 1;
  
  // 구체적인 자료명 확인
  const hasSpecificMaterials = lessonPlan.materials.some(material => material.length > 5);
  if (hasSpecificMaterials) score += 2;
  
  return Math.min(score, 5);
}

function evaluateActivities(lessonPlan: LessonPlan): number {
  let score = 1;
  
  // 활동 개수 확인
  if (lessonPlan.activities.length >= 3) score += 1;
  if (lessonPlan.activities.length >= 4) score += 1;
  
  // 시간 배분 확인
  const totalTime = lessonPlan.activities.reduce((sum, activity) => sum + activity.time, 0);
  if (Math.abs(totalTime - lessonPlan.duration) <= 5) score += 1;
  
  // 활동의 구체성 확인
  const hasDetailedActivities = lessonPlan.activities.every(activity => 
    activity.activity.length > 10 && activity.materials
  );
  if (hasDetailedActivities) score += 1;
  
  return Math.min(score, 5);
}

function evaluateAssessment(lessonPlan: LessonPlan): number {
  let score = 1;
  
  // 평가방법 개수 확인
  if (lessonPlan.assessmentMethods.length >= 2) score += 1;
  if (lessonPlan.assessmentMethods.length >= 3) score += 2;
  
  // 다양한 평가방법 포함 여부
  const assessmentTypes = ['관찰', '수행', '포트폴리오', '체크리스트', '자기평가'];
  const hasVariedAssessments = assessmentTypes.filter(type =>
    lessonPlan.assessmentMethods.some(method => method.includes(type))
  ).length >= 2;
  if (hasVariedAssessments) score += 1;
  
  return Math.min(score, 5);
}

function evaluateAccommodations(lessonPlan: LessonPlan): number {
  let score = 1;
  
  // 교육적 조치 개수 확인
  if (lessonPlan.accommodations.length >= 2) score += 1;
  if (lessonPlan.accommodations.length >= 4) score += 1;
  
  // 구체적인 조치 내용 확인
  const hasDetailedAccommodations = lessonPlan.accommodations.some(acc => acc.length > 10);
  if (hasDetailedAccommodations) score += 2;
  
  return Math.min(score, 5);
}

function generateFeedback(criteriaId: string, score: number, lessonPlan: LessonPlan): string {
  const feedbackMap: Record<string, Record<number, string>> = {
    'learning-objectives': {
      5: '학습목표가 매우 명확하고 구체적으로 작성되었습니다.',
      4: '학습목표가 잘 작성되었으나 더 구체적으로 표현하면 좋겠습니다.',
      3: '학습목표가 적절하나 측정 가능한 형태로 개선이 필요합니다.',
      2: '학습목표가 모호하여 구체화가 필요합니다.',
      1: '학습목표를 보다 명확하게 설정해주세요.'
    },
    'student-analysis': {
      5: '학생 특성 분석이 매우 상세하고 교육적 시사점이 명확합니다.',
      4: '학생 분석이 잘 되어있으나 개별 요구를 더 구체화하면 좋겠습니다.',
      3: '기본적인 학생 정보는 포함되어 있으나 더 자세한 분석이 필요합니다.',
      2: '학생 특성에 대한 정보가 부족합니다.',
      1: '학생에 대한 기본 정보부터 작성해주세요.'
    },
    'teaching-methods': {
      5: '장애 특성에 매우 적합한 교수방법이 선택되었습니다.',
      4: '적절한 교수방법이 선택되었으나 다양성을 높이면 좋겠습니다.',
      3: '기본적인 교수방법은 포함되어 있습니다.',
      2: '교수방법을 더 구체적으로 제시해주세요.',
      1: '특수교육에 적합한 교수방법을 추가해주세요.'
    }
  };
  
  return feedbackMap[criteriaId]?.[score] || '평가 결과를 확인해주세요.';
}

function generateSuggestions(criteriaId: string, score: number, lessonPlan: LessonPlan): string[] {
  if (score >= 4) return [];
  
  const suggestionMap: Record<string, string[]> = {
    'learning-objectives': [
      '학습목표를 "~할 수 있다" 형태로 작성해보세요',
      '구체적이고 측정 가능한 행동 동사를 사용해보세요',
      '학생의 현재 수준을 고려한 목표를 설정해보세요'
    ],
    'student-analysis': [
      '학생의 장애 특성을 더 자세히 분석해보세요',
      '현재 수행 수준을 구체적으로 기술해보세요',
      '개별 교육 목표를 명확히 설정해보세요'
    ],
    'teaching-methods': [
      '구체물 조작 활동을 포함해보세요',
      '다감각 학습법을 적용해보세요',
      '단계적 접근법을 고려해보세요'
    ],
    'materials': [
      '더 구체적인 교구명을 제시해보세요',
      '시각적 자료를 추가해보세요',
      '학생이 직접 조작할 수 있는 자료를 포함해보세요'
    ],
    'activities': [
      '도입-전개-정리 단계를 명확히 구분해보세요',
      '각 활동의 소요 시간을 조정해보세요',
      '활동별 구체적인 진행 방법을 추가해보세요'
    ],
    'assessment': [
      '관찰평가, 수행평가 등 다양한 방법을 포함해보세요',
      '학습목표와 연계된 평가를 계획해보세요',
      '학생의 수행 수준을 기록할 방법을 추가해보세요'
    ],
    'accommodations': [
      '개별 학습 속도를 고려한 조치를 추가해보세요',
      '시각적/청각적 지원 방안을 포함해보세요',
      '긍정적 강화 계획을 구체화해보세요'
    ]
  };
  
  return suggestionMap[criteriaId] || [];
}

function calculateGrade(percentage: number): string {
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D';
  return 'F';
}

function generateOverallFeedback(percentage: number, lessonPlan: LessonPlan): string {
  if (percentage >= 90) {
    return '매우 우수한 수업지도안입니다. 특수교육의 핵심 요소들이 잘 반영되어 있으며, 학생의 성공적인 학습을 위한 체계적인 계획이 수립되었습니다.';
  } else if (percentage >= 80) {
    return '잘 작성된 수업지도안입니다. 전반적으로 특수교육의 원리가 적절히 적용되었으나, 일부 영역에서 보완하면 더욱 효과적인 수업이 될 것입니다.';
  } else if (percentage >= 70) {
    return '기본적인 수업지도안의 요소는 포함되어 있습니다. 특수교육 대상 학생의 개별적 요구를 더욱 구체적으로 반영하여 보완해주세요.';
  } else if (percentage >= 60) {
    return '수업지도안의 기본 틀은 갖추어져 있으나, 특수교육의 전문성이 더 필요합니다. 학생 분석과 교수방법을 중심으로 개선해주세요.';
  } else {
    return '수업지도안의 전반적인 보완이 필요합니다. 특수교육 대상 학생의 특성을 고려한 체계적인 접근이 필요합니다.';
  }
}

function generateOverallSuggestions(results: EvaluationResult[], lessonPlan: LessonPlan): string[] {
  const suggestions: string[] = [];
  
  // 낮은 점수를 받은 영역의 제안사항 수집
  results.forEach(result => {
    if (result.score <= 3) {
      suggestions.push(...result.suggestions);
    }
  });
  
  // 중복 제거 및 일반적인 제안사항 추가
  const uniqueSuggestions = Array.from(new Set(suggestions));
  
  if (uniqueSuggestions.length === 0) {
    uniqueSuggestions.push('현재 상태를 유지하면서 수업 실행에 집중해보세요');
  }
  
  return uniqueSuggestions.slice(0, 5); // 최대 5개까지
}