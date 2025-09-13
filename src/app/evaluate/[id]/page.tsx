'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { LessonPlan, loadLessonPlan } from '@/lib/storage';
import { evaluateLessonPlan, LessonPlanEvaluation, evaluationCriteria } from '@/lib/evaluation';

export default function EvaluatePage() {
  const params = useParams();
  const router = useRouter();
  const [lessonPlan, setLessonPlan] = useState<LessonPlan | null>(null);
  const [evaluation, setEvaluation] = useState<LessonPlanEvaluation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params.id as string;
    if (id) {
      const plan = loadLessonPlan(id);
      if (plan) {
        setLessonPlan(plan);
        const evalResult = evaluateLessonPlan(plan);
        setEvaluation(evalResult);
      }
      setLoading(false);
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">평가 중...</p>
        </div>
      </div>
    );
  }

  if (!lessonPlan || !evaluation) {
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

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'text-green-600 bg-green-100';
      case 'B': return 'text-blue-600 bg-blue-100';
      case 'C': return 'text-yellow-600 bg-yellow-100';
      case 'D': return 'text-orange-600 bg-orange-100';
      case 'F': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600';
    if (score >= 3.5) return 'text-blue-600';
    if (score >= 2.5) return 'text-yellow-600';
    if (score >= 1.5) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                수업지도안 전문가 평가
              </h1>
              <p className="text-gray-600">{lessonPlan.title}</p>
            </div>
            <button
              onClick={() => router.back()}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              뒤로가기
            </button>
          </div>
        </div>

        {/* 전체 평가 결과 */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">전체 평가 결과</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full text-3xl font-bold ${getGradeColor(evaluation.grade)}`}>
                {evaluation.grade}
              </div>
              <p className="mt-2 text-sm text-gray-600">전체 등급</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {evaluation.percentage}%
              </div>
              <p className="text-sm text-gray-600">종합 점수</p>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${evaluation.percentage}%` }}
                ></div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {evaluation.overallScore}/{evaluation.maxPossibleScore}
            </div>
              <p className="text-sm text-gray-600">가중 점수</p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">전체 피드백</h3>
            <p className="text-blue-800">{evaluation.overallFeedback}</p>
          </div>
        </div>

        {/* 영역별 상세 평가 */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">영역별 상세 평가</h2>
          
          <div className="space-y-6">
            {evaluation.results.map((result, index) => {
              const criteria = evaluationCriteria.find(c => c.id === result.criteriaId);
              if (!criteria) return null;

              return (
                <div key={result.criteriaId} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{criteria.title}</h3>
                      <p className="text-sm text-gray-600">{criteria.description}</p>
                      <span className="inline-block mt-1 bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {criteria.category} • 가중치 {criteria.weight}%
                      </span>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getScoreColor(result.score)}`}>
                        {result.score}/5
                      </div>
                      <div className="flex items-center mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`text-lg ${
                              star <= result.score ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <p className="text-sm text-gray-700">{result.feedback}</p>
                  </div>

                  {result.suggestions.length > 0 && (
                    <div className="bg-yellow-50 rounded-lg p-3">
                      <h4 className="font-medium text-yellow-800 mb-2">개선 제안</h4>
                      <ul className="space-y-1">
                        {result.suggestions.map((suggestion, idx) => (
                          <li key={idx} className="text-sm text-yellow-700 flex items-start">
                            <span className="text-yellow-500 mr-2">•</span>
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 전체 개선 제안 */}
        {evaluation.improvementSuggestions.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">전체 개선 제안</h2>
            <div className="bg-green-50 rounded-lg p-4">
              <ul className="space-y-2">
                {evaluation.improvementSuggestions.map((suggestion, index) => (
                  <li key={index} className="text-sm text-green-700 flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* 액션 버튼 */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.push(`/edit/${lessonPlan.id}`)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            지도안 수정하기
          </button>
          <button
            onClick={() => router.push(`/checklist/${lessonPlan.id}`)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            체크리스트 확인하기
          </button>
          <button
            onClick={() => window.print()}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors print:hidden"
          >
            평가 결과 인쇄
          </button>
        </div>
      </div>
    </div>
  );
}