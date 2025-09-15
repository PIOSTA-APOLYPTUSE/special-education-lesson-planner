import { LessonPlan } from './storage';

export interface ExampleTemplate {
  id: string;
  title: string;
  description: string;
  category: '국어' | '수학' | '사회' | '과학' | '영어' | '체육' | '음악' | '미술' | '특수교육';
  grade: string;
  lessonPlan: Omit<LessonPlan, 'id' | 'createdAt' | 'updatedAt'>;
}

export const exampleTemplates: ExampleTemplate[] = [
  {
    id: 'math-counting-basic',
    title: '수세기와 순서 (기본)',
    description: '1-10까지의 수를 세고 순서를 이해하는 기본 수학 수업',
    category: '수학',
    grade: '초등 1학년',
    lessonPlan: {
      basicInfo: {
        title: '1부터 10까지 수세기와 순서',
        subject: '수학',
        unit: '1. 9까지의 수',
        lesson: '3/8차시',
        grade: '초등 1학년',
        duration: 40,
        date: '',
        teacher: '',
        students: {
          total: 6,
          levels: { high: 2, middle: 2, low: 2 }
        }
      },
      objectives: {
        main: '1부터 10까지의 수를 정확히 세고, 수의 순서를 이해할 수 있다.',
        byLevel: {
          high: '1-10까지 수를 세고, 다음 수와 앞 수를 말할 수 있으며, 간단한 수 비교를 할 수 있다.',
          middle: '1-10까지 수를 순서대로 세고, 구체물을 이용하여 수의 개념을 이해할 수 있다.',
          low: '1-5까지의 수를 구체물과 함께 세고, 교사의 도움으로 순서를 알 수 있다.'
        }
      },
      materials: {
        teacher: ['숫자 카드 (1-10)', '색깔 블록 30개', '숫자송 음원', '화이트보드', '마커'],
        student: ['개별 학습지', '색연필', '숫자 스티커'],
        assistive: ['보상 스티커', '타이머', '시각적 순서표', '개별 지원 카드']
      },
      activities: {
        introduction: {
          greeting: '안녕하세요! 오늘도 즐거운 수학 시간을 시작해봐요.',
          review: '지난 시간에 배운 1-5까지의 수를 함께 세어봅시다.',
          motivation: '숫자송을 들으며 몸으로 표현해보기',
          objectives: '오늘은 1부터 10까지의 수를 배우고 순서를 알아보겠습니다.',
          preview: '블록을 이용해서 재미있게 수를 세어볼 거예요!'
        },
        development: {
          activity1: {
            title: '구체물로 수세기 체험',
            content: '색깔 블록을 이용하여 1부터 10까지 세어보기. 각자 블록을 하나씩 집어 올리며 큰 소리로 수를 말하기.',
            materials: '색깔 블록, 개별 바구니',
            levelSupport: {
              high: '10개를 세고 다음 수 11도 도전해보기, 친구들 도와주기',
              middle: '5개씩 두 번 나누어 세기, 교사와 함께 확인하기',
              low: '1-3개부터 시작하여 점진적으로 늘리기, 일대일 지원'
            },
            behaviorSupport: {
              contract: '블록을 던지지 않고 조심히 다루기',
              modeling: '교사가 먼저 시범을 보여주고 학생들이 따라하기'
            },
            assessment: '개별 관찰을 통한 수세기 정확도 확인'
          },
          activity2: {
            title: '숫자 카드 순서 맞추기',
            content: '뒤섞인 숫자 카드를 순서대로 배열하기',
            teamwork: '짝과 함께 카드를 나누어 순서 맞추기',
            demonstration: '교사가 1-5까지 먼저 시범을 보인 후 학생들이 6-10까지 도전',
            practice: '개별적으로 자신만의 속도로 카드 배열 연습',
            feedback: '완성된 순서를 함께 확인하고 박수로 격려',
            scoring: '정확도보다는 참여도와 노력을 중심으로 평가'
          }
        },
        closure: {
          evaluation: '오늘 배운 수세기를 다시 한번 함께 해보고, 어려웠던 점과 재미있었던 점 나누기',
          nextLesson: '다음 시간에는 수의 크기 비교를 배워보겠습니다.',
          farewell: '오늘 수학 시간 정말 잘했어요! 안녕히 가세요.'
        }
      },
      evaluation: {
        criteria: [
          {
            area: '수세기 능력',
            description: '1-10까지 수세기 정확도',
            levels: {
              high: '11 이상까지 수세기 가능',
              middle: '1-10까지 정확히 수세기',
              low: '1-5까지 도움 받아 수세기'
            }
          },
          {
            area: '수 개념 이해',
            description: '수의 순서 이해도',
            levels: {
              high: '수의 크기 비교 가능',
              middle: '수의 순서 이해',
              low: '기본적인 수 인식'
            }
          },
          {
            area: '참여도',
            description: '수업 참여도',
            levels: {
              high: '적극적이고 자발적 참여',
              middle: '안내에 따른 참여',
              low: '격려를 통한 부분적 참여'
            }
          }
        ],
        reflection: {
          strengths: '구체물을 활용한 체험 중심 수업으로 학습자의 흥미와 이해를 높임',
          improvements: '개별 학습자의 속도 차이를 더 세밀하게 고려한 단계별 접근 필요',
          nextPlans: '수의 크기 비교 단원에서 오늘 학습 내용을 연계하여 심화 학습 진행'
        }
      },
      specialNeeds: {
        communicationSupport: [
          '간단하고 명확한 언어 사용',
          '시각적 단서와 함께 설명',
          '학습자의 반응 시간 충분히 제공'
        ],
        learningSupport: [
          '구체물 중심의 조작 활동',
          '단계별 세분화된 과제 제시',
          '반복 학습과 충분한 연습 기회'
        ],
        behaviorSupport: [
          '명확한 수업 규칙 제시',
          '긍정적 강화와 즉시 피드백',
          '개별 관심사를 활용한 동기 부여'
        ],
        sensorySupport: [
          '적절한 조명과 소음 관리',
          '촉각적 경험을 통한 학습',
          '시각적 자료의 적극 활용'
        ],
        participationSupport: [
          '개별 속도를 인정하는 분위기',
          '동료 간 상호 도움 격려',
          '성공 경험을 통한 자신감 증진'
        ]
      }
    }
  },
  {
    id: 'korean-reading-basic',
    title: '글자와 소리 (한글)',
    description: '기본적인 한글 자모음을 익히고 간단한 단어 읽기',
    category: '국어',
    grade: '초등 1학년',
    lessonPlan: {
      basicInfo: {
        title: '자음 ㄱ,ㄴ,ㄷ 익히기',
        subject: '국어',
        unit: '1. 즐거운 한글',
        lesson: '2/10차시',
        grade: '초등 1학년',
        duration: 40,
        date: '',
        teacher: '',
        students: {
          total: 5,
          levels: { high: 1, middle: 2, low: 2 }
        }
      },
      objectives: {
        main: '자음 ㄱ, ㄴ, ㄷ의 모양과 소리를 익히고 간단한 글자를 만들 수 있다.',
        byLevel: {
          high: 'ㄱ,ㄴ,ㄷ으로 시작하는 단어를 찾고 직접 써볼 수 있다.',
          middle: 'ㄱ,ㄴ,ㄷ의 모양을 구별하고 소리를 따라 말할 수 있다.',
          low: '교사의 도움으로 ㄱ,ㄴ,ㄷ의 모양을 알고 손가락으로 따라 그을 수 있다.'
        }
      },
      materials: {
        teacher: ['한글 자음 카드', '화이트보드', '색깔 마커', '한글송 음원'],
        student: ['개별 학습지', '색연필', '모래판'],
        assistive: ['확대 자음 카드', '촉각 글자판', '개별 지원 보드']
      },
      activities: {
        introduction: {
          greeting: '우리 한글 탐험가들, 안녕하세요!',
          review: '지난 시간에 배운 모음 ㅏ,ㅓ,ㅗ,ㅜ를 함께 불러봅시다.',
          motivation: '한글송을 부르며 몸짓으로 표현하기',
          objectives: '오늘은 새로운 자음 친구들 ㄱ,ㄴ,ㄷ을 만나볼 거예요.',
          preview: '재미있는 몸짓과 함께 글자의 모양을 익혀봅시다!'
        },
        development: {
          activity1: {
            title: '자음의 모양과 소리 탐색',
            content: '각 자음의 모양을 몸으로 표현하고 소리를 반복해서 말하기. ㄱ은 팔을 직각으로, ㄴ은 ㄴ자 모양으로, ㄷ은 지붕 모양으로.',
            materials: '자음 카드, 거울',
            levelSupport: {
              high: '자음으로 시작하는 단어 찾기 게임',
              middle: '교사와 함께 모양 따라하기',
              low: '일대일로 천천히 모양 익히기'
            },
            behaviorSupport: {
              contract: '친구들과 함께 차례를 지키며 활동하기',
              modeling: '교사의 시범을 보고 천천히 따라하기'
            },
            assessment: '개별 관찰을 통한 자음 인식 능력 확인'
          },
          activity2: {
            title: '모래판에 글자 쓰기',
            content: '모래판에 손가락으로 ㄱ,ㄴ,ㄷ을 써보며 촉각적으로 익히기',
            teamwork: '짝과 함께 번갈아가며 글자 쓰고 맞추기',
            demonstration: '교사가 큰 모래판에 시범을 보인 후 개별 실습',
            practice: '각자의 속도로 반복해서 써보기',
            feedback: '올바른 획순으로 썼을 때 즉시 칭찬하기',
            scoring: '완성도보다는 시도와 노력에 대한 격려'
          }
        },
        closure: {
          evaluation: '오늘 배운 ㄱ,ㄴ,ㄷ을 다시 한번 몸짓으로 표현해보고, 가장 기억에 남는 글자 발표하기',
          nextLesson: '다음 시간에는 ㄱ,ㄴ,ㄷ과 모음을 합쳐서 글자를 만들어보겠습니다.',
          farewell: '한글 탐험가 여러분, 오늘도 멋진 발견이었어요!'
        }
      },
      evaluation: {
        criteria: [
          {
            area: '한글 인식',
            description: '자음 ㄱ,ㄴ,ㄷ 인식 능력',
            levels: {
              high: '자음으로 시작하는 단어 찾기',
              middle: '자음 모양과 소리 구별',
              low: '자음 모양 따라 그리기'
            }
          },
          {
            area: '학습 참여',
            description: '수업 참여도와 집중력',
            levels: {
              high: '자발적이고 지속적인 참여',
              middle: '안내에 따른 적극적 참여',
              low: '관심 보이며 부분적 참여'
            }
          }
        ],
        reflection: {
          strengths: '다감각적 접근으로 학습자들의 참여도가 높았고, 개별 수준을 고려한 차별화 지도가 효과적이었음',
          improvements: '모래판 활동 시 일부 학습자가 산만해지는 경향이 있어 더 구조화된 활동 진행 필요',
          nextPlans: '자음과 모음 결합 단계에서 오늘의 학습을 토대로 단계적 접근'
        }
      },
      specialNeeds: {
        communicationSupport: [
          '명확한 발음과 천천히 말하기',
          '시각적 단서와 몸짓 활용',
          '학습자의 표현을 충분히 기다려주기'
        ],
        learningSupport: [
          '다감각적 학습 방법 적용',
          '개별 학습 속도 인정',
          '충분한 반복 학습 기회 제공'
        ],
        behaviorSupport: [
          '구체적이고 긍정적인 행동 지침',
          '즉시적이고 구체적인 칭찬',
          '개별 관심사를 반영한 동기 부여'
        ],
        sensorySupport: [
          '촉각적 학습 도구 적극 활용',
          '시각적 자료의 크기와 색상 조절',
          '적절한 학습 환경 조성'
        ],
        participationSupport: [
          '성공 경험을 통한 자신감 향상',
          '동료와의 긍정적 상호작용 격려',
          '개별적 성취를 인정하는 분위기'
        ]
      }
    }
  },
  {
    id: 'science-plants-basic',
    title: '식물의 한살이',
    description: '강낭콩의 성장 과정을 관찰하고 식물의 한살이 이해하기',
    category: '과학',
    grade: '초등 3학년',
    lessonPlan: {
      basicInfo: {
        title: '강낭콩의 성장 과정 관찰하기',
        subject: '과학',
        unit: '3. 식물의 한살이',
        lesson: '4/8차시',
        grade: '초등 3학년',
        duration: 40,
        date: '',
        teacher: '',
        students: {
          total: 8,
          levels: { high: 3, middle: 3, low: 2 }
        }
      },
      objectives: {
        main: '강낭콩의 성장 과정을 관찰하고 식물의 한살이를 순서대로 설명할 수 있다.',
        byLevel: {
          high: '강낭콩의 성장 단계를 관찰하고 기록하며, 다른 식물의 한살이와 비교 설명할 수 있다.',
          middle: '강낭콩의 주요 성장 단계를 구별하고 순서대로 배열할 수 있다.',
          low: '교사의 도움으로 강낭콩의 변화를 관찰하고 간단한 단어로 표현할 수 있다.'
        }
      },
      materials: {
        teacher: ['강낭콩 성장 단계 사진', '실물 화분', '관찰 돋보기', '측정자'],
        student: ['관찰 일지', '색연필', '개별 화분'],
        assistive: ['확대경', '촉각 탐색 도구', '그림 단어 카드']
      },
      activities: {
        introduction: {
          greeting: '안녕하세요, 작은 과학자 여러분!',
          review: '지난 시간에 심은 강낭콩이 어떻게 변했는지 확인해봅시다.',
          motivation: '우리의 강낭콩 친구들이 얼마나 자랐을까요?',
          objectives: '오늘은 강낭콩의 성장 과정을 자세히 관찰해보겠습니다.',
          preview: '돋보기를 사용해서 뿌리와 잎을 자세히 살펴볼 거예요!'
        },
        development: {
          activity1: {
            title: '강낭콩 성장 단계 관찰',
            content: '개별 화분의 강낭콩을 돋보기로 관찰하고 변화된 점을 찾아보기. 뿌리, 줄기, 잎의 모양과 크기 측정하기.',
            materials: '돋보기, 측정자, 관찰 일지',
            levelSupport: {
              high: '정확한 측정값 기록하고 성장 그래프 그리기',
              middle: '교사와 함께 주요 변화점 확인하고 기록하기',
              low: '일대일 지원으로 관찰하고 그림으로 표현하기'
            },
            behaviorSupport: {
              contract: '화분을 조심히 다루고 식물을 소중히 여기기',
              modeling: '올바른 관찰 방법을 교사가 시범 보이기'
            },
            assessment: '관찰 능력과 기록의 정확성 평가'
          },
          activity2: {
            title: '성장 단계 순서 맞추기',
            content: '강낭콩 성장 단계 사진을 시간순으로 배열하고 각 단계의 특징 설명하기',
            teamwork: '모둠별로 사진 카드를 배열하고 토론하기',
            demonstration: '교사가 첫 번째와 마지막 단계를 보여주고 중간 과정 추론하게 하기',
            practice: '개별적으로 성장 일지에 순서 기록하기',
            feedback: '모둠별 발표를 통해 서로의 관찰 결과 공유',
            scoring: '참여도와 관찰의 세심함을 중심으로 평가'
          }
        },
        closure: {
          evaluation: '오늘 관찰한 내용을 바탕으로 강낭콩의 다음 변화 예상해보기',
          nextLesson: '다음 시간에는 다른 식물들의 한살이도 비교해보겠습니다.',
          farewell: '우리 강낭콩을 잘 돌봐주세요. 안녕히 가세요!'
        }
      },
      evaluation: {
        criteria: [
          {
            area: '관찰 및 탐구',
            description: '관찰 능력과 정확성',
            levels: {
              high: '세밀한 관찰과 변화 예측',
              middle: '주요 변화점 관찰과 기록',
              low: '도움 받아 기본 관찰'
            }
          },
          {
            area: '과학적 사고',
            description: '성장 단계 이해도',
            levels: {
              high: '단계별 순서와 원리 이해',
              middle: '기본 성장 과정 이해',
              low: '단순한 변화 인식'
            }
          },
          {
            area: '탐구 태도',
            description: '자연에 대한 관심과 태도',
            levels: {
              high: '적극적 탐구와 질문',
              middle: '호기심과 관심 표현',
              low: '기본적인 관심 보이기'
            }
          }
        ],
        reflection: {
          strengths: '실물 관찰을 통한 직접 경험이 학습 효과를 높였고, 개별 화분으로 책임감과 애착을 기를 수 있었음',
          improvements: '관찰 시간이 부족하여 일부 학습자가 충분히 탐색하지 못함. 다음에는 더 여유있는 시간 배정 필요',
          nextPlans: '지속적인 관찰 활동을 통해 변화 과정을 장기간 추적하고 기록하는 습관 형성'
        }
      },
      specialNeeds: {
        communicationSupport: [
          '과학 용어를 쉬운 말로 설명',
          '그림과 실물을 함께 제시',
          '학습자의 발견을 충분히 들어주기'
        ],
        learningSupport: [
          '실물 중심의 체험 학습',
          '단계별 세분화된 관찰 과제',
          '개별 속도에 맞는 활동 시간'
        ],
        behaviorSupport: [
          '식물을 소중히 다루는 태도 강조',
          '관찰 규칙의 명확한 제시',
          '발견에 대한 즉시적 격려'
        ],
        sensorySupport: [
          '촉각적 탐색을 통한 학습',
          '돋보기 등 시각 보조 도구 활용',
          '다양한 감각을 활용한 관찰'
        ],
        participationSupport: [
          '개별 화분을 통한 책임감 부여',
          '모둠 내에서의 역할 분담',
          '작은 발견도 인정하고 칭찬하기'
        ]
      }
    }
  }
];

export function getExamplesByCategory(category: string): ExampleTemplate[] {
  return exampleTemplates.filter(template => template.category === category);
}

export function getExamplesByGrade(grade: string): ExampleTemplate[] {
  return exampleTemplates.filter(template => template.grade === grade);
}

export function getExampleById(id: string): ExampleTemplate | undefined {
  return exampleTemplates.find(template => template.id === id);
}

export function getAllExamples(): ExampleTemplate[] {
  return exampleTemplates;
}