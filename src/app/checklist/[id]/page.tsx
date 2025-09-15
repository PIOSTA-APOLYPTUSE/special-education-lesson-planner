'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { LessonPlan, loadLessonPlan } from '@/lib/storage';
import { checkLessonPlan, LessonPlanChecklist, getChecklistByCategory } from '@/lib/checklist';

export default function ChecklistPage() {
  const params = useParams();
  const router = useRouter();
  const [lessonPlan, setLessonPlan] = useState<LessonPlan | null>(null);
  const [checklist, setChecklist] = useState<LessonPlanChecklist | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  useEffect(() => {
    const id = params.id as string;
    if (id) {
      try {
        const plan = loadLessonPlan(id);
        if (plan) {
          setLessonPlan(plan);
          const checklistResult = checkLessonPlan(plan);
          setChecklist(checklistResult);
          // 필수 항목이 미완료인 카테고리는 자동으로 확장
          const categorizedItems = getChecklistByCategory();
          const categoriesToExpand = new Set<string>();
          
          Object.entries(categorizedItems).forEach(([category, items]) => {
            const hasIncompleteRequired = items.some(item => {
              if (!item.required) return false;
              const result = checklistResult.results.find(r => r.itemId === item.id);
              return result && !result.completed;
            });
            if (hasIncompleteRequired) {
              categoriesToExpand.add(category);
            }
          });
          
          setExpandedCategories(categoriesToExpand);
        }
      } catch (error) {
        console.error('Error loading lesson plan for checklist:', error);
      }
      setLoading(false);
    }
  }, [params.id]);

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">체크리스트 확인 중...</p>
        </div>
      </div>
    );
  }

  if (!lessonPlan || !checklist) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">수업지도안을 찾을 수 없습니다.</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const categorizedItems = getChecklistByCategory();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                수업지도안 필수 체크리스트
              </h1>
              <p className="text-gray-600">{lessonPlan.basicInfo?.title || '수업지도안'}</p>
            </div>
            <button
              onClick={() => router.back()}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              뒤로가기
            </button>
          </div>
        </div>

        {/* 전체 진행 상황 */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">전체 진행 상황</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className={`text-3xl font-bold ${checklist.allRequiredCompleted ? 'text-green-600' : 'text-red-600'}`}>
                {checklist.allRequiredCompleted ? '✓' : '✗'}
              </div>
              <p className="text-sm text-gray-600">필수 항목 완료</p>
              <p className="text-xs text-gray-500">
                {checklist.requiredItemsCompleted}/{checklist.totalRequiredItems} 완료
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {checklist.completionRate}%
              </div>
              <p className="text-sm text-gray-600">전체 완성도</p>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    checklist.completionRate >= 80 ? 'bg-green-500' :
                    checklist.completionRate >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${checklist.completionRate}%` }}
                ></div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {checklist.results.filter(r => r.completed).length}/{checklist.results.length}
              </div>
              <p className="text-sm text-gray-600">완료된 항목</p>
            </div>
          </div>

          <div className={`rounded-lg p-4 ${
            checklist.allRequiredCompleted 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <p className={`font-medium ${
              checklist.allRequiredCompleted ? 'text-green-800' : 'text-red-800'
            }`}>
              {checklist.allRequiredCompleted 
                ? '🎉 모든 필수 항목이 완료되었습니다!' 
                : '⚠️ 아직 완료되지 않은 필수 항목이 있습니다.'
              }
            </p>
            {!checklist.allRequiredCompleted && (
              <p className="text-red-700 text-sm mt-1">
                효과적인 수업을 위해 모든 필수 항목을 완료해주세요.
              </p>
            )}
          </div>
        </div>

        {/* 카테고리별 체크리스트 */}
        <div className="space-y-4">
          {Object.entries(categorizedItems).map(([category, items]) => {
            const categoryResults = items.map(item => 
              checklist.results.find(r => r.itemId === item.id)
            ).filter(Boolean);
            
            const completedInCategory = categoryResults.filter(r => r?.completed).length;
            const requiredInCategory = items.filter(item => item.required).length;
            const requiredCompletedInCategory = items.filter(item => {
              const result = checklist.results.find(r => r.itemId === item.id);
              return item.required && result?.completed;
            }).length;

            return (
              <div key={category} className="bg-white rounded-lg shadow-sm border">
                <div 
                  className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleCategory(category)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
                      {requiredInCategory > 0 && (
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          requiredCompletedInCategory === requiredInCategory
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          필수 {requiredCompletedInCategory}/{requiredInCategory}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">
                        {completedInCategory}/{items.length} 완료
                      </span>
                      <span className={`transform transition-transform ${
                        expandedCategories.has(category) ? 'rotate-180' : ''
                      }`}>
                        ▼
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 bg-gray-200 rounded-full h-1">
                    <div
                      className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${(completedInCategory / items.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {expandedCategories.has(category) && (
                  <div className="border-t border-gray-200 p-4 space-y-3">
                    {items.map(item => {
                      const result = checklist.results.find(r => r.itemId === item.id);
                      const isCompleted = result?.completed || false;

                      return (
                        <div 
                          key={item.id} 
                          className={`p-3 rounded-lg border ${
                            isCompleted 
                              ? 'bg-green-50 border-green-200' 
                              : item.required 
                                ? 'bg-red-50 border-red-200' 
                                : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                              isCompleted 
                                ? 'bg-green-500 text-white' 
                                : item.required 
                                  ? 'bg-red-500 text-white' 
                                  : 'bg-gray-400 text-white'
                            }`}>
                              {isCompleted ? '✓' : '○'}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <h4 className="font-medium text-gray-900">{item.title}</h4>
                                {item.required && (
                                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                                    필수
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                              
                              {result?.notes && (
                                <div className="mt-2 bg-yellow-50 border border-yellow-200 rounded p-2">
                                  <p className="text-sm text-yellow-800">
                                    <span className="font-medium">개선 제안:</span> {result.notes}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 액션 버튼 */}
        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={() => router.push(`/edit/${lessonPlan.id}`)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            지도안 수정하기
          </button>
          <button
            onClick={() => router.push(`/evaluate/${lessonPlan.id}`)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            전문가 평가 보기
          </button>
          <button
            onClick={() => window.print()}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors print:hidden"
          >
            체크리스트 인쇄
          </button>
        </div>
      </div>
    </div>
  );
}