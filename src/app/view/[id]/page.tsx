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
                  {plan.subject} • {plan.grade} • {plan.duration}분
                </div>
                <div className="text-gray-500 mt-2">
                  작성일: {plan.createdAt ? new Date(plan.createdAt).toLocaleDateString('ko-KR') : '날짜 없음'}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">학습 목표</h3>
                    <ul className="space-y-1">
                      {plan.learningObjectives?.map((objective, index) => (
                        <li key={index} className="text-gray-700">• {objective}</li>
                      )) || <li className="text-gray-500">학습목표 없음</li>}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">준비물 및 교구</h3>
                    <ul className="space-y-1">
                      {plan.materials?.map((material, index) => (
                        <li key={index} className="text-gray-700">• {material}</li>
                      )) || <li className="text-gray-500">교구 없음</li>}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">대상 학생 정보</h3>
                    {plan.targetStudents?.map((student, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-700"><strong>장애:</strong> {student.disability}</p>
                        <p className="text-gray-700"><strong>현재 수준:</strong> {student.currentLevel}</p>
                        <p className="text-gray-700"><strong>목표:</strong> {student.goals}</p>
                      </div>
                    )) || <p className="text-gray-500">학생 정보 없음</p>}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">교육적 지원 및 조정사항</h3>
                    <ul className="space-y-1">
                      {plan.accommodations?.map((accommodation, index) => (
                        <li key={index} className="text-gray-700">• {accommodation}</li>
                      )) || <li className="text-gray-500">지원 계획 없음</li>}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">평가 방법 및 기준</h3>
                    <ul className="space-y-1">
                      {plan.assessmentMethods?.map((method, index) => (
                        <li key={index} className="text-gray-700">• {method}</li>
                      )) || <li className="text-gray-500">평가방법 없음</li>}
                    </ul>
                  </div>

                  {plan.notes && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">특이사항 및 참고</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{plan.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 border-b pb-3">수업 활동</h3>
                
                <div className="grid gap-6">
                  {plan.activities?.map((activity, index) => (
                    <div key={index} className={`p-6 rounded-lg ${
                      activity.phase === '도입' ? 'bg-blue-50' :
                      activity.phase === '전개' ? 'bg-green-50' :
                      activity.phase === '정리' ? 'bg-purple-50' : 'bg-gray-50'
                    }`}>
                      <div className="flex justify-between items-center mb-3">
                        <h4 className={`text-lg font-semibold ${
                          activity.phase === '도입' ? 'text-blue-800' :
                          activity.phase === '전개' ? 'text-green-800' :
                          activity.phase === '정리' ? 'text-purple-800' : 'text-gray-800'
                        }`}>
                          {activity.phase} 활동
                        </h4>
                        <span className="text-sm text-gray-600">{activity.time}분</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{activity.activity}</p>
                      {activity.materials && (
                        <p className="text-sm text-gray-600 mt-2">교구: {activity.materials}</p>
                      )}
                      {activity.notes && (
                        <p className="text-sm text-gray-500 mt-1">참고: {activity.notes}</p>
                      )}
                    </div>
                  )) || (
                    <div className="bg-gray-50 p-6 rounded-lg text-center">
                      <p className="text-gray-500">수업 활동 정보가 없습니다.</p>
                    </div>
                  )}
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