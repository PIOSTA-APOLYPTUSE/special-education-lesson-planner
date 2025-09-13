"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { storage, LessonPlan } from "@/lib/storage";

export default function ViewLessonPlan() {
  const params = useParams();
  const [plan, setPlan] = useState<LessonPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const lessonPlan = storage.getPlan(params.id as string);
      setPlan(lessonPlan);
      setLoading(false);
    }
  }, [params.id]);

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    if (!plan) return;
    
    const dataStr = JSON.stringify(plan, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${plan.title}_수업지도안.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">수업지도안을 찾을 수 없습니다</h2>
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 print:shadow-none">
            <div className="flex items-center justify-between mb-8 print:hidden">
              <h1 className="text-3xl font-bold text-gray-800">수업지도안 상세보기</h1>
              <div className="flex gap-3">
                <button
                  onClick={handlePrint}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  인쇄하기
                </button>
                <button
                  onClick={handleExport}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  내보내기
                </button>
                <Link
                  href={`/edit/${plan.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  수정하기
                </Link>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-gray-700 font-medium flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  돌아가기
                </Link>
              </div>
            </div>

            <div className="space-y-8">
              <div className="text-center border-b pb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{plan.title}</h1>
                <div className="text-lg text-gray-600">
                  {plan.subject} • {plan.grade} • {plan.duration}
                </div>
                <div className="text-gray-500 mt-2">
                  수업 날짜: {new Date(plan.date).toLocaleDateString('ko-KR')}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">학습 목표</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{plan.objectives}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">준비물 및 교구</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{plan.materials || "없음"}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">학생의 특별한 요구사항</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{plan.studentNeeds}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">교육적 지원 및 조정사항</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{plan.accommodations}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">평가 방법 및 기준</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{plan.assessment}</p>
                  </div>

                  {plan.reflection && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">수업 후 반성 및 개선점</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{plan.reflection}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 border-b pb-3">수업 활동</h3>
                
                <div className="grid gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-blue-800 mb-3">도입 활동</h4>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{plan.activities.introduction}</p>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-green-800 mb-3">전개 활동</h4>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{plan.activities.development}</p>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-purple-800 mb-3">정리 활동</h4>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{plan.activities.conclusion}</p>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-500 border-t pt-4 print:block">
                <p>작성일: {new Date(plan.createdAt).toLocaleString('ko-KR')}</p>
                {plan.updatedAt !== plan.createdAt && (
                  <p>수정일: {new Date(plan.updatedAt).toLocaleString('ko-KR')}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}