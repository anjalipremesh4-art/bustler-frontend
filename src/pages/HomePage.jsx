import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  return (
    <div style={{backgroundColor:"#F5F5F5"}} className="min-h-screen">

      <div style={{background:"linear-gradient(135deg, #00897B 0%, #00695C 100%)"}} className="text-white py-20 px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold">Bustler Support Center</h1>
          <p className="mt-4 text-xl" style={{color:"#B2DFDB"}}>Get help instantly. Track every issue. Resolve disputes fairly.</p>
          <div className="flex gap-4 justify-center mt-10">
            <button onClick={function(){navigate("/ticket");}} className="bg-white font-bold px-8 py-4 rounded-xl text-lg" style={{color:"#00897B"}}>Submit a Ticket</button>
            <button onClick={function(){navigate("/tracker");}} className="font-semibold px-8 py-4 rounded-xl text-lg border-2 border-white text-white">Track My Issue</button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto grid grid-cols-3 divide-x">
          <div className="py-6 text-center"><p className="text-3xl font-bold" style={{color:"#00897B"}}>9</p><p className="text-sm mt-1" style={{color:"#9E9E9E"}}>Issues Tracked</p></div>
          <div className="py-6 text-center"><p className="text-3xl font-bold" style={{color:"#43A047"}}>3</p><p className="text-sm mt-1" style={{color:"#9E9E9E"}}>Resolved</p></div>
          <div className="py-6 text-center"><p className="text-3xl font-bold" style={{color:"#E53935"}}>4</p><p className="text-sm mt-1" style={{color:"#9E9E9E"}}>Critical P1</p></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="rounded-xl p-4 flex items-center gap-3 mb-10 border" style={{backgroundColor:"#E8F5E9",borderColor:"#A5D6A7"}}>
          <div className="w-3 h-3 rounded-full animate-pulse" style={{backgroundColor:"#43A047"}}></div>
          <div>
            <p className="font-semibold text-sm" style={{color:"#2E7D32"}}>All Systems Operational</p>
            <p className="text-xs mt-1" style={{color:"#388E3C"}}>Support team is active — average response time 2 hours</p>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4" style={{color:"#212121"}}>How can we help you?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <button onClick={function(){navigate("/ticket");}} className="bg-white border-2 rounded-xl p-6 text-left" style={{borderColor:"#EEEEEE"}}>
            <div className="text-3xl mb-2">🎫</div>
            <p className="font-bold" style={{color:"#212121"}}>Submit a Support Ticket</p>
            <p className="text-sm mt-1" style={{color:"#9E9E9E"}}>Report a bug, payment issue, or account problem</p>
          </button>
          <button onClick={function(){navigate("/tracker");}} className="bg-white border-2 rounded-xl p-6 text-left" style={{borderColor:"#EEEEEE"}}>
            <div className="text-3xl mb-2">🔍</div>
            <p className="font-bold" style={{color:"#212121"}}>Track My Issue</p>
            <p className="text-sm mt-1" style={{color:"#9E9E9E"}}>Check the status and progress of your ticket</p>
          </button>
          <button onClick={function(){navigate("/dispute");}} className="bg-white border-2 rounded-xl p-6 text-left" style={{borderColor:"#EEEEEE"}}>
            <div className="text-3xl mb-2">⚖️</div>
            <p className="font-bold" style={{color:"#212121"}}>Raise a Dispute</p>
            <p className="text-sm mt-1" style={{color:"#9E9E9E"}}>Resolve conflicts with freelancers or clients</p>
          </button>
          <button onClick={function(){navigate("/faq");}} className="bg-white border-2 rounded-xl p-6 text-left" style={{borderColor:"#EEEEEE"}}>
            <div className="text-3xl mb-2">💡</div>
            <p className="font-bold" style={{color:"#212121"}}>Help Center</p>
            <p className="text-sm mt-1" style={{color:"#9E9E9E"}}>Find instant answers to common questions</p>
          </button>
        </div>

        <h2 className="text-xl font-bold mb-6" style={{color:"#212121"}}>How Bustler Pulse works</h2>
        <div className="bg-white rounded-xl border-2 overflow-hidden mb-12" style={{borderColor:"#EEEEEE"}}>
          <div className="flex items-start gap-4 p-5 border-b" style={{borderColor:"#EEEEEE"}}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold flex-shrink-0" style={{backgroundColor:"#E0F2F1",color:"#00897B"}}>1</div>
            <div><p className="font-semibold" style={{color:"#212121"}}>You submit your issue</p><p className="text-sm mt-1" style={{color:"#9E9E9E"}}>Select a category and describe your problem</p></div>
          </div>
          <div className="flex items-start gap-4 p-5 border-b" style={{borderColor:"#EEEEEE"}}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold flex-shrink-0" style={{backgroundColor:"#E3F2FD",color:"#1565C0"}}>2</div>
            <div><p className="font-semibold" style={{color:"#212121"}}>AI analyzes it instantly</p><p className="text-sm mt-1" style={{color:"#9E9E9E"}}>System categorizes and scores urgency in seconds</p></div>
          </div>
          <div className="flex items-start gap-4 p-5 border-b" style={{borderColor:"#EEEEEE"}}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold flex-shrink-0" style={{backgroundColor:"#FFF3E0",color:"#E65100"}}>3</div>
            <div><p className="font-semibold" style={{color:"#212121"}}>Agent picks it up</p><p className="text-sm mt-1" style={{color:"#9E9E9E"}}>Support agent reviews the AI analysis and responds</p></div>
          </div>
          <div className="flex items-start gap-4 p-5">
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold flex-shrink-0" style={{backgroundColor:"#E8F5E9",color:"#2E7D32"}}>4</div>
            <div><p className="font-semibold" style={{color:"#212121"}}>Issue resolved</p><p className="text-sm mt-1" style={{color:"#9E9E9E"}}>You get notified and earn a Supported by Bustler badge</p></div>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4" style={{color:"#212121"}}>Recent Activity</h2>
        <div className="space-y-3">
          <div onClick={function(){navigate("/tracker");}} className="bg-white border-2 rounded-xl p-4 flex justify-between items-center cursor-pointer" style={{borderColor:"#EEEEEE"}}>
            <div><p className="text-xs font-semibold" style={{color:"#00897B"}}>TKT-1000</p><p className="text-sm mt-1" style={{color:"#424242"}}>App crashed after selecting plus menu</p></div>
            <span className="px-3 py-1 rounded-full text-xs font-medium" style={{backgroundColor:"#E3F2FD",color:"#1565C0"}}>In Progress</span>
          </div>
          <div onClick={function(){navigate("/tracker");}} className="bg-white border-2 rounded-xl p-4 flex justify-between items-center cursor-pointer" style={{borderColor:"#EEEEEE"}}>
            <div><p className="text-xs font-semibold" style={{color:"#00897B"}}>TKT-1003</p><p className="text-sm mt-1" style={{color:"#424242"}}>Unable to make payment in the app</p></div>
            <span className="px-3 py-1 rounded-full text-xs font-medium" style={{backgroundColor:"#FFF3E0",color:"#E65100"}}>On Hold</span>
          </div>
          <div onClick={function(){navigate("/tracker");}} className="bg-white border-2 rounded-xl p-4 flex justify-between items-center cursor-pointer" style={{borderColor:"#EEEEEE"}}>
            <div><p className="text-xs font-semibold" style={{color:"#00897B"}}>TKT-1007</p><p className="text-sm mt-1" style={{color:"#424242"}}>Last name validation error on sign up</p></div>
            <span className="px-3 py-1 rounded-full text-xs font-medium" style={{backgroundColor:"#E8F5E9",color:"#2E7D32"}}>Resolved</span>
          </div>
          <button onClick={function(){navigate("/tracker");}} className="w-full text-center text-sm py-2 font-medium" style={{color:"#00897B"}}>View all 9 issues</button>
        </div>

      </div>
    </div>
  );
}

export default HomePage;