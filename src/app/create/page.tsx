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