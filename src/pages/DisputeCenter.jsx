import { useState } from "react";
import { createDispute } from "../utils/adapter";

function DisputeCenter() {
  const [step, setStep] = useState(1);
  const [disputeType, setDisputeType] = useState("");
  const [description, setDescription] = useState("");
  const [disputeId] = useState("DSP-" + Math.floor(Math.random() * 900 + 100));

  return (
    <div className="max-w-xl mx-auto p-8">

      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map(n => (
          <div
            key={n}
            className={`h-2 flex-1 rounded-full ${step >= n ? "bg-purple-600" : "bg-gray-200"}`}
          />
        ))}
      </div>

      {step === 1 && (
        <div>
          <h1 className="text-2xl font-bold mb-2">Dispute Center</h1>
          <p className="text-gray-500 mb-6">What is your dispute about?</p>
          {[
            "Work was not delivered",
            "Quality was not as agreed",
            "Refund was refused",
            "Payment was not received",
            "Freelancer became unresponsive",
          ].map(option => (
            <button
              key={option}
              onClick={() => { setDisputeType(option); setStep(2); }}
              className="w-full text-left p-4 border-2 border-gray-200 rounded-xl mb-3 hover:border-purple-500 hover:bg-purple-50 transition-all"
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div>
          <button onClick={() => setStep(1)} className="text-purple-600 mb-4">← Back</button>
          <h1 className="text-2xl font-bold mb-2">Describe what happened</h1>
          <p className="text-gray-500 mb-4">
            Dispute type: <span className="font-semibold text-purple-700">{disputeType}</span>
          </p>
          <textarea
            className="w-full border-2 border-gray-200 rounded-xl p-4 h-40 focus:outline-none focus:border-purple-500"
            placeholder="Explain the situation clearly. Include dates, amounts, and what was agreed..."
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-4">
            <p className="text-sm text-yellow-800">
              📎 You will be able to upload screenshots as evidence in the final version.
            </p>
          </div>
          <button
            
            onClick={function() {
  createDispute(disputeType, description).then(function(result) {
    setStep(3);
  });
}}
            disabled={description.length < 20}
            className="w-full mt-6 bg-purple-600 text-white py-4 rounded-xl font-semibold disabled:opacity-40 hover:bg-purple-700"
          >
            Submit Dispute
          </button>
          <p className="text-center text-sm text-gray-400 mt-2">
            {description.length} characters — need at least 20
          </p>
        </div>
      )}

      {step === 3 && (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">📋</div>
          <h1 className="text-2xl font-bold">Dispute Submitted</h1>
          <p className="text-gray-500 mt-2">Your dispute ID is</p>
          <p className="text-2xl font-bold text-purple-600 mt-1">{disputeId}</p>
          <div className="bg-gray-50 rounded-xl p-6 mt-6 text-left space-y-3">
            <p className="text-sm font-semibold">What happens next:</p>
            <p className="text-sm text-gray-600">1. Both parties will be notified</p>
            <p className="text-sm text-gray-600">2. Our team reviews all evidence within 48 hours</p>
            <p className="text-sm text-gray-600">3. A resolution decision will be shared with both parties</p>
          </div>
          <button
            onClick={() => { setStep(1); setDescription(""); }}
            className="mt-6 text-purple-600 underline"
          >
            Submit another dispute
          </button>
        </div>
      )}
    </div>
  );
}

export default DisputeCenter;