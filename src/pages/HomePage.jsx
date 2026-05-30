import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero section */}
      <div className="bg-gradient-to-br from-purple-700 to-purple-900 text-white py-20 px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-6xl mb-6">⚡</div>
          <h1 className="text-5xl font-bold leading-tight">
            Bustler Support Center
          </h1>
          <p className="text-purple-200 mt-4 text-xl">
            AI-powered support that gets you help faster, smarter, and transparently.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <button
              onClick={() => navigate("/ticket")}
              className="bg-white text-purple-700 px-8 py-4 rounded-xl text-lg font-bold hover:bg-purple-50 transition-all shadow-lg"
            >
              🎫 Submit a Ticket
            </button>
            <button
              onClick={() => navigate("/tracker")}
              className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-purple-800 transition-all"
            >
              🔍 Track My Issue
            </button>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto grid grid-cols-3 divide-x divide-gray-100">
          <div className="py-6 text-center">
            <p className="text-3xl font-bold text-purple-700">9</p>
            <p className="text-sm text-gray-500 mt-1">Issues Tracked</p>
          </div>
          <div className="py-6 text-center">
            <p className="text-3xl font-bold text-green-600">3</p>
            <p className="text-sm text-gray-500 mt-1">Resolved</p>
          </div>
          <div className="py-6 text-center">
            <p className="text-3xl font-bold text-red-500">4</p>
            <p className="text-sm text-gray-500 mt-1">Critical P1 Issues</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-8 py-12">

        {/* System status */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 mb-10">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
          <div>
            <p className="text-green-800 font-semibold text-sm">All Systems Operational</p>
            <p className="text-green-600 text-xs mt-0.5">Support team is active — avg response time 2 hours</p>
          </div>
        </div>

        {/* Quick action cards */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">How can we help you?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">

          <button
            onClick={() => navigate("/ticket")}
            className="bg-white border-2 border-gray-100 rounded-xl p-6 text-left hover:border-purple-400 hover:bg-purple-50 transition-all group"
          >
            <div className="text-3xl mb-3">🎫</div>
            <h3 className="font-bold text-gray-800 group-hover:text-purple-700">Submit a Support Ticket</h3>
            <p className="text-gray-500 text-sm mt-1">Report a bug, payment issue, or account problem</p>
          </button>

          <button
            onClick={() => navigate("/tracker")}
            className="bg-white border-2 border-gray-100 rounded-xl p-6 text-left hover:border-purple-400 hover:bg-purple-50 transition-all group"
          >
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="font-bold text-gray-800 group-hover:text-purple-700">Track My Issue</h3>
            <p className="text-gray-500 text-sm mt-1">Check the status and progress of your ticket</p>
          </button>

          <button
            onClick={() => navigate("/dispute")}
            className="bg-white border-2 border-gray-100 rounded-xl p-6 text-left hover:border-purple-400 hover:bg-purple-50 transition-all group"
          >
            <div className="text-3xl mb-3">⚖️</div>
            <h3 className="font-bold text-gray-800 group-hover:text-purple-700">Raise a Dispute</h3>
            <p className="text-gray-500 text-sm mt-1">Resolve conflicts with freelancers or clients</p>
          </button>

          <button
            onClick={() => navigate("/faq")}
            className="bg-white border-2 border-gray-100 rounded-xl p-6 text-left hover:border-purple-400 hover:bg-purple-50 transition-all group"
          >
            <div className="text-3xl mb-3">💡</div>
            <h3 className="font-bold text-gray-800 group-hover:text-purple-700">Help Center</h3>
            <p className="text-gray-500 text-sm mt-1">Find instant answers to common questions</p>
          </button>

        </div>

        {/* How it works */}
        <h2 className="text-xl font-bold text-gray-800 mb-6">How Bustler Pulse works</h2>
        <div className="bg-white rounded-xl border-2 border-gray-100 overflow-hidden">

          <div className="flex items-start gap-4 p-5 border-b border-gray-100">
            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center flex-shrink-0">1</div>
            <div>
              <p className="font-semibold text-gray-800">You submit your issue</p>
              <p className="text-gray-500 text-sm mt-0.5">Select a category and describe your problem in a few words</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 border-b border-gray-100">
            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center flex-shrink-0">2</div>
            <div>
              <p className="font-semibold text-gray-800">AI analyzes it instantly</p>
              <p className="text-gray-500 text-sm mt-0.5">Our system categorizes, scores urgency, and suggests a solution in seconds</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 border-b border-gray-100">
            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center flex-shrink-0">3</div>
            <div>
              <p className="font-semibold text-gray-800">Agent picks it up</p>
              <p className="text-gray-500 text-sm mt-0.5">A support agent reviews the AI analysis and responds to your ticket</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5">
            <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 font-bold flex items-center justify-center flex-shrink-0">4</div>
            <div>
              <p className="font-semibold text-gray-800">Issue resolved</p>
              <p className="text-gray-500 text-sm mt-0.5">You get notified, rate the experience, and earn a Supported by Bustler badge</p>
            </div>
          </div>

        </div>

        {/* Recent activity */}
        <h2 className="text-xl font-bold text-gray-800 mt-12 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[
            { id: "TKT-1000", text: "App crashed after selecting + menu", status: "In Progress", color: "bg-blue-100 text-blue-700" },
            { id: "TKT-1002", text: "Unable to make payment", status: "On Hold", color: "bg-orange-100 text-orange-700" },
            { id: "TKT-1007", text: "Last name validation error on sign up", status: "Resolved", color: "bg-green-100 text-green-700" },
          ].map(function(item) {
            return (
              <div
                key={item.id}
                onClick={() => navigate("/tracker")}
                className="bg-white border-2 border-gray-100 rounded-xl p-4 flex justify-between items-center cursor-pointer hover:border-purple-300 hover:bg-purple-50 transition-all"
              >
                <div>
                  <p className="text-xs text-purple-600 font-semibold">{item.id}</p>
                  <p className="text-sm text-gray-700 mt-0.5">{item.text}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-4 ${item.color}`}>
                  {item.status}
                </span>
              </div>
            );
          })}
          <button
            onClick={() => navigate("/tracker")}
            className="w-full text-center text-purple-600 text-sm py-2 hover:underline"
          >
            View all 9 issues →
          </button>
        </div>

      </div>
    </div>
  );
}

export default HomePage;