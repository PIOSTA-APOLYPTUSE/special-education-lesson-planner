import { LessonPlan } from './storage';

export interface ExampleTemplate {
  id: string;
  title: string;
  description: string;
  category: '국어' | '수학' | '사회' | '과학' | '영어' | '체육' | '음악' | '미술' | '특수교육' | '생활국어' | '생활수학' | '진로와 직업' | '일상생활 활동' | '언어치료';
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