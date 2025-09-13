'use client';

import { useState } from 'react';
import { exampleLessonPlans, subjectTemplates } from '@/lib/examples';
import { saveLessonPlan } from '@/lib/storage';
import { useRouter } from 'next/navigation';

export default function ExamplesPage() {
  const [selectedExample, setSelectedExample] = useState<string | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const router = useRouter();

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 예시 목록 */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">실제 수업지도안 예시</h2>
              {exampleLessonPlans.map((plan) => (
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
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {plan.subject}
                        </span>
                        <span>{plan.grade}</span>
                        <span>{plan.duration}분</span>
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
        ) : (
          /* 교과별 템플릿 */
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