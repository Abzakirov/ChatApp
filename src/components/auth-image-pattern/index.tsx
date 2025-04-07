import { FC } from "react";

interface AuthImagePatternType {
  title: string;
  subtitle: string;
}

const AuthImagePatern: FC<AuthImagePatternType> = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-lg text-center">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className={`aspect-square rounded-2xl bg-primary/10 ${
                index % 2 === 0 ? "animate-pulse" : ""
              }`}
            ></div>
          ))}
        </div>
        <h2 className="text-2xl text-bold mb-4">{title}</h2>
        <p className="text-base-content-60 ">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePatern;
