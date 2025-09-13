'use client';

import { useState } from 'react';
import { exampleLessonPlans, subjectTemplates, ExampleLessonPlan } from '@/lib/examples';
import { saveLessonPlan } from '@/lib/storage';
import { useRouter } from 'next/navigation';

export default function ExamplesPage() {
  const [selectedExample, setSelectedExample] = useState<string | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [curriculumCategoryFilter, setCurriculumCategoryFilter] = useState<string>('all');
  const [curriculumDomainFilter, setCurriculumDomainFilter] = useState<string>('all');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [disabilityTypeFilter, setDisabilityTypeFilter] = useState<string>('all');
  const [disabilitySeverityFilter, setDisabilitySeverityFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const router = useRouter();

  // 필터링된 예시들
  const filteredExamples = exampleLessonPlans.filter(plan => {
    if (curriculumCategoryFilter !== 'all' && plan.curriculumArea.category !== curriculumCategoryFilter) return false;
    if (curriculumDomainFilter !== 'all' && plan.curriculumArea.domain !== curriculumDomainFilter) return false;
    if (subjectFilter !== 'all' && plan.curriculumArea.subject !== subjectFilter) return false;
    if (disabilityTypeFilter !== 'all' && plan.disabilityLevel.type !== disabilityTypeFilter) return false;
    if (disabilitySeverityFilter !== 'all' && plan.disabilityLevel.severity !== disabilitySeverityFilter) return false;
    if (difficultyFilter !== 'all' && plan.difficulty !== difficultyFilter) return false;
    return true;
  });

  // 고유한 값들 추출
  const curriculumCategories = [...new Set(exampleLessonPlans.map(plan => plan.curriculumArea.category))];
  const curriculumDomains = [...new Set(exampleLessonPlans.map(plan => plan.curriculumArea.domain))];
  const subjects = [...new Set(exampleLessonPlans.map(plan => plan.curriculumArea.subject))];
  const disabilityTypes = [...new Set(exampleLessonPlans.map(plan => plan.disabilityLevel.type))];
  const disabilitySeverities = ['경도', '중도', '중증'];
  const difficulties = ['basic', 'intermediate', 'advanced'];

  const handleUseExample = (exampleId: string) => {
    const example = exampleLessonPlans.find(plan => plan.id === exampleId);
    if (example) {
      // 새로운 ID로 복사하여 저장
      const newPlan = {
        ...example,
        id: `copy-${Date.now()}`,
        title: `${example.title} (복사본)`,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      saveLessonPlan(newPlan);
      router.push(`/edit/${newPlan.id}`);
    }
  };

  const selectedPlan = selectedExample ? 
    exampleLessonPlans.find(plan => plan.id === selectedExample) : null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            수업지도안 예시 및 템플릿
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            경험이 적은 전공자들을 위한 실제 수업지도안 예시와 교과별 템플릿을 제공합니다.
            예시를 참고하여 나만의 수업지도안을 작성해보세요.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-1 flex">
            <button
              onClick={() => setShowTemplates(false)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                !showTemplates 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              예시 지도안
            </button>
            <button
              onClick={() => setShowTemplates(true)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                showTemplates 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              교과별 템플릿
            </button>
          </div>
        </div>

        {!showTemplates ? (
          <div className="space-y-6">
            {/* 필터 섹션 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">2022 개정 특수교육과정 기반 필터링</h3>
              
              {/* 교육과정 필터 */}
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-800 mb-3">📚 교육과정 영역</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">과정 분류</label>
                    <select
                      value={curriculumCategoryFilter}
                      onChange={(e) => setCurriculumCategoryFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">전체 과정</option>
                      {curriculumCategories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">교과 영역</label>
                    <select
                      value={curriculumDomainFilter}
                      onChange={(e) => setCurriculumDomainFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">전체 영역</option>
                      {curriculumDomains.map((domain) => (
                        <option key={domain} value={domain}>{domain}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">교과목</label>
                    <select
                      value={subjectFilter}
                      onChange={(e) => setSubjectFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">전체 교과</option>
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* 장애 수준 필터 */}
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-800 mb-3">🧠 장애 수준</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">장애 유형</label>
                    <select
                      value={disabilityTypeFilter}
                      onChange={(e) => setDisabilityTypeFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">전체 장애 유형</option>
                      {disabilityTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">장애 정도</label>
                    <select
                      value={disabilitySeverityFilter}
                      onChange={(e) => setDisabilitySeverityFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">전체 장애 정도</option>
                      {disabilitySeverities.map((severity) => (
                        <option key={severity} value={severity}>{severity}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* 난이도 필터 */}
              <div className="mb-4">
                <h4 className="text-md font-medium text-gray-800 mb-3">📈 수업 난이도</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">난이도</label>
                    <select
                      value={difficultyFilter}
                      onChange={(e) => setDifficultyFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">전체 난이도</option>
                      <option value="basic">기본</option>
                      <option value="intermediate">중급</option>
                      <option value="advanced">고급</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  총 {filteredExamples.length}개의 예시가 있습니다.
                </span>
                <button
                  onClick={() => {
                    setCurriculumCategoryFilter('all');
                    setCurriculumDomainFilter('all');
                    setSubjectFilter('all');
                    setDisabilityTypeFilter('all');
                    setDisabilitySeverityFilter('all');
                    setDifficultyFilter('all');
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  전체 필터 초기화
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 예시 목록 */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">실제 수업지도안 예시</h2>
                {filteredExamples.map((plan) => (
                  <div
                    key={plan.id}
                    className={`bg-white rounded-lg shadow-sm border p-6 cursor-pointer transition-all hover:shadow-md ${
                      selectedExample === plan.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedExample(plan.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {plan.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 text-sm mb-3">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {plan.curriculumArea.subject}
                          </span>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            {plan.curriculumArea.domain}
                          </span>
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                            {plan.disabilityLevel.type}
                          </span>
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                            {plan.disabilityLevel.severity}
                          </span>
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {plan.difficulty === 'basic' ? '기본' : plan.difficulty === 'intermediate' ? '중급' : '고급'}
                          </span>
                          <span className="text-gray-500">{plan.grade}</span>
                          <span className="text-gray-500">{plan.duration}분</span>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {plan.learningObjectives[0]}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUseExample(plan.id);
                        }}
                        className="ml-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                      >
                        템플릿 사용
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* 선택된 예시 상세보기 */}
              <div className="lg:sticky lg:top-8">
                {selectedPlan ? (
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {selectedPlan.title}
                    </h3>
                    
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <div className="space-y-3">
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">📚 교육과정 정보</h5>
                          <div className="flex flex-wrap items-center gap-2 text-sm">
                            <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded font-medium">
                              {selectedPlan.curriculumArea.category}
                            </span>
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">
                              {selectedPlan.curriculumArea.subject}
                            </span>
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                              {selectedPlan.curriculumArea.domain}
                            </span>
                          </div>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">🧠 장애 수준 정보</h5>
                          <div className="flex flex-wrap items-center gap-2 text-sm">
                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded font-medium">
                              {selectedPlan.disabilityLevel.type}
                            </span>
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded font-medium">
                              {selectedPlan.disabilityLevel.severity}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{selectedPlan.disabilityLevel.functionalLevel}</p>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">📈 수업 정보</h5>
                          <div className="flex flex-wrap items-center gap-2 text-sm">
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded font-medium">
                              {selectedPlan.difficulty === 'basic' ? '기본' : selectedPlan.difficulty === 'intermediate' ? '중급' : '고급'}
                            </span>
                            <span className="text-gray-600">{selectedPlan.grade}</span>
                            <span className="text-gray-600">{selectedPlan.duration}분</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">학습목표</h4>
                        <ul className="space-y-1">
                          {selectedPlan.learningObjectives.map((objective, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start">
                              <span className="text-blue-500 mr-2">•</span>
                              {objective}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">대상 학생</h4>
                        {selectedPlan.targetStudents.map((student, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-3">
                            <p className="text-sm"><strong>장애:</strong> {student.disability}</p>
                            <p className="text-sm"><strong>현재 수준:</strong> {student.currentLevel}</p>
                            <p className="text-sm"><strong>목표:</strong> {student.goals}</p>
                          </div>
                        ))}
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">지원 필요 사항</h4>
                        <div className="bg-orange-50 rounded-lg p-3">
                          <p className="text-sm text-orange-800">{selectedPlan.disabilityLevel.supportNeeds}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">교수방법</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedPlan.teachingMethods.map((method, index) => (
                            <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                              {method}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">수업활동</h4>
                        <div className="space-y-2">
                          {selectedPlan.activities.map((activity, index) => (
                            <div key={index} className="border-l-4 border-blue-200 pl-3">
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-sm">{activity.phase}</span>
                                <span className="text-xs text-gray-500">{activity.time}분</span>
                              </div>
                              <p className="text-sm text-gray-600">{activity.activity}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <button
                          onClick={() => handleUseExample(selectedPlan.id)}
                          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                          이 예시를 템플릿으로 사용하기
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-100 rounded-lg p-8 text-center">
                    <p className="text-gray-500">예시를 선택하면 상세 내용을 확인할 수 있습니다.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(subjectTemplates).map(([subject, template]) => (
              <div key={subject} className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{subject}</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2 text-sm">일반적 학습목표</h4>
                    <ul className="space-y-1">
                      {template.commonObjectives.slice(0, 2).map((objective, index) => (
                        <li key={index} className="text-xs text-gray-600 flex items-start">
                          <span className="text-blue-500 mr-1">•</span>
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2 text-sm">추천 교수방법</h4>
                    <div className="flex flex-wrap gap-1">
                      {template.recommendedMethods.slice(0, 3).map((method, index) => (
                        <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                          {method}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2 text-sm">주요 교구</h4>
                    <div className="flex flex-wrap gap-1">
                      {template.typicalMaterials.slice(0, 3).map((material, index) => (
                        <span key={index} className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => router.push(`/create?subject=${encodeURIComponent(subject)}`)}
                  className="w-full mt-4 bg-gray-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  이 템플릿으로 시작하기
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <div className="bg-blue-50 rounded-lg p-6 max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              💡 수업지도안 작성 팁
            </h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p>• 학생의 현재 수준을 정확히 파악하고 적절한 목표를 설정하세요</p>
              <p>• 구체물 조작과 다감각 활동을 통해 학습 효과를 높이세요</p>
              <p>• 단계적 접근과 반복 학습으로 학습 내용을 정착시키세요</p>
              <p>• 학생의 성공 경험을 통해 자신감을 향상시키세요</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}