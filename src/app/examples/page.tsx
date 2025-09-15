'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getAllExamples, getExamplesByCategory, ExampleTemplate } from '@/lib/exampleTemplates';
import { storage } from '@/lib/storage';

export default function ExamplesPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [examples] = useState<ExampleTemplate[]>(getAllExamples());

  const categoryGroups = {
    '전체': ['전체'],
    '기본교과': ['국어', '생활국어', '수학', '생활수학', '사회', '생활사회', '과학', '생활과학'],
    '예체능': ['영어', '체육', '생활체육', '음악', '생활음악', '미술', '생활미술'],
    '특수교육': ['진로와 직업', '일상생활 활동', '특수교육'],
    '치료지원': ['언어치료', '작업치료', '물리치료']
  };

  const allCategories = Object.values(categoryGroups).flat();

  const filteredExamples = selectedCategory === '전체'
    ? examples
    : getExamplesByCategory(selectedCategory);

  const handleUseTemplate = (template: ExampleTemplate) => {
    try {
      // 현재 날짜로 설정
      const today = new Date().toISOString().split('T')[0];
      const lessonPlanData = {
        ...template.lessonPlan,
        basicInfo: {
          ...template.lessonPlan.basicInfo,
          date: today
        }
      };

      // 새로운 수업지도안으로 저장
      const savedPlan = storage.savePlan(lessonPlanData);

      alert(`"${template.title}" 템플릿이 적용되었습니다!`);
      router.push(`/edit/${savedPlan.id}`);
    } catch (error) {
      console.error('Error using template:', error);
      alert('템플릿 적용 중 오류가 발생했습니다.');
    }
  };

  const handlePreviewTemplate = (template: ExampleTemplate) => {
    try {
      // 임시로 저장하여 미리보기
      const lessonPlanData = {
        ...template.lessonPlan,
        basicInfo: {
          ...template.lessonPlan.basicInfo,
          title: `[미리보기] ${template.lessonPlan.basicInfo.title}`
        }
      };

      const savedPlan = storage.savePlan(lessonPlanData);
      router.push(`/view/${savedPlan.id}`);
    } catch (error) {
      console.error('Error previewing template:', error);
      alert('템플릿 미리보기 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-800">예시 지도안 템플릿</h1>
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                홈으로 돌아가기
              </Link>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                특수교육에 특화된 다양한 수업지도안 템플릿을 제공합니다.
                원하는 템플릿을 선택하여 바로 사용하거나 수정해서 활용하세요.
              </p>

              {/* 카테고리 필터 - 그룹별 구조화 */}
              <div className="mb-6">
                {Object.entries(categoryGroups).map(([groupName, categories]) => (
                  <div key={groupName} className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">{groupName}</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                            selectedCategory === category
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 템플릿 목록 */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExamples.map((template) => (
                <div key={template.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-blue-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {template.title}
                      </h3>
                      <div className="flex gap-2 mb-3">
                        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                          {template.category}
                        </span>
                        <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                          {template.grade}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {template.description}
                  </p>

                  <div className="bg-white rounded p-3 mb-4 text-sm">
                    <p className="font-medium text-gray-700 mb-1">수업 내용:</p>
                    <p className="text-gray-600">{template.lessonPlan.basicInfo.title}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      {template.lessonPlan.basicInfo.duration}분 •
                      총 {template.lessonPlan.basicInfo.students.total}명
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePreviewTemplate(template)}
                      className="flex-1 bg-gray-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                    >
                      미리보기
                    </button>
                    <button
                      onClick={() => handleUseTemplate(template)}
                      className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      사용하기
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredExamples.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  해당 카테고리의 템플릿이 없습니다
                </h3>
                <p className="text-gray-500 mb-4">
                  다른 카테고리를 선택하거나 새로운 수업지도안을 작성해주세요.
                </p>
              </div>
            )}

            <div className="mt-8 text-center">
              <Link
                href="/create"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                새 수업지도안 작성
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}