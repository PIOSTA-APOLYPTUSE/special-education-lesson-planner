import { LessonPlan } from './storage';

// 2022 개정 특수교육과정 기반 교과 영역
export interface CurriculumArea {
  category: '기본교육과정' | '공통교육과정' | '선택교육과정';
  domain: string;
  subject: string;
}

// 장애 수준 분류
export interface DisabilityLevel {
  type: string; // 장애 유형
  severity: '경도' | '중도' | '중증'; // 장애 정도
  functionalLevel: string; // 기능 수준
  supportNeeds: string; // 지원 필요도
}

export interface ExampleLessonPlan extends LessonPlan {
  curriculumArea: CurriculumArea;
  disabilityType: string;
  disabilityLevel: DisabilityLevel;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  tags: string[];
}

// 2022 개정 특수교육과정 전체 교과 영역 정의
export const fullCurriculumStructure = {
  '중1': {
    '국어': ['듣기·말하기', '읽기', '쓰기', '문법', '문학'],
    '사회': ['나와 우리', '가족·이웃·마을', '국가와 사회', '세계와 지구촌'],
    '수학': ['수와 연산', '도형', '측정', '규칙성', '자료와 가능성'],
    '과학': ['물질', '생명', '지구와 우주', '에너지'],
    '체육': ['건강', '도전', '경쟁', '표현', '여가'],
    '음악': ['표현', '감상', '생활화'],
    '미술': ['표현', '감상'],
    '정보통신활용': ['정보 이해', '기기 활용', '소프트웨어', '정보윤리'],
    '생활영어': ['듣기·말하기', '읽기', '쓰기', '문화'],
    '보건': ['건강 관리', '건강 선택', '성·안전'],
    '창의적 체험활동': ['자율활동', '동아리활동', '봉사활동', '진로활동'],
    '일상생활 활동': ['기본 생활습관', '의사소통', '이동·자립', '직업 전환']
  },
  '중2': {
    '국어': ['듣기·말하기', '읽기', '쓰기', '문법', '문학'],
    '사회': ['나와 우리', '가족·이웃·마을', '국가와 사회', '세계와 지구촌'],
    '수학': ['수와 연산', '도형', '측정', '규칙성', '자료와 가능성'],
    '과학': ['물질', '생명', '지구와 우주', '에너지'],
    '체육': ['건강', '도전', '경쟁', '표현', '여가'],
    '음악': ['표현', '감상', '생활화'],
    '미술': ['표현', '감상'],
    '정보통신활용': ['정보 이해', '기기 활용', '소프트웨어', '정보윤리'],
    '생활영어': ['듣기·말하기', '읽기', '쓰기', '문화'],
    '보건': ['건강 관리', '건강 선택', '성·안전'],
    '창의적 체험활동': ['자율활동', '동아리활동', '봉사활동', '진로활동'],
    '일상생활 활동': ['기본 생활습관', '의사소통', '이동·자립', '직업 전환']
  },
  '중3': {
    '국어': ['듣기·말하기', '읽기', '쓰기', '문법', '문학'],
    '사회': ['나와 우리', '가족·이웃·마을', '국가와 사회', '세계와 지구촌'],
    '수학': ['수와 연산', '도형', '측정', '규칙성', '자료와 가능성'],
    '과학': ['물질', '생명', '지구와 우주', '에너지'],
    '체육': ['건강', '도전', '경쟁', '표현', '여가'],
    '음악': ['표현', '감상', '생활화'],
    '미술': ['표현', '감상'],
    '정보통신활용': ['정보 이해', '기기 활용', '소프트웨어', '정보윤리'],
    '생활영어': ['듣기·말하기', '읽기', '쓰기', '문화'],
    '보건': ['건강 관리', '건강 선택', '성·안전'],
    '창의적 체험활동': ['자율활동', '동아리활동', '봉사활동', '진로활동'],
    '일상생활 활동': ['기본 생활습관', '의사소통', '이동·자립', '직업 전환']
  },
  '고1': {
    '국어': ['듣기·말하기', '읽기', '쓰기', '문법', '문학'],
    '사회': ['나와 우리', '가족·이웃·마을', '국가와 사회', '세계와 지구촌'],
    '수학': ['수와 연산', '도형', '측정', '규칙성', '자료와 가능성'],
    '과학': ['물질', '생명', '지구와 우주', '에너지'],
    '진로와 직업': ['자기 이해', '직업 세계', '진로 설계'],
    '체육': ['건강', '도전', '경쟁', '표현', '여가'],
    '음악': ['표현', '감상', '생활화'],
    '미술': ['표현', '감상'],
    '정보통신활용': ['정보 이해', '기기 활용', '소프트웨어', '정보윤리'],
    '생활영어': ['듣기·말하기', '읽기', '쓰기', '문화'],
    '보건': ['건강 관리', '건강 선택', '성·안전'],
    '창의적 체험활동': ['자율활동', '동아리활동', '봉사활동', '진로활동'],
    '일상생활 활동': ['기본 생활습관', '의사소통', '이동·자립', '직업 전환']
  },
  '고2': {
    '국어': ['듣기·말하기', '읽기', '쓰기', '문법', '문학'],
    '사회': ['나와 우리', '가족·이웃·마을', '국가와 사회', '세계와 지구촌'],
    '수학': ['수와 연산', '도형', '측정', '규칙성', '자료와 가능성'],
    '과학': ['물질', '생명', '지구와 우주', '에너지'],
    '진로와 직업': ['자기 이해', '직업 세계', '진로 설계'],
    '체육': ['건강', '도전', '경쟁', '표현', '여가'],
    '음악': ['표현', '감상', '생활화'],
    '미술': ['표현', '감상'],
    '정보통신활용': ['정보 이해', '기기 활용', '소프트웨어', '정보윤리'],
    '생활영어': ['듣기·말하기', '읽기', '쓰기', '문화'],
    '보건': ['건강 관리', '건강 선택', '성·안전'],
    '창의적 체험활동': ['자율활동', '동아리활동', '봉사활동', '진로활동'],
    '일상생활 활동': ['기본 생활습관', '의사소통', '이동·자립', '직업 전환']
  },
  '고3': {
    '국어': ['듣기·말하기', '읽기', '쓰기', '문법', '문학'],
    '사회': ['나와 우리', '가족·이웃·마을', '국가와 사회', '세계와 지구촌'],
    '수학': ['수와 연산', '도형', '측정', '규칙성', '자료와 가능성'],
    '과학': ['물질', '생명', '지구와 우주', '에너지'],
    '진로와 직업': ['자기 이해', '직업 세계', '진로 설계'],
    '체육': ['건강', '도전', '경쟁', '표현', '여가'],
    '음악': ['표현', '감상', '생활화'],
    '미술': ['표현', '감상'],
    '정보통신활용': ['정보 이해', '기기 활용', '소프트웨어', '정보윤리'],
    '생활영어': ['듣기·말하기', '읽기', '쓰기', '문화'],
    '보건': ['건강 관리', '건강 선택', '성·안전'],
    '창의적 체험활동': ['자율활동', '동아리활동', '봉사활동', '진로활동'],
    '일상생활 활동': ['기본 생활습관', '의사소통', '이동·자립', '직업 전환']
  }
};

// 2022 개정 특수교육과정 교과 영역 정의 (기존 호환성 유지)
export const curriculumAreas = {
  기본교육과정: {
    '국어': ['듣기·말하기', '읽기', '쓰기'],
    '수학': ['수와 연산', '도형과 측정', '규칙성', '자료와 가능성'],
    '사회': ['나와 다른 사람', '우리가 살아가는 곳', '시간과 일상생활', '사회의 모습과 변화'],
    '과학': ['나와 자연', '물질과 에너지', '생명과 지구'],
    '실과': ['나와 일', '기술 활용', '생활 자원과 환경'],
    '체육': ['건강', '도전', '경쟁', '표현', '안전'],
    '음악': ['표현', '감상', '생활화'],
    '미술': ['표현', '감상', '생활화'],
    '진로와 직업': ['일과 직업', '진로 탐색', '진로 디자인과 준비']
  },
  공통교육과정: {
    '국어': ['화법과 작문', '독서와 문학', '언어생활'],
    '수학': ['수와 연산', '문자와 식', '함수', '기하', '확률과 통계'],
    '사회': ['지리', '일반사회', '역사'],
    '과학': ['통합과학', '물리학', '화학', '생명과학', '지구과학'],
    '기술·가정': ['기술', '가정생활'],
    '정보': ['정보 문화', '자료와 정보', '문제 해결과 프로그래밍', '컴퓨팅 시스템'],
    '체육': ['건강', '도전', '경쟁', '표현', '안전'],
    '예술': ['음악', '미술', '연극'],
    '영어': ['듣기', '말하기', '읽기', '쓰기'],
    '진로와 직업': ['자아 이해와 사회적 역량 개발', '일과 직업 세계 이해', '진로 탐색', '진로 디자인과 준비']
  }
};

// 장애 수준별 분류
export const disabilityLevels = {
  지적장애: {
    경도: { range: 'IQ 50-70', description: '학습 속도가 느리지만 기본적인 학습 가능' },
    중도: { range: 'IQ 35-50', description: '구체적이고 반복적인 학습으로 기본 기능 습득 가능' },
    중증: { range: 'IQ 35 미만', description: '일상생활 기능 중심의 개별화된 교육 필요' }
  },
  자폐스펙트럼장애: {
    경도: { description: '사회적 상호작용에 어려움이 있지만 학습 능력 보유' },
    중도: { description: '의사소통과 사회적 기능에 상당한 지원 필요' },
    중증: { description: '전반적인 발달과 기능에 지속적이고 집중적인 지원 필요' }
  },
  ADHD: {
    경도: { description: '주의집중 시간이 짧지만 적절한 지원으로 학습 가능' },
    중도: { description: '충동성과 주의산만이 심하여 구조화된 환경 필요' },
    중증: { description: '극심한 과잉행동과 충동성으로 개별적 행동 중재 필요' }
  },
  학습장애: {
    경도: { description: '특정 영역에서 학습 어려움, 보상 전략으로 개선 가능' },
    중도: { description: '여러 영역에서 학습 곤란, 집중적 개별 지도 필요' },
    중증: { description: '전반적 학습 능력 저하, 대안적 교육 방법 필요' }
  }
};

export const exampleLessonPlans: ExampleLessonPlan[] = [
  {
    id: 'example-1',
    title: '중등 1학년 수학 - 1~10 숫자 인식 및 세기',
    subject: '수학',
    curriculumArea: {
      category: '기본교육과정',
      domain: '수와 연산',
      subject: '수학'
    },
    grade: '중1',
    duration: 40,
    learningObjectives: [
      '1부터 10까지의 숫자를 시각적으로 인식할 수 있다',
      '구체물을 이용하여 1부터 5까지 세기를 할 수 있다',
      '숫자 카드와 구체물의 개수를 일대일 대응할 수 있다'
    ],
    targetStudents: [
      {
        name: '김○○',
        disability: '지적장애 2급',
        currentLevel: '숫자 1-3까지 인식 가능',
        goals: '숫자 1-5까지 인식 및 세기',
        accommodations: '큰 글씨 교재, 반복 학습, 개별 지도'
      }
    ],
    teachingMethods: [
      '다감각 학습법 (시각, 촉각, 청각 활용)',
      '구체물 조작 활동',
      '반복 학습 및 단계적 접근',
      '개별화 교육'
    ],
    materials: [
      '숫자 카드 (1-10)',
      '색깔 블록 30개',
      '숫자송 음원',
      '개별 학습지',
      '보상 스티커'
    ],
    activities: [
      {
        phase: '도입',
        time: 10,
        activity: '숫자송 부르며 몸짓으로 숫자 표현하기',
        materials: '숫자송 음원',
        notes: '학생의 참여도에 따라 속도 조절'
      },
      {
        phase: '전개 1',
        time: 10,
        activity: '숫자 카드 보고 따라 읽기 (1-5)',
        materials: '숫자 카드',
        notes: '정확한 발음보다는 인식에 중점'
      },
      {
        phase: '전개 2',
        time: 15,
        activity: '블록을 이용한 세기 활동 (1-5)',
        materials: '색깔 블록',
        notes: '학생이 직접 블록을 만지며 세기'
      },
      {
        phase: '정리',
        time: 5,
        activity: '오늘 배운 숫자 복습 및 칭찬',
        materials: '보상 스티커',
        notes: '성취감 향상을 위한 긍정적 피드백'
      }
    ],
    assessmentMethods: [
      '관찰 평가: 숫자 인식 정확도',
      '수행 평가: 블록 세기 활동',
      '포트폴리오: 학습지 결과물'
    ],
    accommodations: [
      '학습 시간 단축 (필요시 20분으로 조정)',
      '개별 속도에 맞춘 진행',
      '시각적 단서 강화',
      '긍정적 강화 빈번히 제공'
    ],
    notes: '학생의 집중력이 짧으므로 활동 간 충분한 휴식 제공. 성공 경험을 통한 자신감 향상이 중요함.',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    disabilityType: '지적장애',
    disabilityLevel: {
      type: '지적장애',
      severity: '중도',
      functionalLevel: 'IQ 35-50, 기본적인 일상생활 기능 부분적 가능',
      supportNeeds: '구조화된 학습 환경과 반복 학습 필요'
    },
    difficulty: 'basic',
    tags: ['숫자인식', '기초수학', '구체물조작', '1:1대응']
  },
  {
    id: 'example-2',
    title: '중등 1학년 일상생활활동 - 양치질 순서 익히기',
    subject: '일상생활 활동',
    curriculumArea: {
      category: '기본교육과정',
      domain: '기본 생활습관',
      subject: '일상생활 활동'
    },
    grade: '중1',
    duration: 30,
    learningObjectives: [
      '양치질의 순서를 단계별로 말할 수 있다',
      '교사의 도움 없이 양치질 과정을 실행할 수 있다',
      '양치질의 중요성을 이해하고 설명할 수 있다'
    ],
    targetStudents: [
      {
        name: '이○○',
        disability: '자폐성장애',
        currentLevel: '단순한 일상 루틴 수행 가능',
        goals: '독립적 양치질 수행',
        accommodations: '시각적 스케줄, 구조화된 환경, 단계별 안내'
      }
    ],
    teachingMethods: [
      '과제분석법 (Task Analysis)',
      '시각적 단서 제공',
      '모델링 및 시연',
      '반복 연습'
    ],
    materials: [
      '양치질 순서 그림카드',
      '치약, 칫솔',
      '컵, 물',
      '거울',
      '타이머'
    ],
    activities: [
      {
        phase: '도입',
        time: 5,
        activity: '양치질 순서 그림카드 보며 순서 확인',
        materials: '양치질 순서 그림카드',
        notes: '학생과 함께 순서 읽어보기'
      },
      {
        phase: '전개 1',
        time: 10,
        activity: '교사 시연 후 학생 따라하기',
        materials: '치약, 칫솔, 컵, 물, 거울',
        notes: '단계별로 천천히 진행'
      },
      {
        phase: '전개 2',
        time: 10,
        activity: '학생 독립적 수행 (필요시 프롬프팅)',
        materials: '치약, 칫솔, 컵, 물, 거울',
        notes: '최소한의 도움으로 독립성 향상'
      },
      {
        phase: '정리',
        time: 5,
        activity: '양치질 순서 다시 확인 및 정리',
        materials: '양치질 순서 그림카드',
        notes: '다음 시간 예고'
      }
    ],
    assessmentMethods: [
      '체크리스트: 양치질 단계별 수행도',
      '관찰 평가: 독립적 수행 정도',
      '자기평가: 학생 스스로 완료 여부 확인'
    ],
    accommodations: [
      '시각적 스케줄 제공',
      '단계별 그림 안내',
      '충분한 연습 시간 제공',
      '개별 속도 인정'
    ],
    notes: '자폐성장애 학생의 특성상 변화에 민감하므로 일관된 환경과 순서 유지 필요. 성공적 완료 시 즉시 강화 제공.',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
    disabilityType: '자폐성장애',
    disabilityLevel: {
      type: '자폐스펙트럼장애',
      severity: '중도',
      functionalLevel: '구조화된 환경에서 기본적 일상생활 기능 수행 가능',
      supportNeeds: '시각적 지원과 예측 가능한 루틴 필요'
    },
    difficulty: 'intermediate',
    tags: ['일상생활기능', '과제분석', '독립성', '루틴학습']
  },
  {
    id: 'example-3',
    title: '중등 2학년 사회 - 친구와 인사하기',
    subject: '사회',
    curriculumArea: {
      category: '기본교육과정',
      domain: '나와 우리',
      subject: '사회'
    },
    grade: '중2',
    duration: 35,
    learningObjectives: [
      '상황에 맞는 인사말을 선택할 수 있다',
      '친구에게 먼저 인사할 수 있다',
      '인사받았을 때 적절히 응답할 수 있다'
    ],
    targetStudents: [
      {
        name: '박○○',
        disability: '지적장애 3급',
        currentLevel: '간단한 인사 가능하나 자발적 인사 부족',
        goals: '자발적이고 적절한 인사하기',
        accommodations: '역할놀이, 사회적 스토리, 긍정적 강화'
      }
    ],
    teachingMethods: [
      '사회적 스토리',
      '역할놀이 (Role Playing)',
      '모델링',
      '점진적 일반화'
    ],
    materials: [
      '사회적 스토리 책',
      '상황별 그림카드',
      '역할놀이 소품',
      '비디오 자료'
    ],
    activities: [
      {
        phase: '도입',
        time: 8,
        activity: '인사의 중요성에 대한 사회적 스토리 읽기',
        materials: '사회적 스토리 책',
        notes: '학생의 이해도 확인하며 진행'
      },
      {
        phase: '전개 1',
        time: 12,
        activity: '다양한 상황별 인사말 학습',
        materials: '상황별 그림카드',
        notes: '아침, 점심, 하교 시 등 구체적 상황'
      },
      {
        phase: '전개 2',
        time: 10,
        activity: '교사와 역할놀이 실습',
        materials: '역할놀이 소품',
        notes: '학생이 편안해할 때까지 반복'
      },
      {
        phase: '정리',
        time: 5,
        activity: '오늘 배운 인사법 정리 및 다짐',
        materials: '',
        notes: '실제 상황에서 적용 격려'
      }
    ],
    assessmentMethods: [
      '관찰 평가: 일상 상황에서의 인사 행동',
      '역할놀이 평가: 상황별 적절한 인사 선택',
      '또래 피드백: 친구들의 반응 관찰'
    ],
    accommodations: [
      '익숙한 환경에서 연습',
      '단계적 상황 확장',
      '즉시적 피드백 제공',
      '성공 경험 강화'
    ],
    notes: '사회성 기술은 일반화가 중요하므로 다양한 환경과 상황에서 연습 기회 제공. 자연스러운 상황에서의 강화가 효과적.',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
    disabilityType: '지적장애',
    disabilityLevel: {
      type: '지적장애',
      severity: '경도',
      functionalLevel: 'IQ 50-70, 기본적인 학습과 의사소통 가능',
      supportNeeds: '사회적 상황에서의 구체적 지도와 반복 연습 필요'
    },
    difficulty: 'intermediate',
    tags: ['사회성기술', '의사소통', '또래관계', '역할놀이']
  },
  {
    id: 'example-4',
    title: '중등 1학년 국어 - 한글 기초 자음 인식',
    subject: '국어',
    curriculumArea: {
      category: '기본교육과정',
      domain: '읽기',
      subject: '국어'
    },
    grade: '중1',
    duration: 35,
    learningObjectives: [
      'ㄱ, ㄴ, ㄷ 자음의 모양을 구별할 수 있다',
      '자음의 소리를 듣고 해당 글자를 찾을 수 있다',
      '간단한 단어에서 첫소리 자음을 찾을 수 있다'
    ],
    targetStudents: [
      {
        name: '최○○',
        disability: '지적장애 3급',
        currentLevel: '그림과 글자 구별 가능, 모방 읽기 가능',
        goals: '기본 자음 3개 인식 및 소리 구별',
        accommodations: '큰 글씨, 시각적 단서, 반복 학습'
      }
    ],
    teachingMethods: [
      '다감각 학습법 (시각, 청각, 촉각)',
      '파닉스 교수법',
      '구체물 연결 학습',
      '게임식 활동'
    ],
    materials: [
      '자음 카드 (ㄱ,ㄴ,ㄷ)',
      '단어 그림카드',
      '자음 쓰기판',
      '자음송 음원',
      '모래판 또는 점토'
    ],
    activities: [
      {
        phase: '도입',
        time: 8,
        activity: '자음송 부르며 몸짓으로 표현하기',
        materials: '자음송 음원',
        notes: '학생이 따라 부를 수 있도록 충분히 반복'
      },
      {
        phase: '전개 1',
        time: 12,
        activity: 'ㄱ,ㄴ,ㄷ 자음 카드 보고 소리내어 읽기',
        materials: '자음 카드',
        notes: '정확한 발음보다는 인식에 중점'
      },
      {
        phase: '전개 2',
        time: 10,
        activity: '모래판에 자음 써보기 (촉각 학습)',
        materials: '모래판, 자음 카드',
        notes: '손가락으로 따라 쓰며 소리 내기'
      },
      {
        phase: '정리',
        time: 5,
        activity: '배운 자음으로 시작하는 단어 찾기 게임',
        materials: '단어 그림카드',
        notes: '성공 시 즉시 칭찬 제공'
      }
    ],
    assessmentMethods: [
      '관찰 평가: 자음 인식 정확도',
      '수행 평가: 자음 쓰기 활동',
      '구두 평가: 자음 소리내기'
    ],
    accommodations: [
      '학습 속도 조절 (개별 맞춤)',
      '시각적 단서 강화 (색깔, 그림)',
      '촉각적 학습 기회 제공',
      '성공 경험 빈번한 제공'
    ],
    notes: '한글 학습의 기초 단계이므로 흥미와 자신감 향상이 최우선. 완벽함보다는 시도와 참여에 중점.',
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-05'),
    disabilityType: '지적장애',
    disabilityLevel: {
      type: '지적장애',
      severity: '경도',
      functionalLevel: 'IQ 50-70, 기본적인 인지 기능과 모방 학습 가능',
      supportNeeds: '반복 학습과 시각적 지원을 통한 단계적 접근 필요'
    },
    difficulty: 'basic',
    tags: ['한글학습', '자음인식', '파닉스', '기초문해']
  },
  {
    id: 'example-5',
    title: '중등 3학년 일상생활활동 - 감정 조절 기술',
    subject: '일상생활 활동',
    curriculumArea: {
      category: '기본교육과정',
      domain: '의사소통',
      subject: '일상생활 활동'
    },
    grade: '중3',
    duration: 30,
    learningObjectives: [
      '화나는 감정을 인식하고 표현할 수 있다',
      '화가 날 때 사용할 수 있는 대처 방법 3가지를 말할 수 있다',
      '실제 상황에서 적절한 대처 방법을 선택하여 사용할 수 있다'
    ],
    targetStudents: [
      {
        name: '강○○',
        disability: '자폐성장애',
        currentLevel: '감정 표현 어려움, 분노 시 부적응 행동 빈번',
        goals: '적절한 감정 조절 전략 습득',
        accommodations: '시각적 지원, 예측 가능한 환경, 개별 공간'
      }
    ],
    teachingMethods: [
      '인지행동 접근법',
      '시각적 지원 전략',
      '사회적 스토리',
      '역할놀이'
    ],
    materials: [
      '감정 온도계',
      '대처 전략 카드',
      '사회적 스토리 책',
      '진정 도구 (스트레스볼, 헤드폰)',
      '타이머'
    ],
    activities: [
      {
        phase: '도입',
        time: 8,
        activity: '감정 온도계로 현재 감정 확인하기',
        materials: '감정 온도계',
        notes: '학생의 현재 상태 파악 후 진행'
      },
      {
        phase: '전개 1',
        time: 12,
        activity: '화나는 상황 사회적 스토리 읽고 토론',
        materials: '사회적 스토리 책',
        notes: '학생의 경험과 연결하여 설명'
      },
      {
        phase: '전개 2',
        time: 8,
        activity: '대처 전략 연습 (심호흡, 세기, 진정 공간)',
        materials: '대처 전략 카드, 진정 도구',
        notes: '각 전략을 실제로 해보며 효과 확인'
      },
      {
        phase: '정리',
        time: 2,
        activity: '오늘 배운 전략 정리 및 다음에 사용할 약속',
        materials: '',
        notes: '구체적인 상황에서의 사용 계획 세우기'
      }
    ],
    assessmentMethods: [
      '관찰 평가: 실제 상황에서의 대처 행동',
      '자기 평가: 전략 사용 후 감정 변화',
      '체크리스트: 대처 전략 실행 정도'
    ],
    accommodations: [
      '조용한 개별 공간 제공',
      '시각적 단서와 알림 카드',
      '충분한 연습과 일반화 시간',
      '성공적 사용 시 즉시 강화'
    ],
    notes: '감정 조절은 지속적인 연습이 필요한 영역. 일상 상황에서의 적용과 일반화에 중점을 두어야 함.',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
    disabilityType: '자폐성장애',
    disabilityLevel: {
      type: '자폐스펙트럼장애',
      severity: '경도',
      functionalLevel: '기본적인 의사소통 가능하나 사회적 상호작용에 어려움',
      supportNeeds: '구조화된 환경과 예측 가능한 루틴, 감정 조절 전략 교육 필요'
    },
    difficulty: 'advanced',
    tags: ['감정조절', '사회적스토리', '자기관리', '문제해결']
  },
  {
    id: 'example-6',
    title: '고등 1학년 체육 - 대근육 운동 및 신체 움직임',
    subject: '체육',
    curriculumArea: {
      category: '기본교육과정',
      domain: '건강',
      subject: '체육'
    },
    grade: '고1',
    duration: 40,
    learningObjectives: [
      '교사의 시범을 보고 기본 동작을 따라할 수 있다',
      '음악에 맞춰 간단한 신체 움직임을 할 수 있다',
      '운동 도구를 안전하게 사용할 수 있다'
    ],
    targetStudents: [
      {
        name: '서○○',
        disability: '중복장애 (뇌병변+지적장애)',
        currentLevel: '보조 없이 앉기 가능, 간단한 팔 움직임 가능',
        goals: '의도적인 신체 움직임 향상',
        accommodations: '안전 매트, 보조 기구, 개별 속도 인정'
      }
    ],
    teachingMethods: [
      '감각통합치료 접근',
      '단계적 동작 분해',
      '음악 치료 활용',
      '긍정적 강화'
    ],
    materials: [
      '안전 매트',
      '색깔 공 (다양한 크기)',
      '리듬 악기',
      '균형 쿠션',
      '음악 CD'
    ],
    activities: [
      {
        phase: '준비',
        time: 5,
        activity: '안전 확인 및 준비 운동',
        materials: '안전 매트',
        notes: '학생의 컨디션과 안전 상태 확인'
      },
      {
        phase: '기본동작',
        time: 15,
        activity: '앉은 자세에서 팔 움직임 연습',
        materials: '색깔 공',
        notes: '학생이 할 수 있는 범위 내에서 진행'
      },
      {
        phase: '음악활동',
        time: 15,
        activity: '음악에 맞춰 몸흔들기 및 악기 연주',
        materials: '리듬 악기, 음악 CD',
        notes: '자유로운 표현 격려, 강제하지 않음'
      },
      {
        phase: '정리',
        time: 5,
        activity: '이완 활동 및 정리',
        materials: '균형 쿠션',
        notes: '충분한 휴식과 칭찬 제공'
      }
    ],
    assessmentMethods: [
      '관찰 평가: 자발적 움직임 빈도',
      '영상 기록: 동작의 변화 과정',
      '체크리스트: 목표 동작 수행 여부'
    ],
    accommodations: [
      '개별 신체 능력에 맞춤 조정',
      '안전 장비 항시 준비',
      '충분한 휴식 시간 제공',
      '무리하지 않는 범위에서 진행'
    ],
    notes: '중복장애 학생의 특성상 안전이 최우선. 작은 변화라도 인정하고 격려하는 것이 중요.',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
    disabilityType: '중복장애',
    disabilityLevel: {
      type: '중복장애 (뇌병변+지적장애)',
      severity: '중증',
      functionalLevel: '기본적인 신체 움직임 제한적, 보조적 지원으로 참여 가능',
      supportNeeds: '전면적인 개별 지원과 안전 관리, 감각 통합적 접근 필요'
    },
    difficulty: 'basic',
    tags: ['신체활동', '대근육운동', '감각통합', '음악치료']
  },
  // 새로운 예시들 - 2022 개정 특수교육과정 전체 반영
  {
    id: 'example-7',
    title: '중등 1학년 국어 - 듣기·말하기 의사소통 연습',
    subject: '국어',
    curriculumArea: {
      category: '기본교육과정',
      domain: '듣기·말하기',
      subject: '국어'
    },
    grade: '중1',
    duration: 40,
    learningObjectives: [
      '간단한 질문을 듣고 이해할 수 있다',
      '자신의 이름과 나이를 말할 수 있다',
      '기본적인 인사말을 할 수 있다'
    ],
    targetStudents: [
      {
        name: '김○○',
        disability: '지적장애 2급',
        currentLevel: '단어 수준의 의사소통 가능',
        goals: '진단-배치 대화 및 자기소개 가능',
        accommodations: '시각적 지원, 반복 연습, 긍정적 강화'
      }
    ],
    teachingMethods: [
      '이미지 기반 의사소통',
      '역할 놀이',
      '상황중심 학습',
      '사회적 스토리'
    ],
    materials: [
      '상황별 그림카드',
      '대화 연습판',
      '녹음기',
      '거울',
      '인형'
    ],
    activities: [
      {
        phase: '도입',
        time: 10,
        activity: '인사 노래 부르며 자연스럽게 대화 시작',
        materials: '인사 노래 CD',
        notes: '학생이 편안해할 때까지 기다리기'
      },
      {
        phase: '전개 1',
        time: 15,
        activity: '그림카드를 보며 상황에 맞는 말 찾기',
        materials: '상황별 그림카드',
        notes: '다양한 상황을 제시하여 선택범위 넓히기'
      },
      {
        phase: '전개 2',
        time: 10,
        activity: '교사와 역할놓이로 대화 연습',
        materials: '역할놓이 소품',
        notes: '반복 연습을 통한 자연스러운 표현 연습'
      },
      {
        phase: '정리',
        time: 5,
        activity: '오늘 연습한 대화 다시 해보기',
        materials: '대화 연습판',
        notes: '성취감과 자신감 향상'
      }
    ],
    assessmentMethods: [
      '관찰 평가: 의사소통 적극성',
      '수행 평가: 역할놓이 참여도',
      '사회성 평가: 또래와의 상호작용'
    ],
    accommodations: [
      '학생 속도에 맞는 반복 연습',
      '시각적 단서 활용',
      '긍정적 피드백 제공',
      '성공 경험 극대화'
    ],
    notes: '말하기 능력 개발은 일상생활과 밀접한 관련이 있으므로 실제 상황에서의 연습이 중요',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
    disabilityType: '지적장애',
    disabilityLevel: {
      type: '지적장애',
      severity: '중도',
      functionalLevel: 'IQ 35-50, 기본적인 의사소통 및 사회성 기술 습득 가능',
      supportNeeds: '시각적 지원과 단계별 반복 학습 필요'
    },
    difficulty: 'intermediate',
    tags: ['의사소통', '말하기', '자기소개', '사회성']
  },
  {
    id: 'example-8',
    title: '고등 2학년 진로와직업 - 직업 세계 탐색',
    subject: '진로와 직업',
    curriculumArea: {
      category: '기본교육과정',
      domain: '직업 세계',
      subject: '진로와 직업'
    },
    grade: '고2',
    duration: 45,
    learningObjectives: [
      '다양한 직업의 종류를 알 수 있다',
      '자신의 관심사와 적성을 파악할 수 있다',
      '학교에서 배워야 할 기술과 직업을 연결할 수 있다'
    ],
    targetStudents: [
      {
        name: '이○○',
        disability: '지적장애 3급',
        currentLevel: '기본적인 일상생활 기능 수행 가능',
        goals: '단순 업무 중심의 직업 준비',
        accommodations: '구체적 예시, 실물 교구, 체험 활동'
      }
    ],
    teachingMethods: [
      '체험 중심 학습',
      '직업 분석 기법',
      '인터뷰 활동',
      '현장 견학'
    ],
    materials: [
      '직업 소개 비디오',
      '직업 챴험 세트',
      '인터뷰 질문지',
      '직업 분류 카드',
      '학교 지도'
    ],
    activities: [
      {
        phase: '도입',
        time: 10,
        activity: '직업 소개 비디오 시청 및 토론',
        materials: '직업 소개 비디오',
        notes: '다양한 직업에 대한 열린 태도 형성'
      },
      {
        phase: '전개 1',
        time: 15,
        activity: '직업 분류 카드로 직업 분류하기',
        materials: '직업 분류 카드',
        notes: '학생이 직접 조작하며 분류해보기'
      },
      {
        phase: '전개 2',
        time: 15,
        activity: '학교 내 다양한 직업 최행 및 체험',
        materials: '학교 지도, 직업 챴험 세트',
        notes: '사서, 요리사, 청소원 등 교내 직업 체험'
      },
      {
        phase: '정리',
        time: 5,
        activity: '오늘 배운 직업 중 관심 있는 직업 발표',
        materials: '인터뷰 질문지',
        notes: '다음 차시 활동 계획 세우기'
      }
    ],
    assessmentMethods: [
      '관찰 평가: 체험 활동 참여도',
      '수행 평가: 직업 분류 정확도',
      '자기 평가: 관심 직업 설명하기'
    ],
    accommodations: [
      '구체적이고 시각적인 자료 제공',
      '체험 위주의 활동 설계',
      '개별 관심사를 고려한 맞춤 지도',
      '충분한 연습과 반복 시간'
    ],
    notes: '진로 교육은 학생의 미래와 직결되므로 실제적이고 참여형 활동이 효과적',
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-03-05'),
    disabilityType: '지적장애',
    disabilityLevel: {
      type: '지적장애',
      severity: '경도',
      functionalLevel: 'IQ 50-70, 기본적인 직업 기술 습득 가능',
      supportNeeds: '구조화된 학습 환경과 반복 연습 필요'
    },
    difficulty: 'intermediate',
    tags: ['진로탐색', '직업체험', '자기이해', '미래계획']
  },
  {
    id: 'example-9',
    title: '중등 2학년 과학 - 물질의 상태 변화 관찰',
    subject: '과학',
    curriculumArea: {
      category: '기본교육과정',
      domain: '물질',
      subject: '과학'
    },
    grade: '중2',
    duration: 40,
    learningObjectives: [
      '물, 얼음, 수증기의 차이를 구별할 수 있다',
      '온도 변화에 따른 물질 상태 변화를 관찰할 수 있다',
      '일상생활에서 물질 상태 변화를 찾을 수 있다'
    ],
    targetStudents: [
      {
        name: '박○○',
        disability: 'ADHD',
        currentLevel: '단순한 과학 개념 이해 가능',
        goals: '집중력 향상과 과학적 사고력 개발',
        accommodations: '단순명료한 설명, 체험 활동, 구조화된 환경'
      }
    ],
    teachingMethods: [
      '탐구 기반 학습',
      '실험 관찰 학습',
      '시각적 도식화',
      '전체-부분-전체 접근법'
    ],
    materials: [
      '얼음 조각',
      '비커, 뜨거운 물',
      '온도계',
      '검은 종이',
      '관찰 일지'
    ],
    activities: [
      {
        phase: '도입',
        time: 8,
        activity: '일상생활에서 물의 다양한 모습 이야기',
        materials: '물 상태 사진카드',
        notes: '학생의 경험과 연결하여 흥미 유발'
      },
      {
        phase: '전개 1',
        time: 15,
        activity: '얼음 녹이기 실험 및 관찰',
        materials: '얼음 조각, 비커, 온도계',
        notes: '직접 만져보고 변화를 관찰하며 기록'
      },
      {
        phase: '전개 2',
        time: 12,
        activity: '물 끓이기 및 수증기 만들기 실험',
        materials: '비커, 뜨거운 물, 검은 종이',
        notes: '안전 수칙 철저히 준수하며 진행'
      },
      {
        phase: '정리',
        time: 5,
        activity: '관찰 결과 발표 및 일상 사례 찾기',
        materials: '관찰 일지',
        notes: '과학적 표현 연습과 생활 적용'
      }
    ],
    assessmentMethods: [
      '관찰 평가: 실험 참여도 및 태도',
      '수행 평가: 가설 수립 및 관찰 기록',
      '구두 평가: 실험 결과 설명하기'
    ],
    accommodations: [
      '실험 단계를 단순하게 세분화',
      '시각적 도식 및 그림 자료 제공',
      '집중력 강화를 위한 구조화된 활동',
      '성공 경험 제공을 위한 개별 지도'
    ],
    notes: 'ADHD 학생에게는 체험 학습이 효과적. 실험의 결과보다는 과정에서의 참여와 탐구에 중점',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-10'),
    disabilityType: 'ADHD',
    disabilityLevel: {
      type: 'ADHD',
      severity: '중도',
      functionalLevel: '주의집중 시간이 짧지만 적절한 지원으로 학습 참여 가능',
      supportNeeds: '구조화된 환경과 체험 중심 활동 필요'
    },
    difficulty: 'basic',
    tags: ['과학실험', '물질상태', '관찰학습', '체험학습']
  }
];

// 2022 개정 특수교육과정 기반 교과별 템플릿
export const curriculumBasedTemplates = {
  기본교육과정: {
    수학: {
      domains: {
        '수와 연산': {
          commonObjectives: [
            '구체물을 이용하여 5까지의 수를 셀 수 있다',
            '일상생활에서 기초 수 개념을 적용할 수 있다',
            '간단한 덧셈과 뺄셈을 이해할 수 있다'
          ],
          recommendedMethods: ['구체물 조작', '일대일 대응', '반복 학습', '다감각 활용'],
          typicalMaterials: ['수 막대', '구슬', '블록', '숫자 카드', '일상용품']
        },
        '도형과 측정': {
          commonObjectives: [
            '기본 도형을 구별할 수 있다',
            '크기 비교를 할 수 있다',
            '일상생활에서 측정 개념을 이해할 수 있다'
          ],
          recommendedMethods: ['시각적 비교', '체험 활동', '놀이 중심 학습'],
          typicalMaterials: ['도형 블록', '자', '저울', '컵', '색종이']
        }
      }
    },
    국어: {
      domains: {
        '듣기·말하기': {
          commonObjectives: [
            '일상 대화에 참여할 수 있다',
            '간단한 요청을 이해하고 반응할 수 있다',
            '자신의 의사를 표현할 수 있다'
          ],
          recommendedMethods: ['대화 중심 학습', '상황별 언어 교육', '모델링'],
          typicalMaterials: ['그림카드', '상황 카드', '음성 녹음기', '인형']
        },
        '읽기': {
          commonObjectives: [
            '글자와 그림을 구별할 수 있다',
            '기초 한글을 인식할 수 있다',
            '간단한 단어를 읽을 수 있다'
          ],
          recommendedMethods: ['음성학적 접근', '전체언어접근', '다감각 학습'],
          typicalMaterials: ['글자카드', '그림책', '단어카드', '자석글자']
        }
      }
    },
    사회: {
      domains: {
        '나와 다른 사람': {
          commonObjectives: [
            '자신과 타인을 구별할 수 있다',
            '기본적인 인사를 할 수 있다',
            '가족 구성원을 알 수 있다'
          ],
          recommendedMethods: ['사회적 스토리', '역할놀이', '반복 연습'],
          typicalMaterials: ['가족 사진', '인사 카드', '거울', '역할놀이 소품']
        }
      }
    },
    실과: {
      domains: {
        '생활 자원과 환경': {
          commonObjectives: [
            '기본적인 생활 기능을 수행할 수 있다',
            '일상용품을 적절히 사용할 수 있다',
            '안전 규칙을 지킬 수 있다'
          ],
          recommendedMethods: ['과제 분석법', '단계적 교수', '실제 상황 연습'],
          typicalMaterials: ['생활용품', '안전 표지판', '순서표', '체크리스트']
        }
      }
    },
    체육: {
      domains: {
        '건강': {
          commonObjectives: [
            '기본적인 신체 움직임을 할 수 있다',
            '건강한 생활 습관을 기를 수 있다',
            '신체 각 부분의 명칭을 알 수 있다'
          ],
          recommendedMethods: ['감각 운동 놀이', '음악과 함께하는 활동', '모방 학습'],
          typicalMaterials: ['공', '매트', '음악', '그림카드', '거울']
        }
      }
    }
  }
};

// 호환성을 위한 기존 템플릿 (deprecated)
export const subjectTemplates = {
  '수학': curriculumBasedTemplates.기본교육과정.수학.domains['수와 연산'],
  '국어': curriculumBasedTemplates.기본교육과정.국어.domains['읽기'],
  '사회': curriculumBasedTemplates.기본교육과정.사회.domains['나와 다른 사람'],
  '실과': curriculumBasedTemplates.기본교육과정.실과.domains['생활 자원과 환경'],
  '체육': curriculumBasedTemplates.기본교육과정.체육.domains['건강']
};