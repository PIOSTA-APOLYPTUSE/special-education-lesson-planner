"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function EditLessonPlan() {
  const params = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-800">수업지도안 수정</h1>
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

            <div className="text-center py-12">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">편집 기능 준비 중</h2>
              <p className="text-gray-600 mb-6">
                새로운 특수교육 수업지도안 구조에 맞는 편집 기능을 준비하고 있습니다.
                <br />
                현재는 새로운 수업지도안을 작성해주세요.
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/create"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  새 수업지도안 작성
                </Link>
                <Link
                  href={`/view/${params.id}`}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  수업지도안 보기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}