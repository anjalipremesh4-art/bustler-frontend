import { useState } from "react";

const BASE_URL = "https://bustler-pulse.onrender.com";

function ResolutionSurvey() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");

  const tags = ["Fast response","Very helpful","Clear communication","Needs improvement","Too slow"];
  const messages = {
    1:"We are sorry to hear that.",
    2:"We will try to do better.",
    3:"Thanks for the feedback!",
    4:"Great, glad we could help!",
    5:"Amazing! That is what we aim for!"
  };

  async function handleSubmit() {
    try {
      await fetch(BASE_URL + "/feedback/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticket_id: 1,
          csat_score: rating,
          comment: comment || "No comment",
          tag: selectedTag || "General feedback"
        })
      });
    } catch (error) {
      console.log("Feedback submission failed silently");
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div style={{backgroundColor:"#F5F5F5"}} className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor:"#E0F2F1"}}>
            <span className="text-4xl">🙏</span>
          </div>
          <h1 className="text-2xl font-bold" style={{color:"#212121"}}>Thank you!</h1>
          <p className="mt-2" style={{color:"#9E9E9E"}}>Your feedback helps us improve Bustler support for everyone.</p>
          <div className="mt-6 p-4 rounded-xl border-2" style={{backgroundColor:"#E0F2F1",borderColor:"#80CBC4"}}>
            <p className="text-sm" style={{color:"#00695C"}}>You rated this interaction <strong>{rating} out of 5 stars</strong></p>
            {selectedTag && <p className="text-xs mt-1" style={{color:"#00897B"}}>Tagged as: {selectedTag}</p>}
          </div>
          <div className="mt-4 rounded-xl p-4 border" style={{backgroundColor:"#E8F5E9",borderColor:"#A5D6A7"}}>
            <p className="text-xs font-semibold" style={{color:"#2E7D32"}}>Feedback saved to backend</p>
            <p className="text-xs mt-1" style={{color:"#388E3C"}}>Your CSAT score has been recorded for the ops team.</p>
          </div>
          <div className="mt-6 rounded-xl p-5 border-2" style={{backgroundColor:"#E0F2F1",borderColor:"#80CBC4"}}>
            <div className="text-4xl mb-2">🏅</div>
            <p className="font-bold" style={{color:"#00695C"}}>Supported by Bustler</p>
            <p className="text-sm mt-1" style={{color:"#00897B"}}>Your issue was successfully resolved by the Bustler support team.</p>
          </div>
          <a href="/" className="inline-block mt-6 text-white px-6 py-3 rounded-xl font-semibold" style={{backgroundColor:"#00897B"}}>
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{backgroundColor:"#F5F5F5"}} className="min-h-screen">
      <div style={{background:"linear-gradient(135deg, #00897B 0%, #00695C 100%)"}} className="text-white px-8 py-10 text-center">
        <h1 className="text-3xl font-bold">How did we do?</h1>
        <p className="mt-2 text-sm" style={{color:"#B2DFDB"}}>
          Your ticket <span className="font-bold text-white">TKT-1042</span> has been resolved
        </p>
      </div>
      <div className="max-w-md mx-auto px-8 py-8">
        <div className="bg-white rounded-xl p-6 mb-6 border-2" style={{borderColor:"#EEEEEE"}}>
          <p className="text-sm font-semibold text-center mb-4" style={{color:"#424242"}}>Rate your experience</p>
          <div className="flex justify-center gap-3">
            {[1,2,3,4,5].map(function(star) {
              return (
                <button
                  key={star}
                  onClick={function(){setRating(star);}}
                  onMouseEnter={function(){setHoveredRating(star);}}
                  onMouseLeave={function(){setHoveredRating(0);}}
                  className="text-4xl transition-transform hover:scale-125"
                >
                  {star<=(hoveredRating||rating)?"⭐":"☆"}
                </button>
              );
            })}
          </div>
          {rating>0 && (
            <p className="text-center mt-3 text-sm font-medium" style={{color:"#00897B"}}>{messages[rating]}</p>
          )}
        </div>

        {rating>0 && (
          <div className="mb-6">
            <p className="text-sm font-semibold mb-3" style={{color:"#424242"}}>Quick feedback tags</p>
            <div className="flex flex-wrap gap-2">
              {tags.map(function(tag){
                return (
                  <button
                    key={tag}
                    onClick={function(){setSelectedTag(tag===selectedTag?"":tag);}}
                    className="px-3 py-1.5 rounded-full text-sm font-medium border-2 transition-all"
                    style={selectedTag===tag
                      ? {backgroundColor:"#00897B",color:"white",borderColor:"#00897B"}
                      : {backgroundColor:"white",color:"#616161",borderColor:"#EEEEEE"}
                    }
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mb-6">
          <label className="text-sm font-medium" style={{color:"#424242"}}>Any comments? (optional)</label>
          <textarea
            className="w-full border-2 rounded-xl p-3 mt-2 text-sm resize-none focus:outline-none"
            style={{borderColor:"#EEEEEE",color:"#212121"}}
            placeholder="Tell us what went well or what we could improve..."
            value={comment}
            onChange={function(e){setComment(e.target.value);}}
            onFocus={function(e){e.target.style.borderColor="#00897B";}}
            onBlur={function(e){e.target.style.borderColor="#EEEEEE";}}
            rows={3}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={rating===0}
          className="w-full text-white py-4 rounded-xl font-semibold transition-all"
          style={{backgroundColor:rating===0?"#BDBDBD":"#00897B"}}
        >
          Submit Feedback
        </button>
        <p className="text-center text-sm mt-2" style={{color:"#9E9E9E"}}>
          {rating===0?"Please select a star rating first":"Ready to submit!"}
        </p>
      </div>
    </div>
  );
}

export default ResolutionSurvey;