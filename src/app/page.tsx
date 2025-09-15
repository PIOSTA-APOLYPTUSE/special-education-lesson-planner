"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { storage, LessonPlan } from "@/lib/storage";

export default function Home() {
  const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<LessonPlan[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    try {
      const plans = storage.getAllPlans();
      setLessonPlans(plans);
      setFilteredPlans(plans);
    } catch (error) {
      console.error('Failed to load lesson plans:', error);
      setLessonPlans([]);
      setFilteredPlans([]);
    }
  }, []);

  useEffect(() => {
    let filtered = lessonPlans;

    // 검색어 필터링
    if (searchTerm) {
      filtered = filtered.filter(plan => {
        const title = plan.basicInfo?.title || '';
        const subject = plan.basicInfo?.subject || '';
        const grade = plan.basicInfo?.grade || '';
        return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
               subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
               grade.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    setFilteredPlans(filtered);
  }, [lessonPlans, searchTerm]);


  const handleDeletePlan = (id: string) => {
    if (confirm("정말로 이 수업지도안을 삭제하시겠습니까?")) {
      try {
        const success = storage.deletePlan(id);
        if (success) {
          const updatedPlans = storage.getAllPlans();
          setLessonPlans(updatedPlans);
          setFilteredPlans(updatedPlans);
        } else {
          alert('수업지도안 삭제에 실패했습니다.');
        }
      } catch (error) {
        console.error('Error deleting plan:', error);
        alert('수업지도안 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const handleExportPlans = () => {
    try {
      const exportData = storage.exportPlans();
      const blob = new Blob([exportData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `lesson-plans-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting plans:', error);
      alert('내보내기 중 오류가 발생했습니다.');
    }
  };

  const handleImportPlans = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = e.target?.result as string;
        const success = storage.importPlans(jsonData);

        if (success) {
          const updatedPlans = storage.getAllPlans();
          setLessonPlans(updatedPlans);
          setFilteredPlans(updatedPlans);
          alert('수업지도안을 성공적으로 가져왔습니다.');
        } else {
          alert('가져오기에 실패했습니다. 파일을 확인해주세요.');
        }
      } catch (error) {
        console.error('Error importing plans:', error);
        alert('가져오기 중 오류가 발생했습니다.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section - 간결하게 */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            특수교육 수업지도안 작성 도구
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            특수교육전공자를 위한 체계적인 수업지도안 작성 및 관리 플랫폼
          </p>
        </header>

        {/* Main CTA - 가장 눈에 띄게 */}
        <div className="text-center mb-8">
          <Link
            href="/create"
            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 md:px-12 py-3 md:py-4 rounded-xl font-bold text-lg md:text-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="hidden sm:inline">새 수업지도안 작성하기</span>
            <span className="sm:hidden">새 지도안 작성</span>
          </Link>
        </div>

        {/* Secondary Actions - 더 작고 보조적으로 */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Link
            href="/examples"
            className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            예시 및 템플릿 보기
          </Link>

          {/* 내보내기/가져오기 버튼 - 조건부 */}
          {lessonPlans.length > 0 && (
            <>
              <button
                onClick={handleExportPlans}
                className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                내보내기
              </button>
              <label className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm cursor-pointer">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                가져오기
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportPlans}
                  className="hidden"
                />
              </label>
            </>
          )}
        </div>

        {/* 나의 수업지도안 섹션 - 우선순위 높여서 위로 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">나의 수업지도안</h2>
            {lessonPlans.length > 0 && (
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                총 {filteredPlans.length}개
              </span>
            )}
          </div>

          {/* 간단한 검색만 제공 */}
          {lessonPlans.length > 3 && (
            <div className="mb-6">
              <input
                type="text"
                placeholder="수업지도안 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {filteredPlans.length === 0 && lessonPlans.length > 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">검색 결과가 없습니다</h3>
              <p className="text-gray-500">다른 검색어나 필터를 사용해 보세요.</p>
            </div>
          ) : lessonPlans.length === 0 ? (
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
            <div className="grid gap-3">
              {filteredPlans.slice(0, 6).map((plan) => (
                <div key={plan.id} className="group border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate">{plan.basicInfo?.title || '수업지도안'}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          {plan.basicInfo?.subject || '과목 없음'}
                        </span>
                        <span className="text-sm text-gray-500">
                          {plan.basicInfo?.grade || '학년 없음'}
                        </span>
                      </div>
                      <p className="text-gray-500 text-xs mt-2 line-clamp-1">
                        {plan.objectives?.main || '학습목표 없음'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Link
                        href={`/view/${plan.id}`}
                        className="text-gray-400 hover:text-green-600 text-sm"
                        title="보기"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                      <Link
                        href={`/edit/${plan.id}`}
                        className="text-gray-400 hover:text-blue-600 text-sm"
                        title="수정"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleDeletePlan(plan.id)}
                        className="text-gray-400 hover:text-red-600 text-sm"
                        title="삭제"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredPlans.length > 6 && (
                <div className="text-center pt-4">
                  <Link
                    href="/dashboard"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    모든 수업지도안 보기 ({filteredPlans.length - 6}개 더)
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 축소된 기능 소개 - 접을 수 있는 형태로 하단에 */}
        <details className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <summary className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">플랫폼 주요 기능 알아보기</span>
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </summary>
          <div className="px-6 pb-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">체계적인 작성</h3>
                  <p className="text-gray-600 text-xs mt-1">특수교육 요구사항에 맞춘 구조화된 템플릿</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">개별화 지원</h3>
                  <p className="text-gray-600 text-xs mt-1">학생별 특성과 요구에 맞는 개별화 계획</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">쉬운 관리</h3>
                  <p className="text-gray-600 text-xs mt-1">체계적인 저장 및 관리 시스템</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">실제 예시 제공</h3>
                  <p className="text-gray-600 text-xs mt-1">완성된 예시와 교과별 템플릿</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">전문가 평가</h3>
                  <p className="text-gray-600 text-xs mt-1">AI 기반 품질 향상 지원</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">필수 체크리스트</h3>
                  <p className="text-gray-600 text-xs mt-1">놓치기 쉬운 필수 요소 점검</p>
                </div>
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}
