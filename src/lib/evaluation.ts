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
  evidence: string[];
  modelAnswer: string;
  currentContent: string;
  improvementExample: string;
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

    const evaluationDetail = generateDetailedEvaluation(criteria.id, score, lessonPlan);

    results.push({
      criteriaId: criteria.id,
      score,
      feedback: evaluationDetail.feedback,
      suggestions: evaluationDetail.suggestions,
      evidence: evaluationDetail.evidence,
      modelAnswer: evaluationDetail.modelAnswer,
      currentContent: evaluationDetail.currentContent,
      improvementExample: evaluationDetail.improvementExample
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

function generateDetailedEvaluation(criteriaId: string, score: number, lessonPlan: LessonPlan): {
  feedback: string;
  suggestions: string[];
  evidence: string[];
  modelAnswer: string;
  currentContent: string;
  improvementExample: string;
} {
  switch (criteriaId) {
    case 'learning-objectives':
      return evaluateLearningObjectivesDetailed(score, lessonPlan);
    case 'student-analysis':
      return evaluateStudentAnalysisDetailed(score, lessonPlan);
    case 'teaching-methods':
      return evaluateTeachingMethodsDetailed(score, lessonPlan);
    case 'materials':
      return evaluateMaterialsDetailed(score, lessonPlan);
    case 'activities':
      return evaluateActivitiesDetailed(score, lessonPlan);
    case 'assessment':
      return evaluateAssessmentDetailed(score, lessonPlan);
    case 'accommodations':
      return evaluateAccommodationsDetailed(score, lessonPlan);
    default:
      return {
        feedback: '평가 결과를 확인해주세요.',
        suggestions: [],
        evidence: [],
        modelAnswer: '',
        currentContent: '',
        improvementExample: ''
      };
  }
}

function evaluateLearningObjectivesDetailed(score: number, lessonPlan: LessonPlan) {
  const currentContent = lessonPlan.learningObjectives.join('\n');
  const evidence = [];
  
  // 근거 수집
  if (lessonPlan.learningObjectives.length >= 2) {
    evidence.push(`✓ 학습목표 개수: ${lessonPlan.learningObjectives.length}개 (적절함)`);
  } else {
    evidence.push(`✗ 학습목표 개수: ${lessonPlan.learningObjectives.length}개 (부족함, 최소 2개 필요)`);
  }
  
  const hasSpecificVerbs = lessonPlan.learningObjectives.some(obj => 
    obj.includes('할 수 있다') || obj.includes('수 있다')
  );
  if (hasSpecificVerbs) {
    evidence.push('✓ 측정 가능한 행동 동사 사용됨');
  } else {
    evidence.push('✗ 측정 가능한 행동 동사 미사용');
  }
  
  const feedback = score >= 4 
    ? '학습목표가 명확하고 구체적으로 작성되었습니다.'
    : score >= 3
    ? '학습목표가 적절하나 더 구체적인 표현이 필요합니다.'
    : '학습목표를 더 명확하고 측정 가능하게 작성해주세요.';
  
  const modelAnswer = `[모범 답안 예시]
• 1부터 10까지의 숫자를 순서대로 말할 수 있다
• 구체물을 이용하여 5개까지 세기를 할 수 있다
• 숫자 카드와 구체물의 개수를 일대일 대응할 수 있다`;

  const improvementExample = lessonPlan.learningObjectives.length > 0 
    ? `[현재] ${lessonPlan.learningObjectives[0]}
[개선안] ${lessonPlan.learningObjectives[0].replace(/\.$/, '')}을/를 정확히 수행할 수 있다`
    : `[개선안] 구체적이고 측정 가능한 목표를 "~할 수 있다" 형태로 작성해주세요`;

  return {
    feedback,
    suggestions: score < 4 ? [
      '학습목표를 "~할 수 있다" 형태로 작성하세요',
      '구체적이고 관찰 가능한 행동으로 표현하세요',
      '학생의 현재 수준에 적합한 목표를 설정하세요'
    ] : [],
    evidence,
    modelAnswer,
    currentContent,
    improvementExample
  };
}

function evaluateStudentAnalysisDetailed(score: number, lessonPlan: LessonPlan) {
  const student = lessonPlan.targetStudents[0];
  const currentContent = student ? 
    `장애: ${student.disability}\n현재수준: ${student.currentLevel}\n목표: ${student.goals}` : '학생 정보 없음';
  
  const evidence = [];
  
  if (lessonPlan.targetStudents.length > 0) {
    evidence.push('✓ 대상 학생 정보 포함됨');
    if (student.disability) evidence.push('✓ 장애 특성 기재됨');
    if (student.currentLevel && student.currentLevel.length > 5) {
      evidence.push('✓ 현재 수준 상세히 기술됨');
    } else {
      evidence.push('✗ 현재 수준 설명 부족');
    }
  } else {
    evidence.push('✗ 대상 학생 정보 없음');
  }
  
  const feedback = score >= 4 
    ? '학생 특성 분석이 상세하고 교육적 시사점이 명확합니다.'
    : '학생의 개별적 특성과 요구를 더 구체적으로 분석해주세요.';
  
  const modelAnswer = `[모범 답안 예시]
• 장애: 지적장애 2급
• 현재 수준: 1-3까지 숫자 인식 가능, 집중 시간 5-7분, 시각적 단서 필요
• 개별 목표: 1-5까지 숫자 인식 및 순서대로 세기 습득
• 지원 계획: 큰 글씨 교재, 반복 학습, 즉시적 강화 제공`;

  const improvementExample = `[개선안] 
장애: ${student?.disability || '지적장애'} 
현재수준: 구체적인 수행 가능 과제와 어려운 부분을 상세히 기술
목표: 단기적으로 달성 가능한 구체적 목표 설정
지원계획: 개별적 요구에 맞는 구체적 지원 방안`;

  return {
    feedback,
    suggestions: score < 4 ? [
      '학생의 강점과 약점을 구체적으로 분석하세요',
      '현재 수행 가능한 과제를 명시하세요',
      '개별 교육 목표를 SMART 기준으로 설정하세요'
    ] : [],
    evidence,
    modelAnswer,
    currentContent,
    improvementExample
  };
}

function evaluateTeachingMethodsDetailed(score: number, lessonPlan: LessonPlan) {
  const currentContent = lessonPlan.teachingMethods.join('\n');
  const evidence = [];
  
  evidence.push(`교수방법 개수: ${lessonPlan.teachingMethods.length}개`);
  
  const specialEducationMethods = ['개별화', '구체물', '다감각', '단계적', '반복', '시각적', '체계적'];
  const usedSpecialMethods = specialEducationMethods.filter(method =>
    lessonPlan.teachingMethods.some(tm => tm.includes(method))
  );
  
  if (usedSpecialMethods.length > 0) {
    evidence.push(`✓ 특수교육 전문 방법 사용: ${usedSpecialMethods.join(', ')}`);
  } else {
    evidence.push('✗ 특수교육 전문 방법 부족');
  }
  
  const feedback = score >= 4 
    ? '장애 특성에 적합한 효과적인 교수방법이 선택되었습니다.'
    : '특수교육에 적합한 전문적인 교수방법을 추가해주세요.';
  
  const modelAnswer = `[모범 답안 예시]
• 과제분석법 (복잡한 과제를 단계별로 분해)
• 다감각 학습법 (시각, 청각, 촉각 동시 활용)
• 구체물 조작 활동 (실물 교구를 통한 체험 학습)
• 체계적 교수법 (명확한 지시, 모델링, 연습, 피드백)`;

  const improvementExample = `[개선안]
${currentContent}
+ 구체물 조작을 통한 체험 학습
+ 단계별 과제 제시 및 점진적 지원 감소
+ 즉시적 피드백과 긍정적 강화`;

  return {
    feedback,
    suggestions: score < 4 ? [
      '구체물 조작 활동을 포함하세요',
      '다감각 학습법을 적용하세요',
      '단계적 교수법을 고려하세요'
    ] : [],
    evidence,
    modelAnswer,
    currentContent,
    improvementExample
  };
}

function evaluateMaterialsDetailed(score: number, lessonPlan: LessonPlan) {
  const currentContent = lessonPlan.materials.join('\n');
  const evidence = [];
  
  evidence.push(`교수자료 개수: ${lessonPlan.materials.length}개`);
  
  const concreteItems = ['블록', '카드', '구체물', '교구', '모형'];
  const hasConcreteItems = concreteItems.some(item =>
    lessonPlan.materials.some(material => material.includes(item))
  );
  
  if (hasConcreteItems) {
    evidence.push('✓ 구체적 조작 자료 포함됨');
  } else {
    evidence.push('✗ 구체적 조작 자료 부족');
  }
  
  const feedback = score >= 4 
    ? '학습목표 달성에 적합한 다양한 교수자료가 준비되었습니다.'
    : '더 구체적이고 조작 가능한 교수자료를 추가해주세요.';
  
  const modelAnswer = `[모범 답안 예시]
• 숫자 카드 (1-10, 큰 글씨)
• 색깔 블록 (30개, 다양한 크기)
• 숫자송 음원파일
• 개별 학습지 (단계별 난이도)
• 보상용 스티커`;

  const improvementExample = `[개선안]
${currentContent}
+ 구체적인 수량과 규격 명시
+ 학생이 직접 조작할 수 있는 교구 추가
+ 시각적 지원 도구 포함`;

  return {
    feedback,
    suggestions: score < 4 ? [
      '구체적인 교구명과 수량을 명시하세요',
      '조작 가능한 교수자료를 포함하세요',
      '시각적 지원 도구를 추가하세요'
    ] : [],
    evidence,
    modelAnswer,
    currentContent,
    improvementExample
  };
}

function evaluateActivitiesDetailed(score: number, lessonPlan: LessonPlan) {
  const currentContent = lessonPlan.activities.map(act => 
    `${act.phase}(${act.time}분): ${act.activity}`
  ).join('\n');
  
  const evidence = [];
  const totalTime = lessonPlan.activities.reduce((sum, activity) => sum + activity.time, 0);
  
  evidence.push(`수업활동 단계: ${lessonPlan.activities.length}개`);
  evidence.push(`전체 소요시간: ${totalTime}분 (목표: ${lessonPlan.duration}분)`);
  
  if (Math.abs(totalTime - lessonPlan.duration) <= 5) {
    evidence.push('✓ 시간 배분 적절함');
  } else {
    evidence.push('✗ 시간 배분 조정 필요');
  }
  
  const feedback = score >= 4 
    ? '수업활동이 체계적으로 구성되고 시간 배분이 적절합니다.'
    : '수업활동의 구성과 시간 배분을 개선해주세요.';
  
  const modelAnswer = `[모범 답안 예시]
도입(10분): 숫자송 부르며 관심 유발, 전시 학습 확인
전개1(15분): 숫자 카드 인식 활동, 개별 연습
전개2(10분): 블록 세기 활동, 일대일 대응
정리(5분): 학습 내용 정리, 차시 예고, 칭찬`;

  const improvementExample = `[개선안]
각 활동에 다음 요소 추가:
• 구체적인 교사 발문과 학생 반응
• 활동별 세부 진행 절차
• 개별 지원 방안
• 평가 관찰 포인트`;

  return {
    feedback,
    suggestions: score < 4 ? [
      '활동별 구체적인 진행 방법을 기술하세요',
      '시간 배분을 적절히 조정하세요',
      '학생 참여를 유도하는 방안을 포함하세요'
    ] : [],
    evidence,
    modelAnswer,
    currentContent,
    improvementExample
  };
}

function evaluateAssessmentDetailed(score: number, lessonPlan: LessonPlan) {
  const currentContent = lessonPlan.assessmentMethods.join('\n');
  const evidence = [];
  
  evidence.push(`평가방법 개수: ${lessonPlan.assessmentMethods.length}개`);
  
  const assessmentTypes = ['관찰', '수행', '포트폴리오', '체크리스트'];
  const usedTypes = assessmentTypes.filter(type =>
    lessonPlan.assessmentMethods.some(method => method.includes(type))
  );
  
  if (usedTypes.length >= 2) {
    evidence.push(`✓ 다양한 평가방법 사용: ${usedTypes.join(', ')}`);
  } else {
    evidence.push('✗ 평가방법 다양성 부족');
  }
  
  const feedback = score >= 4 
    ? '학습목표와 일치하는 적절한 평가방법이 계획되었습니다.'
    : '더 다양하고 구체적인 평가방법을 계획해주세요.';
  
  const modelAnswer = `[모범 답안 예시]
• 관찰평가: 숫자 인식 정확도 체크리스트
• 수행평가: 블록 세기 활동 수행 정도
• 포트폴리오: 학습지 결과물 누적 관리
• 자기평가: 학생 스스로 활동 완료 확인`;

  const improvementExample = `[개선안]
${currentContent}
+ 평가 기준과 척도 명시
+ 관찰 기록 양식 준비
+ 학습목표와의 연계성 강화`;

  return {
    feedback,
    suggestions: score < 4 ? [
      '다양한 평가방법을 조합하세요',
      '평가 기준을 구체적으로 설정하세요',
      '학습목표와 연계된 평가를 계획하세요'
    ] : [],
    evidence,
    modelAnswer,
    currentContent,
    improvementExample
  };
}

function evaluateAccommodationsDetailed(score: number, lessonPlan: LessonPlan) {
  const currentContent = lessonPlan.accommodations.join('\n');
  const evidence = [];
  
  evidence.push(`교육적 조치 개수: ${lessonPlan.accommodations.length}개`);
  
  const supportTypes = ['개별', '시각적', '청각적', '시간', '강화'];
  const usedSupports = supportTypes.filter(type =>
    lessonPlan.accommodations.some(acc => acc.includes(type))
  );
  
  if (usedSupports.length >= 2) {
    evidence.push(`✓ 다양한 지원 방안: ${usedSupports.join(', ')}`);
  } else {
    evidence.push('✗ 지원 방안 다양성 부족');
  }
  
  const feedback = score >= 4 
    ? '학생의 성공적 학습을 위한 충분한 지원과 조치가 마련되었습니다.'
    : '더 구체적이고 개별화된 교육적 지원 방안을 추가해주세요.';
  
  const modelAnswer = `[모범 답안 예시]
• 학습 시간 조정: 필요시 20분으로 단축
• 시각적 지원: 큰 글씨 교재, 그림 단서 제공
• 개별 속도 인정: 학생 수준에 맞춰 진행
• 긍정적 강화: 즉시적 칭찬과 보상 제공
• 환경 조정: 조용한 공간, 방해 요소 제거`;

  const improvementExample = `[개선안]
${currentContent}
+ 구체적인 지원 방법과 시기 명시
+ 학생의 개별적 요구에 맞춘 조치
+ 성공 경험을 위한 단계적 지원 계획`;

  return {
    feedback,
    suggestions: score < 4 ? [
      '개별 학습 속도를 고려한 조치를 추가하세요',
      '시각적/청각적 지원 방안을 구체화하세요',
      '긍정적 강화 계획을 상세히 작성하세요'
    ] : [],
    evidence,
    modelAnswer,
    currentContent,
    improvementExample
  };
}

function generateSuggestions(criteriaId: string, score: number, lessonPlan: LessonPlan): string[] {
  // This function is now replaced by generateDetailedEvaluation
  return [];
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