"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { storage, LessonPlan } from "@/lib/storage";

export default function CreateLessonPlan() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;

  const [formData, setFormData] = useState<Omit<LessonPlan, 'id' | 'createdAt' | 'updatedAt'>>({
    basicInfo: {
      title: '',
      subject: '',
      unit: '',
      lesson: '',
      grade: '',
      duration: 40,
      date: '',
      teacher: '',
      students: {
        total: 0,
        levels: { high: 0, middle: 0, low: 0 }
      }
    },
    objectives: {
      main: '',
      byLevel: { high: '', middle: '', low: '' }
    },
    materials: {
      teacher: [],
      student: [],
      assistive: []
    },
    activities: {
      introduction: {
        greeting: '',
        review: '',
        motivation: '',
        objectives: '',
        preview: ''
      },
      development: {
        activity1: {
          title: '',
          content: '',
          materials: '',
          levelSupport: { high: '', middle: '', low: '' },
          behaviorSupport: { contract: '', modeling: '' },
          assessment: ''
        },
        activity2: {
          title: '',
          content: '',
          teamwork: '',
          demonstration: '',
          practice: '',
          feedback: '',
          scoring: ''
        }
      },
      closure: {
        evaluation: '',
        nextLesson: '',
        farewell: ''
      }
    },
    evaluation: {
      criteria: [],
      reflection: {
        strengths: '',
        improvements: '',
        nextPlans: ''
      }
    },
    specialNeeds: {
      communicationSupport: [],
      learningSupport: [],
      behaviorSupport: [],
      sensorySupport: [],
      participationSupport: []
    }
  });

  const updateBasicInfo = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      basicInfo: { ...prev.basicInfo, [field]: value }
    }));
  };

  const updateStudentLevels = (level: 'high' | 'middle' | 'low', count: number) => {
    setFormData(prev => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        students: {
          ...prev.basicInfo.students,
          levels: { ...prev.basicInfo.students.levels, [level]: count },
          total: prev.basicInfo.students.levels.high +
                 prev.basicInfo.students.levels.middle +
                 prev.basicInfo.students.levels.low +
                 count - prev.basicInfo.students.levels[level]
        }
      }
    }));
  };

  const updateObjectives = (field: string, value: string) => {
    if (field === 'main') {
      setFormData(prev => ({
        ...prev,
        objectives: { ...prev.objectives, main: value }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        objectives: {
          ...prev.objectives,
          byLevel: { ...prev.objectives.byLevel, [field]: value }
        }
      }));
    }
  };

  const addMaterial = (category: 'teacher' | 'student' | 'assistive', item: string) => {
    if (item.trim()) {
      setFormData(prev => ({
        ...prev,
        materials: {
          ...prev.materials,
          [category]: [...prev.materials[category], item.trim()]
        }
      }));
    }
  };

  const removeMaterial = (category: 'teacher' | 'student' | 'assistive', index: number) => {
    setFormData(prev => ({
      ...prev,
      materials: {
        ...prev.materials,
        [category]: prev.materials[category].filter((_, i) => i !== index)
      }
    }));
  };

  const updateActivity = (section: 'introduction' | 'development' | 'closure', field: string, value: string, subField?: string) => {
    setFormData(prev => {
      if (section === 'development' && subField) {
        return {
          ...prev,
          activities: {
            ...prev.activities,
            development: {
              ...prev.activities.development,
              [field]: {
                ...prev.activities.development[field as keyof typeof prev.activities.development],
                [subField]: value
              }
            }
          }
        };
      } else {
        return {
          ...prev,
          activities: {
            ...prev.activities,
            [section]: {
              ...prev.activities[section],
              [field]: value
            }
          }
        };
      }
    });
  };

  const addSpecialNeed = (category: keyof typeof formData.specialNeeds, item: string) => {
    if (item.trim()) {
      setFormData(prev => ({
        ...prev,
        specialNeeds: {
          ...prev.specialNeeds,
          [category]: [...prev.specialNeeds[category], item.trim()]
        }
      }));
    }
  };

  const removeSpecialNeed = (category: keyof typeof formData.specialNeeds, index: number) => {
    setFormData(prev => ({
      ...prev,
      specialNeeds: {
        ...prev.specialNeeds,
        [category]: prev.specialNeeds[category].filter((_, i) => i !== index)
      }
    }));
  };

  const addEvaluationCriteria = () => {
    setFormData(prev => ({
      ...prev,
      evaluation: {
        ...prev.evaluation,
        criteria: [
          ...prev.evaluation.criteria,
          {
            area: '',
            description: '',
            levels: { high: '', middle: '', low: '' }
          }
        ]
      }
    }));
  };

  const updateEvaluationCriteria = (index: number, field: string, value: string, level?: string) => {
    setFormData(prev => {
      const newCriteria = [...prev.evaluation.criteria];
      if (level) {
        newCriteria[index] = {
          ...newCriteria[index],
          levels: {
            ...newCriteria[index].levels,
            [level]: value
          }
        };
      } else {
        newCriteria[index] = {
          ...newCriteria[index],
          [field]: value
        };
      }
      return {
        ...prev,
        evaluation: {
          ...prev.evaluation,
          criteria: newCriteria
        }
      };
    });
  };

  const removeEvaluationCriteria = (index: number) => {
    setFormData(prev => ({
      ...prev,
      evaluation: {
        ...prev.evaluation,
        criteria: prev.evaluation.criteria.filter((_, i) => i !== index)
      }
    }));
  };

  const updateReflection = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      evaluation: {
        ...prev.evaluation,
        reflection: {
          ...prev.evaluation.reflection,
          [field]: value
        }
      }
    }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      storage.savePlan(formData);
      alert("수업지도안이 저장되었습니다!");
      router.push('/');
    } catch (error) {
      console.error("저장 오류:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const StepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div key={i} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              i + 1 <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              {i + 1}
            </div>
            {i < totalSteps - 1 && (
              <div className={`w-12 h-1 ${
                i + 1 < currentStep ? 'bg-blue-600' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {currentStep === 1 && "기본 정보"}
          {currentStep === 2 && "학습 목표"}
          {currentStep === 3 && "준비물 및 교구"}
          {currentStep === 4 && "수업 활동 - 도입"}
          {currentStep === 5 && "수업 활동 - 전개"}
          {currentStep === 6 && "수업 활동 - 정리"}
          {currentStep === 7 && "특수교육 지원 및 평가"}
        </h2>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-800">특수교육 수업지도안 작성</h1>
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                홈으로 돌아가기
              </Link>
            </div>

            <StepIndicator />

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: 기본 정보 */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        수업 주제 *
                      </label>
                      <input
                        type="text"
                        value={formData.basicInfo.title}
                        onChange={(e) => updateBasicInfo('title', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        과목 *
                      </label>
                      <select
                        value={formData.basicInfo.subject}
                        onChange={(e) => updateBasicInfo('subject', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">과목 선택</option>
                        <option value="국어">국어</option>
                        <option value="수학">수학</option>
                        <option value="사회">사회</option>
                        <option value="과학">과학</option>
                        <option value="영어">영어</option>
                        <option value="체육">체육</option>
                        <option value="음악">음악</option>
                        <option value="미술">미술</option>
                        <option value="실과">실과</option>
                        <option value="도덕">도덕</option>
                        <option value="특수교육">특수교육</option>
                        <option value="기타">기타</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        단원
                      </label>
                      <input
                        type="text"
                        value={formData.basicInfo.unit}
                        onChange={(e) => updateBasicInfo('unit', e.target.value)}
                        placeholder="예: 1. 문학의 즐거움"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        차시
                      </label>
                      <input
                        type="text"
                        value={formData.basicInfo.lesson}
                        onChange={(e) => updateBasicInfo('lesson', e.target.value)}
                        placeholder="예: 3/8차시"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        학년 *
                      </label>
                      <select
                        value={formData.basicInfo.grade}
                        onChange={(e) => updateBasicInfo('grade', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">학년 선택</option>
                        <option value="초등 1학년">초등 1학년</option>
                        <option value="초등 2학년">초등 2학년</option>
                        <option value="초등 3학년">초등 3학년</option>
                        <option value="초등 4학년">초등 4학년</option>
                        <option value="초등 5학년">초등 5학년</option>
                        <option value="초등 6학년">초등 6학년</option>
                        <option value="중등 1학년">중등 1학년</option>
                        <option value="중등 2학년">중등 2학년</option>
                        <option value="중등 3학년">중등 3학년</option>
                        <option value="고등 1학년">고등 1학년</option>
                        <option value="고등 2학년">고등 2학년</option>
                        <option value="고등 3학년">고등 3학년</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        수업 시간 (분) *
                      </label>
                      <input
                        type="number"
                        value={formData.basicInfo.duration}
                        onChange={(e) => updateBasicInfo('duration', parseInt(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        수업 날짜 *
                      </label>
                      <input
                        type="date"
                        value={formData.basicInfo.date}
                        onChange={(e) => updateBasicInfo('date', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        지도 교사 *
                      </label>
                      <input
                        type="text"
                        value={formData.basicInfo.teacher}
                        onChange={(e) => updateBasicInfo('teacher', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">수업 대상 학생 정보</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          가 수준 (고급 사고력, 리더십)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={formData.basicInfo.students.levels.high}
                          onChange={(e) => updateStudentLevels('high', parseInt(e.target.value) || 0)}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          나 수준 (기본 이해, 협력적 참여)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={formData.basicInfo.students.levels.middle}
                          onChange={(e) => updateStudentLevels('middle', parseInt(e.target.value) || 0)}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          다 수준 (기초 참여, 지원 필요)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={formData.basicInfo.students.levels.low}
                          onChange={(e) => updateStudentLevels('low', parseInt(e.target.value) || 0)}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <span className="text-lg font-semibold text-blue-600">
                        총 학생 수: {formData.basicInfo.students.total}명
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: 학습 목표 */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      주요 학습 목표 *
                    </label>
                    <textarea
                      value={formData.objectives.main}
                      onChange={(e) => updateObjectives('main', e.target.value)}
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="이 수업을 통해 학생들이 달성해야 할 구체적이고 측정 가능한 학습 목표를 작성해주세요."
                      required
                    />
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">수준별 학습 목표</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          가 수준 목표 (고급 사고력 활용)
                        </label>
                        <textarea
                          value={formData.objectives.byLevel.high}
                          onChange={(e) => updateObjectives('high', e.target.value)}
                          rows={3}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="고급 사고력을 활용한 창의적 활동, 리더십 발휘 등의 목표"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          나 수준 목표 (기본 이해 및 적용)
                        </label>
                        <textarea
                          value={formData.objectives.byLevel.middle}
                          onChange={(e) => updateObjectives('middle', e.target.value)}
                          rows={3}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="기본 개념의 이해와 적용, 협력적 참여 등의 목표"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          다 수준 목표 (기초 참여 및 지원)
                        </label>
                        <textarea
                          value={formData.objectives.byLevel.low}
                          onChange={(e) => updateObjectives('low', e.target.value)}
                          rows={3}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="기초적 참여, 지원받아 활동 참여 등의 목표"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: 준비물 및 교구 */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <MaterialSection
                    title="교사 준비물"
                    items={formData.materials.teacher}
                    onAdd={(item) => addMaterial('teacher', item)}
                    onRemove={(index) => removeMaterial('teacher', index)}
                    placeholder="예: 교과서, PPT 자료, 화이트보드 등"
                  />

                  <MaterialSection
                    title="학생 준비물"
                    items={formData.materials.student}
                    onAdd={(item) => addMaterial('student', item)}
                    onRemove={(index) => removeMaterial('student', index)}
                    placeholder="예: 연필, 공책, 색연필 등"
                  />

                  <MaterialSection
                    title="보조 도구 (AAC, 보조공학 등)"
                    items={formData.materials.assistive}
                    onAdd={(item) => addMaterial('assistive', item)}
                    onRemove={(index) => removeMaterial('assistive', index)}
                    placeholder="예: 태블릿PC, AAC 기기, 점자 자료, 확대 도구 등"
                  />
                </div>
              )}

              {/* Step 4: 수업 활동 - 도입 */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      도입 활동 (5-10분)
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">학생들의 주의집중과 동기유발을 위한 활동을 계획해주세요.</p>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          인사하기 및 주의집중 *
                        </label>
                        <textarea
                          value={formData.activities.introduction.greeting}
                          onChange={(e) => updateActivity('introduction', 'greeting', e.target.value)}
                          rows={2}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="예: 안녕하세요? 모두 자리에 앉아서 선생님을 봐주세요. 손유희를 통해 주의집중 유도"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          전시학습 확인 *
                        </label>
                        <textarea
                          value={formData.activities.introduction.review}
                          onChange={(e) => updateActivity('introduction', 'review', e.target.value)}
                          rows={3}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="예: 지난 시간에 배운 내용을 그림카드로 확인하고, 학생별 수준에 맞는 질문으로 상기시키기"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          동기유발 활동 *
                        </label>
                        <textarea
                          value={formData.activities.introduction.motivation}
                          onChange={(e) => updateActivity('introduction', 'motivation', e.target.value)}
                          rows={3}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="예: 동영상 시청, 실물 자료 제시, 게임 활동 등을 통한 관심 유발"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          학습목표 제시 *
                        </label>
                        <textarea
                          value={formData.activities.introduction.objectives}
                          onChange={(e) => updateActivity('introduction', 'objectives', e.target.value)}
                          rows={2}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="예: 시각적 자료와 함께 쉬운 언어로 목표 제시, 수준별 읽기 지원 방법 포함"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          활동 예고 *
                        </label>
                        <textarea
                          value={formData.activities.introduction.preview}
                          onChange={(e) => updateActivity('introduction', 'preview', e.target.value)}
                          rows={2}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="예: 오늘 할 활동 순서 제시, 학생들의 불안감 해소를 위한 구체적 설명"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: 수업 활동 - 전개 */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      전개 활동 (20-30분)
                    </h3>

                    {/* 활동 1 */}
                    <div className="mb-8 bg-white p-6 rounded-lg border">
                      <h4 className="text-md font-semibold text-gray-800 mb-4 text-center bg-blue-100 py-2 px-4 rounded">
                        📚 활동 1: 핵심 학습 활동
                      </h4>

                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              활동 제목 *
                            </label>
                            <input
                              type="text"
                              value={formData.activities.development.activity1.title}
                              onChange={(e) => updateActivity('development', 'activity1', e.target.value, 'title')}
                              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="예: 자료를 통한 개념 설명"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              사용 교구/자료
                            </label>
                            <input
                              type="text"
                              value={formData.activities.development.activity1.materials}
                              onChange={(e) => updateActivity('development', 'activity1', e.target.value, 'materials')}
                              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="예: PPT, 교과서, 학습지, 태블릿PC"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            활동 내용 및 방법 *
                          </label>
                          <textarea
                            value={formData.activities.development.activity1.content}
                            onChange={(e) => updateActivity('development', 'activity1', e.target.value, 'content')}
                            rows={4}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="구체적인 활동 순서와 방법을 단계별로 기술해주세요. (정답 예측, 확인, 설명 등)"
                            required
                          />
                        </div>

                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-gray-800 mb-3">🎯 수준별 지원 방안</h5>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                가 수준 (고급 사고력, 리더십)
                              </label>
                              <textarea
                                value={formData.activities.development.activity1.levelSupport.high}
                                onChange={(e) => updateActivity('development', 'activity1', e.target.value, 'levelSupport.high')}
                                rows={2}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="예: 심화 질문, 또래 교수 역할, 창의적 해결방안 제시"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                나 수준 (기본 이해, 협력적 참여)
                              </label>
                              <textarea
                                value={formData.activities.development.activity1.levelSupport.middle}
                                onChange={(e) => updateActivity('development', 'activity1', e.target.value, 'levelSupport.middle')}
                                rows={2}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="예: 기본 질문, 단계별 안내, 협력 학습 참여"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                다 수준 (기초 참여, 지원 필요)
                              </label>
                              <textarea
                                value={formData.activities.development.activity1.levelSupport.low}
                                onChange={(e) => updateActivity('development', 'activity1', e.target.value, 'levelSupport.low')}
                                rows={2}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="예: 개별 지원, 시각적 단서 제공, 선택형 참여"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="bg-red-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-gray-800 mb-3">🛡️ 행동 지원 전략</h5>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                행동 계약/약속
                              </label>
                              <textarea
                                value={formData.activities.development.activity1.behaviorSupport.contract}
                                onChange={(e) => updateActivity('development', 'activity1', e.target.value, 'behaviorSupport.contract')}
                                rows={2}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="예: 활동 규칙 제시, 보상 체계 안내"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                또래 모델링
                              </label>
                              <textarea
                                value={formData.activities.development.activity1.behaviorSupport.modeling}
                                onChange={(e) => updateActivity('development', 'activity1', e.target.value, 'behaviorSupport.modeling')}
                                rows={2}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="예: 모범 학생 시연, 긍정적 행동 강화"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            평가 및 피드백 방법
                          </label>
                          <textarea
                            value={formData.activities.development.activity1.assessment}
                            onChange={(e) => updateActivity('development', 'activity1', e.target.value, 'assessment')}
                            rows={2}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="예: 즉시 피드백 제공, 정답 확인, 또래교수를 통한 도움 제공"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 활동 2 */}
                    <div className="bg-white p-6 rounded-lg border">
                      <h4 className="text-md font-semibold text-gray-800 mb-4 text-center bg-green-100 py-2 px-4 rounded">
                        🤝 활동 2: 협력 및 실습 활동
                      </h4>

                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              활동 제목 *
                            </label>
                            <input
                              type="text"
                              value={formData.activities.development.activity2.title}
                              onChange={(e) => updateActivity('development', 'activity2', e.target.value, 'title')}
                              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="예: 협력 활동, 실습 및 적용"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              팀 구성 방법
                            </label>
                            <input
                              type="text"
                              value={formData.activities.development.activity2.teamwork}
                              onChange={(e) => updateActivity('development', 'activity2', e.target.value, 'teamwork')}
                              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="예: 수준별 혼합 팀, 짝 활동"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            활동 내용 및 방법 *
                          </label>
                          <textarea
                            value={formData.activities.development.activity2.content}
                            onChange={(e) => updateActivity('development', 'activity2', e.target.value, 'content')}
                            rows={4}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="구체적인 협력 활동 내용과 학생들의 역할을 기술해주세요."
                            required
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              시범 및 모델링
                            </label>
                            <textarea
                              value={formData.activities.development.activity2.demonstration}
                              onChange={(e) => updateActivity('development', 'activity2', e.target.value, 'demonstration')}
                              rows={3}
                              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="예: 교사 시연, 학생 모델링, 단계별 안내"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              연습 시간 관리
                            </label>
                            <textarea
                              value={formData.activities.development.activity2.practice}
                              onChange={(e) => updateActivity('development', 'activity2', e.target.value, 'practice')}
                              rows={3}
                              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="예: 5분간 연습 시간, 개별 지원 제공"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              피드백 및 오류 수정
                            </label>
                            <textarea
                              value={formData.activities.development.activity2.feedback}
                              onChange={(e) => updateActivity('development', 'activity2', e.target.value, 'feedback')}
                              rows={3}
                              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="예: 또래교수를 통한 도움, 즉시 피드백 제공"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              점수제/강화 시스템
                            </label>
                            <textarea
                              value={formData.activities.development.activity2.scoring}
                              onChange={(e) => updateActivity('development', 'activity2', e.target.value, 'scoring')}
                              rows={3}
                              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="예: 팀별 점수제, 개별 강화 스티커"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: 수업 활동 - 정리 */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      정리 활동 (5-10분)
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">학습 내용을 정리하고 다음 차시로 연결하는 활동을 계획해주세요.</p>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          학습 내용 평가 및 정리 *
                        </label>
                        <textarea
                          value={formData.activities.closure.evaluation}
                          onChange={(e) => updateActivity('closure', 'evaluation', e.target.value)}
                          rows={4}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="예: O/X 카드를 활용한 이해도 확인, 핵심 내용 요약 질문, 개별 성취도 점검"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          차시 예고 및 동기 부여 *
                        </label>
                        <textarea
                          value={formData.activities.closure.nextLesson}
                          onChange={(e) => updateActivity('closure', 'nextLesson', e.target.value)}
                          rows={3}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="예: 다음 시간에 할 활동 소개, 흥미 유발, 연계 과제 안내"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          마무리 인사 및 정리 *
                        </label>
                        <textarea
                          value={formData.activities.closure.farewell}
                          onChange={(e) => updateActivity('closure', 'farewell', e.target.value)}
                          rows={2}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="예: 오늘 수업 소감 나누기, 정리 정돈, 인사하기"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 7: 특수교육 지원 및 평가 */}
              {currentStep === 7 && (
                <div className="space-y-6">
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">🎯 특수교육적 지원</h3>

                    <SpecialNeedsSection
                      title="의사소통 지원"
                      items={formData.specialNeeds.communicationSupport}
                      onAdd={(item) => addSpecialNeed('communicationSupport', item)}
                      onRemove={(index) => removeSpecialNeed('communicationSupport', index)}
                      placeholder="예: AAC 기기, 그림카드, 수화, 단순 언어 사용"
                    />

                    <SpecialNeedsSection
                      title="학습 지원"
                      items={formData.specialNeeds.learningSupport}
                      onAdd={(item) => addSpecialNeed('learningSupport', item)}
                      onRemove={(index) => removeSpecialNeed('learningSupport', index)}
                      placeholder="예: 수준별 학습지, 또래교수, 실무원 지원, 개별 지도"
                    />

                    <SpecialNeedsSection
                      title="행동 지원"
                      items={formData.specialNeeds.behaviorSupport}
                      onAdd={(item) => addSpecialNeed('behaviorSupport', item)}
                      onRemove={(index) => removeSpecialNeed('behaviorSupport', index)}
                      placeholder="예: 행동 계약, 토큰 시스템, 휴식 공간 제공, 긍정적 강화"
                    />

                    <SpecialNeedsSection
                      title="감각 지원"
                      items={formData.specialNeeds.sensorySupport}
                      onAdd={(item) => addSpecialNeed('sensorySupport', item)}
                      onRemove={(index) => removeSpecialNeed('sensorySupport', index)}
                      placeholder="예: 확대 도구, 점자 자료, 청각 보조 기구, 촉각 자료"
                    />

                    <SpecialNeedsSection
                      title="참여 지원"
                      items={formData.specialNeeds.participationSupport}
                      onAdd={(item) => addSpecialNeed('participationSupport', item)}
                      onRemove={(index) => removeSpecialNeed('participationSupport', index)}
                      placeholder="예: 역할 분담, 선택권 제공, 단계별 참여, 대안 활동"
                    />
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 평가 기준</h3>

                    <div className="mb-4">
                      <button
                        type="button"
                        onClick={addEvaluationCriteria}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        평가 기준 추가
                      </button>
                    </div>

                    <div className="space-y-4">
                      {formData.evaluation.criteria.map((criteria, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg border">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-semibold text-gray-800">평가 기준 {index + 1}</h4>
                            <button
                              type="button"
                              onClick={() => removeEvaluationCriteria(index)}
                              className="text-red-600 hover:text-red-700 text-sm"
                            >
                              삭제
                            </button>
                          </div>

                          <div className="space-y-3">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  평가 영역
                                </label>
                                <input
                                  type="text"
                                  value={criteria.area}
                                  onChange={(e) => updateEvaluationCriteria(index, 'area', e.target.value)}
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="예: 이해도, 참여도, 협력도"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  평가 기준
                                </label>
                                <input
                                  type="text"
                                  value={criteria.description}
                                  onChange={(e) => updateEvaluationCriteria(index, 'description', e.target.value)}
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="평가 내용 설명"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                수준별 평가 기준
                              </label>
                              <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">가 수준</label>
                                  <textarea
                                    value={criteria.levels.high}
                                    onChange={(e) => updateEvaluationCriteria(index, 'levels', e.target.value, 'high')}
                                    rows={2}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="고급 수준 기준"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">나 수준</label>
                                  <textarea
                                    value={criteria.levels.middle}
                                    onChange={(e) => updateEvaluationCriteria(index, 'levels', e.target.value, 'middle')}
                                    rows={2}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="중간 수준 기준"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">다 수준</label>
                                  <textarea
                                    value={criteria.levels.low}
                                    onChange={(e) => updateEvaluationCriteria(index, 'levels', e.target.value, 'low')}
                                    rows={2}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="기초 수준 기준"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      {formData.evaluation.criteria.length === 0 && (
                        <p className="text-gray-500 text-center py-4">평가 기준을 추가해주세요.</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">💭 수업 성찰</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          수업의 강점
                        </label>
                        <textarea
                          value={formData.evaluation.reflection.strengths}
                          onChange={(e) => updateReflection('strengths', e.target.value)}
                          rows={3}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="이 수업의 잘된 점, 효과적인 전략 등을 기록해주세요."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          개선 필요 사항
                        </label>
                        <textarea
                          value={formData.evaluation.reflection.improvements}
                          onChange={(e) => updateReflection('improvements', e.target.value)}
                          rows={3}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="보완이 필요한 부분, 어려웠던 점 등을 기록해주세요."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          다음 수업 계획
                        </label>
                        <textarea
                          value={formData.evaluation.reflection.nextPlans}
                          onChange={(e) => updateReflection('nextPlans', e.target.value)}
                          rows={3}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="다음 차시 계획, 추가 지원 방안 등을 기록해주세요."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex gap-4 pt-6">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                  >
                    이전
                  </button>
                )}

                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    다음
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    수업지도안 저장
                  </button>
                )}

                <Link
                  href="/"
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-colors text-center"
                >
                  취소
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// 준비물 섹션 컴포넌트
interface MaterialSectionProps {
  title: string;
  items: string[];
  onAdd: (item: string) => void;
  onRemove: (index: number) => void;
  placeholder: string;
}

function MaterialSection({ title, items, onAdd, onRemove, placeholder }: MaterialSectionProps) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    onAdd(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          추가
        </button>
      </div>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg">
            <span>{item}</span>
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              삭제
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-gray-500 text-center py-4">아직 추가된 항목이 없습니다.</p>
        )}
      </div>
    </div>
  );
}

// 특수교육 지원 섹션 컴포넌트
interface SpecialNeedsSectionProps {
  title: string;
  items: string[];
  onAdd: (item: string) => void;
  onRemove: (index: number) => void;
  placeholder: string;
}

function SpecialNeedsSection({ title, items, onAdd, onRemove, placeholder }: SpecialNeedsSectionProps) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    onAdd(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border mb-4">
      <h4 className="font-semibold text-gray-800 mb-3">{title}</h4>

      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          추가
        </button>
      </div>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm">
            <span>{item}</span>
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-red-600 hover:text-red-700 text-xs"
            >
              삭제
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-gray-500 text-center py-2 text-sm">지원 방안을 추가해주세요.</p>
        )}
      </div>
    </div>
  );
}