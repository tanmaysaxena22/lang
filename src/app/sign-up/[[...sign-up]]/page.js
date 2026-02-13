'use client';

import { useSignUp } from "@clerk/nextjs";
import Link from 'next/link';

export default function SignUpPage() {
  const { isLoaded, signUp } = useSignUp();
  
    const signInWith = (strategy) => {
        if (!isLoaded) return;
            signUp.authenticateWithRedirect({
                  strategy: strategy,
                        redirectUrl: "/sign-up/sso-callback",
                              redirectUrlComplete: "/dashboard",
                                  });
                                    };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[440px] z-10">
        <div className="bg-neutral-900/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">
              LANG<span className="text-orange-500 underline decoration-white/20">STER</span>
            </h1>
            <p className="text-gray-400 mt-2 font-medium italic">Master German through Video</p>
          </div>

          <div className="space-y-3 mb-8">
            {/* GOOGLE BUTTON */}
            <button 
              onClick={() => signInWith("oauth_google")}
              className="w-full flex items-center justify-center gap-4 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all active:scale-[0.98] group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-white font-bold text-sm">Continue with Google</span>
            </button>

            {/* APPLE BUTTON - Sized to match Google perfectly */}
            <button 
              onClick={() => signInWith("oauth_apple")}
              className="w-full flex items-center justify-center gap-4 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all active:scale-[0.98] group"
            >
              <svg className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" viewBox="0 0 256 315">
                <path d="M213.803 167.03c.442 47.8 41.44 63.806 42.133 64.092-.352 1.115-6.513 22.388-21.713 44.593-13.159 19.146-26.796 38.204-48.277 38.595-21.108.391-27.906-12.454-52.062-12.454-24.14 0-31.645 12.063-51.701 12.844-20.457.782-35.895-20.32-49.12-39.376-27.052-38.979-47.691-110.163-19.742-158.583 13.905-24.062 38.647-39.278 65.556-39.67 20.32-.39 39.467 13.682 51.907 13.682 12.426 0 35.694-16.892 60.113-14.394 10.219.421 38.94 4.116 57.34 31.047-1.487.923-34.256 19.982-33.873 59.186zM176.037 35.132c11.082-13.415 18.534-32.064 16.506-50.632-15.952.642-35.253 10.638-46.7 24.053-10.265 11.89-19.261 30.932-16.86 49.034 17.76 1.375 35.974-9.04 47.054-22.455z"/>
              </svg>
              <span className="text-white font-bold text-sm">Continue with Apple</span>
            </button>
          </div>

          <div className="relative mb-8 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <span className="relative bg-[#171717] px-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Or traditional email</span>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Email address"
              className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-orange-500 outline-none transition-all placeholder:text-gray-600"
            />
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-black font-black py-4 rounded-xl transition-all shadow-lg shadow-orange-500/20 uppercase tracking-widest">
              Get Started
            </button>
          </form>

          <p className="text-center text-gray-500 mt-8 text-xs font-medium">
            Already learning? <Link href="/sign-in" className="text-white hover:text-orange-500 underline underline-offset-4 transition-colors">Sign In</Link>
          </p>
        </div>
      </div>
    </main>
  );
}