- 특수교육 수업지도안 작성 시스템 구현 프롬프트
https://github.com/PIOSTA-APOLYPTUSE/special-education-lesson-planner 깃허브, vercel 연동 수정 까지

## 시스템 개요

특수교육 전공자를 위한 체계적인 수업지도안 작성 및 관리 플랫폼을 구현해주세요. 이 시스템은 첨부된 특수교육 수업지도안 PDF 파일의 구조와 형식을 기반으로 합니다.

## 기술 스택
- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS  
- **Data Storage**: 로컬 스토리지 (브라우저)
- **Build Tool**: Turbopack

## 수업지도안 데이터 구조

```typescript
interface LessonPlan {
  id: string;
  basicInfo: {
    title: string;           // 수업 주제
    subject: string;         // 과목
    unit: string;           // 단원
    lesson: string;         // 차시 (예: "3/8차시")
    grade: string;          // 학년
    duration: number;       // 수업 시간 (분)
    date: string;           // 수업 날짜
    teacher: string;        // 지도 교사
    students: {             // 수업 대상
      total: number;
      levels: {
        high: number;       // 가 수준
        middle: number;     // 나 수준  
        low: number;        // 다 수준
      }
    }
  };
  
  objectives: {
    main: string;           // 주요 학습 목표
    byLevel: {
      high: string;         // 가 수준 목표
      middle: string;       // 나 수준 목표
      low: string;          // 다 수준 목표
    }
  };
  
  materials: {
    teacher: string[];      // 교사 준비물
    student: string[];      // 학생 준비물
    assistive: string[];    // 보조 도구 (AAC, 태블릿PC 등)
  };
  
  activities: {
    introduction: {         // 도입 (5분)
      greeting: string;     // 인사하기
      review: string;       // 전시학습 상기
      motivation: string;   // 동기유발
      objectives: string;   // 학습목표 제시
      preview: string;      // 활동 제시
    };
    
    development: {          // 전개 (30분)
      activity1: {
        title: string;
        content: string;
        materials: string;
        levelSupport: {
          high: string;
          middle: string;
          low: string;
        };
        behaviorSupport: {
          contract: string;
          modeling: string;
        };
        assessment: string;
      };
      activity2: {
        title: string;
        content: string;
        teamwork: string;
        demonstration: string;
        practice: string;
        feedback: string;
        scoring: string;
      };
    };
    
    closure: {              // 정리 (5분)
      evaluation: string;   // 평가 (O/X 카드 등)
      nextLesson: string;   // 차시예고
      farewell: string;     // 인사하기
    };
  };
  
  evaluation: {
    criteria: EvaluationCriteria[];
    reflection: {
      strengths: string;
    improvements: string;
      nextPlans: string;
    };
  };
  
  specialNeeds: {
    communicationSupport: string[];  // 의사소통 지원
    learningSupport: string[];       // 학습 지원
    behaviorSupport: string[];       // 행동 지원
    sensorySupport: string[];        // 감각 지원
    participationSupport: string[];  // 참여 지원
  };
}

interface EvaluationCriteria {
  area: string;           // 평가 영역
  description: string;    // 평가 기준
  levels: {
    high: string;         // 가 수준 기준
    middle: string;       // 나 수준 기준  
    low: string;          // 다 수준 기준
  };
}
```

## 핵심 기능 요구사항

### 1. 수업지도안 작성 폼 (Create Page)

특수교육 PDF 파일의 구조를 기반으로 한 단계별 작성 폼:

#### 도입 섹션
- 인사하기 및 수업 종료 알림
- 전시학습 상기 (힌트 제공, 확인, 오류수정, 강화)
- 동기유발 (동영상, 교사질문 패턴)
- 학습목표 제시 (수준별 읽기 지원)
- 활동 제시

#### 전개 섹션
- **활동1**: 자료를 통한 설명
  - 정답 예측/확인
  - 수준별 확인 발문 (가/나/다 수준)
  - 문제행동 중재 (행동계약, 또래 모델링)
  - 학습지/교과서 활용 (태블릿PC, 교과서, 학습지)
  - 제한시간 설정
  - 또래교수를 통한 도움제공
  - 정답확인

- **활동2**: 협력 활동
  - 팀/짝 정하기
  - 시범 보이기
  - 수행 연습 (5분)
  - 오류수정 (또래교수)
  - 수행-피드백
  - 주의집중 지도
  - 점수기제 운영

#### 정리 섹션
- 평가 (O/X 카드 활용)
- 차시예고
- 인사하기

### 2. 수준별 지원 기능

각 활동에서 학생 수준별 차별화된 지원 명시:
- **가 수준**: 고급 사고력, 리더십 발휘
- **나 수준**: 기본 이해, 협력적 참여  
- **다 수준**: 기초 참여, 지원 받아 활동

### 3. 특수교육적 지원 요소

- **의사소통 지원**: AAC, 태블릿PC, 그림카드
- **학습 지원**: 수준별 학습지, 또래교수, 실무원 지원
- **행동 지원**: 행동계약, 모델링, 강화 시스템
- **참여 지원**: 역할 분담, 선택권 제공

### 4. 수업지도안 관리 기능

- 작성된 지도안 목록 보기
- 수정 및 삭제
- 상세보기 및 인쇄 기능 (인쇄 최적화 CSS)
- JSON 형태로 데이터 내보내기

## 수업지도안 작성 품질 평가 기준

수업지도안 작성의 완성도를 평가하는 기준:

### 1. 기본 정보 완성도 (20점)
- [ ] 수업 주제가 명확하고 구체적인가? (5점)
- [ ] 수업 대상과 수준별 학생 수가 정확히 기재되었는가? (5점)
- [ ] 수업 시간과 차시가 적절히 설정되었는가? (5점)
- [ ] 필요한 모든 기본 정보가 빠짐없이 작성되었는가? (5점)

### 2. 학습목표 설정 (20점)
- [ ] 주요 학습목표가 구체적이고 측정 가능한가? (10점)
- [ ] 수준별 학습목표가 학생 특성에 맞게 차별화되었는가? (10점)

### 3. 수업 활동 설계 (25점)
- [ ] 도입-전개-정리의 흐름이 논리적인가? (5점)
- [ ] 각 활동의 내용이 구체적으로 기술되었는가? (10점)
- [ ] 수준별 지원 방안이 명확히 제시되었는가? (10점)

### 4. 특수교육적 지원 (20점)
- [ ] 의사소통 지원 방안이 적절한가? (5점)
- [ ] 행동 지원 전략이 구체적인가? (5점)
- [ ] 학습 지원 도구가 적절히 선택되었는가? (5점)
- [ ] 참여 지원 방안이 다양하게 제시되었는가? (5점)

### 5. 평가 및 성찰 (15점)
- [ ] 평가 기준이 학습목표와 연결되어 있는가? (7점)
- [ ] 수업 성찰 내용이 구체적이고 발전적인가? (8점)

### 품질 등급
- **우수 (90-100점)**: 모든 요소가 완벽하게 작성된 지도안
- **양호 (80-89점)**: 대부분 요소가 잘 작성되었으나 일부 보완 필요
- **보통 (70-79점)**: 기본 요소는 갖추었으나 특수교육적 관점 보완 필요
- **미흡 (60-69점)**: 필수 요소 일부 누락, 상당한 수정 필요
- **불충족 (60점 미만)**: 전면적인 재작성 필요

## UI/UX 요구사항

### 1. 반응형 디자인
- 데스크톱, 태블릿, 모바일 최적화
- 접근성 고려 (키보드 네비게이션, 스크린 리더 지원)

### 2. 사용자 경험
- 단계별 진행 표시
- 실시간 저장 기능
- 입력 검증 및 오류 메시지
- 도움말 및 가이드 제공

### 3. 인쇄 최적화
- 인쇄 시 깔끔한 레이아웃
- 페이지 구분 최적화
- 불필요한 요소 숨김

## 추가 구현 사항

### 1. 템플릿 기능
- 자주 사용하는 수업 형태별 템플릿 제공
- 개인 맞춤 템플릿 저장

### 2. 내보내기/가져오기
- JSON 형태로 데이터 내보내기
- 다른 시스템에서 가져오기

### 3. 검색 및 필터링
- 과목별, 날짜별, 키워드별 검색
- 수업 형태별 필터링

이 프롬프트를 기반으로 특수교육 수업지도안 작성 시스템을 구현해주세요. 첨부된 PDF 파일의 구조와 내용을 정확히 반영하여 실제 특수교육 현장에서 활용 가능한 도구를 만들어주세요.# 특수교육 수업지도안 작성 시스템 구현 프롬프트

## 시스템 개요

특수교육 전공자를 위한 체계적인 수업지도안 작성 및 관리 플랫폼을 구현해주세요. 이 시스템은 첨부된 특수교육 수업지도안 PDF 파일의 구조와 형식을 기반으로 합니다.

## 기술 스택
- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS  
- **Data Storage**: 로컬 스토리지 (브라우저)
- **Build Tool**: Turbopack

## 수업지도안 데이터 구조

```typescript
interface LessonPlan {
  id: string;
  basicInfo: {
    title: string;           // 수업 주제
    subject: string;         // 과목
    unit: string;           // 단원
    lesson: string;         // 차시 (예: "3/8차시")
    grade: string;          // 학년
    duration: number;       // 수업 시간 (분)
    date: string;           // 수업 날짜
    teacher: string;        // 지도 교사
    students: {             // 수업 대상
      total: number;
      levels: {
        high: number;       // 가 수준
        middle: number;     // 나 수준  
        low: number;        // 다 수준
      }
    }
  };
  
  objectives: {
    main: string;           // 주요 학습 목표
    byLevel: {
      high: string;         // 가 수준 목표
      middle: string;       // 나 수준 목표
      low: string;          // 다 수준 목표
    }
  };
  
  materials: {
    teacher: string[];      // 교사 준비물
    student: string[];      // 학생 준비물
    assistive: string[];    // 보조 도구 (AAC, 태블릿PC 등)
  };
  
  activities: {
    introduction: {         // 도입 (5분)
      greeting: string;     // 인사하기
      review: string;       // 전시학습 상기
      motivation: string;   // 동기유발
      objectives: string;   // 학습목표 제시
      preview: string;      // 활동 제시
    };
    
    development: {          // 전개 (30분)
      activity1: {
        title: string;
        content: string;
        materials: string;
        levelSupport: {
          high: string;
          middle: string;
          low: string;
        };
        behaviorSupport: {
          contract: string;
          modeling: string;
        };
        assessment: string;
      };
      activity2: {
        title: string;
        content: string;
        teamwork: string;
        demonstration: string;
        practice: string;
        feedback: string;
        scoring: string;
      };
    };
    
    closure: {              // 정리 (5분)
      evaluation: string;   // 평가 (O/X 카드 등)
      nextLesson: string;   // 차시예고
      farewell: string;     // 인사하기
    };
  };
  
  evaluation: {
    criteria: EvaluationCriteria[];
    reflection: {
      strengths: string;
    improvements: string;
      nextPlans: string;
    };
  };
  
  specialNeeds: {
    communicationSupport: string[];  // 의사소통 지원
    learningSupport: string[];       // 학습 지원
    behaviorSupport: string[];       // 행동 지원
    sensorySupport: string[];        // 감각 지원
    participationSupport: string[];  // 참여 지원
  };
}

interface EvaluationCriteria {
  area: string;           // 평가 영역
  description: string;    // 평가 기준
  levels: {
    high: string;         // 가 수준 기준
    middle: string;       // 나 수준 기준  
    low: string;          // 다 수준 기준
  };
}
```

## 핵심 기능 요구사항

### 1. 수업지도안 작성 폼 (Create Page)

특수교육 PDF 파일의 구조를 기반으로 한 단계별 작성 폼:

#### 도입 섹션
- 인사하기 및 수업 종료 알림
- 전시학습 상기 (힌트 제공, 확인, 오류수정, 강화)
- 동기유발 (동영상, 교사질문 패턴)
- 학습목표 제시 (수준별 읽기 지원)
- 활동 제시

#### 전개 섹션
- **활동1**: 자료를 통한 설명
  - 정답 예측/확인
  - 수준별 확인 발문 (가/나/다 수준)
  - 문제행동 중재 (행동계약, 또래 모델링)
  - 학습지/교과서 활용 (태블릿PC, 교과서, 학습지)
  - 제한시간 설정
  - 또래교수를 통한 도움제공
  - 정답확인

- **활동2**: 협력 활동
  - 팀/짝 정하기
  - 시범 보이기
  - 수행 연습 (5분)
  - 오류수정 (또래교수)
  - 수행-피드백
  - 주의집중 지도
  - 점수기제 운영

#### 정리 섹션
- 평가 (O/X 카드 활용)
- 차시예고
- 인사하기

### 2. 수준별 지원 기능

각 활동에서 학생 수준별 차별화된 지원 명시:
- **가 수준**: 고급 사고력, 리더십 발휘
- **나 수준**: 기본 이해, 협력적 참여  
- **다 수준**: 기초 참여, 지원 받아 활동

### 3. 특수교육적 지원 요소

- **의사소통 지원**: AAC, 태블릿PC, 그림카드
- **학습 지원**: 수준별 학습지, 또래교수, 실무원 지원
- **행동 지원**: 행동계약, 모델링, 강화 시스템
- **참여 지원**: 역할 분담, 선택권 제공

### 4. 수업지도안 관리 기능

- 작성된 지도안 목록 보기
- 수정 및 삭제
- 상세보기 및 인쇄 기능 (인쇄 최적화 CSS)
- JSON 형태로 데이터 내보내기

## 수업지도안 작성 품질 평가 기준

수업지도안 작성의 완성도를 평가하는 기준:

### 1. 기본 정보 완성도 (20점)
- [ ] 수업 주제가 명확하고 구체적인가? (5점)
- [ ] 수업 대상과 수준별 학생 수가 정확히 기재되었는가? (5점)
- [ ] 수업 시간과 차시가 적절히 설정되었는가? (5점)
- [ ] 필요한 모든 기본 정보가 빠짐없이 작성되었는가? (5점)

### 2. 학습목표 설정 (20점)
- [ ] 주요 학습목표가 구체적이고 측정 가능한가? (10점)
- [ ] 수준별 학습목표가 학생 특성에 맞게 차별화되었는가? (10점)

### 3. 수업 활동 설계 (25점)
- [ ] 도입-전개-정리의 흐름이 논리적인가? (5점)
- [ ] 각 활동의 내용이 구체적으로 기술되었는가? (10점)
- [ ] 수준별 지원 방안이 명확히 제시되었는가? (10점)

### 4. 특수교육적 지원 (20점)
- [ ] 의사소통 지원 방안이 적절한가? (5점)
- [ ] 행동 지원 전략이 구체적인가? (5점)
- [ ] 학습 지원 도구가 적절히 선택되었는가? (5점)
- [ ] 참여 지원 방안이 다양하게 제시되었는가? (5점)

### 5. 평가 및 성찰 (15점)
- [ ] 평가 기준이 학습목표와 연결되어 있는가? (7점)
- [ ] 수업 성찰 내용이 구체적이고 발전적인가? (8점)

### 품질 등급
- **우수 (90-100점)**: 모든 요소가 완벽하게 작성된 지도안
- **양호 (80-89점)**: 대부분 요소가 잘 작성되었으나 일부 보완 필요
- **보통 (70-79점)**: 기본 요소는 갖추었으나 특수교육적 관점 보완 필요
- **미흡 (60-69점)**: 필수 요소 일부 누락, 상당한 수정 필요
- **불충족 (60점 미만)**: 전면적인 재작성 필요

## UI/UX 요구사항

### 1. 반응형 디자인
- 데스크톱, 태블릿, 모바일 최적화
- 접근성 고려 (키보드 네비게이션, 스크린 리더 지원)

### 2. 사용자 경험
- 단계별 진행 표시
- 실시간 저장 기능
- 입력 검증 및 오류 메시지
- 도움말 및 가이드 제공

### 3. 인쇄 최적화
- 인쇄 시 깔끔한 레이아웃
- 페이지 구분 최적화
- 불필요한 요소 숨김

## 추가 구현 사항

### 1. 템플릿 기능
- 자주 사용하는 수업 형태별 템플릿 제공
- 개인 맞춤 템플릿 저장

### 2. 내보내기/가져오기
- JSON 형태로 데이터 내보내기
- 다른 시스템에서 가져오기

### 3. 검색 및 필터링
- 과목별, 날짜별, 키워드별 검색
- 수업 형태별 필터링

이 프롬프트를 기반으로 특수교육 수업지도안 작성 시스템을 구현해주세요. 첨부된 PDF 파일의 구조와 내용을 정확히 반영하여 실제 특수교육 현장에서 활용 가능한 도구를 만들어주세요.