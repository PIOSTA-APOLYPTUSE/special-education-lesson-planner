import { LessonPlan } from './storage';

export const exampleLessonPlans: LessonPlan[] = [
  {
    id: 'example-1',
    title: '수와 연산 기초 학습 - 1~10 숫자 인식',
    subject: '수학',
    grade: '초등 1-3학년 (발달지연)',
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
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'example-2',
    title: '일상생활 기능 - 양치질 순서 익히기',
    subject: '생활기능',
    grade: '중등 1-3학년 (자폐성장애)',
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
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 'example-3',
    title: '사회성 기술 - 친구와 인사하기',
    subject: '사회성',
    grade: '초등 4-6학년 (발달장애)',
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
    updatedAt: new Date('2024-02-01')
  }
];

export const subjectTemplates = {
  '수학': {
    commonObjectives: [
      '기본 수 개념을 이해할 수 있다',
      '일상생활에서 수학적 개념을 적용할 수 있다',
      '구체물을 이용하여 수학적 조작을 할 수 있다'
    ],
    recommendedMethods: [
      '구체물 조작 활동',
      '다감각 학습법',
      '단계적 접근법',
      '반복 학습'
    ],
    typicalMaterials: [
      '구체물 (블록, 구슬 등)',
      '숫자 카드',
      '수직선',
      '계산판',
      '일상생활 소품'
    ]
  },
  '국어': {
    commonObjectives: [
      '기초 문해력을 향상시킬 수 있다',
      '일상 의사소통 능력을 기를 수 있다',
      '글자와 단어를 인식할 수 있다'
    ],
    recommendedMethods: [
      '음성학적 접근법',
      '전체언어접근법',
      '다감각 학습법',
      '개별화 교육'
    ],
    typicalMaterials: [
      '그림카드',
      '단어카드',
      '책',
      '녹음기',
      '쓰기 교구'
    ]
  },
  '생활기능': {
    commonObjectives: [
      '독립적인 일상생활 기능을 수행할 수 있다',
      '사회적 상황에 적절히 대응할 수 있다',
      '자기관리 능력을 기를 수 있다'
    ],
    recommendedMethods: [
      '과제분석법',
      '시각적 단서 제공',
      '체계적 교수법',
      '일반화 전략'
    ],
    typicalMaterials: [
      '실물 교구',
      '그림 순서표',
      '체크리스트',
      '일상용품',
      '시각적 스케줄'
    ]
  },
  '사회성': {
    commonObjectives: [
      '또래와 적절한 상호작용을 할 수 있다',
      '사회적 규칙을 이해하고 지킬 수 있다',
      '감정을 적절히 표현할 수 있다'
    ],
    recommendedMethods: [
      '사회적 스토리',
      '역할놀이',
      '또래 교수',
      '자연적 교수법'
    ],
    typicalMaterials: [
      '사회적 스토리 책',
      '상황별 그림카드',
      '역할놀이 소품',
      '감정 카드',
      '비디오 자료'
    ]
  }
};