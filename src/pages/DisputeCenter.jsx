import { useState } from "react";

function DisputeCenter() {
  const [step, setStep] = useState(1);
  const [disputeType, setDisputeType] = useState("");
  const [description, setDescription] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [screenshotName, setScreenshotName] = useState("");
  const [disputeId] = useState("DSP-" + Math.floor(Math.random() * 900 + 100));

  return (
    <div style={{backgroundColor:"#F5F5F5"}} className="min-h-screen">
      <div style={{background:"linear-gradient(135deg, #E53935 0%, #B71C1C 100%)"}} className="text-white px-8 py-10 text-center">
        <h1 className="text-3xl font-bold">Dispute Center</h1>
        <p className="mt-2 text-sm" style={{color:"#FFCDD2"}}>Resolve conflicts fairly and transparently</p>
      </div>
      <div className="max-w-xl mx-auto px-8 py-8">
        <div className="flex gap-2 mb-8">
          {[1,2,3].map(function(n){
            return (
              <div key={n} className="h-2 flex-1 rounded-full transition-all" style={{backgroundColor:step>=n?"#E53935":"#EEEEEE"}} />
            );
          })}
        </div>

        {step===1 && (
          <div>
            <h2 className="text-lg font-bold mb-2" style={{color:"#212121"}}>What is your dispute about?</h2>
            <p className="text-sm mb-6" style={{color:"#9E9E9E"}}>Select the option that best describes your situation</p>
            {["Work was not delivered","Quality was not as agreed","Refund was refused","Payment was not received","Freelancer became unresponsive"].map(function(option){
              return (
                <button
                  key={option}
                  onClick={function(){setDisputeType(option);setStep(2);}}
                  className="w-full text-left p-4 border-2 rounded-xl mb-3 bg-white font-medium transition-all"
                  style={{borderColor:"#EEEEEE",color:"#212121"}}
                  onMouseEnter={function(e){e.currentTarget.style.borderColor="#E53935";e.currentTarget.style.backgroundColor="#FFEBEE";}}
                  onMouseLeave={function(e){e.currentTarget.style.borderColor="#EEEEEE";e.currentTarget.style.backgroundColor="white";}}
                >
                  {option}
                </button>
              );
            })}
          </div>
        )}

        {step===2 && (
          <div>
            <button onClick={function(){setStep(1);}} className="text-sm mb-4 font-medium" style={{color:"#E53935"}}>Back</button>
            <h2 className="text-lg font-bold mb-2" style={{color:"#212121"}}>Describe what happened</h2>
            <div className="rounded-xl p-3 mb-4 border" style={{backgroundColor:"#FFEBEE",borderColor:"#FFCDD2"}}>
              <p className="text-xs font-semibold" style={{color:"#E53935"}}>Dispute type</p>
              <p className="font-bold text-sm mt-0.5" style={{color:"#B71C1C"}}>{disputeType}</p>
            </div>
            <textarea
              className="w-full border-2 rounded-xl p-4 h-40 text-sm resize-none focus:outline-none"
              style={{borderColor:"#EEEEEE",color:"#212121"}}
              placeholder="Explain the situation clearly. Include dates, amounts, and what was agreed..."
              value={description}
              onChange={function(e){setDescription(e.target.value);}}
              onFocus={function(e){e.target.style.borderColor="#E53935";}}
              onBlur={function(e){e.target.style.borderColor="#EEEEEE";}}
            />

            {/* Screenshot upload */}
            <div className="mt-4">
              <p className="text-sm font-medium mb-2" style={{color:"#424242"}}>Attach Evidence Screenshot (optional)</p>
              <label className="flex items-center gap-3 p-4 border-2 border-dashed rounded-xl cursor-pointer transition-all" style={{borderColor:"#EEEEEE",backgroundColor:"white"}}>
                <span className="text-2xl">📎</span>
                <div>
                  <p className="text-sm font-semibold" style={{color:"#E53935"}}>Click to upload screenshot</p>
                  <p className="text-xs mt-0.5" style={{color:"#9E9E9E"}}>PNG, JPG up to 5MB</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={function(e){
                    const file = e.target.files[0];
                    if(file){
                      setScreenshotName(file.name);
                      const reader = new FileReader();
                      reader.onload = function(ev){setScreenshot(ev.target.result);};
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
              {screenshot && (
                <div className="mt-3 rounded-xl overflow-hidden border-2" style={{borderColor:"#FFCDD2"}}>
                  <div className="flex items-center justify-between px-3 py-2" style={{backgroundColor:"#FFEBEE"}}>
                    <p className="text-xs font-semibold" style={{color:"#B71C1C"}}>📎 {screenshotName}</p>
                    <button onClick={function(){setScreenshot(null);setScreenshotName("");}} className="text-xs font-semibold" style={{color:"#E53935"}}>Remove</button>
                  </div>
                  <img src={screenshot} alt="evidence" className="w-full max-h-48 object-cover" />
                </div>
              )}
            </div>

            <button
              onClick={function(){setStep(3);}}
              disabled={description.length<20}
              className="w-full mt-6 text-white py-4 rounded-xl font-semibold transition-all"
              style={{backgroundColor:description.length<20?"#BDBDBD":"#E53935"}}
            >
              Submit Dispute
            </button>
            <p className="text-center text-xs mt-2" style={{color:"#9E9E9E"}}>{description.length} characters — need at least 20</p>
          </div>
        )}

        {step===3 && (
          <div className="text-center py-8">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor:"#FFEBEE"}}>
              <span className="text-4xl">📋</span>
            </div>
            <h2 className="text-2xl font-bold" style={{color:"#212121"}}>Dispute Submitted</h2>
            <p className="text-sm mt-2" style={{color:"#9E9E9E"}}>Your dispute ID is</p>
            <p className="text-2xl font-bold mt-1" style={{color:"#E53935"}}>{disputeId}</p>

            {screenshot && (
              <div className="mt-4 rounded-xl overflow-hidden border-2 text-left" style={{borderColor:"#FFCDD2"}}>
                <div className="px-3 py-2" style={{backgroundColor:"#FFEBEE"}}>
                  <p className="text-xs font-semibold" style={{color:"#B71C1C"}}>📎 Evidence submitted: {screenshotName}</p>
                </div>
                <img src={screenshot} alt="evidence" className="w-full max-h-32 object-cover" />
              </div>
            )}

            <div className="bg-white rounded-xl p-6 mt-6 text-left space-y-3 border-2" style={{borderColor:"#EEEEEE"}}>
              <p className="text-sm font-semibold" style={{color:"#212121"}}>What happens next:</p>
              {["Both parties will be notified","Our team reviews all evidence within 48 hours","A resolution decision will be shared with both parties"].map(function(text,i){
                return (
                  <div key={i} className="flex items-start gap-2">
                    <span className="font-bold" style={{color:"#E53935"}}>{i+1}.</span>
                    <p className="text-sm" style={{color:"#616161"}}>{text}</p>
                  </div>
                );
              })}
            </div>
            <button
              onClick={function(){setStep(1);setDescription("");setScreenshot(null);setScreenshotName("");}}
              className="mt-6 text-sm font-semibold hover:underline"
              style={{color:"#E53935"}}
            >
              Submit another dispute
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DisputeCenter;