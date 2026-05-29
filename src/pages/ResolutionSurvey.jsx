import { useState } from "react";

function ResolutionSurvey() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="max-w-md mx-auto p-8 text-center">
        <div className="text-6xl mb-4">🙏</div>
        <h1 className="text-2xl font-bold">Thank you!</h1>
        <p className="text-gray-500 mt-2">
          Your feedback helps us improve Bustler support for everyone.
        </p>
        <div className="mt-6 p-4 bg-purple-50 rounded-xl">
          <p className="text-purple-700 text-sm">
            You rated this interaction <strong>{rating} out of 5 stars</strong>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold text-center">How did we do?</h1>
      <p className="text-gray-500 text-center mt-2">
        Your ticket <span className="font-semibold text-purple-700">TKT-1042</span> has been resolved
      </p>

      <div className="flex justify-center gap-3 mt-8">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="text-4xl transition-transform hover:scale-125"
          >
            {star <= (hoveredRating || rating) ? "⭐" : "☆"}
          </button>
        ))}
      </div>

      {rating > 0 && (
        <p className="text-center mt-3 text-gray-600 font-medium">
          {rating === 1 && "We're sorry to hear that 😞"}
          {rating === 2 && "We'll try to do better 🙏"}
          {rating === 3 && "Thanks for the feedback!"}
          {rating === 4 && "Great, glad we could help! 😊"}
          {rating === 5 && "Amazing! That's what we aim for! 🎉"}
        </p>
      )}

      <div className="mt-6">
        <label className="text-sm font-medium text-gray-700">
          Any comments? (optional)
        </label>
        <textarea
          className="w-full border-2 border-gray-200 rounded-xl p-3 mt-2 focus:outline-none focus:border-purple-500"
          placeholder="Tell us what went well or what we could improve..."
          value={comment}
          onChange={e => setComment(e.target.value)}
          rows={3}
        />
      </div>

      <button
        onClick={() => setSubmitted(true)}
        disabled={rating === 0}
        className="w-full mt-6 bg-purple-600 text-white py-4 rounded-xl font-semibold disabled:opacity-40 hover:bg-purple-700"
      >
        Submit Feedback
      </button>
      <p className="text-center text-sm text-gray-400 mt-2">
        {rating === 0 ? "Please select a star rating first" : "Ready to submit!"}
      </p>
    </div>
  );
}

export default ResolutionSurvey;