"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { storage, LessonPlan } from "@/lib/storage";

export default function Home() {
  const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>([]);

  useEffect(() => {
    setLessonPlans(storage.getAllPlans());
  }, []);

  const handleDeletePlan = (id: string) => {
    if (confirm("정말로 이 수업지도안을 삭제하시겠습니까?")) {
      storage.deletePlan(id);
      setLessonPlans(storage.getAllPlans());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            특수교육 수업지도안 작성 도구
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            특수교육전공자를 위한 체계적인 수업지도안 작성 및 관리 플랫폼
          </p>
          <Link
            href="/create"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            새 수업지도안 작성
          </Link>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">체계적인 작성</h3>
            <p className="text-gray-600">특수교육 요구사항에 맞춘 구조화된 수업지도안 템플릿을 제공합니다.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">개별화 지원</h3>
            <p className="text-gray-600">학생별 특성과 요구에 맞는 개별화된 교육계획 수립을 지원합니다.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">쉬운 관리</h3>
            <p className="text-gray-600">작성된 수업지도안을 체계적으로 저장하고 관리할 수 있습니다.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">최근 작성된 수업지도안</h2>
          {lessonPlans.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500 mb-4">아직 작성된 수업지도안이 없습니다.</p>
              <Link
                href="/create"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                첫 번째 수업지도안을 작성해보세요 →
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {lessonPlans.map((plan) => (
                <div key={plan.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-800">{plan.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{plan.subject} • {plan.grade}</p>
                  <p className="text-gray-500 text-xs mt-2 line-clamp-2">{plan.objectives}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-500">
                      {new Date(plan.date).toLocaleDateString('ko-KR')}
                    </span>
                    <div className="flex gap-2">
                      <Link
                        href={`/edit/${plan.id}`}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        수정하기
                      </Link>
                      <Link
                        href={`/view/${plan.id}`}
                        className="text-green-600 hover:text-green-700 text-sm font-medium"
                      >
                        보기
                      </Link>
                      <button
                        onClick={() => handleDeletePlan(plan.id)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
