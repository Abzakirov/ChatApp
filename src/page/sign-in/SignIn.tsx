import { useState } from "react";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import AuthImagePatern from "../../components/auth-image-pattern";
import type { FormDataType } from "../../types";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [form, setForm] = useState<FormDataType>({
    email: "",
    password: "",
  });
  const { signIn, isLoginLoading } = useAuthStore();

  const loginSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn(form);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      <div className="flex items-center justify-center flex-col p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex items-center flex-col gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome back!</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>
        </div>
        <form onSubmit={loginSumbit} className="w-[70%] mx-auto">
          <div className="form-control mb-5">
            <label className="label">
              <span className="font-medium label-text ">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                <Mail className="w-5 h-5 text-base-content/40" />
              </div>
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                type="email"
                className="input input-bordered w-full pl-10"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div className="form-control mt-3">
            <label className="label">
              <span className="font-medium label-text ">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                <Lock className="w-5 h-5 text-base-content/40" />
              </div>
              <input
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pl-10"
                placeholder="password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-base-content/40" />
                ) : (
                  <Eye className="w-5 h-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>
          <button className="btn btn-primary w-full mt-8"
          disabled={isLoginLoading}>
            
            {isLoginLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div className="text-center mt-8">
          <p className="text-base-content/60">
            Don&apos;t have an account?{" "}
            <Link to="/sign-up" className="link link-primary">
              Create account
            </Link>
          </p>
        </div>
      </div>
      <AuthImagePatern
        title="Welcome back!"
        subtitle="Sign in to continue your conversations and catch up width your messages"
      />
    </div>
  );
};

export default SignIn;
