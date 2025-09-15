import { LessonPlan } from './storage';

interface GenerationParams {
  grade: string;
  subject: string;
  unit: string;
  disabilityType: string;
  disability: string;
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

// 장애 유형별 프로필 (상세화)
const disabilityProfiles: Record<string, Record<string, DisabilityProfile>> = {
  '지적장애': {
    '경도': {
      type: '지적장애',
      severity: '경도',
      functionalLevel: 'IQ 50-70, 기본적인 학습과 의사소통 가능, 구체적 지도 시 학습 성취 가능',
      supportNeeds: '반복 학습과 시각적 지원을 통한 단계적 접근, 충분한 연습 시간과 긍정적 강화 필요',
      recommendedMethods: ['구체물 조작 활동', '단계적 교수법', '반복 학습', '시각적 단서 제공', '또래 협력 학습', '성공 경험 제공'],
      typicalAccommodations: ['학습 시간 연장 (10-15분)', '과제 단순화 및 세분화', '시각적 자료 적극 활용', '개별 학습 속도 인정', '즉시 피드백 제공', '보상 시스템 활용']
    },
    '중도': {
      type: '지적장애',
      severity: '중도',
      functionalLevel: 'IQ 35-50, 구체적이고 반복적인 학습으로 기본 기능 습득 가능, 일상생활 연계 학습 중요',
      supportNeeds: '구조화된 학습 환경과 지속적인 반복 학습, 구체적 경험 중심 교육 필요',
      recommendedMethods: ['과제 분석법', '구조화된 교수법', '다감각 학습', '즉시 강화', '일상생활 연계 학습', '모델링 및 시연'],
      typicalAccommodations: ['고도로 구조화된 환경', '1:1 개별 지도', '구체물 중심 학습', '빈번한 피드백', '학습 단위 세분화', '일상생활 기능과 연계']
    },
    '중증': {
      type: '지적장애',
      severity: '중증',
      functionalLevel: 'IQ 35 미만, 일상생활 기능 중심의 개별화된 교육 필요, 기본적 의사소통과 자립 기능 중점',
      supportNeeds: '전면적인 개별 지원과 일상생활 기능 중심 교육, 감각 자극을 통한 반응 유도',
      recommendedMethods: ['일상생활 기능 교육', '감각 자극 활동', '반복 훈련', '보조공학 활용', '신체적 도움법', '환경적 단서 제공'],
      typicalAccommodations: ['전면적 개별 지도', '일상생활 기능 중심 목표', '보조 기구 적극 활용', '지속적이고 직접적 지원', '안전 우선 고려', '가족 참여 강화']
    }
  },
  '자폐스펙트럼장애': {
    '경도': {
      type: '자폐스펙트럼장애',
      severity: '경도',
      functionalLevel: '기본적인 의사소통 가능하나 사회적 상호작용과 감각 처리에 어려움, 특정 관심사에 집중',
      supportNeeds: '구조화된 환경과 예측 가능한 루틴, 사회적 기술 교육과 감각 조절 지원 필요',
      recommendedMethods: ['구조화된 교수법', '사회적 스토리', '시각적 일정표', '예측 가능한 루틴', '관심사 활용 학습', 'TEACCH 방법'],
      typicalAccommodations: ['구조화된 학습 환경', '시각적 일정과 규칙', '변화 사전 예고', '감각 조절 지원', '휴식 공간 제공', '개별적 의사소통 방식 인정']
    },
    '중도': {
      type: '자폐스펙트럼장애',
      severity: '중도',
      functionalLevel: '의사소통과 사회적 기능에 상당한 지원 필요, 반복 행동과 감각 민감성이 학습에 영향',
      supportNeeds: '시각적 지원과 예측 가능한 루틴, 의사소통 보조 도구와 감각 통합 접근 필요',
      recommendedMethods: ['PECS 의사소통', 'ABA 기법', '감각 통합 활동', '과제 분석법', '비디오 모델링', '구조화된 작업 시스템'],
      typicalAccommodations: ['고도로 구조화된 환경', '의사소통 보조 도구', '감각 조절실 활용', '1:1 전담 지원', '행동 중재 계획', '가족과의 일관된 접근']
    },
    '중증': {
      type: '자폐스펙트럼장애',
      severity: '중증',
      functionalLevel: '전반적인 발달과 기능에 지속적이고 집중적인 지원 필요, 심각한 의사소통 제한과 도전적 행동',
      supportNeeds: '전면적인 개별 지원과 감각 통합적 접근, 행동 중재와 의사소통 대안 개발',
      recommendedMethods: ['감각 통합 치료', '행동 중재 전략', '보조공학 활용', 'AAC 의사소통', '환경 수정', '개별화된 일과 구성'],
      typicalAccommodations: ['전면적 개별 지도', '감각 조절 환경', 'AAC 기기 상시 사용', '지속적 행동 지원', '안전 확보 우선', '전문가 팀 접근']
    }
  },
  'ADHD': {
    '경도': {
      type: 'ADHD',
      severity: '경도',
      functionalLevel: '주의집중 시간이 짧지만 적절한 지원으로 학습 참여 가능, 경미한 과잉행동과 충동성',
      supportNeeds: '구조화된 환경과 집중력 향상 전략, 움직임을 허용하는 학습 활동 필요',
      recommendedMethods: ['짧은 과제 단위 분할', '움직임 통합 활동', '즉시 피드백', '시각적 단서', '선택권 제공', '토큰 경제 시스템'],
      typicalAccommodations: ['짧은 학습 단위 (15-20분)', '움직임 허용 및 활용', '조용하고 집중 가능한 환경', '집중력 향상 도구', '브레이크 타임 제공', '명확한 규칙과 기대']
    },
    '중도': {
      type: 'ADHD',
      severity: '중도',
      functionalLevel: '충동성과 주의산만이 심하여 구조화된 환경 필요, 과잉행동으로 인한 학습 방해',
      supportNeeds: '구조화된 환경과 체험 중심 활동, 행동 관리 전략과 약물 치료 고려',
      recommendedMethods: ['체험 중심 학습', '움직임 활동 적극 활용', '짧은 집중 시간', '행동 계약', '자기 점검 전략', '또래 멘토링'],
      typicalAccommodations: ['고도로 구조화된 환경', '빈번한 휴식 제공', '체험과 조작 활동', '행동 지원 계획', '개별 작업 공간', '시각적 행동 차트']
    },
    '중증': {
      type: 'ADHD',
      severity: '중증',
      functionalLevel: '극심한 과잉행동과 충동성으로 개별적 행동 중재 필요, 심각한 주의집중 결함',
      supportNeeds: '개별적 행동 중재와 약물 치료 병행, 전문적 행동 분석과 중재 필요',
      recommendedMethods: ['행동 수정 기법', '개별 행동 계획', '감각 조절 활동', '구조화된 환경', '기능적 의사소통 훈련', '자기 조절 전략'],
      typicalAccommodations: ['1:1 개별 지원', '행동 중재 계획 수행', '감각 조절 도구 상시 준비', '약물 관리 협조', '안전한 환경 조성', '전문가 팀 협력']
    }
  }
};

// 교과별 세부 구조 (대폭 강화)
interface SubjectStructure {
  commonObjectives: Record<string, string[]>; // 단원별 목표
  materials: Record<string, string[]>; // 단원별 교구
  methods: string[];
  activities: Record<string, {
    introduction: string[];
    development: string[];
    consolidation: string[];
  }>;
}

const subjectStructures: Record<string, SubjectStructure> = {
  '수학': {
    commonObjectives: {
      '수와 연산': [
        '구체물을 이용하여 1부터 10까지의 수를 순서대로 셀 수 있다',
        '일상생활에서 수의 의미를 이해하고 활용할 수 있다',
        '간단한 덧셈과 뺄셈의 개념을 구체물로 표현할 수 있다',
        '수와 양의 대응 관계를 이해할 수 있다'
      ],
      '도형': [
        '기본 도형(원, 삼각형, 사각형)을 구별할 수 있다',
        '일상생활에서 도형을 찾고 분류할 수 있다',
        '도형의 기본 속성을 관찰하고 설명할 수 있다',
        '구체물을 이용하여 도형을 만들고 조작할 수 있다'
      ],
      '측정': [
        '길이, 무게, 들이의 개념을 구체물로 비교할 수 있다',
        '일상생활에서 측정이 필요한 상황을 인식할 수 있다',
        '비표준 단위를 이용하여 측정 활동에 참여할 수 있다',
        '측정 도구의 기본 사용법을 익힐 수 있다'
      ],
      '규칙성': [
        '간단한 규칙과 패턴을 발견하고 계속할 수 있다',
        '색깔, 모양, 크기의 규칙을 구체물로 만들 수 있다',
        '일상생활에서 규칙성을 찾고 예측할 수 있다',
        '자신만의 패턴을 창의적으로 만들 수 있다'
      ],
      '자료와 가능성': [
        '간단한 자료를 수집하고 분류할 수 있다',
        '구체물을 이용하여 그래프를 만들 수 있다',
        '일어날 가능성에 대해 "많다", "적다"로 표현할 수 있다',
        '자료를 보고 간단한 결론을 말할 수 있다'
      ]
    },
    materials: {
      '수와 연산': ['숫자 카드', '구슬', '블록', '수 막대', '일상용품 (사과, 연필 등)', '계수기', '주사위', '동전'],
      '도형': ['도형 블록', '칠교 조각', '도형판', '색종이', '클레이', '도형 스탬프', '모양틀', '거울'],
      '측정': ['자', '저울', '측정컵', '시계', '온도계', '줄자', '양팔저울', '모래시계'],
      '규칙성': ['색깔 블록', '구슬', '스티커', '패턴 카드', '악기', '리듬 도구', '몸동작 카드', '자연물'],
      '자료와 가능성': ['설문지', '분류함', '그래프 용지', '스티커', '주사위', '동전', '카드', '투표함']
    },
    methods: ['구체물 조작', '단계적 교수', '반복 학습', '체험 활동', '게임 활용', '일상생활 연계'],
    activities: {
      '수와 연산': {
        introduction: ['숫자 노래 부르기', '일상에서 수 찾기', '손가락으로 수 세기', '수 카드 게임'],
        development: ['구체물 세기 활동', '수와 양 대응하기', '수 크기 비교하기', '간단한 계산 놀이'],
        consolidation: ['수 만들기 게임', '일상 속 수학 찾기', '수학 일기 쓰기', '또래와 수 게임']
      },
      '도형': {
        introduction: ['주변 도형 탐색하기', '도형 노래와 율동', '도형 촉감 놀이', '도형 그림책 읽기'],
        development: ['도형 분류하기', '도형 그리기', '도형 만들기', '도형 조합 활동'],
        consolidation: ['도형 작품 만들기', '도형 보물찾기', '도형 이야기 만들기', '도형 전시회']
      },
      '측정': {
        introduction: ['크기 비교 놀이', '측정 도구 탐색', '몸으로 측정하기', '일상 속 측정 찾기'],
        development: ['비교 측정하기', '도구 사용하기', '측정 기록하기', '측정 게임'],
        consolidation: ['측정 탐험 활동', '측정 작품 만들기', '측정 보고서 작성', '측정 전문가 되기']
      },
      '규칙성': {
        introduction: ['자연 속 규칙 찾기', '소리 패턴 놀이', '몸동작 패턴', '색깔 규칙 게임'],
        development: ['패턴 만들기', '패턴 이어가기', '패턴 수정하기', '규칙 발견하기'],
        consolidation: ['창의적 패턴 만들기', '패턴 전시회', '패턴 설명하기', '일상 속 규칙 찾기']
      },
      '자료와 가능성': {
        introduction: ['자료 수집 놀이', '분류 게임', '예측 활동', '확률 체험'],
        development: ['그래프 만들기', '자료 정리하기', '결과 예측하기', '가능성 토론'],
        consolidation: ['조사 프로젝트', '발표 활동', '결론 도출하기', '통계 놀이']
      }
    }
  },
  '국어': {
    commonObjectives: {
      '듣기·말하기': [
        '다른 사람의 말을 집중하여 들을 수 있다',
        '자신의 생각과 느낌을 간단한 문장으로 표현할 수 있다',
        '일상생활에서 필요한 기본 의사소통을 할 수 있다',
        '상황에 맞는 인사말과 감사 인사를 할 수 있다'
      ],
      '읽기': [
        '글자와 그림을 구별할 수 있다',
        '기본 한글 자모를 읽을 수 있다',
        '간단한 단어와 문장을 읽고 이해할 수 있다',
        '읽은 내용에 대해 간단히 표현할 수 있다'
      ],
      '쓰기': [
        '올바른 자세로 연필을 잡고 글씨를 쓸 수 있다',
        '기본 한글 자모를 따라 쓸 수 있다',
        '간단한 단어를 받아쓸 수 있다',
        '자신의 경험을 그림과 글로 표현할 수 있다'
      ],
      '문법': [
        '문장의 기본 구조를 이해할 수 있다',
        '높임말과 평어의 차이를 구별할 수 있다',
        '시간과 장소를 나타내는 말을 사용할 수 있다',
        '의성어와 의태어를 구별하고 사용할 수 있다'
      ],
      '문학': [
        '시와 이야기의 차이를 구별할 수 있다',
        '등장인물의 마음을 이해하고 표현할 수 있다',
        '간단한 동시를 암송할 수 있다',
        '책 읽기를 즐기고 독후 활동에 참여할 수 있다'
      ]
    },
    materials: {
      '듣기·말하기': ['그림카드', '상황카드', '녹음기', '마이크', '인형', '역할놀이 소품', '이야기 책', '음성 펜'],
      '읽기': ['글자카드', '단어카드', '그림책', '읽기 교재', '자석 글자', '글자 퍼즐', '읽기 게임', '전자책'],
      '쓰기': ['연필', '지우개', '쓰기 연습장', '모래판', '점토', '글자 본', '스탬프', '태블릿'],
      '문법': ['문장 카드', '품사 카드', '문법 게임', '단어 분류함', '문장 만들기 키트', '언어 퍼즐', '활동지', '교구'],
      '문학': ['동화책', '시집', '인형극 도구', '무대', '의상', '음향 기기', '그림 자료', '창작 도구']
    },
    methods: ['언어 모델링', '반복 연습', '상황 중심 학습', '다감각 활용', '놀이 중심 학습', '협력 학습'],
    activities: {
      '듣기·말하기': {
        introduction: ['인사말 연습', '자기소개하기', '경험 나누기', '그림 보고 이야기하기'],
        development: ['역할놀이', '상황극', '질문과 대답', '토론 활동'],
        consolidation: ['발표하기', '인터뷰하기', '이야기 만들기', '소통 게임']
      },
      '읽기': {
        introduction: ['글자 탐색하기', '단어 읽기 게임', '그림책 함께 읽기', '읽기 전 예측하기'],
        development: ['소리 내어 읽기', '묵독하기', '내용 파악하기', '단어 의미 찾기'],
        consolidation: ['독후감 쓰기', '책 소개하기', '읽기 발표회', '독서 토론']
      },
      '쓰기': {
        introduction: ['글자 따라 쓰기', '모래에 쓰기', '큰 글씨 쓰기', '손가락으로 쓰기'],
        development: ['단어 쓰기', '문장 쓰기', '받아쓰기', '일기 쓰기'],
        consolidation: ['창작 활동', '편지 쓰기', '작품 전시', '글쓰기 발표']
      },
      '문법': {
        introduction: ['품사 분류하기', '문장 만들기', '단어 게임', '언어 퍼즐'],
        development: ['문법 규칙 익히기', '올바른 표현하기', '문장 분석하기', '언어 실험'],
        consolidation: ['문법 퀴즈', '언어 게임', '창작 활동', '언어 놀이']
      },
      '문학': {
        introduction: ['동화 듣기', '시 낭송하기', '인물 소개하기', '상황 예측하기'],
        development: ['작품 분석하기', '감정 표현하기', '역할극하기', '재화하기'],
        consolidation: ['창작하기', '발표하기', '작품 전시', '문학 축제']
      }
    }
  },
  '사회': {
    commonObjectives: {
      '나와 우리': [
        '자신의 특징과 장점을 인식하고 표현할 수 있다',
        '가족 구성원의 역할과 관계를 이해할 수 있다',
        '친구와 협력하며 함께 활동할 수 있다',
        '집단 생활의 기본 규칙을 알고 지킬 수 있다'
      ],
      '가족·이웃·마을': [
        '우리 가족의 구성과 역할을 설명할 수 있다',
        '이웃과 마을 사람들의 다양한 직업을 알 수 있다',
        '지역 사회의 기관과 시설을 이용할 수 있다',
        '마을의 문제를 함께 해결하는 방법을 찾을 수 있다'
      ],
      '국가와 사회': [
        '우리나라의 상징과 전통을 이해할 수 있다',
        '민주주의의 기본 원리를 체험할 수 있다',
        '사회 구성원으로서의 권리와 의무를 알 수 있다',
        '다양한 문화를 존중하고 이해할 수 있다'
      ],
      '세계와 지구촌': [
        '세계 여러 나라의 다양한 문화를 이해할 수 있다',
        '지구촌 문제에 관심을 갖고 참여할 수 있다',
        '세계화 시대의 변화를 인식할 수 있다',
        '국제 협력의 중요성을 이해할 수 있다'
      ]
    },
    materials: {
      '나와 우리': ['가족 사진', '신분증', '거울', '자기소개 카드', '감정 카드', '역할 배지', '규칙 포스터', '협력 게임'],
      '가족·이웃·마을': ['지역 지도', '직업 카드', '마을 모형', '견학 도구', '카메라', '인터뷰 도구', '마을 신문', '직업 체험 도구'],
      '국가와 사회': ['태극기', '애국가', '전통 놀이 도구', '한복', '전통 음식 모형', '투표함', '민주주의 게임', '문화 자료'],
      '세계와 지구촌': ['세계 지도', '각국 국기', '전통 의상', '세계 음식 모형', '다문화 자료', '지구본', '국제기구 자료', '환경 자료']
    },
    methods: ['사회적 스토리', '역할놀이', '현장 학습', '토론 활동', '프로젝트 학습', '협력 학습'],
    activities: {
      '나와 우리': {
        introduction: ['자기소개 시간', '가족 소개하기', '나의 특징 찾기', '친구 알아가기'],
        development: ['가족 역할 놀이', '친구와 협력하기', '규칙 만들기', '감정 표현하기'],
        consolidation: ['가족 신문 만들기', '우정 다짐하기', '반 규칙 발표', '성장 앨범 만들기']
      },
      '가족·이웃·마을': {
        introduction: ['우리 동네 탐험', '직업 알아보기', '지역 기관 찾기', '마을 사람들과 만나기'],
        development: ['직업 체험하기', '지역 조사하기', '이웃과 소통하기', '마을 문제 찾기'],
        consolidation: ['마을 신문 만들기', '직업 발표회', '지역 홍보하기', '마을 개선 제안']
      },
      '국가와 사회': {
        introduction: ['국가 상징 알기', '전통 문화 체험', '민주주의 체험', '다문화 이해하기'],
        development: ['전통 놀이하기', '모의 선거하기', '권리와 의무 토론', '문화 교류하기'],
        consolidation: ['전통 문화제', '모의 국회 운영', '시민 제안서 작성', '다문화 축제']
      },
      '세계와 지구촌': {
        introduction: ['세계 여행하기', '각국 문화 체험', '지구촌 문제 알기', '국제 협력 사례 찾기'],
        development: ['문화 비교하기', '세계 친구 만들기', '환경 보호 실천', '평화 활동 참여'],
        consolidation: ['세계 문화제', '지구촌 뉴스 만들기', '환경 캠페인', '평화 선언문 작성']
      }
    }
  },
  '과학': {
    commonObjectives: {
      '물질': [
        '주변의 다양한 물질을 관찰하고 분류할 수 있다',
        '물질의 상태 변화를 관찰하고 설명할 수 있다',
        '일상생활에서 물질의 성질을 이용한 예를 찾을 수 있다',
        '안전하게 물질을 다루는 방법을 알 수 있다'
      ],
      '생명': [
        '동식물의 특징을 관찰하고 비교할 수 있다',
        '생명체의 한살이를 이해하고 설명할 수 있다',
        '생태계에서 생물들의 관계를 파악할 수 있다',
        '생명의 소중함을 알고 보호 방법을 실천할 수 있다'
      ],
      '지구와 우주': [
        '지구의 구성 요소를 알고 설명할 수 있다',
        '날씨 변화를 관찰하고 기록할 수 있다',
        '태양계의 구성을 이해하고 설명할 수 있다',
        '지구 환경 보호의 필요성을 인식할 수 있다'
      ],
      '에너지': [
        '다양한 에너지의 종류와 특성을 구별할 수 있다',
        '에너지의 전환과 보존을 관찰할 수 있다',
        '일상생활에서 에너지 절약 방법을 실천할 수 있다',
        '신재생에너지의 중요성을 이해할 수 있다'
      ]
    },
    materials: {
      '물질': ['실험 도구', '비커', '온도계', '저울', '돋보기', '다양한 물질 샘플', 'pH 측정지', '실험 안전 도구'],
      '생명': ['현미경', '관찰 도구', '식물 키우기 세트', '동물 모형', '생태계 모형', '생명체 도감', '사육장', '관찰일지'],
      '지구와 우주': ['지구본', '날씨 측정 도구', '망원경', '별자리판', '암석 표본', '날씨 차트', '우주 모형', '환경 측정 도구'],
      '에너지': ['태양광 패널', '풍력 발전기 모형', '배터리', '전구', '모터', '에너지 측정기', '단열재', '재활용품']
    },
    methods: ['탐구 활동', '실험 관찰', '체험 학습', '문제 해결', '프로젝트 학습', '협력 실험'],
    activities: {
      '물질': {
        introduction: ['물질 탐색하기', '상태 관찰하기', '성질 비교하기', '변화 예측하기'],
        development: ['실험하기', '결과 기록하기', '규칙 찾기', '응용하기'],
        consolidation: ['발표하기', '일상 적용하기', '창의 실험', '과학 전시']
      },
      '생명': {
        introduction: ['생명체 관찰', '특징 비교하기', '한살이 알아보기', '서식지 탐구'],
        development: ['기르기 체험', '관찰 일지 작성', '생태계 조사', '보호 방법 토론'],
        consolidation: ['생물 도감 만들기', '생태 체험전', '보호 캠페인', '자연 다큐멘터리']
      },
      '지구와 우주': {
        introduction: ['지구 탐험하기', '날씨 관찰하기', '별 관측하기', '환경 조사하기'],
        development: ['기상 관측하기', '우주 탐험하기', '환경 실험하기', '지구 모형 만들기'],
        consolidation: ['기상 방송하기', '우주 박물관', '환경 보고서', '지구 사랑 실천']
      },
      '에너지': {
        introduction: ['에너지 찾기', '변환 관찰하기', '절약 방법 찾기', '신재생 에너지 체험'],
        development: ['에너지 실험', '효율성 측정', '절약 실천하기', '친환경 에너지 만들기'],
        consolidation: ['에너지 박람회', '절약 캠페인', '발명품 만들기', '에너지 뉴스']
      }
    }
  },
  '체육': {
    commonObjectives: {
      '건강': [
        '건강한 생활 습관의 중요성을 이해하고 실천할 수 있다',
        '올바른 자세와 기본 운동 능력을 기를 수 있다',
        '안전한 운동 방법을 알고 부상 예방을 실천할 수 있다',
        '개인위생과 환경 위생을 관리할 수 있다'
      ],
      '도전': [
        '자신의 신체 능력을 파악하고 향상시킬 수 있다',
        '다양한 도전 활동에 적극적으로 참여할 수 있다',
        '목표를 설정하고 달성하기 위해 노력할 수 있다',
        '실패를 극복하고 재도전하는 의지를 기를 수 있다'
      ],
      '경쟁': [
        '게임과 스포츠의 기본 규칙을 이해하고 지킬 수 있다',
        '팀워크를 발휘하여 협력할 수 있다',
        '공정한 경쟁 정신을 기르고 실천할 수 있다',
        '승부 결과를 수용하고 상대방을 존중할 수 있다'
      ],
      '표현': [
        '음악에 맞춰 자유롭게 신체를 표현할 수 있다',
        '감정과 생각을 몸짓으로 나타낼 수 있다',
        '창의적인 동작을 만들고 발표할 수 있다',
        '다양한 표현 활동을 통해 심미감을 기를 수 있다'
      ],
      '여가': [
        '운동을 통한 즐거움과 만족감을 경험할 수 있다',
        '여가 시간을 활용한 신체 활동을 계획할 수 있다',
        '평생 스포츠의 가치를 이해하고 실천할 수 있다',
        '가족과 친구들과 함께하는 활동의 즐거움을 느낄 수 있다'
      ]
    },
    materials: {
      '건강': ['체중계', '키 재는 도구', '혈압계', '스트레칭 매트', '건강 체크리스트', '영양 정보 카드', '위생 용품', '운동 일지'],
      '도전': ['줄넘기', '평균대', '장애물', '타이머', '측정 도구', '도전 기록지', '안전 장비', '격려 카드'],
      '경쟁': ['공', '네트', '골대', '심판 도구', '팀 조끼', '스코어보드', '규칙서', '페어플레이 카드'],
      '표현': ['음향 기기', '리본', '스카프', '탬버린', '표현 소품', '의상', '무대', '영상 장비'],
      '여가': ['다양한 스포츠 용품', '게임 도구', '야외 활동 장비', '여가 계획표', '활동 가이드북', '안전 장비', '기록 도구', '가족 활동 키트']
    },
    methods: ['감각 운동 놀이', '음악과 함께하는 활동', '모방 학습', '단계적 지도', '개별 맞춤 지도', '긍정적 강화'],
    activities: {
      '건강': {
        introduction: ['건강 체크하기', '올바른 자세 배우기', '스트레칭하기', '위생 습관 점검'],
        development: ['체력 측정하기', '운동 계획 세우기', '안전 수칙 익히기', '건강한 식습관 실천'],
        consolidation: ['건강 포트폴리오', '가족 건강 계획', '건강 캠페인', '건강 발표회']
      },
      '도전': {
        introduction: ['자신의 능력 알아보기', '도전 목표 정하기', '기본 동작 익히기', '안전 점검하기'],
        development: ['단계별 도전하기', '기록 측정하기', '기술 연습하기', '동료와 격려하기'],
        consolidation: ['개인 기록 갱신', '도전 발표회', '성취 축하하기', '다음 목표 설정']
      },
      '경쟁': {
        introduction: ['규칙 배우기', '기본 기술 익히기', '팀 구성하기', '페어플레이 다짐'],
        development: ['게임 참여하기', '전략 세우기', '협력하기', '규칙 지키기'],
        consolidation: ['토너먼트 개최', '시상식 진행', '소감 나누기', '친선 경기']
      },
      '표현': {
        introduction: ['자유롭게 움직이기', '음악 느끼기', '감정 표현하기', '모방 동작하기'],
        development: ['창작 동작 만들기', '음악에 맞춰 표현하기', '소품 활용하기', '협력 표현하기'],
        consolidation: ['발표회 준비', '공연하기', '감상하기', '창작 작품전']
      },
      '여가': {
        introduction: ['좋아하는 활동 찾기', '여가 시간 활용법 알기', '가족 활동 계획', '친구와 함께하기'],
        development: ['여가 활동 실천하기', '새로운 활동 도전', '지역 시설 이용하기', '동호회 참여하기'],
        consolidation: ['여가 활용 발표', '가족 스포츠 데이', '지역 축제 참여', '평생 운동 다짐']
      }
    }
  }
};

// 학습목표 생성 (단원별 맞춤)
function generateLearningObjectives(params: GenerationParams): string[] {
  const { subject, unit, disabilitySeverity, difficulty } = params;

  const unitObjectives = subjectStructures[subject]?.commonObjectives[unit] || [
    '학습 내용을 이해하고 설명할 수 있다',
    '학습한 내용을 일상생활에 적용할 수 있다',
    '학습 활동에 적극적으로 참여할 수 있다'
  ];

  // 장애 정도와 난이도에 따른 목표 조정
  const adjustedObjectives = unitObjectives.map(objective => {
    let adjusted = objective;

    if (disabilitySeverity === '중증') {
      adjusted = adjusted.replace('설명할 수 있다', '인식할 수 있다')
                          .replace('적용할 수 있다', '경험할 수 있다')
                          .replace('이해하고', '관찰하고')
                          .replace('파악하고', '느끼고');
    } else if (disabilitySeverity === '중도') {
      adjusted = adjusted.replace('설명할 수 있다', '표현할 수 있다')
                          .replace('파악하고', '인식하고');
    }

    if (difficulty === 'basic') {
      adjusted = adjusted.replace('창의적으로', '기본적으로')
                          .replace('분석하고', '관찰하고');
    } else if (difficulty === 'advanced') {
      adjusted = adjusted.replace('이해할 수 있다', '분석하고 활용할 수 있다')
                          .replace('표현할 수 있다', '창의적으로 표현하고 발표할 수 있다');
    }

    return adjusted;
  });

  return adjustedObjectives.slice(0, 3); // 3개로 제한
}

// 수업 활동 생성 (매우 구체적이고 실무적)
function generateActivities(params: GenerationParams): Array<{phase: string; time: number; activity: string; materials: string; notes?: string}> {
  const { subject, unit, disability, disabilitySeverity, difficulty } = params;

  const baseDuration = disabilitySeverity === '중증' ? 25 : disabilitySeverity === '중도' ? 30 : 40;
  const activitySet = subjectStructures[subject]?.activities[unit];
  const materials = subjectStructures[subject]?.materials[unit] || [];

  // 장애별 특화 교수법 적용 (활동 생성에 반영됨)

  // 활동 시간 배분
  const introTime = Math.round(baseDuration * 0.2);
  const developTime = Math.round(baseDuration * 0.6);
  const consolidationTime = baseDuration - introTime - developTime;

  // 구체적 활동 생성
  const activities = [];

  // 도입 활동 (매우 구체적)
  const introActivity = generateDetailedIntroActivity(subject, unit, disability, disabilitySeverity);
  activities.push({
    phase: '도입',
    time: introTime,
    activity: introActivity.activity,
    materials: introActivity.materials,
    notes: introActivity.notes
  });

  // 전개 활동 (매우 구체적)
  const developActivity = generateDetailedDevelopActivity(subject, unit, disability, disabilitySeverity);
  activities.push({
    phase: '전개',
    time: developTime,
    activity: developActivity.activity,
    materials: developActivity.materials,
    notes: developActivity.notes
  });

  // 정리 활동 (매우 구체적)
  const consolidationActivity = generateDetailedConsolidationActivity(subject, unit, disability, disabilitySeverity);
  activities.push({
    phase: '정리',
    time: consolidationTime,
    activity: consolidationActivity.activity,
    materials: consolidationActivity.materials,
    notes: consolidationActivity.notes
  });

  return activities;
}

// 도입 활동 세부 생성
function generateDetailedIntroActivity(subject: string, unit: string, disability: string, severity: string): {activity: string; materials: string; notes: string} {
  const baseActivities: {[key: string]: {[key: string]: {activity: string; materials: string; notes: string}}} = {
    '수학': {
      '수와 연산': {
        activity: '1) 인사 및 출석 확인 (3분)\n2) 오늘의 날짜와 날씨를 수로 표현해보기 (2분)\n3) 구체물(과자, 블록 등)을 이용해 자유롭게 세어보기 (3분)\n4) "오늘은 수의 세계로 여행을 떠날 거예요" 학습 동기 유발 (2분)',
        materials: '과자, 색깔 블록, 숫자 카드, 달력, 날씨판, 동기유발용 PPT',
        notes: '학생의 흥미를 끌 수 있는 구체물 사용, 일상생활과 연결된 수 경험 제공'
      },
      '도형': {
        activity: '1) "도형 친구들을 찾아라" 노래 부르며 시작 (2분)\n2) 교실 안에서 동그라미, 세모, 네모 모양 찾아보기 (4분)\n3) 촉감상자에서 도형 블록 만져보고 특징 말하기 (4분)',
        materials: '도형 블록, 촉감상자, 도형 노래 음원, 교실 내 도형 모양 스티커',
        notes: '다감각적 접근으로 도형의 특성을 체험할 수 있도록 구성'
      }
    },
    '국어': {
      '듣기·말하기': {
        activity: '1) 좋아하는 음식 이름을 큰 소리로 말해보기 (2분)\n2) 친구의 목소리를 듣고 누구인지 맞춰보기 (3분)\n3) 다양한 소리(동물, 자연, 교통수단)를 들려주고 따라하기 (4분)\n4) "오늘은 말하기 전문가가 될 거예요" 동기유발 (1분)',
        materials: '다양한 소리 CD, 음향기기, 동물 그림카드, 마이크 모형',
        notes: '학생의 음성 모방 능력과 청취 능력을 파악하여 개별 수준 확인'
      },
      '읽기': {
        activity: '1) 좋아하는 책을 가져와서 표지 보여주기 (3분)\n2) 큰 그림책을 함께 보며 그림 속 이야기 추측하기 (4분)\n3) 자신의 이름 글자를 찾아보고 손으로 써보기 (3분)',
        materials: '대형 그림책, 개인별 이름카드, 화이트보드, 색깔 마커',
        notes: '문자에 대한 관심과 읽기 준비도를 확인하고 개별 수준 파악'
      }
    },
    '사회': {
      '나와 우리': {
        activity: '1) 자신의 사진을 보며 "나는 누구일까요?" 퀴즈 (3분)\n2) 가족 사진을 보여주며 가족 구성원 소개하기 (4분)\n3) 친구들과 손잡고 원 만들기, 서로 인사하기 (3분)',
        materials: '개인 사진, 가족 사진, 인사말 카드, 배경음악',
        notes: '자아 정체성과 소속감을 느낄 수 있도록 따뜻한 분위기 조성'
      }
    },
    '과학': {
      '물질': {
        activity: '1) 신기한 마술상자에서 여러 가지 물건 꺼내기 (3분)\n2) 물건들을 만져보고 딱딱한지 부드러운지 느껴보기 (4분)\n3) "과학자가 되어 물질의 비밀을 알아볼까요?" 동기유발 (3분)',
        materials: '마술상자, 다양한 질감의 물건들(솜, 돌, 나무, 플라스틱), 과학자 가운, 돋보기',
        notes: '호기심을 자극하는 신기한 상황 설정으로 과학적 탐구 동기 부여'
      }
    },
    '체육': {
      '건강': {
        activity: '1) 건강 체조 음악에 맞춰 몸풀기 (3분)\n2) 거울을 보며 자신의 몸 부위 확인하고 만져보기 (3분)\n3) "건강한 하루 보내기" 체크리스트 함께 읽어보기 (4분)',
        materials: '전신거울, 건강 체조 음악, 건강 체크리스트, 스트레칭 매트',
        notes: '신체에 대한 긍정적 인식과 건강한 생활습관의 중요성 인식'
      }
    }
  };

  const result = baseActivities[subject]?.[unit] || {
    activity: `${unit} 관련 흥미로운 자료를 제시하고 학습 동기를 유발하는 활동 진행`,
    materials: '시각자료, 조작교구, 멀티미디어 자료',
    notes: '학생의 관심과 참여를 이끌어내는 활동으로 구성'
  };

  // 장애별 세부 조정
  if (disability === '지적장애') {
    if (severity === '중증') {
      result.activity = result.activity.replace(/\d+분/g, (match) => `${Math.ceil(parseInt(match) * 1.5)}분`);
      result.notes += ', 충분한 시간과 반복적 설명 제공';
    }
  } else if (disability === '자폐스펙트럼장애') {
    result.notes += ', 예측 가능한 구조화된 환경과 시각적 일정표 활용';
    result.materials += ', 시각적 일정표, 감각 조절 도구';
  } else if (disability === 'ADHD') {
    result.notes += ', 짧은 집중 시간을 고려한 활발한 활동과 즉각적 피드백';
    result.materials += ', 집중력 보조도구, 타이머';
  }

  return result;
}

// 전개 활동 세부 생성
function generateDetailedDevelopActivity(subject: string, unit: string, disability: string, severity: string): {activity: string; materials: string; notes: string} {
  const baseActivities: {[key: string]: {[key: string]: {activity: string; materials: string; notes: string}}} = {
    '수학': {
      '수와 연산': {
        activity: '1) 1-10까지 구체물로 세기 (5분)\n2) 숫자 카드와 구체물 짝짓기 활동 (7분)\n3) "숫자 찾기 게임" - 교실에 숨겨진 숫자 찾아서 순서대로 배열하기 (8분)\n4) 워크시트로 숫자 쓰기 연습 (4분)\n5) "나는 몇 살일까요?" 자신의 나이 표현하기 (4분)',
        materials: '1-10 구체물, 숫자 카드, 숨겨진 숫자판, 워크시트, 색연필, 개인별 사진',
        notes: '단계적 난이도 조절, 개별 학생의 수준에 맞는 과제 제시, 성공 경험 제공'
      },
      '도형': {
        activity: '1) 도형 블록으로 자유롭게 만들기 활동 (6분)\n2) 도형별 특징 찾아보기 - 꼭짓점, 변의 개수 세기 (6분)\n3) "도형 변신 게임" - 몸으로 도형 만들어보기 (6분)\n4) 도형 퍼즐 맞추기 (6분)',
        materials: '다양한 도형 블록, 도형 특징 차트, 바닥용 도형 테이프, 도형 퍼즐',
        notes: '체험 중심 활동으로 도형의 성질을 자연스럽게 이해, 협력 학습 기회 제공'
      }
    },
    '국어': {
      '듣기·말하기': {
        activity: '1) 짝과 함께 자기소개하기 (5분)\n2) 그림을 보고 상황 설명하기 (7분)\n3) "내가 좋아하는 것" 발표하기 (8분)\n4) 친구의 말을 듣고 질문하기 (6분)\n5) 역할놀이로 인사말 연습하기 (6분)',
        materials: '상황 그림카드, 발표용 마이크, 역할놀이 소품, 칭찬 스티커',
        notes: '말하기에 자신감을 가질 수 있도록 격려, 적극적인 듣기 자세 강화'
      },
      '읽기': {
        activity: '1) 글자 카드로 단어 만들기 (6분)\n2) 그림과 글자 연결하기 (6분)\n3) 간단한 문장 소리내어 읽기 (8분)\n4) 읽은 내용에 대해 그림으로 표현하기 (6분)\n5) "책 속 주인공 되어보기" 역할 놀이 (6분)',
        materials: '글자 카드, 그림-글자 매칭 교구, 쉬운 읽기책, 그림 도구, 역할놀이 의상',
        notes: '문자 해독과 의미 이해의 연결, 읽기의 즐거움을 경험할 수 있는 활동'
      }
    },
    '사회': {
      '나와 우리': {
        activity: '1) 가족 소개 발표하기 (6분)\n2) "우리 가족의 하루" 순서 맞추기 (6분)\n3) 친구들과 공통점과 차이점 찾기 (8분)\n4) "도움을 주고받아요" 역할놀이 (8분)\n5) 감사 인사 표현하기 (4분)',
        materials: '가족 사진, 생활 순서 카드, 비교 차트, 역할놀이 상황카드, 감사 카드',
        notes: '자아 정체성 확립과 타인에 대한 이해와 존중, 사회성 기술 습득'
      }
    },
    '과학': {
      '물질': {
        activity: '1) 여러 물질을 직접 만지고 특징 기록하기 (8분)\n2) 물질 분류하기 - 딱딱한 것/부드러운 것 (6분)\n3) 물의 상태 변화 관찰하기 - 얼음→물→수증기 (8분)\n4) "물질 탐정이 되어보자" - 숨겨진 물질의 정체 맞추기 (6분)\n5) 생활 속 물질 활용 사례 찾기 (4분)',
        materials: '다양한 재질 샘플, 분류 상자, 얼음, 투명 용기, 핫플레이트, 관찰 기록지',
        notes: '안전 수칙 준수, 직접 체험을 통한 과학적 사고력 신장, 일상생활 연계'
      }
    },
    '체육': {
      '건강': {
        activity: '1) 바른 자세 만들기 연습 (6분)\n2) 기본 체조 동작 익히기 (8분)\n3) "건강한 음식 vs 해로운 음식" 분류 게임 (6분)\n4) 개인 위생 실습하기 - 올바른 손 씻기 (6분)\n5) "나만의 건강 다짐" 만들기 (6분)',
        materials: '자세 교정 의자, 체조 음악, 음식 그림카드, 손 씻기 시설, 다짐 카드',
        notes: '건강한 습관 형성, 실생활 적용 가능한 활동, 지속적인 실천 동기 부여'
      }
    }
  };

  const result = baseActivities[subject]?.[unit] || {
    activity: `${unit}의 핵심 내용을 단계적으로 학습하고 다양한 활동을 통해 깊이 있게 탐구하는 시간`,
    materials: '주요 교구, 활동지, 실습 도구',
    notes: '학생 참여 중심의 체험 활동으로 구성, 개별 수준을 고려한 차별화 지도'
  };

  // 장애별 세부 조정
  if (disability === '지적장애') {
    if (severity === '중증') {
      result.activity = result.activity.replace(/\d+분/g, (match) => `${Math.ceil(parseInt(match) * 1.3)}분`);
      result.notes += ', 단순하고 구체적인 과제로 세분화, 충분한 연습 시간 제공';
    } else if (severity === '중도') {
      result.notes += ', 시각적 단서와 구체적 예시 활용, 단계별 피드백 제공';
    }
  } else if (disability === '자폐스펙트럼장애') {
    result.notes += ', 구조화된 활동 순서와 명확한 지시, 감각적 자극 조절';
    result.materials += ', 활동 순서표, 감각 조절 도구';
  } else if (disability === 'ADHD') {
    result.notes += ', 활동적이고 변화있는 과제, 즉시적 보상과 격려';
    result.materials += ', 집중력 향상 도구, 보상 차트';
  }

  return result;
}

// 정리 활동 세부 생성
function generateDetailedConsolidationActivity(subject: string, unit: string, disability: string, severity: string): {activity: string; materials: string; notes: string} {
  const baseActivities: {[key: string]: {[key: string]: {activity: string; materials: string; notes: string}}} = {
    '수학': {
      '수와 연산': {
        activity: '1) 오늘 배운 숫자들을 함께 큰 소리로 세어보기 (2분)\n2) "숫자 송" 부르며 율동하기 (3분)\n3) 오늘의 학습 소감 한 마디씩 발표하기 (2분)\n4) 집에서 할 수 있는 숫자 놀이 소개하기 (2분)\n5) 다음 시간 예고 및 마무리 인사 (1분)',
        materials: '숫자 송 음원, 가정 연계 활동지, 소감 발표용 마이크',
        notes: '학습 내용 정리와 성취감 경험, 가정 연계로 지속적 학습 유도'
      },
      '도형': {
        activity: '1) 오늘 만난 도형 친구들 이름 불러보기 (2분)\n2) 도형으로 작품 만들고 친구들에게 소개하기 (4분)\n3) "도형 찾기 미션" - 다음 시간까지 집에서 도형 3개 찾아오기 (2분)\n4) 도형 스티커로 출석부 꾸미며 마무리 (2분)',
        materials: '도형 스티커, 작품 전시 공간, 가정 연계 미션지',
        notes: '창의적 표현 기회 제공, 학습 연계성 강화를 위한 과제 부여'
      }
    },
    '국어': {
      '듣기·말하기': {
        activity: '1) 오늘 가장 기억에 남는 말하기 경험 공유하기 (3분)\n2) "칭찬 릴레이" - 친구의 좋은 점 말하기 (4분)\n3) 오늘 배운 인사말로 서로 인사하기 (2분)\n4) 집에 가서 가족들께 배운 내용 말해보기 약속 (1분)',
        materials: '칭찬 카드, 인사말 포스터, 가정 연계 안내지',
        notes: '언어 사용의 즐거움 체험, 자신감 향상과 사회적 기술 강화'
      },
      '읽기': {
        activity: '1) 오늘 읽은 책의 가장 재미있었던 부분 그림으로 그리기 (3분)\n2) 그림을 보며 친구들에게 이야기해주기 (3분)\n3) "독서왕 스티커" 받고 독서 통장에 기록하기 (2분)\n4) 다음에 읽고 싶은 책 선택하기 (2분)',
        materials: '그림 도구, 독서 통장, 독서왕 스티커, 다양한 책들',
        notes: '읽기에 대한 긍정적 경험과 지속적인 독서 동기 부여'
      }
    },
    '사회': {
      '나와 우리': {
        activity: '1) "고마워요 카드" 작성하여 서로 전달하기 (3분)\n2) 오늘 느낀 소중함에 대해 한 마디씩 나누기 (3분)\n3) 가족과 함께 할 수 있는 활동 계획하기 (2분)\n4) "우리는 모두 소중해요" 구호 함께 외치며 마무리 (2분)',
        materials: '감사 카드, 가족 활동 계획표, 구호 포스터',
        notes: '감사와 배려의 마음 함양, 가족 관계 증진을 위한 실천 의지 다지기'
      }
    },
    '과학': {
      '물질': {
        activity: '1) "과학자 일지"에 오늘 관찰한 내용 그림과 글로 기록하기 (4분)\n2) 친구들과 신기했던 발견 공유하기 (3분)\n3) 집에서 찾아볼 물질 탐구 과제 안내 (2분)\n4) "우리는 모두 과학자" 다짐하며 실험복 정리하기 (1분)',
        materials: '과학자 일지, 색연필, 가정 연계 과제지, 실험복',
        notes: '과학적 사고력 정리, 탐구하는 자세와 과학에 대한 흥미 지속'
      }
    },
    '체육': {
      '건강': {
        activity: '1) 오늘 배운 건강 습관 체크리스트 확인하기 (2분)\n2) "건강 다짐송" 함께 부르며 스트레칭 (3분)\n3) 일주일 건강 실천 계획표 작성하기 (3분)\n4) 건강한 몸과 마음으로 마무리 인사 (2분)',
        materials: '건강 체크리스트, 다짐송 음원, 실천 계획표, 건강 캐릭터 스티커',
        notes: '건강한 생활습관 다짐과 지속적 실천 동기 강화'
      }
    }
  };

  const result = baseActivities[subject]?.[unit] || {
    activity: '학습 내용을 정리하고 느낀 점을 공유하며 다음 학습에 대한 기대감 조성',
    materials: '정리용 활동지, 발표 도구',
    notes: '성취감과 만족감을 느낄 수 있도록 긍정적 마무리'
  };

  // 장애별 세부 조정
  if (disability === '지적장애') {
    if (severity === '중증') {
      result.activity = result.activity.replace(/\d+분/g, (match) => `${Math.ceil(parseInt(match) * 1.2)}분`);
      result.notes += ', 간단하고 반복적인 정리, 충분한 칭찬과 격려';
    }
  } else if (disability === '자폐스펙트럼장애') {
    result.notes += ', 예측 가능한 마무리 루틴, 안정감을 주는 정리 활동';
    result.materials += ', 마무리 의식용 도구';
  } else if (disability === 'ADHD') {
    result.notes += ', 활동적인 마무리, 즉각적인 성취감과 보상';
    result.materials += ', 성취 보상 스티커, 활동적 마무리 도구';
  }

  return result;
}

// 교수 방법 생성 (구체적)
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

// 교재 및 교구 생성 (단원별 맞춤)
function generateMaterials(params: GenerationParams): string[] {
  const { subject, unit } = params;

  const unitMaterials = subjectStructures[subject]?.materials[unit] || [];

  return unitMaterials.length > 0 ? unitMaterials : [
    '기본 교구', '시각 자료', '활동지', '측정 도구',
    '게임 자료', '멀티미디어 자료', '안전 장비', '보상 도구'
  ];
}

// 평가 방법 생성 (장애별 맞춤)
function generateAssessmentMethods(params: GenerationParams): string[] {
  const { disabilitySeverity } = params;

  if (disabilitySeverity === '중증') {
    return [
      '관찰 평가: 수업 참여도 및 반응 정도 관찰',
      '체크리스트: 목표 행동 수행 여부를 단계별로 확인',
      '포트폴리오: 활동 결과물과 과정 기록을 종합적으로 평가',
      '비디오 기록: 학습 상황을 촬영하여 변화 과정 분석'
    ];
  } else if (disabilitySeverity === '중도') {
    return [
      '관찰 평가: 학습 참여도, 이해도, 과제 수행 능력 평가',
      '수행 평가: 구체적인 활동 과제를 통한 실제 능력 측정',
      '구두 평가: 간단한 질문을 통한 학습 내용 확인',
      '작품 평가: 학습 결과물을 통한 창의성과 이해도 평가',
      '자기 점검: 간단한 체크리스트를 통한 자기 평가'
    ];
  } else {
    return [
      '관찰 평가: 학습 태도, 참여도, 협력 정도 종합 평가',
      '수행 평가: 과제 해결 과정과 결과를 통한 능력 평가',
      '구두 평가: 학습 내용 설명 및 적용 능력 평가',
      '동료 평가: 협력 학습 과정에서의 상호 평가',
      '자기 평가: 학습 목표 달성도와 개선점 스스로 평가',
      '포트폴리오: 학습 과정과 성장 과정을 종합적으로 평가'
    ];
  }
}

// 지원 방안 생성 (구체적)
function generateAccommodations(params: GenerationParams): string[] {
  const { disabilityType, disabilitySeverity } = params;

  const disabilityProfile = disabilityProfiles[disabilityType]?.[disabilitySeverity];

  return disabilityProfile?.typicalAccommodations || [
    '개별 학습 속도 인정 및 충분한 시간 제공',
    '다양한 감각을 활용한 학습 방법 제공',
    '즉시적이고 구체적인 피드백 제공',
    '안전하고 구조화된 학습 환경 조성'
  ];
}

// 대상 학생 정보 생성 (구체적)
function generateTargetStudent(params: GenerationParams) {
  const { disabilityType, disabilitySeverity, unit } = params;
  const disabilityProfile = disabilityProfiles[disabilityType]?.[disabilitySeverity] || disabilityProfiles['지적장애']['중도'];

  const currentLevels: Record<string, string> = {
    '경도': `${unit} 영역의 기초 개념을 부분적으로 이해하고 있으며, 구체적 지원 시 과제 수행 가능`,
    '중도': `${unit} 영역에 대한 기본적 관심은 있으나 체계적 학습 경험 부족, 단계적 접근 필요`,
    '중증': `${unit} 영역에 대한 감각적 반응과 기본적 인식 수준, 개별화된 접근과 지속적 지원 필요`
  };

  const goals: Record<string, string> = {
    '경도': `${unit} 영역의 핵심 개념을 이해하고 일상생활에서 기본적 적용이 가능하도록 함`,
    '중도': `${unit} 영역의 기초 개념을 체험을 통해 이해하고 간단한 표현이 가능하도록 함`,
    '중증': `${unit} 영역에 대한 감각적 인식을 높이고 기본적인 반응과 참여가 가능하도록 함`
  };

  return {
    name: '학○○',
    disability: `${disabilityType} ${disabilitySeverity}급`,
    currentLevel: currentLevels[disabilitySeverity],
    goals: goals[disabilitySeverity],
    accommodations: disabilityProfile.supportNeeds
  };
}

// 메인 생성 함수 (대폭 강화)
export function generateLessonPlan(params: GenerationParams): Omit<LessonPlan, 'id' | 'createdAt' | 'updatedAt'> {
  const disabilityProfile = disabilityProfiles[params.disabilityType]?.[params.disabilitySeverity] || disabilityProfiles['지적장애']['중도'];

  const difficultyKorean = params.difficulty === 'basic' ? '기초' : params.difficulty === 'intermediate' ? '중급' : '심화';

  const gradeKorean = params.grade;
  const baseDuration = params.disabilitySeverity === '중증' ? 25 : params.disabilitySeverity === '중도' ? 30 : 40;

  return {
    title: `${gradeKorean} ${params.subject} - ${params.unit} 영역 학습 (${difficultyKorean} 수준, ${params.disabilityType} ${params.disabilitySeverity} 대상)`,
    subject: params.subject,
    grade: params.grade,
    duration: baseDuration,
    learningObjectives: generateLearningObjectives(params),
    targetStudents: [generateTargetStudent(params)],
    teachingMethods: generateTeachingMethods(params),
    materials: generateMaterials(params),
    activities: generateActivities(params),
    assessmentMethods: generateAssessmentMethods(params),
    accommodations: generateAccommodations(params),
    notes: `본 수업은 ${params.disabilityType} ${params.disabilitySeverity} 학생을 대상으로 하는 ${params.unit} 영역 학습 지도안입니다.

주요 고려사항:
• ${disabilityProfile.supportNeeds}
• 학생의 개별적 특성과 흥미를 최대한 반영한 맞춤형 지도
• 성공 경험을 통한 자신감 향상과 학습 동기 증진
• 일상생활과의 연계를 통한 의미 있는 학습 경험 제공
• 충분한 연습 기회와 즉시적 피드백을 통한 학습 효과 극대화

수업 진행 시 학생의 컨디션과 집중도를 지속적으로 모니터링하여 필요시 활동을 조정하고, 안전하고 지지적인 학습 환경 유지에 최선을 다해주시기 바랍니다.`
  };
}