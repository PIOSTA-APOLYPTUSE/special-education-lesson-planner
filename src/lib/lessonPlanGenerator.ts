import { LessonPlan } from './storage';

interface GenerationParams {
  grade: string;
  subject: string;
  unit: string;
  disabilityType: string;
  disabilitySeverity: '경도' | '중도' | '중증';
  difficulty: 'basic' | 'intermediate' | 'advanced';
}

interface DisabilityProfile {
  type: string;
  severity: '경도' | '중도' | '중증';
  functionalLevel: string;
  supportNeeds: string;
  recommendedMethods: string[];
  typicalAccommodations: string[];
}

// 장애 유형별 프로필
const disabilityProfiles: Record<string, Record<string, DisabilityProfile>> = {
  '지적장애': {
    '경도': {
      type: '지적장애',
      severity: '경도',
      functionalLevel: 'IQ 50-70, 기본적인 학습과 의사소통 가능, 구체적 지도 시 학습 성취 가능',
      supportNeeds: '반복 학습과 시각적 지원을 통한 단계적 접근 필요',
      recommendedMethods: ['구체물 조작 활동', '단계적 교수법', '반복 학습', '시각적 단서 제공'],
      typicalAccommodations: ['학습 시간 연장', '과제 단순화', '시각적 자료 활용', '개별 맞춤 속도']
    },
    '중도': {
      type: '지적장애',
      severity: '중도',
      functionalLevel: 'IQ 35-50, 구체적이고 반복적인 학습으로 기본 기능 습득 가능',
      supportNeeds: '구조화된 학습 환경과 지속적인 반복 학습 필요',
      recommendedMethods: ['과제 분석법', '구조화된 교수법', '다감각 학습', '즉시 강화'],
      typicalAccommodations: ['고도로 구조화된 환경', '1:1 개별 지도', '구체물 중심 학습', '빈번한 피드백']
    },
    '중증': {
      type: '지적장애',
      severity: '중증',
      functionalLevel: 'IQ 35 미만, 일상생활 기능 중심의 개별화된 교육 필요',
      supportNeeds: '전면적인 개별 지원과 일상생활 기능 중심 교육 필요',
      recommendedMethods: ['일상생활 기능 교육', '감각 자극 활동', '반복 훈련', '보조공학 활용'],
      typicalAccommodations: ['전면적 개별 지도', '일상생활 기능 중심', '보조 기구 활용', '지속적 지원']
    }
  },
  '자폐스펙트럼장애': {
    '경도': {
      type: '자폐스펙트럼장애',
      severity: '경도',
      functionalLevel: '기본적인 의사소통 가능하나 사회적 상호작용에 어려움',
      supportNeeds: '구조화된 환경과 예측 가능한 루틴, 사회적 기술 교육 필요',
      recommendedMethods: ['구조화된 교수법', '사회적 스토리', '시각적 일정표', '예측 가능한 루틴'],
      typicalAccommodations: ['구조화된 환경', '시각적 일정', '변화 예고', '감각 조절 지원']
    },
    '중도': {
      type: '자폐스펙트럼장애',
      severity: '중도',
      functionalLevel: '의사소통과 사회적 기능에 상당한 지원 필요',
      supportNeeds: '시각적 지원과 예측 가능한 루틴, 의사소통 보조 도구 필요',
      recommendedMethods: ['PECS 의사소통', 'ABA 기법', '감각 통합 활동', '과제 분석법'],
      typicalAccommodations: ['고도로 구조화된 환경', '의사소통 보조 도구', '감각 조절실', '1:1 지원']
    },
    '중증': {
      type: '자폐스펙트럼장애',
      severity: '중증',
      functionalLevel: '전반적인 발달과 기능에 지속적이고 집중적인 지원 필요',
      supportNeeds: '전면적인 개별 지원과 감각 통합적 접근 필요',
      recommendedMethods: ['감각 통합 치료', '행동 중재', '보조공학 활용', 'AAC 의사소통'],
      typicalAccommodations: ['전면적 개별 지도', '감각 조절 환경', 'AAC 기기', '지속적 행동 지원']
    }
  },
  'ADHD': {
    '경도': {
      type: 'ADHD',
      severity: '경도',
      functionalLevel: '주의집중 시간이 짧지만 적절한 지원으로 학습 참여 가능',
      supportNeeds: '구조화된 환경과 집중력 향상을 위한 전략 필요',
      recommendedMethods: ['짧은 과제 단위', '움직임 통합 활동', '즉시 피드백', '시각적 단서'],
      typicalAccommodations: ['짧은 학습 단위', '움직임 허용', '조용한 환경', '집중력 향상 도구']
    },
    '중도': {
      type: 'ADHD',
      severity: '중도',
      functionalLevel: '충동성과 주의산만이 심하여 구조화된 환경 필요',
      supportNeeds: '구조화된 환경과 체험 중심 활동 필요',
      recommendedMethods: ['체험 중심 학습', '움직임 활동', '짧은 집중 시간', '행동 계약'],
      typicalAccommodations: ['고도로 구조화된 환경', '빈번한 휴식', '체험 활동', '행동 지원']
    },
    '중증': {
      type: 'ADHD',
      severity: '중증',
      functionalLevel: '극심한 과잉행동과 충동성으로 개별적 행동 중재 필요',
      supportNeeds: '개별적 행동 중재와 약물 치료 병행 필요',
      recommendedMethods: ['행동 수정 기법', '개별 행동 계획', '감각 조절 활동', '구조화된 환경'],
      typicalAccommodations: ['1:1 개별 지원', '행동 중재 계획', '감각 조절 도구', '약물 관리']
    }
  }
};

// 교과별 기본 구조
interface SubjectStructure {
  commonObjectives: string[];
  materials: string[];
  methods: string[];
}

const subjectStructures: Record<string, SubjectStructure> = {
  '수학': {
    commonObjectives: [
      '구체물을 이용하여 수 개념을 이해할 수 있다',
      '일상생활에서 수학적 개념을 적용할 수 있다',
      '문제 해결 과정을 통해 수학적 사고력을 기를 수 있다'
    ],
    materials: ['교구', '블록', '구체물', '수 카드', '계산기'],
    methods: ['구체물 조작', '단계적 교수', '반복 학습', '체험 활동']
  },
  '국어': {
    commonObjectives: [
      '일상 의사소통에 필요한 언어 능력을 기를 수 있다',
      '읽기와 쓰기의 기초 능력을 익힐 수 있다',
      '언어를 통한 표현 능력을 기를 수 있다'
    ],
    materials: ['그림카드', '글자카드', '책', '녹음기', '언어 교구'],
    methods: ['언어 모델링', '반복 연습', '상황 중심 학습', '다감각 활용']
  },
  '사회': {
    commonObjectives: [
      '사회적 관계를 이해하고 적절한 상호작용을 할 수 있다',
      '사회의 기본 규칙과 예절을 익힐 수 있다',
      '지역 사회와 자신의 관계를 이해할 수 있다'
    ],
    materials: ['사진', '그림자료', '역할놀이 소품', '지도', '사회적 스토리'],
    methods: ['사회적 스토리', '역할놀이', '현장 학습', '토론 활동']
  },
  '과학': {
    commonObjectives: [
      '자연 현상에 대한 호기심과 탐구심을 기를 수 있다',
      '간단한 과학적 탐구 과정을 경험할 수 있다',
      '일상생활과 과학의 관련성을 이해할 수 있다'
    ],
    materials: ['실험 도구', '관찰 도구', '모형', '표본', '측정 도구'],
    methods: ['탐구 활동', '실험 관찰', '체험 학습', '문제 해결']
  }
};

// 학습목표 생성
function generateLearningObjectives(params: GenerationParams): string[] {
  const { subject, unit, disabilitySeverity, difficulty } = params;

  const baseObjectives = subjectStructures[subject]?.commonObjectives || [
    '학습 내용을 이해하고 설명할 수 있다',
    '학습한 내용을 일상생활에 적용할 수 있다',
    '학습 활동에 적극적으로 참여할 수 있다'
  ];

  // 난이도와 장애 정도에 따른 조정
  const adjustedObjectives = baseObjectives.map(objective => {
    if (disabilitySeverity === '중증') {
      return objective.replace('설명할 수 있다', '인식할 수 있다')
                    .replace('적용할 수 있다', '경험할 수 있다');
    } else if (disabilitySeverity === '중도') {
      return objective.replace('설명할 수 있다', '표현할 수 있다');
    }
    return objective;
  });

  // 단원별 구체적 목표 추가
  const unitSpecificObjective = `${unit} 영역의 기본 개념을 ${difficulty === 'basic' ? '인식' : difficulty === 'intermediate' ? '이해' : '활용'}할 수 있다`;

  return [...adjustedObjectives.slice(0, 2), unitSpecificObjective];
}

// 수업 활동 생성
function generateActivities(params: GenerationParams): Array<{phase: string; time: number; activity: string; materials: string; notes?: string}> {
  const { subject, unit, disabilitySeverity } = params;

  const baseDuration = disabilitySeverity === '중증' ? 30 : disabilitySeverity === '중도' ? 35 : 40;

  return [
    {
      phase: '도입',
      time: Math.round(baseDuration * 0.2),
      activity: `${unit} 관련 경험 나누기 및 학습 동기 유발`,
      materials: subjectStructures[subject]?.materials.slice(0, 2).join(', ') || '시각 자료',
      notes: '학생의 사전 경험과 연결하여 흥미 유발'
    },
    {
      phase: '전개 1',
      time: Math.round(baseDuration * 0.4),
      activity: `${unit}의 핵심 개념 학습 및 실습`,
      materials: subjectStructures[subject]?.materials.slice(2, 4).join(', ') || '학습 교구',
      notes: '학생 수준에 맞는 단계적 접근'
    },
    {
      phase: '전개 2',
      time: Math.round(baseDuration * 0.3),
      activity: `학습한 내용을 활용한 실제 적용 활동`,
      materials: subjectStructures[subject]?.materials.slice(-2).join(', ') || '활동 자료',
      notes: '실생활 연계를 통한 의미 있는 학습'
    },
    {
      phase: '정리',
      time: Math.round(baseDuration * 0.1),
      activity: '학습 내용 정리 및 성과 확인',
      materials: '학습 정리지, 보상 스티커',
      notes: '성취감 향상을 위한 긍정적 피드백'
    }
  ];
}

// 교수 방법 생성
function generateTeachingMethods(params: GenerationParams): string[] {
  const { subject, disabilityType, disabilitySeverity } = params;

  const disabilityProfile = disabilityProfiles[disabilityType]?.[disabilitySeverity];
  const subjectMethods = subjectStructures[subject]?.methods || [];

  const combinedMethods = [
    ...disabilityProfile?.recommendedMethods || [],
    ...subjectMethods
  ];

  // 중복 제거 및 최대 6개까지
  return [...new Set(combinedMethods)].slice(0, 6);
}

// 교재 및 교구 생성
function generateMaterials(params: GenerationParams): string[] {
  const { subject, unit } = params;

  const subjectMaterials = subjectStructures[subject]?.materials || [];
  const unitSpecificMaterials = [`${unit} 관련 교구`, `${unit} 학습자료`];

  return [...subjectMaterials, ...unitSpecificMaterials].slice(0, 8);
}

// 평가 방법 생성
function generateAssessmentMethods(params: GenerationParams): string[] {
  const { disabilitySeverity } = params;

  if (disabilitySeverity === '중증') {
    return ['관찰 평가: 참여도 및 반응 관찰', '체크리스트: 목표 행동 수행 여부', '포트폴리오: 활동 결과물'];
  } else if (disabilitySeverity === '중도') {
    return ['관찰 평가: 학습 참여도 및 이해도', '수행 평가: 활동 과제 완성도', '구두 평가: 학습 내용 표현'];
  } else {
    return ['관찰 평가: 학습 태도 및 참여도', '수행 평가: 과제 해결 능력', '구두 평가: 학습 내용 설명', '자기 평가: 학습 성찰'];
  }
}

// 지원 방안 생성
function generateAccommodations(params: GenerationParams): string[] {
  const { disabilityType, disabilitySeverity } = params;

  const disabilityProfile = disabilityProfiles[disabilityType]?.[disabilitySeverity];

  return disabilityProfile?.typicalAccommodations || [
    '개별 학습 속도 인정',
    '다양한 학습 방법 제공',
    '긍정적 강화 제공',
    '안전한 학습 환경 조성'
  ];
}

// 메인 생성 함수
export function generateLessonPlan(params: GenerationParams): Omit<LessonPlan, 'id' | 'createdAt' | 'updatedAt'> {
  const disabilityProfile = disabilityProfiles[params.disabilityType]?.[params.disabilitySeverity] || disabilityProfiles['지적장애']['중도'];

  const difficultyKorean = params.difficulty === 'basic' ? '기초' : params.difficulty === 'intermediate' ? '중급' : '심화';

  return {
    title: `${params.grade} ${params.subject} - ${params.unit} (${difficultyKorean} 수준)`,
    subject: params.subject,
    grade: params.grade,
    duration: params.disabilitySeverity === '중증' ? 30 : params.disabilitySeverity === '중도' ? 35 : 40,
    learningObjectives: generateLearningObjectives(params),
    targetStudents: [{
      name: '학○○',
      disability: `${params.disabilityType} (${params.disabilitySeverity})`,
      currentLevel: disabilityProfile.functionalLevel,
      goals: `${params.unit} 영역의 기본 개념 이해 및 적용`,
      accommodations: disabilityProfile.supportNeeds
    }],
    teachingMethods: generateTeachingMethods(params),
    materials: generateMaterials(params),
    activities: generateActivities(params),
    assessmentMethods: generateAssessmentMethods(params),
    accommodations: generateAccommodations(params),
    notes: `${params.disabilityType} 학생의 특성을 고려하여 ${disabilityProfile.supportNeeds.toLowerCase()}을 중심으로 수업을 진행합니다. 학생의 개별적 특성과 흥미를 반영한 맞춤형 지도가 중요합니다.`
  };
}