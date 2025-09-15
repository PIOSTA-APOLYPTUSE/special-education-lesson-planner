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

    const exportFileDefaultName = `${plan.basicInfo?.title || '수업지도안'}_수업지도안.json`;

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
          <p className="text-gray-600 mb-4">수업지도안을 찾을 수 없습니다.</p>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white">
      <div className="container mx-auto px-4 py-8 print:p-0">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 print:shadow-none print:rounded-none lesson-plan-print">
            {/* Header - 인쇄시 숨김 */}
            <div className="flex items-center justify-between mb-8 print:hidden">
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                목록으로 돌아가기
              </Link>

              <div className="flex gap-3">
                <button
                  onClick={handlePrint}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  인쇄
                </button>
                <button
                  onClick={handleExport}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  내보내기
                </button>
                <Link
                  href={`/edit/${plan.id}`}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  수정
                </Link>
              </div>
            </div>

            {/* 수업지도안 내용 */}
            <div className="space-y-8 lesson-plan-section">
              <div className="text-center border-b pb-6 lesson-plan-title">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {plan.basicInfo?.title || '특수교육 수업지도안'}
                </h1>
                <div className="text-lg text-gray-600">
                  {plan.basicInfo?.subject || '과목 없음'} • {plan.basicInfo?.grade || '학년 없음'} • {plan.basicInfo?.duration || 40}분
                </div>
                <div className="text-gray-500 mt-2">
                  작성일: {plan.createdAt ? new Date(plan.createdAt).toLocaleDateString('ko-KR') : '날짜 없음'}
                </div>
                {plan.basicInfo?.teacher && (
                  <div className="text-gray-500">
                    지도교사: {plan.basicInfo.teacher}
                  </div>
                )}
              </div>

              {/* 기본 정보 */}
              {plan.basicInfo && (
                <div className="lesson-plan-section">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">기본 정보</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p><strong>단원:</strong> {plan.basicInfo.unit || '단원 정보 없음'}</p>
                      <p><strong>차시:</strong> {plan.basicInfo.lesson || '차시 정보 없음'}</p>
                      <p><strong>수업 날짜:</strong> {plan.basicInfo.date || '날짜 없음'}</p>
                    </div>
                    <div>
                      <p><strong>전체 학생 수:</strong> {plan.basicInfo.students?.total || 0}명</p>
                      {plan.basicInfo.students && (
                        <div className="mt-2">
                          <p className="text-sm">• 가 수준: {plan.basicInfo.students.levels.high}명</p>
                          <p className="text-sm">• 나 수준: {plan.basicInfo.students.levels.middle}명</p>
                          <p className="text-sm">• 다 수준: {plan.basicInfo.students.levels.low}명</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 학습 목표 */}
              {plan.objectives && (
                <div className="lesson-plan-section">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">학습 목표</h2>
                  {plan.objectives.main && (
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-700 mb-2">주요 학습 목표</h3>
                      <p className="text-gray-700">{plan.objectives.main}</p>
                    </div>
                  )}
                  {(plan.objectives.byLevel.high || plan.objectives.byLevel.middle || plan.objectives.byLevel.low) && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2">수준별 학습 목표</h3>
                      {plan.objectives.byLevel.high && (
                        <p className="text-sm mb-1"><strong>가 수준:</strong> {plan.objectives.byLevel.high}</p>
                      )}
                      {plan.objectives.byLevel.middle && (
                        <p className="text-sm mb-1"><strong>나 수준:</strong> {plan.objectives.byLevel.middle}</p>
                      )}
                      {plan.objectives.byLevel.low && (
                        <p className="text-sm mb-1"><strong>다 수준:</strong> {plan.objectives.byLevel.low}</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* 준비물 */}
              {plan.materials && (
                <div className="lesson-plan-section">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">준비물 및 교구</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    {plan.materials.teacher.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-700 mb-2">교사 준비물</h3>
                        <ul className="space-y-1">
                          {plan.materials.teacher.map((item, index) => (
                            <li key={index} className="text-sm text-gray-700">• {item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {plan.materials.student.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-700 mb-2">학생 준비물</h3>
                        <ul className="space-y-1">
                          {plan.materials.student.map((item, index) => (
                            <li key={index} className="text-sm text-gray-700">• {item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {plan.materials.assistive.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-700 mb-2">보조 도구</h3>
                        <ul className="space-y-1">
                          {plan.materials.assistive.map((item, index) => (
                            <li key={index} className="text-sm text-gray-700">• {item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 수업 활동 */}
              {plan.activities && (
                <div className="lesson-plan-section">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">수업 활동</h2>

                  {/* 도입 */}
                  {plan.activities.introduction && (
                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                      <h3 className="font-semibold text-blue-800 mb-3">도입 (5분)</h3>
                      {plan.activities.introduction.greeting && (
                        <p className="text-sm mb-2"><strong>인사하기:</strong> {plan.activities.introduction.greeting}</p>
                      )}
                      {plan.activities.introduction.review && (
                        <p className="text-sm mb-2"><strong>전시학습 상기:</strong> {plan.activities.introduction.review}</p>
                      )}
                      {plan.activities.introduction.motivation && (
                        <p className="text-sm mb-2"><strong>동기유발:</strong> {plan.activities.introduction.motivation}</p>
                      )}
                    </div>
                  )}

                  {/* 전개 */}
                  {plan.activities.development && (
                    <div className="bg-green-50 p-4 rounded-lg mb-4">
                      <h3 className="font-semibold text-green-800 mb-3">전개 (30분)</h3>
                      {plan.activities.development.activity1.title && (
                        <div className="mb-3">
                          <h4 className="font-medium text-green-700">{plan.activities.development.activity1.title}</h4>
                          {plan.activities.development.activity1.content && (
                            <p className="text-sm text-gray-700">{plan.activities.development.activity1.content}</p>
                          )}
                        </div>
                      )}
                      {plan.activities.development.activity2.title && (
                        <div>
                          <h4 className="font-medium text-green-700">{plan.activities.development.activity2.title}</h4>
                          {plan.activities.development.activity2.content && (
                            <p className="text-sm text-gray-700">{plan.activities.development.activity2.content}</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 정리 */}
                  {plan.activities.closure && (
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-purple-800 mb-3">정리 (5분)</h3>
                      {plan.activities.closure.evaluation && (
                        <p className="text-sm mb-2"><strong>평가:</strong> {plan.activities.closure.evaluation}</p>
                      )}
                      {plan.activities.closure.nextLesson && (
                        <p className="text-sm mb-2"><strong>차시예고:</strong> {plan.activities.closure.nextLesson}</p>
                      )}
                      {plan.activities.closure.farewell && (
                        <p className="text-sm"><strong>인사하기:</strong> {plan.activities.closure.farewell}</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* 특수교육 지원 */}
              {plan.specialNeeds && (
                <div className="lesson-plan-section">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">특수교육 지원</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {plan.specialNeeds.communicationSupport.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-700 mb-2">의사소통 지원</h3>
                        <ul className="space-y-1">
                          {plan.specialNeeds.communicationSupport.map((item, index) => (
                            <li key={index} className="text-sm text-gray-700">• {item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {plan.specialNeeds.learningSupport.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-700 mb-2">학습 지원</h3>
                        <ul className="space-y-1">
                          {plan.specialNeeds.learningSupport.map((item, index) => (
                            <li key={index} className="text-sm text-gray-700">• {item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 평가 */}
              {plan.evaluation && (
                <div className="lesson-plan-section">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">평가 및 성찰</h2>
                  {plan.evaluation.reflection.strengths && (
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-700 mb-2">강점</h3>
                      <p className="text-gray-700">{plan.evaluation.reflection.strengths}</p>
                    </div>
                  )}
                  {plan.evaluation.reflection.improvements && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2">개선점</h3>
                      <p className="text-gray-700">{plan.evaluation.reflection.improvements}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}