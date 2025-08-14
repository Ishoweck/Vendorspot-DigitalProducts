import UserSidebar from "@/components/dashboard/UserSidebar";
import SectionWrapper from "@/components/layout/SectionWrapper";

export default function NotificationsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <SectionWrapper className="pt-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8">
            <UserSidebar />
            <main className="flex-1 bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Notifications
              </h1>
              <p className="text-gray-600">
                Your notifications will appear here.
              </p>
            </main>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
