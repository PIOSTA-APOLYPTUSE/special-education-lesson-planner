"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/storage";

interface LessonPlanData {
  title: string;
  subject: string;
  grade: string;
  duration: string;
  date: string;
  objectives: string;
  materials: string;
  studentNeeds: string;
  accommodations: string;
  activities: {
    introduction: string;
    development: string;
    conclusion: string;
  };
  assessment: string;
  reflection: string;
}

export default function CreateLessonPlan() {
  const router = useRouter();
  const [formData, setFormData] = useState<LessonPlanData>({
    title: "",
    subject: "",
    grade: "",
    duration: "",
    date: "",
    objectives: "",
    materials: "",
    studentNeeds: "",
    accommodations: "",
    activities: {
      introduction: "",
      development: "",
      conclusion: "",
    },
    assessment: "",
    reflection: "",
  });

  const handleInputChange = (field: keyof LessonPlanData, value: string) => {
    if (field === "activities") return;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleActivityChange = (activity: keyof typeof formData.activities, value: string) => {
    setFormData((prev) => ({
      ...prev,
      activities: {
        ...prev.activities,
        [activity]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      storage.savePlan(formData);
      alert("수업지도안이 저장되었습니다!");
      router.push('/');
    } catch (error) {
      console.error("저장 오류:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-800">새 수업지도안 작성</h1>
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

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    수업 제목 *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    과목 *
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">과목 선택</option>
                    <option value="국어">국어</option>
                    <option value="수학">수학</option>
                    <option value="사회">사회</option>
                    <option value="과학">과학</option>
                    <option value="영어">영어</option>
                    <option value="체육">체육</option>
                    <option value="음악">음악</option>
                    <option value="미술">미술</option>
                    <option value="기타">기타</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    학년 *
                  </label>
                  <select
                    value={formData.grade}
                    onChange={(e) => handleInputChange("grade", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">학년 선택</option>
                    <option value="초등 1학년">초등 1학년</option>
                    <option value="초등 2학년">초등 2학년</option>
                    <option value="초등 3학년">초등 3학년</option>
                    <option value="초등 4학년">초등 4학년</option>
                    <option value="초등 5학년">초등 5학년</option>
                    <option value="초등 6학년">초등 6학년</option>
                    <option value="중등 1학년">중등 1학년</option>
                    <option value="중등 2학년">중등 2학년</option>
                    <option value="중등 3학년">중등 3학년</option>
                    <option value="고등 1학년">고등 1학년</option>
                    <option value="고등 2학년">고등 2학년</option>
                    <option value="고등 3학년">고등 3학년</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    수업 시간 *
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => handleInputChange("duration", e.target.value)}
                    placeholder="예: 40분"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    수업 날짜 *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  학습 목표 *
                </label>
                <textarea
                  value={formData.objectives}
                  onChange={(e) => handleInputChange("objectives", e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="이 수업을 통해 학생들이 달성해야 할 구체적인 학습 목표를 작성해주세요."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  준비물 및 교구
                </label>
                <textarea
                  value={formData.materials}
                  onChange={(e) => handleInputChange("materials", e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="수업에 필요한 교재, 교구, 기자재 등을 나열해주세요."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  학생의 특별한 요구사항 *
                </label>
                <textarea
                  value={formData.studentNeeds}
                  onChange={(e) => handleInputChange("studentNeeds", e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="학생의 장애 유형, 특성, 현재 수준, 개별적 요구사항 등을 구체적으로 기술해주세요."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  교육적 지원 및 조정사항 *
                </label>
                <textarea
                  value={formData.accommodations}
                  onChange={(e) => handleInputChange("accommodations", e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="학생의 요구에 맞는 교육환경 조정, 보조공학 활용, 의사소통 지원 방법 등을 기술해주세요."
                  required
                />
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800">수업 활동</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    도입 활동 *
                  </label>
                  <textarea
                    value={formData.activities.introduction}
                    onChange={(e) => handleActivityChange("introduction", e.target.value)}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="수업 시작을 위한 동기유발 활동, 전시학습 확인 등을 구체적으로 작성해주세요."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    전개 활동 *
                  </label>
                  <textarea
                    value={formData.activities.development}
                    onChange={(e) => handleActivityChange("development", e.target.value)}
                    rows={6}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="주요 학습 내용과 활동을 단계별로 구체적으로 작성해주세요."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    정리 활동 *
                  </label>
                  <textarea
                    value={formData.activities.conclusion}
                    onChange={(e) => handleActivityChange("conclusion", e.target.value)}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="학습 내용 정리, 차시 예고, 과제 제시 등을 작성해주세요."
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  평가 방법 및 기준 *
                </label>
                <textarea
                  value={formData.assessment}
                  onChange={(e) => handleInputChange("assessment", e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="학습 목표 달성도를 확인할 수 있는 평가 방법과 기준을 구체적으로 작성해주세요."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  수업 후 반성 및 개선점
                </label>
                <textarea
                  value={formData.reflection}
                  onChange={(e) => handleInputChange("reflection", e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="수업 후 반성사항과 다음 수업을 위한 개선점을 작성해주세요."
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  수업지도안 저장
                </button>
                <Link
                  href="/"
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors text-center"
                >
                  취소
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}