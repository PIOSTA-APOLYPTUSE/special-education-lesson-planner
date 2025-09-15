import { LessonPlan } from './storage';

export interface ExampleTemplate {
  id: string;
  title: string;
  description: string;
  category: '국어' | '수학' | '사회' | '과학' | '영어' | '체육' | '음악' | '미술' | '특수교육' | '생활국어' | '생활수학' | '생활사회' | '생활과학' | '생활체육' | '생활음악' | '생활미술' | '진로와 직업' | '일상생활 활동' | '언어치료';
  grade: string;
  lessonPlan: Omit<LessonPlan, 'id' | 'createdAt' | 'updatedAt'>;
  metadata?: {
    targetDisability?: string[];
    difficulty?: 'easy' | 'medium' | 'hard';
    keywords?: string[];
    materials?: string[];
  };
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
  },
  {
    id: 'living-korean-communication',
    title: '일상 의사소통 (생활국어)',
    description: '일상생활에서 필요한 기본적인 의사소통 기능 익히기',
    category: '생활국어',
    grade: '중등 1학년',
    lessonPlan: {
      basicInfo: {
        title: '인사말과 감사 표현하기',
        subject: '생활국어',
        unit: '1. 소통하는 즐거움',
        lesson: '2/6차시',
        grade: '중등 1학년',
        duration: 40,
        date: '',
        teacher: '',
        students: {
          total: 6,
          levels: { high: 2, middle: 2, low: 2 }
        }
      },
      objectives: {
        main: '다양한 상황에서 적절한 인사말과 감사 표현을 사용할 수 있다.',
        byLevel: {
          high: '상황에 맞는 다양한 인사말과 감사 표현을 선택하여 자연스럽게 사용할 수 있다.',
          middle: '기본적인 인사말과 감사 표현을 상황에 맞게 사용할 수 있다.',
          low: 'AAC나 몸짓을 활용하여 기본 인사와 감사를 표현할 수 있다.'
        }
      },
      materials: {
        teacher: ['상황별 그림카드', '인사말 음성파일', '역할놀이 소품', '화이트보드'],
        student: ['개별 학습지', '스티커', 'AAC 보드'],
        assistive: ['태블릿PC', 'AAC 앱', '음성출력기', '그림 상징 카드']
      },
      activities: {
        introduction: {
          greeting: '안녕하세요! 오늘은 인사와 감사 표현을 배워봐요.',
          review: '지난 시간에 배운 자기소개 방법을 다시 해볼까요?',
          motivation: '친구들과 인사할 때 어떤 말을 사용하나요? 동영상을 보면서 알아봅시다.',
          objectives: '오늘은 다양한 상황에서 인사하고 감사를 표현하는 방법을 배우겠습니다.',
          preview: '그림카드와 역할놀이로 재미있게 연습해볼 거예요!'
        },
        development: {
          activity1: {
            title: '상황별 인사말 익히기',
            content: '아침, 점심, 저녁 인사와 처음 만날 때, 헤어질 때 인사를 그림카드로 학습하고 실제 상황에서 연습하기',
            materials: '상황별 그림카드, AAC 보드',
            levelSupport: {
              high: '다양한 상황 인식하고 적절한 인사말 선택하여 표현하기',
              middle: '기본 상황 구별하고 알맞은 인사말 따라하기',
              low: 'AAC나 손짓으로 기본 인사 표현하기'
            },
            behaviorSupport: {
              contract: '친구와 눈맞춤하며 인사하기 약속',
              modeling: '교사와 또래의 올바른 인사 시범 관찰'
            },
            assessment: '개별 상황 제시 후 적절한 인사말 사용 여부 확인'
          },
          activity2: {
            title: '감사 표현 역할놀이',
            content: '도움을 받았을 때, 선물을 받았을 때 등 다양한 상황에서 감사 표현하기',
            teamwork: '짝을 이뤄 주고받는 상황 만들기',
            demonstration: '교사가 먼저 감사 상황 시연하기',
            practice: '학생들이 실제 상황에서 감사 표현 연습하기',
            feedback: '자연스러운 표현에 대한 즉시 격려',
            scoring: '참여도와 표현 의지를 중심으로 평가'
          }
        },
        closure: {
          evaluation: '오늘 배운 인사말과 감사 표현을 친구들과 실제로 사용해보기',
          nextLesson: '다음 시간에는 도움을 요청하는 방법을 배워보겠습니다.',
          farewell: '오늘 배운 인사말로 인사하며 마무리해요!'
        }
      },
      evaluation: {
        criteria: [
          {
            area: '의사소통',
            description: '상황에 맞는 인사와 감사 표현 사용',
            levels: {
              high: '다양한 상황 인식하여 적절한 표현 선택',
              middle: '기본 상황에서 알맞은 표현 사용',
              low: '도움 받아 기본 인사와 감사 표현'
            }
          },
          {
            area: '사회적 상호작용',
            description: '타인과의 소통 의지와 태도',
            levels: {
              high: '적극적이고 자연스러운 소통 시도',
              middle: '안내에 따른 적절한 반응',
              low: '기본적인 관심과 반응 보이기'
            }
          }
        ],
        reflection: {
          strengths: '실제 상황과 유사한 역할놀이를 통해 학습자들의 참여도가 높았고, AAC 활용으로 모든 학습자가 참여할 수 있었음',
          improvements: '개별 학습자의 의사소통 수준 차이가 커서 더 세밀한 개별 지원이 필요함',
          nextPlans: '가정과 연계하여 일상에서 연습할 수 있는 기회 확대'
        }
      },
      specialNeeds: {
        communicationSupport: [
          'AAC 기기 및 앱 활용',
          '그림 상징 카드 제공',
          '음성 출력 보조 기구',
          '몸짓과 표정 인정하기'
        ],
        learningSupport: [
          '실제 상황 중심 학습',
          '반복 연습 기회 충분히 제공',
          '개별 속도에 맞는 진행',
          '시각적 단서 최대 활용'
        ],
        behaviorSupport: [
          '성공 경험을 위한 단계적 접근',
          '즉시적 긍정적 강화',
          '또래와의 자연스러운 상호작용 격려',
          '안전하고 수용적인 환경 조성'
        ],
        sensorySupport: [
          '적절한 음량의 음성 자료',
          '명확하고 큰 그림카드',
          '촉각적 경험 기회 제공',
          '시각적 정보 구조화'
        ],
        participationSupport: [
          '개별 특성에 맞는 표현 방법 인정',
          '선택권 부여 (말하기, AAC, 몸짓)',
          '또래 지원 체계 활용',
          '작은 성취도 적극 인정'
        ]
      }
    }
  },
  {
    id: 'career-job-preparation',
    title: '직업 준비 기초 (진로와 직업)',
    description: '기본적인 직업 개념과 직업 준비를 위한 기초 능력 기르기',
    category: '진로와 직업',
    grade: '고등 2학년',
    lessonPlan: {
      basicInfo: {
        title: '직업의 종류와 하는 일 알아보기',
        subject: '진로와 직업',
        unit: '1. 직업의 세계',
        lesson: '3/10차시',
        grade: '고등 2학년',
        duration: 50,
        date: '',
        teacher: '',
        students: {
          total: 8,
          levels: { high: 3, middle: 3, low: 2 }
        }
      },
      objectives: {
        main: '다양한 직업의 종류를 알고 각 직업에서 하는 일을 설명할 수 있다.',
        byLevel: {
          high: '직업의 특성을 파악하여 자신의 적성과 연결지어 설명할 수 있다.',
          middle: '주요 직업의 종류와 하는 일을 구별할 수 있다.',
          low: '친숙한 직업 3-5가지를 인식하고 간단한 특징을 말할 수 있다.'
        }
      },
      materials: {
        teacher: ['직업별 사진 자료', '직업 도구 실물', '직장 견학 영상', '직업 체험 키트'],
        student: ['직업 탐색 워크북', '색연필', '스티커'],
        assistive: ['확대 사진 자료', '음성 설명 파일', '터치스크린 태블릿']
      },
      activities: {
        introduction: {
          greeting: '미래의 직업인 여러분, 안녕하세요!',
          review: '지난 시간에 배운 나의 관심사와 흥미 영역을 다시 생각해봅시다.',
          motivation: '우리 주변에서 일하시는 분들의 모습을 영상으로 보며 다양한 직업을 알아봅시다.',
          objectives: '오늘은 여러 직업의 종류와 각각 어떤 일을 하는지 알아보겠습니다.',
          preview: '직업 도구를 만져보고 직업인이 되어 체험해볼 거예요!'
        },
        development: {
          activity1: {
            title: '직업 종류와 특징 탐색',
            content: '서비스업, 제조업, 교육 등 다양한 분야의 직업을 사진과 영상으로 학습하고, 각 직업의 주요 업무 파악하기',
            materials: '직업별 사진, 영상 자료, 직업 분류표',
            levelSupport: {
              high: '직업 분야별 특성 분석하고 사회적 역할 토론하기',
              middle: '주요 직업군별 대표 직업과 업무 내용 정리하기',
              low: '친숙한 직업 위주로 이름과 기본 업무 익히기'
            },
            behaviorSupport: {
              contract: '집중해서 관찰하고 궁금한 점 질문하기',
              modeling: '직업에 대한 긍정적 태도 모델링'
            },
            assessment: '직업과 업무 연결 정확도 확인'
          },
          activity2: {
            title: '직업 체험 활동',
            content: '요리사, 판매원, 사무원 등의 직업 도구를 활용한 간단한 업무 체험',
            teamwork: '직업별 팀을 구성하여 협력 작업 경험',
            demonstration: '각 직업의 기본 업무 시범 및 안전 수칙 안내',
            practice: '실제 도구를 사용한 직업 업무 체험 시간',
            feedback: '체험 과정에서의 어려움과 재미있었던 점 공유',
            scoring: '참여 의지와 협력 정도를 중심으로 평가'
          }
        },
        closure: {
          evaluation: '오늘 체험한 직업 중 가장 흥미로웠던 직업과 그 이유 발표하기',
          nextLesson: '다음 시간에는 직업을 갖기 위해 필요한 능력에 대해 알아보겠습니다.',
          farewell: '미래의 훌륭한 직업인이 되기를 응원합니다!'
        }
      },
      evaluation: {
        criteria: [
          {
            area: '직업 이해',
            description: '직업의 종류와 업무 내용 파악 정도',
            levels: {
              high: '다양한 직업 분야 이해 및 특성 분석',
              middle: '주요 직업의 기본 업무 내용 파악',
              low: '친숙한 직업 3-5가지 인식'
            }
          },
          {
            area: '진로 관심',
            description: '직업에 대한 관심과 탐색 의지',
            levels: {
              high: '자신의 적성과 연결하여 진로 탐색',
              middle: '다양한 직업에 대한 호기심 표현',
              low: '직업 체험 활동에 기본적 참여'
            }
          },
          {
            area: '체험 활동 참여',
            description: '직업 체험 활동 참여도',
            levels: {
              high: '적극적 체험 및 창의적 접근',
              middle: '안내에 따른 성실한 체험',
              low: '도움 받아 기본 체험 참여'
            }
          }
        ],
        reflection: {
          strengths: '실제 도구를 활용한 체험 활동으로 직업에 대한 구체적 이해가 높아졌고, 학습자들의 흥미와 참여도가 매우 높았음',
          improvements: '체험 시간이 부족하여 충분한 탐색이 어려웠음. 다음에는 더 많은 체험 시간 확보 필요',
          nextPlans: '지역 사회 직장 견학을 통한 실제 직업 환경 체험 기회 제공'
        }
      },
      specialNeeds: {
        communicationSupport: [
          '직업 관련 핵심 어휘 반복 제시',
          '시각적 직업 정보 카드 활용',
          '체험 과정 단계별 설명',
          '학습자의 표현 시간 충분히 제공'
        ],
        learningSupport: [
          '실물과 체험 중심의 구체적 학습',
          '개별 관심 직업 집중 탐색 기회',
          '단계별 세분화된 체험 과정',
          '반복 설명과 충분한 연습 시간'
        ],
        behaviorSupport: [
          '안전한 도구 사용법 사전 교육',
          '체험 규칙과 절차 명확히 제시',
          '성공 경험을 통한 자신감 증진',
          '또래 협력을 통한 사회성 발달'
        ],
        sensorySupport: [
          '다양한 직업 도구의 촉각 경험',
          '직업 환경 소리와 냄새 체험',
          '시각적 직업 정보 크기 조절',
          '적절한 체험 환경 조성'
        ],
        participationSupport: [
          '개별 관심사 반영한 직업 선택권',
          '수준별 차별화된 체험 과제',
          '또래와의 협력 기회 제공',
          '작은 성취에 대한 적극적 격려'
        ]
      }
    }
  },
  {
    id: 'daily-living-skills',
    title: '개인위생 관리 (일상생활 활동)',
    description: '독립적인 일상생활을 위한 기본적인 개인위생 관리 능력 기르기',
    category: '일상생활 활동',
    grade: '초등 4학년',
    lessonPlan: {
      basicInfo: {
        title: '올바른 손 씻기와 양치하기',
        subject: '일상생활 활동',
        unit: '1. 개인위생 관리',
        lesson: '1/8차시',
        grade: '초등 4학년',
        duration: 40,
        date: '',
        teacher: '',
        students: {
          total: 6,
          levels: { high: 2, middle: 2, low: 2 }
        }
      },
      objectives: {
        main: '올바른 손 씻기와 양치하기 방법을 익히고 스스로 실행할 수 있다.',
        byLevel: {
          high: '손 씻기와 양치하기의 중요성을 설명하고 다른 사람에게 방법을 가르칠 수 있다.',
          middle: '단계에 따라 혼자서 손 씻기와 양치하기를 할 수 있다.',
          low: '교사의 도움을 받아 손 씻기와 양치하기의 기본 동작을 따라 할 수 있다.'
        }
      },
      materials: {
        teacher: ['손 씻기 단계표', '양치 순서표', '세면대', '비누', '칫솔', '치약', '타이머'],
        student: ['개인 수건', '개인 칫솔', '개인 컵'],
        assistive: ['단계별 그림 카드', '음성 안내 타이머', '확대 거울', '손잡이 확대 칫솔']
      },
      activities: {
        introduction: {
          greeting: '건강한 우리들, 안녕하세요!',
          review: '어제 하루 몇 번 손을 씻고 이를 닦았는지 생각해봅시다.',
          motivation: '더러운 손과 깨끗한 손 비교 실험으로 손 씻기의 중요성 확인하기',
          objectives: '오늘은 올바른 손 씻기와 양치하기 방법을 배워보겠습니다.',
          preview: '실제 세면대에서 직접 연습해볼 거예요!'
        },
        development: {
          activity1: {
            title: '올바른 손 씻기 방법 익히기',
            content: '6단계 손 씻기 방법(물 적시기-비누칠하기-비비기-헹구기-닦기-정리하기)을 그림카드와 함께 단계별로 연습',
            materials: '세면대, 비누, 수건, 단계별 그림카드',
            levelSupport: {
              high: '다양한 상황에서 손 씻기가 필요한 때를 설명하고 실천하기',
              middle: '6단계를 순서대로 기억하여 혼자 실행하기',
              low: '교사와 함께 한 단계씩 천천히 따라하기'
            },
            behaviorSupport: {
              contract: '차례를 지키며 세면대 사용하기',
              modeling: '교사의 정확한 시범을 관찰하고 따라하기'
            },
            assessment: '개별 손 씻기 과정 관찰 및 단계별 수행 정도 확인'
          },
          activity2: {
            title: '올바른 양치하기 방법 익히기',
            content: '치약 짜기-칫솔질하기-입 헹구기-정리하기 순서로 양치 방법 연습',
            teamwork: '짝과 함께 양치 시간 재기 및 서로 확인하기',
            demonstration: '교사가 큰 치아 모형으로 올바른 칫솔질 방법 시범',
            practice: '개별적으로 자신의 칫솔로 실제 양치 연습',
            feedback: '올바른 방법 칭찬 및 개선점 안내',
            scoring: '단계별 수행 정도와 참여 의지 평가'
          }
        },
        closure: {
          evaluation: '오늘 배운 손 씻기와 양치하기를 다시 한 번 실연해보기',
          nextLesson: '다음 시간에는 머리 감기와 목욕하기를 배워보겠습니다.',
          farewell: '깨끗하고 건강한 하루 보내세요!'
        }
      },
      evaluation: {
        criteria: [
          {
            area: '기능 수행',
            description: '손 씻기와 양치하기 단계별 수행',
            levels: {
              high: '모든 단계를 정확하고 독립적으로 수행',
              middle: '기본 단계를 순서대로 수행',
              low: '도움 받아 주요 동작 수행'
            }
          },
          {
            area: '자립성',
            description: '스스로 실행하려는 의지',
            levels: {
              high: '적극적이고 지속적인 실천 의지',
              middle: '안내에 따른 성실한 수행',
              low: '격려를 통한 기본적 참여'
            }
          },
          {
            area: '위생 의식',
            description: '개인위생의 중요성 이해',
            levels: {
              high: '위생의 중요성 이해하고 실천',
              middle: '기본적인 위생 필요성 인식',
              low: '교사 안내로 위생 활동 참여'
            }
          }
        ],
        reflection: {
          strengths: '실제 세면 시설을 활용한 실습으로 학습 전이가 용이했고, 단계별 그림카드가 이해에 큰 도움이 되었음',
          improvements: '개별 수행 속도 차이로 대기 시간이 발생하여 효율적인 순환 시스템 구축 필요',
          nextPlans: '가정과 연계하여 일상에서 지속적으로 실천할 수 있는 점검표 활용'
        }
      },
      specialNeeds: {
        communicationSupport: [
          '단계별 명확하고 간단한 언어 사용',
          '시각적 그림카드와 함께 설명',
          '실제 동작과 함께 언어적 설명',
          '충분한 반응 시간 제공'
        ],
        learningSupport: [
          '실제 도구를 활용한 체험 학습',
          '단계별 세분화된 과제 제시',
          '충분한 반복 연습 기회',
          '개별 속도에 맞는 지도'
        ],
        behaviorSupport: [
          '안전한 사용법 사전 교육',
          '정확한 방법에 대한 즉시 강화',
          '실수에 대한 격려와 재시도 기회',
          '성공 경험 통한 자신감 증진'
        ],
        sensorySupport: [
          '적절한 수온과 비누의 촉감 경험',
          '거울을 통한 시각적 확인',
          '타이머 소리를 통한 시간 감각',
          '쾌적한 세면 환경 조성'
        ],
        participationSupport: [
          '개별 도구 사용으로 책임감 증진',
          '또래와의 격려 및 협력 유도',
          '작은 성취에 대한 적극적 인정',
          '가정 연계를 통한 지속적 실천'
        ]
      }
    }
  },
  {
    id: 'speech-therapy-articulation',
    title: '발음 교정 훈련 (언어치료)',
    description: '명확한 발음을 위한 조음 기관 훈련과 발음 교정',
    category: '언어치료',
    grade: '초등 2학년',
    lessonPlan: {
      basicInfo: {
        title: 'ㄱ, ㅋ 소리 구별하고 정확히 발음하기',
        subject: '언어치료',
        unit: '1. 조음 훈련',
        lesson: '4/12차시',
        grade: '초등 2학년',
        duration: 30,
        date: '',
        teacher: '',
        students: {
          total: 3,
          levels: { high: 1, middle: 1, low: 1 }
        }
      },
      objectives: {
        main: 'ㄱ과 ㅋ 소리를 구별하여 듣고 정확하게 발음할 수 있다.',
        byLevel: {
          high: 'ㄱ, ㅋ 소리를 단어와 문장에서 정확히 발음하고 다른 사람의 발음 오류를 찾을 수 있다.',
          middle: 'ㄱ, ㅋ 소리를 단어 수준에서 구별하여 발음할 수 있다.',
          low: '교사의 도움으로 ㄱ, ㅋ 소리를 따라 발음할 수 있다.'
        }
      },
      materials: {
        teacher: ['조음 위치 그림', '거울', '발음 연습 카드', '녹음기', '입모양 동영상'],
        student: ['개별 거울', '발음 연습지', '스티커'],
        assistive: ['음성 증폭기', '조음 모형', '시각적 피드백 앱', '진동 감지 도구']
      },
      activities: {
        introduction: {
          greeting: '우리 언어 탐험가들, 안녕하세요!',
          review: '지난 시간에 배운 ㅂ, ㅍ 소리를 다시 한번 연습해봅시다.',
          motivation: '거울을 보며 입 모양을 관찰하고 새로운 소리를 탐험해봐요!',
          objectives: '오늘은 ㄱ과 ㅋ 소리를 정확하게 구별해서 발음해보겠습니다.',
          preview: '입 모양과 숨쉬기를 관찰하며 재미있게 연습할 거예요!'
        },
        development: {
          activity1: {
            title: 'ㄱ, ㅋ 조음 위치와 방법 탐색',
            content: '거울을 보며 혀의 위치와 입 모양 관찰하고, 숨의 세기 차이 느끼기. 손으로 목의 진동 확인하기.',
            materials: '개별 거울, 조음 위치 그림, 진동 감지 도구',
            levelSupport: {
              high: '정확한 조음 위치 설명하고 다른 소리와 비교 분석하기',
              middle: '시각적 단서와 함께 정확한 발음 연습하기',
              low: '교사의 일대일 지도로 기본 입 모양 익히기'
            },
            behaviorSupport: {
              contract: '집중해서 입 모양 관찰하고 차근차근 연습하기',
              modeling: '교사의 정확한 조음 모델링 관찰'
            },
            assessment: '개별 조음 정확도와 구별 능력 확인'
          },
          activity2: {
            title: '단어 수준 발음 연습',
            content: 'ㄱ, ㅋ이 들어간 친숙한 단어들을 카드로 제시하고 정확한 발음 연습',
            teamwork: '또래와 함께 발음 듣고 맞추기 게임',
            demonstration: '교사가 정확한 단어 발음 시범 후 학생 개별 연습',
            practice: '녹음 기능을 활용하여 자신의 발음 점검하기',
            feedback: '정확한 발음에 대한 즉시적 긍정적 피드백',
            scoring: '발음 정확도보다 시도 의지와 개선 노력 평가'
          }
        },
        closure: {
          evaluation: '오늘 연습한 ㄱ, ㅋ 소리를 포함한 단어들을 다시 한번 발음해보기',
          nextLesson: '다음 시간에는 문장에서 ㄱ, ㅋ 소리를 연습해보겠습니다.',
          farewell: '오늘도 열심히 연습한 우리 친구들, 수고했어요!'
        }
      },
      evaluation: {
        criteria: [
          {
            area: '조음 정확도',
            description: 'ㄱ, ㅋ 소리의 정확한 발음',
            levels: {
              high: '단어와 문장에서 정확한 발음',
              middle: '단어 수준에서 구별 발음',
              low: '도움 받아 기본 소리 발음'
            }
          },
          {
            area: '청취 변별',
            description: 'ㄱ, ㅋ 소리 구별 듣기',
            levels: {
              high: '미세한 차이까지 정확히 구별',
              middle: '기본적인 소리 차이 구별',
              low: '명확한 대조에서 구별 가능'
            }
          },
          {
            area: '참여 태도',
            description: '치료 활동 참여 의지',
            levels: {
              high: '적극적이고 지속적인 연습 참여',
              middle: '안내에 따른 성실한 참여',
              low: '격려를 통한 기본적 참여'
            }
          }
        ],
        reflection: {
          strengths: '시각적 피드백과 촉각적 단서를 활용한 다감각 접근이 효과적이었고, 개별 맞춤 지도로 각자의 진전이 있었음',
          improvements: '일부 학습자의 집중 시간이 짧아 더 다양한 흥미 유발 활동 필요',
          nextPlans: '가정에서 연습할 수 있는 간단한 과제와 부모 안내 자료 제공'
        }
      },
      specialNeeds: {
        communicationSupport: [
          '명확하고 천천히 말하기',
          '시각적 조음 위치 그림 활용',
          '몸짓과 촉각적 단서 함께 제공',
          '학습자의 시도를 충분히 기다리기'
        ],
        learningSupport: [
          '개별 맞춤형 조음 훈련',
          '단계적이고 체계적인 접근',
          '충분한 반복 연습 기회',
          '다감각적 학습 방법 활용'
        ],
        behaviorSupport: [
          '작은 성취에 대한 즉시적 강화',
          '실패에 대한 격려와 재도전 기회',
          '편안하고 안전한 치료 환경',
          '개별 특성을 고려한 접근'
        ],
        sensorySupport: [
          '시각적 조음 모델링 제공',
          '촉각적 피드백을 통한 조음 인식',
          '청각적 변별 훈련 강화',
          '적절한 음량과 속도 조절'
        ],
        participationSupport: [
          '개별 수준에 맞는 목표 설정',
          '흥미로운 활동과 게임 요소 포함',
          '자기 점검 기회 제공',
          '성취 과정 시각적으로 기록'
        ]
      }
    }
  },
  {
    id: 'social-neighborhood',
    title: '우리 동네 알아보기 (사회)',
    description: '집 주변의 주요 장소와 기능을 이해하고 지역사회 구성원으로서의 역할 알기',
    category: '사회',
    grade: '초등 2학년',
    lessonPlan: {
      basicInfo: {
        title: '우리 동네의 중요한 장소들',
        subject: '사회',
        unit: '2. 우리가 살아가는 곳',
        lesson: '1/6차시',
        grade: '초등 2학년',
        duration: 40,
        date: '',
        teacher: '',
        students: {
          total: 6,
          levels: { high: 2, middle: 2, low: 2 }
        }
      },
      objectives: {
        main: '우리 동네의 중요한 장소들을 알고 각 장소의 기능을 설명할 수 있다.',
        byLevel: {
          high: '동네 지도를 보며 여러 장소를 찾고, 각 장소에서 할 수 있는 일을 구체적으로 설명할 수 있다.',
          middle: '주요 장소(학교, 병원, 마트, 공원)를 구별하고 기본 기능을 말할 수 있다.',
          low: '교사의 도움으로 친숙한 장소 3-4곳을 인식하고 가본 경험을 표현할 수 있다.'
        }
      },
      materials: {
        teacher: ['동네 지도', '장소별 사진 카드', '실제 방문 영상', '미니어처 건물 모형'],
        student: ['개별 활동지', '색연필', '스티커'],
        assistive: ['확대 지도', '음성 설명 파일', '촉각 지도', '그림 상징 카드']
      },
      activities: {
        introduction: {
          greeting: '우리 동네 탐험가들, 안녕하세요!',
          review: '집에서 학교까지 오는 길에 어떤 곳들을 지나왔는지 생각해봅시다.',
          motivation: '우리 동네 항공사진을 보며 익숙한 장소들을 찾아봅시다.',
          objectives: '오늘은 우리 동네에 있는 중요한 장소들과 그곳에서 하는 일을 알아보겠습니다.',
          preview: '지도와 사진을 보며 동네 여행을 떠나볼 거예요!'
        },
        development: {
          activity1: {
            title: '동네 지도에서 장소 찾기',
            content: '큰 동네 지도를 보며 학교, 병원, 마트, 공원, 우체국 등의 위치를 확인하고 각 장소의 특징과 기능 학습하기',
            materials: '동네 지도, 장소 표시 스티커, 사진 카드',
            levelSupport: {
              high: '지도에서 여러 장소를 찾고 최적의 이동 경로 계획하기',
              middle: '주요 장소들의 위치와 기능을 지도에 표시하기',
              low: '교사와 함께 친숙한 장소 위주로 위치 확인하기'
            },
            behaviorSupport: {
              contract: '친구들과 협력하여 지도 활동 참여하기',
              modeling: '교사의 장소 찾기 시범을 관찰하고 따라하기'
            },
            assessment: '지도에서 장소를 정확히 찾고 기능을 설명하는 정도 확인'
          },
          activity2: {
            title: '장소별 역할놀이',
            content: '각 장소에서 일하는 사람들과 이용하는 사람들의 역할을 놀이로 체험하기',
            teamwork: '장소별로 팀을 나누어 상황극 준비하기',
            demonstration: '교사가 마트 점원 역할로 시범 보이기',
            practice: '각 팀별로 병원, 우체국, 도서관 등에서의 상황 연기하기',
            feedback: '역할놀이 후 각 장소의 중요성에 대해 이야기 나누기',
            scoring: '참여도와 협력도를 중심으로 평가하기'
          }
        },
        closure: {
          evaluation: '오늘 배운 동네 장소들 중 가장 가고 싶은 곳과 그 이유 발표하기',
          nextLesson: '다음 시간에는 동네 사람들의 다양한 직업에 대해 알아보겠습니다.',
          farewell: '우리 동네를 더 사랑하게 된 하루였어요. 안녕히 가세요!'
        }
      },
      evaluation: {
        criteria: [
          {
            area: '지역 인식',
            description: '동네 주요 장소 파악 정도',
            levels: {
              high: '다양한 장소를 지도에서 찾고 위치관계 이해',
              middle: '주요 장소들을 구별하고 기본 위치 파악',
              low: '친숙한 장소 3-4곳을 사진으로 인식'
            }
          },
          {
            area: '사회적 이해',
            description: '장소의 기능과 역할 이해도',
            levels: {
              high: '장소별 세부 기능과 사회적 역할 설명',
              middle: '각 장소의 기본 용도와 기능 이해',
              low: '장소와 기본 활동을 연결지어 인식'
            }
          }
        ],
        reflection: {
          strengths: '실제 지도와 사진 자료 활용으로 학습자들의 현실 인식이 높아졌고, 역할놀이를 통한 체험적 학습이 효과적이었음',
          improvements: '일부 학습자들이 추상적인 지도 이해에 어려움을 보여 더 구체적인 시각자료 보완 필요',
          nextPlans: '실제 동네 탐방 활동을 통해 직접 경험할 수 있는 기회 제공'
        }
      },
      specialNeeds: {
        communicationSupport: [
          '장소 이름과 기능을 쉬운 단어로 설명',
          '시각적 사진 자료와 함께 설명',
          '손짓과 몸짓을 활용한 표현 인정',
          '학습자의 경험과 연결한 설명'
        ],
        learningSupport: [
          '실물 크기의 지도와 미니어처 활용',
          '개별 학습자의 생활 경험 반영',
          '단계적이고 반복적인 설명',
          '직접 체험할 수 있는 활동 중심'
        ],
        behaviorSupport: [
          '익숙한 장소부터 시작하여 불안감 감소',
          '성공적인 찾기 활동에 대한 즉시 강화',
          '또래와의 협력 활동을 통한 사회성 증진',
          '개별 관심사를 반영한 장소 탐색'
        ],
        sensorySupport: [
          '촉각적으로 탐색 가능한 입체 지도',
          '다양한 크기의 시각 자료 제공',
          '실제 장소의 소리와 냄새 경험',
          '적절한 조명과 시각적 대비'
        ],
        participationSupport: [
          '개별 생활권을 중심으로 한 개별화 접근',
          '가족과 함께 다녀온 장소 우선 탐색',
          '선택권 제공을 통한 주도적 참여',
          '작은 발견에 대한 적극적 격려'
        ]
      }
    }
  },
  {
    id: 'english-basic-greetings',
    title: '인사말과 기본 표현 (영어)',
    description: '일상생활에서 사용하는 기본적인 영어 인사말과 감사 표현 익히기',
    category: '영어',
    grade: '초등 3학년',
    lessonPlan: {
      basicInfo: {
        title: 'Hello, Thank you - 기본 영어 표현',
        subject: '영어',
        unit: '1. Nice to Meet You',
        lesson: '1/8차시',
        grade: '초등 3학년',
        duration: 30,
        date: '',
        teacher: '',
        students: {
          total: 5,
          levels: { high: 2, middle: 2, low: 1 }
        }
      },
      objectives: {
        main: '기본적인 영어 인사말(Hello, Hi, Goodbye)과 감사 표현(Thank you)을 상황에 맞게 사용할 수 있다.',
        byLevel: {
          high: '다양한 인사 표현을 구별하여 사용하고, 간단한 대화를 주고받을 수 있다.',
          middle: 'Hello, Goodbye, Thank you를 정확한 발음으로 상황에 맞게 말할 수 있다.',
          low: '교사의 도움으로 Hello와 Thank you를 따라 말하고 몸짓으로 표현할 수 있다.'
        }
      },
      materials: {
        teacher: ['영어 인사말 카드', '상황별 그림 자료', '영어 동요 음원', '손인형'],
        student: ['개별 단어 카드', '스티커', '색연필'],
        assistive: ['음성 출력 장치', '그림-단어 매칭 카드', '확대 인쇄물', '촉각 단어카드']
      },
      activities: {
        introduction: {
          greeting: 'Hello, everyone! Nice to meet you!',
          review: '우리말로 인사할 때 어떤 말을 사용하는지 생각해봅시다.',
          motivation: '외국 친구들은 어떻게 인사할까요? 재미있는 영어 노래를 들어봅시다.',
          objectives: '오늘은 영어로 인사하고 고마움을 표현하는 방법을 배우겠습니다.',
          preview: '손인형 친구들과 함께 영어로 대화해볼 거예요!'
        },
        development: {
          activity1: {
            title: '영어 인사말 익히기',
            content: 'Hello, Hi, Good morning, Goodbye 등의 기본 인사말을 그림카드와 함께 학습하고, 상황별로 언제 사용하는지 익히기',
            materials: '인사말 카드, 상황 그림, 음성 자료',
            levelSupport: {
              high: '시간대별, 상황별 인사말 구별하여 사용하기',
              middle: '기본 인사말 4-5개를 정확한 발음으로 말하기',
              low: 'Hello와 Goodbye를 손짓과 함께 표현하기'
            },
            behaviorSupport: {
              contract: '큰 소리로 따라 하며 친구들과 함께 연습하기',
              modeling: '교사와 손인형의 인사 시범을 관찰하고 모방하기'
            },
            assessment: '개별적으로 인사말 사용 상황 이해도와 발음 정확도 확인'
          },
          activity2: {
            title: '감사 표현과 역할놀이',
            content: 'Thank you, You\'re welcome 표현을 익히고 일상 상황에서의 간단한 영어 대화 연습',
            teamwork: '짝을 이뤄서 인사-감사-응답의 대화 패턴 연습',
            demonstration: '교사가 학생과 영어 대화 시범 보이기',
            practice: '손인형을 활용한 개별 대화 연습 시간',
            feedback: '정확한 발음과 자연스러운 표현에 대한 즉시 칭찬',
            scoring: '적극적인 참여와 시도하려는 의지를 중심으로 평가'
          }
        },
        closure: {
          evaluation: '오늘 배운 영어 표현으로 교사 및 친구들과 실제 인사 나누기',
          nextLesson: '다음 시간에는 영어로 자기소개하는 방법을 배워보겠습니다.',
          farewell: 'Goodbye, everyone! See you next time!'
        }
      },
      evaluation: {
        criteria: [
          {
            area: '발음 정확도',
            description: '영어 인사말의 정확한 발음',
            levels: {
              high: '자연스럽고 정확한 발음으로 표현',
              middle: '기본적으로 알아들을 수 있는 발음',
              low: '모방하여 따라 말하기 시도'
            }
          },
          {
            area: '상황 이해',
            description: '인사말 사용 상황의 적절성',
            levels: {
              high: '다양한 상황에 맞는 표현 선택 사용',
              middle: '기본 상황에서 적절한 표현 사용',
              low: '교사 안내로 상황에 맞는 표현 시도'
            }
          }
        ],
        reflection: {
          strengths: '손인형과 시각자료를 활용한 상호작용적 학습으로 학습자들의 흥미와 참여도가 높았음',
          improvements: '발음 지도 시 더 많은 개별 연습 시간이 필요하며, 다양한 상황 제시 필요',
          nextPlans: '가정과 연계하여 일상에서 영어 표현 사용할 수 있는 환경 조성'
        }
      },
      specialNeeds: {
        communicationSupport: [
          '명확하고 천천히 발음하여 모델링',
          '시각적 입 모양 카드 함께 제시',
          '몸짓과 표정을 함께 사용한 표현',
          '모국어 연결을 통한 의미 이해'
        ],
        learningSupport: [
          '반복적이고 체계적인 발음 연습',
          '개별 속도에 맞는 학습 진행',
          '충분한 듣기 기회 제공',
          '다감각적 학습 방법 활용'
        ],
        behaviorSupport: [
          '작은 성취에 대한 즉시적 강화',
          '실수에 대한 격려와 재시도 기회',
          '편안하고 재미있는 학습 분위기',
          '개별 특성을 고려한 접근'
        ],
        sensorySupport: [
          '적절한 음량의 음성 자료',
          '크고 선명한 시각 자료',
          '촉각적 단어 카드 활용',
          '다양한 감각 자극을 통한 기억 강화'
        ],
        participationSupport: [
          '개별 수준에 맞는 목표 설정',
          '선택권을 제공한 활동 참여',
          '또래와의 협력 학습 격려',
          '문화적 차이에 대한 이해와 존중'
        ]
      }
    }
  },
  {
    id: 'physical-ball-activities',
    title: '공 던지고 받기 (체육)',
    description: '대근육 발달과 협응력 향상을 위한 기본적인 공놀이 활동',
    category: '체육',
    grade: '초등 1학년',
    lessonPlan: {
      basicInfo: {
        title: '여러 가지 공으로 놀아요',
        subject: '체육',
        unit: '1. 건강 활동',
        lesson: '2/8차시',
        grade: '초등 1학년',
        duration: 40,
        date: '',
        teacher: '',
        students: {
          total: 8,
          levels: { high: 3, middle: 3, low: 2 }
        }
      },
      objectives: {
        main: '다양한 크기의 공을 안전하게 던지고 받으며 기본적인 운동 협응력을 기를 수 있다.',
        byLevel: {
          high: '움직이는 상대에게 정확히 공을 던지고, 다양한 방향에서 오는 공을 받을 수 있다.',
          middle: '제자리에서 상대방과 공을 주고받으며 기본적인 던지기와 받기를 할 수 있다.',
          low: '교사나 보조인력의 도움으로 큰 공을 양손으로 던지고 받을 수 있다.'
        }
      },
      materials: {
        teacher: ['다양한 크기의 공', '타겟 판', '안전 콘', '음악', '호루라기'],
        student: ['개별 수건', '물통'],
        assistive: ['휠체어용 공 홀더', '가벼운 스펀지 공', '소리나는 공', '끈 달린 공']
      },
      activities: {
        introduction: {
          greeting: '건강한 우리 몸을 만드는 체육 시간입니다!',
          review: '지난 시간에 배운 스트레칭 동작을 함께 해봅시다.',
          motivation: '여러 가지 공을 보여주며 어떤 놀이를 할 수 있는지 상상해보기',
          objectives: '오늘은 공을 안전하고 재미있게 던지고 받는 방법을 배우겠습니다.',
          preview: '음악에 맞춰 공과 함께 신나는 활동을 해볼 거예요!'
        },
        development: {
          activity1: {
            title: '공 던지기 기본 동작 익히기',
            content: '서 있는 자세에서 양손으로 공 던지기, 한 손으로 던지기, 밑에서 위로 던지기 등 기본 동작을 단계별로 연습',
            materials: '크기별 공, 타겟 판, 안전 콘',
            levelSupport: {
              high: '다양한 던지기 방법으로 정확한 타겟 맞추기',
              middle: '기본 던지기 자세로 3미터 거리 던지기',
              low: '보조 받아 큰 공을 양손으로 앞으로 굴리기'
            },
            behaviorSupport: {
              contract: '안전 규칙 지키며 차례대로 활동하기',
              modeling: '교사의 올바른 던지기 자세 관찰하고 따라하기'
            },
            assessment: '개별 운동 능력에 따른 던지기 정확도와 안전성 확인'
          },
          activity2: {
            title: '공 받기와 협력 활동',
            content: '제자리에서 공 받기부터 시작하여 점차 움직이면서 받기, 짝과 함께 공 주고받기 게임',
            teamwork: '2명씩 짝을 이뤄 거리를 조절해가며 공 주고받기',
            demonstration: '교사와 학생이 모범적인 공 주고받기 시범',
            practice: '개별 수준에 맞는 거리와 공 크기로 연습하기',
            feedback: '성공적인 받기와 협력에 대한 즉시적 격려',
            scoring: '기능보다는 안전한 참여와 협력 태도 중심 평가'
          }
        },
        closure: {
          evaluation: '오늘 활동 중 가장 재미있었던 것과 어려웠던 점 나누기',
          nextLesson: '다음 시간에는 공을 이용한 간단한 게임을 해보겠습니다.',
          farewell: '안전하게 잘 활동한 우리 친구들, 수고했어요!'
        }
      },
      evaluation: {
        criteria: [
          {
            area: '기본 운동 기능',
            description: '공 던지기와 받기 기본 동작',
            levels: {
              high: '정확하고 안정적인 던지기와 받기',
              middle: '기본 동작으로 공 주고받기 가능',
              low: '도움 받아 기본 동작 수행'
            }
          },
          {
            area: '협응력',
            description: '눈과 손의 협응 및 균형감',
            levels: {
              high: '움직이면서도 정확한 협응 동작',
              middle: '제자리에서 기본적인 협응 동작',
              low: '보조 받아 단순한 협응 동작'
            }
          },
          {
            area: '안전 의식',
            description: '안전 규칙 이해 및 준수',
            levels: {
              high: '스스로 안전 규칙 지키며 타인 배려',
              middle: '안내에 따른 기본 안전 수칙 준수',
              low: '지속적 안내로 기본 안전 행동'
            }
          }
        ],
        reflection: {
          strengths: '개별 수준을 고려한 다양한 공과 활동으로 모든 학습자가 성공 경험을 가질 수 있었고, 안전한 환경에서 즐겁게 참여했음',
          improvements: '지체장애 학습자를 위한 더 다양한 보조 도구와 수정된 활동 방법 필요',
          nextPlans: '실외 활동으로 확장하여 더 넓은 공간에서의 대근육 활동 기회 제공'
        }
      },
      specialNeeds: {
        communicationSupport: [
          '명확하고 단순한 동작 지시',
          '시범과 함께하는 시각적 설명',
          '몸짓과 신호를 활용한 안내',
          '개별 이해 수준에 맞는 설명'
        ],
        learningSupport: [
          '개별 운동 능력에 맞는 과제 조정',
          '충분한 연습 시간과 반복 기회',
          '단계적이고 체계적인 기능 습득',
          '성공 경험을 위한 난이도 조절'
        ],
        behaviorSupport: [
          '명확한 안전 규칙과 활동 경계',
          '즉시적이고 구체적인 격려',
          '또래와의 긍정적 상호작용 촉진',
          '개별 관심사를 반영한 동기 부여'
        ],
        sensorySupport: [
          '다양한 질감과 크기의 공 제공',
          '적절한 조명과 시각적 대비',
          '소리나는 공으로 청각 자극',
          '안전하고 쾌적한 활동 환경'
        ],
        participationSupport: [
          '개별 장애 특성에 맞는 활동 수정',
          '보조 도구와 지원 인력 활용',
          '선택권과 자기결정 기회 제공',
          '작은 향상에 대한 적극적 인정'
        ]
      }
    }
  },
  {
    id: 'music-rhythm-patterns',
    title: '리듬 따라 하기 (음악)',
    description: '간단한 리듬 패턴을 익히고 다양한 방법으로 표현하기',
    category: '음악',
    grade: '초등 2학년',
    lessonPlan: {
      basicInfo: {
        title: '박수와 발구르기로 리듬 만들기',
        subject: '음악',
        unit: '1. 리듬과 친해져요',
        lesson: '3/6차시',
        grade: '초등 2학년',
        duration: 40,
        date: '',
        teacher: '',
        students: {
          total: 6,
          levels: { high: 2, middle: 2, low: 2 }
        }
      },
      objectives: {
        main: '간단한 리듬 패턴을 듣고 박수, 발구르기, 악기로 정확하게 표현할 수 있다.',
        byLevel: {
          high: '복잡한 리듬 패턴을 만들고 친구들에게 가르치며, 여러 악기로 합주할 수 있다.',
          middle: '기본 리듬 패턴을 정확히 따라 하고 간단한 악기로 연주할 수 있다.',
          low: '교사의 시범을 보고 단순한 박수 리듬을 따라 할 수 있다.'
        }
      },
      materials: {
        teacher: ['리듬 카드', '메트로놈', '피아노', '다양한 타악기', '음향 장비'],
        student: ['개별 마라카스', '리듬스틱', '개별 리듬 워크시트'],
        assistive: ['진동 감지 쿠션', '큰 리듬 카드', '색깔별 리듬 표시', '청각 증폭 장치']
      },
      activities: {
        introduction: {
          greeting: '즐거운 음악 시간입니다! 모두 함께 박수로 인사해요!',
          review: '지난 시간에 배운 빠르기의 차이를 몸으로 표현해봅시다.',
          motivation: '우리 주변에서 들을 수 있는 다양한 소리들을 찾아보고 리듬이 있는지 들어보기',
          objectives: '오늘은 여러 가지 방법으로 리듬을 만들고 표현해보겠습니다.',
          preview: '박수, 발구르기, 악기로 멋진 리듬 연주를 해볼 거예요!'
        },
        development: {
          activity1: {
            title: '몸으로 리듬 표현하기',
            content: '교사의 리듬 시범을 보고 박수, 발구르기, 무릎 치기 등 다양한 몸짓으로 리듬 패턴 따라하기',
            materials: '리듬 카드, 메트로놈, 거울',
            levelSupport: {
              high: '복잡한 리듬 패턴 창작하고 지휘하기',
              middle: '기본 패턴을 정확한 박자로 표현하기',
              low: '단순 반복 패턴을 천천히 따라하기'
            },
            behaviorSupport: {
              contract: '다른 친구들의 연주를 방해하지 않고 집중하기',
              modeling: '교사와 우수 학생의 정확한 리듬 모델링'
            },
            assessment: '개별 리듬감과 박자 정확도, 표현력 관찰'
          },
          activity2: {
            title: '악기로 리듬 앙상블',
            content: '마라카스, 탬버린, 리듬스틱 등 간단한 타악기로 모둠별 리듬 합주하기',
            teamwork: '악기별로 역할을 나누어 하나의 곡 완성하기',
            demonstration: '교사가 각 악기의 연주법과 합주 방법 시범',
            practice: '개별 악기 연습 후 점진적으로 합주 연습',
            feedback: '서로의 연주를 듣고 격려하며 개선점 나누기',
            scoring: '협력도와 리듬 정확도, 음악적 표현력 종합 평가'
          }
        },
        closure: {
          evaluation: '오늘 배운 리듬으로 즉흥 연주해보고, 가장 기억에 남는 리듬 발표하기',
          nextLesson: '다음 시간에는 우리가 만든 리듬에 멜로디를 붙여보겠습니다.',
          farewell: '아름다운 리듬으로 하루를 마무리해요. 안녕히 가세요!'
        }
      },
      evaluation: {
        criteria: [
          {
            area: '리듬감',
            description: '정확한 박자와 리듬 패턴 이해',
            levels: {
              high: '복잡한 리듬도 정확하게 표현',
              middle: '기본 리듬 패턴을 안정적으로 연주',
              low: '단순한 리듬을 도움 받아 표현'
            }
          },
          {
            area: '음악적 표현',
            description: '창의적이고 감정적인 음악 표현',
            levels: {
              high: '독창적이고 풍부한 음악적 표현',
              middle: '기본적인 음악적 감정 표현',
              low: '모방을 통한 단순한 표현'
            }
          },
          {
            area: '협동심',
            description: '합주에서의 협력과 조화',
            levels: {
              high: '다른 연주자와 완벽한 조화',
              middle: '기본적인 합주 협력 가능',
              low: '안내 받아 그룹 활동 참여'
            }
          }
        ],
        reflection: {
          strengths: '다양한 감각을 활용한 리듬 활동으로 모든 학습자가 참여할 수 있었고, 특히 자폐성장애 학습자들이 규칙적인 리듬에 안정감을 보임',
          improvements: '청각 장애 학습자를 위한 진동 기반 리듬 교육 방법 더 개발 필요',
          nextPlans: '학교 행사에서 발표할 수 있는 간단한 리듬 앙상블 준비'
        }
      },
      specialNeeds: {
        communicationSupport: [
          '시각적 리듬 기호와 몸짓 활용',
          '명확한 박자 카운트와 신호',
          '개별 수준에 맞는 단순한 언어',
          '음성과 시각 정보 동시 제공'
        ],
        learningSupport: [
          '반복적이고 체계적인 리듬 연습',
          '개별 속도에 맞는 학습 진행',
          '다감각적 리듬 체험 기회',
          '성취 수준별 차별화된 과제'
        ],
        behaviorSupport: [
          '규칙적인 리듬의 안정감 활용',
          '음악적 성취에 대한 즉시 강화',
          '자기표현 기회를 통한 자신감 증진',
          '또래와의 음악적 소통 격려'
        ],
        sensorySupport: [
          '청각 장애: 진동과 시각적 리듬 표현',
          '시각 장애: 촉각적 악기와 음향 중심',
          '감각 과부하: 적절한 음량 조절',
          '다양한 질감의 악기 제공'
        ],
        participationSupport: [
          '개별 선호하는 악기 선택권 제공',
          '수준별 역할 분담으로 성공 경험',
          '작은 음악적 시도도 적극 인정',
          '가정과 연계한 음악 환경 조성'
        ]
      }
    }
  },
  {
    id: 'art-colors-shapes',
    title: '색깔과 모양 표현 (미술)',
    description: '다양한 재료로 색깔과 모양을 탐색하고 창의적으로 표현하기',
    category: '미술',
    grade: '초등 1학년',
    lessonPlan: {
      basicInfo: {
        title: '만져보고 그려보는 색깔 세상',
        subject: '미술',
        unit: '1. 색깔과 모양',
        lesson: '1/6차시',
        grade: '초등 1학년',
        duration: 40,
        date: '',
        teacher: '',
        students: {
          total: 7,
          levels: { high: 2, middle: 3, low: 2 }
        }
      },
      objectives: {
        main: '기본 색깔(빨강, 파랑, 노랑)과 기본 도형(동그라미, 세모, 네모)을 구별하고 다양한 재료로 표현할 수 있다.',
        byLevel: {
          high: '색깔 혼합 실험을 통해 새로운 색을 만들고, 도형을 조합하여 창의적인 작품을 만들 수 있다.',
          middle: '기본 색깔과 도형을 정확히 구별하여 그리고 칠할 수 있다.',
          low: '교사의 도움으로 색깔과 도형을 만지고 경험하며 간단한 표현을 시도할 수 있다.'
        }
      },
      materials: {
        teacher: ['기본 색 물감', '다양한 붓', '색깔 도형 카드', '실물 도형 블록', '앞치마'],
        student: ['개별 스케치북', '크레파스', '색연필', '찰흙'],
        assistive: ['큰 붓과 그립', '촉각 도형판', '향이 나는 물감', '점자 도형 카드', '확대 색깔 샘플']
      },
      activities: {
        introduction: {
          greeting: '아름다운 색깔 세상으로 떠나는 미술 시간입니다!',
          review: '우리 교실에서 빨간색, 파란색, 노란색인 것들을 찾아봅시다.',
          motivation: '마법의 색깔 상자에서 여러 가지 색깔과 모양을 꺼내며 탐색하기',
          objectives: '오늘은 색깔과 모양을 만지고, 보고, 그려보겠습니다.',
          preview: '우리만의 특별한 색깔 작품을 만들어볼 거예요!'
        },
        development: {
          activity1: {
            title: '색깔과 도형 탐색하기',
            content: '실제 색깔 블록과 도형 조각을 만지고 관찰하며 특징 발견하기. 색깔별, 모양별로 분류하고 이름 익히기.',
            materials: '색깔 블록, 도형 조각, 분류 상자, 확대경',
            levelSupport: {
              high: '색깔 혼합 실험으로 2차 색깔 만들기',
              middle: '기본 색깔과 도형을 정확히 분류하고 이름 말하기',
              low: '촉각으로 색깔의 차이(거칠기, 온도감)와 도형 탐색'
            },
            behaviorSupport: {
              contract: '재료를 소중히 다루고 정리정돈 하기',
              modeling: '교사의 관찰과 탐색 방법 시범'
            },
            assessment: '색깔과 도형 구별 능력, 탐색 과정에서의 집중도 관찰'
          },
          activity2: {
            title: '나만의 색깔 작품 만들기',
            content: '다양한 재료(물감, 크레파스, 찰흙)를 사용하여 자유롭게 색깔과 모양 표현하기',
            teamwork: '친구들과 색깔 재료 나누어 사용하며 작품 감상하기',
            demonstration: '교사가 여러 재료 사용법과 표현 기법 시범',
            practice: '개별적으로 자신만의 색깔 이야기가 담긴 그림 그리기',
            feedback: '창의적인 표현과 시도에 대한 격려와 피드백',
            scoring: '완성도보다 창의성과 참여 의지를 중심으로 평가'
          }
        },
        closure: {
          evaluation: '완성한 작품을 친구들 앞에서 소개하고, 사용한 색깔과 모양 설명하기',
          nextLesson: '다음 시간에는 자연에서 찾을 수 있는 색깔들을 탐색해보겠습니다.',
          farewell: '아름다운 작품을 만든 우리 예술가들, 수고했어요!'
        }
      },
      evaluation: {
        criteria: [
          {
            area: '색채 인식',
            description: '기본 색깔 구별과 활용',
            levels: {
              high: '색깔 혼합과 다양한 색채 활용',
              middle: '기본 색깔 정확한 구별과 사용',
              low: '주요 색깔 인식과 간단한 활용'
            }
          },
          {
            area: '조형 감각',
            description: '기본 도형 이해와 표현',
            levels: {
              high: '도형 조합으로 복합적 형태 표현',
              middle: '기본 도형을 정확히 그리고 활용',
              low: '도형의 기본 특징 인식과 모방'
            }
          },
          {
            area: '창의적 표현',
            description: '개성 있는 미술 표현력',
            levels: {
              high: '독창적이고 상상력이 풍부한 표현',
              middle: '기본적인 개성과 감정 표현',
              low: '모방과 시도를 통한 단순 표현'
            }
          }
        ],
        reflection: {
          strengths: '다감각적 재료 탐색으로 시각장애 학습자도 적극 참여할 수 있었고, 개별 표현을 존중하는 분위기가 창의성 발휘에 도움',
          improvements: '시각 자료의 대비를 더 높이고, 저시력 학습자를 위한 조명 개선 필요',
          nextPlans: '완성된 작품들로 교실 전시회를 열어 성취감과 자존감 향상 도모'
        }
      },
      specialNeeds: {
        communicationSupport: [
          '색깔과 모양의 특징을 쉬운 말로 설명',
          '시각적 자료와 실물 동시 제시',
          '촉각적 경험을 언어로 표현 도움',
          '개별 작품에 대한 긍정적 반응'
        ],
        learningSupport: [
          '개별 학습자 수준에 맞는 재료 제공',
          '단계적이고 반복적인 기법 지도',
          '충분한 탐색과 실험 시간',
          '실패를 두려워하지 않는 분위기'
        ],
        behaviorSupport: [
          '명확한 활동 규칙과 재료 사용법',
          '창의적 시도에 대한 즉시적 격려',
          '또래 작품 감상을 통한 상호 존중',
          '개별 관심사를 반영한 주제 선택'
        ],
        sensorySupport: [
          '시각장애: 촉각 중심 재료와 향이 나는 물감',
          '청각장애: 시각적 설명과 시범 중심',
          '촉각 방어: 다양한 질감 재료로 점진적 적응',
          '적절한 작업 환경과 조명'
        ],
        participationSupport: [
          '개별 장애 특성에 맞는 도구 제공',
          '성취 가능한 개별 목표 설정',
          '작은 시도와 과정도 적극 인정',
          '가족과 함께하는 미술 활동 연계'
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