"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { storage, LessonPlan } from "@/lib/storage";

export default function Home() {
  const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<LessonPlan[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [gradeFilter, setGradeFilter] = useState('all');

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

    // 과목 필터링
    if (subjectFilter !== 'all') {
      filtered = filtered.filter(plan => plan.basicInfo?.subject === subjectFilter);
    }

    // 학년 필터링
    if (gradeFilter !== 'all') {
      filtered = filtered.filter(plan => plan.basicInfo?.grade === gradeFilter);
    }

    setFilteredPlans(filtered);
  }, [lessonPlans, searchTerm, subjectFilter, gradeFilter]);

  // 고유한 과목과 학년 목록 추출
  const subjects = [...new Set(lessonPlans.map(plan => plan.basicInfo?.subject).filter(Boolean))];
  const grades = [...new Set(lessonPlans.map(plan => plan.basicInfo?.grade).filter(Boolean))];

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
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            특수교육 수업지도안 작성 도구
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            특수교육전공자를 위한 체계적인 수업지도안 작성 및 관리 플랫폼
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/create"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              새 수업지도안 작성
            </Link>
            <Link
              href="/examples"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
            >
              예시 및 템플릿 보기
            </Link>

            {/* 내보내기/가져오기 버튼 */}
            {lessonPlans.length > 0 && (
              <>
                <button
                  onClick={handleExportPlans}
                  className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg"
                >
                  내보내기
                </button>
                <label className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors shadow-lg cursor-pointer">
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

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m0-8v8m0-8h2a2 2 0 012 2v6a2 2 0 01-2 2H9m0-8V5zm0 8v-2m0 2h2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">실제 예시 제공</h3>
            <p className="text-gray-600">초보자를 위한 완성된 수업지도안 예시와 교과별 템플릿을 제공합니다.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">전문가 평가</h3>
            <p className="text-gray-600">AI 기반 전문가 평가로 수업지도안의 질을 향상시킬 수 있습니다.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">필수 체크리스트</h3>
            <p className="text-gray-600">놓치기 쉬운 필수 요소들을 체크리스트로 확인할 수 있습니다.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">나의 수업지도안</h2>

          {/* 검색 및 필터링 섹션 */}
          {lessonPlans.length > 0 && (
            <div className="mb-8 space-y-4">
              <div className="flex flex-wrap gap-4">
                {/* 검색 */}
                <div className="flex-1 min-w-[300px]">
                  <input
                    type="text"
                    placeholder="수업지도안 제목, 과목, 학년으로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* 과목 필터 */}
                <div className="min-w-[150px]">
                  <select
                    value={subjectFilter}
                    onChange={(e) => setSubjectFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">전체 과목</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                {/* 학년 필터 */}
                <div className="min-w-[150px]">
                  <select
                    value={gradeFilter}
                    onChange={(e) => setGradeFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">전체 학년</option>
                    {grades.map((grade) => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 결과 인사 */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>총 {filteredPlans.length}개의 수업지도안</span>
                {(searchTerm || subjectFilter !== 'all' || gradeFilter !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSubjectFilter('all');
                      setGradeFilter('all');
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    필터 초기화
                  </button>
                )}
              </div>
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
            <div className="grid gap-4">
              {filteredPlans.map((plan) => (
                <div key={plan.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-800">{plan.basicInfo?.title || '수업지도안'}</h3>
                  <p className="text-gray-600 text-sm mt-1">{plan.basicInfo?.subject || '과목 없음'} • {plan.basicInfo?.grade || '학년 없음'}</p>
                  <p className="text-gray-500 text-xs mt-2 line-clamp-2">
                    {plan.objectives?.main || '학습목표 없음'}
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-500">
                      {plan.createdAt ? new Date(plan.createdAt).toLocaleDateString('ko-KR') : '날짜 없음'}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/view/${plan.id}`}
                        className="text-green-600 hover:text-green-700 text-sm font-medium"
                      >
                        보기
                      </Link>
                      <Link
                        href={`/edit/${plan.id}`}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        수정
                      </Link>
                      <Link
                        href={`/evaluate/${plan.id}`}
                        className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                      >
                        평가
                      </Link>
                      <Link
                        href={`/checklist/${plan.id}`}
                        className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                      >
                        체크
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
