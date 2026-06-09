import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  function handleLogin() {
    if (!email || !name) return;
    const userId = email.split("@")[0];
    localStorage.setItem("bustler_user_id", userId);
    localStorage.setItem("bustler_user_name", name);
    localStorage.setItem("bustler_user_email", email);
    setSubmitted(true);
    setTimeout(function() {
      navigate("/");
    }, 1500);
  }

  if (submitted) {
    return (
      <div style={{backgroundColor:"#F5F5F5"}} className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-2xl font-bold" style={{color:"#212121"}}>Welcome to Bustler Pulse!</h1>
          <p className="text-sm mt-2" style={{color:"#9E9E9E"}}>Redirecting you to the home page...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{backgroundColor:"#F5F5F5"}} className="min-h-screen flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border-2" style={{borderColor:"#EEEEEE"}}>

        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{backgroundColor:"#00897B"}}>
            <span className="text-white font-black text-2xl">B</span>
          </div>
          <h1 className="text-2xl font-bold" style={{color:"#212121"}}>Bustler Pulse</h1>
          <p className="text-sm mt-1" style={{color:"#9E9E9E"}}>Sign in to access support</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium" style={{color:"#424242"}}>Full Name</label>
            <input
              type="text"
              className="w-full border-2 rounded-xl p-3 mt-1 text-sm focus:outline-none"
              style={{borderColor:"#EEEEEE",color:"#212121"}}
              placeholder="Enter your full name"
              value={name}
              onChange={function(e){setName(e.target.value);}}
              onFocus={function(e){e.target.style.borderColor="#00897B";}}
              onBlur={function(e){e.target.style.borderColor="#EEEEEE";}}
            />
          </div>

          <div>
            <label className="text-sm font-medium" style={{color:"#424242"}}>Email Address</label>
            <input
              type="email"
              className="w-full border-2 rounded-xl p-3 mt-1 text-sm focus:outline-none"
              style={{borderColor:"#EEEEEE",color:"#212121"}}
              placeholder="Enter your email"
              value={email}
              onChange={function(e){setEmail(e.target.value);}}
              onFocus={function(e){e.target.style.borderColor="#00897B";}}
              onBlur={function(e){e.target.style.borderColor="#EEEEEE";}}
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={!email || !name}
            className="w-full text-white py-3 rounded-xl font-semibold mt-2 transition-all"
            style={{backgroundColor:(!email||!name)?"#BDBDBD":"#00897B"}}
          >
            Sign In to Bustler
          </button>
        </div>

        <div className="mt-6 p-4 rounded-xl border" style={{backgroundColor:"#E0F2F1",borderColor:"#80CBC4"}}>
          <p className="text-xs font-semibold" style={{color:"#00695C"}}>How this works</p>
          <p className="text-xs mt-1" style={{color:"#00897B"}}>Your email is used to generate your unique user ID which links your tickets and context data automatically.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;