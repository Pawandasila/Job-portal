import { useState, useEffect } from "react";
import {
  Search,
  Briefcase,
  FileX,
  ArrowLeft,
  Building,
  Coffee,
  Users,
} from "lucide-react";

export default function NotFound() {
  const [searchPosition, setSearchPosition] = useState({ x: 0, y: 0 });
  const [isSearching, setIsSearching] = useState(false);
  const [showElements, setShowElements] = useState(false);

  useEffect(() => {
    // Start the searching animation after component mounts
    const searchTimer = setTimeout(() => {
      setIsSearching(true);
    }, 500);

    // Trigger animations for elements
    const elementsTimer = setTimeout(() => {
      setShowElements(true);
    }, 300);

    return () => {
      clearTimeout(searchTimer);
      clearTimeout(elementsTimer);
    };
  }, []);

  // Handle mouse move to make the magnifying glass follow cursor slightly
  const handleMouseMove = (e) => {
    if (!isSearching) return;

    const bounds = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - bounds.left - bounds.width / 2) * 0.05;
    const y = (e.clientY - bounds.top - bounds.height / 2) * 0.05;

    setSearchPosition({ x, y });
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Building
          size={48}
          className="text-blue-200 absolute top-1/4 left-1/5 opacity-30"
          style={{
            animation: "floatSlow 15s infinite ease-in-out",
            left: "15%",
          }}
        />
        <Briefcase
          size={32}
          className="text-blue-300 absolute top-2/3 left-1/4 opacity-20"
          style={{
            animation: "floatFast 12s infinite ease-in-out",
            animationDelay: "2s",
            left: "25%",
          }}
        />
        <Coffee
          size={28}
          className="text-blue-400 absolute top-1/3 right-1/5 opacity-30"
          style={{
            animation: "floatMedium 18s infinite ease-in-out",
            animationDelay: "1s",
            right: "20%",
          }}
        />
        <Users
          size={40}
          className="text-blue-200 absolute top-2/3 right-1/4 opacity-20"
          style={{
            animation: "floatSlow 20s infinite ease-in-out",
            animationDelay: "3s",
            right: "25%",
          }}
        />
      </div>

      <div
        className={`max-w-lg w-full text-center ${
          showElements ? "animate-fadeIn" : "opacity-0"
        }`}
      >
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-gray-200 animate-pulse-slow">
            404
          </div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <div
              className="relative"
              style={{
                transform: isSearching
                  ? `translate(${searchPosition.x}px, ${searchPosition.y}px)`
                  : "none",
                transition: "transform 0.3s ease-out",
              }}
            >
              <div className="absolute -left-12 -top-16 animate-searchMove">
                <Search
                  size={64}
                  className={`text-blue-600 ${
                    isSearching ? "animate-pulse" : ""
                  }`}
                  strokeWidth={1.5}
                />
              </div>

              <Briefcase
                size={48}
                className="text-blue-800 opacity-70 animate-bounce-subtle"
              />

              <FileX
                size={64}
                className="text-red-500 absolute -top-2 -right-12 animate-errorPulse"
              />
            </div>
          </div>
        </div>

        <h1
          className="text-4xl font-bold text-gray-800 mb-4 animate-slideUp"
          style={{ animationDelay: "0.2s" }}
        >
          Job Not Found
        </h1>
        <p
          className="text-xl text-gray-600 mb-8 animate-slideUp"
          style={{ animationDelay: "0.4s" }}
        >
          We've searched high and low, but couldn't find the job you're looking
          for.
        </p>

        <div
          className="bg-white rounded-lg shadow-lg p-6 mb-8 transform transition-all duration-700 animate-fadeInScale"
          style={{ animationDelay: "0.6s" }}
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Why not try:
          </h2>
          <ul className="text-left text-gray-600 space-y-3">
            {[
              "Checking your spelling",
              "Using broader search terms",
              "Exploring our featured job categories",
              "Setting up job alerts for future openings",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-start animate-fadeInRight"
                style={{ animationDelay: `${0.8 + index * 0.2}s` }}
              >
                <div className="mr-2 mt-1 text-blue-500 animate-pulse">•</div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md flex items-center justify-center transition-all duration-300 transform hover:scale-105 animate-fadeInUp"
            style={{ animationDelay: "1.3s" }}
            onClick={()=> window.location.href = '/'}
          >
            <ArrowLeft className="mr-2 animate-slideLeft" size={20} />
            Return to Home
          </button>
          <button
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-md flex items-center justify-center transition-all duration-300 transform hover:scale-105 animate-fadeInUp"
            style={{ animationDelay: "1.5s" }}
            onClick={()=> window.location.href = '/jobs'}
          >
            <Search className="mr-2 animate-pulse" size={20} />
            Browse All Jobs
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatSlow {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(15px, -20px) rotate(5deg);
          }
        }

        @keyframes floatMedium {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(-10px, -15px) rotate(-3deg);
          }
          66% {
            transform: translate(10px, 10px) rotate(3deg);
          }
        }

        @keyframes floatFast {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(8px, -12px) rotate(3deg);
          }
          75% {
            transform: translate(-8px, 12px) rotate(-3deg);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.7;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes searchMove {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(5px, -3px) rotate(5deg);
          }
          75% {
            transform: translate(-5px, 3px) rotate(-5deg);
          }
        }

        @keyframes errorPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.9;
          }
        }

        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInRight {
          0% {
            opacity: 0;
            transform: translateX(-10px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideLeft {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-3px);
          }
        }

        @keyframes particle {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.1;
          }
          25% {
            opacity: 0.3;
          }
          50% {
            transform: translateY(-100px) translateX(100px) scale(1.5);
            opacity: 0.1;
          }
          75% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(-200px) translateX(-100px) scale(0.5);
            opacity: 0;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s infinite ease-in-out;
        }

        .animate-searchMove {
          animation: searchMove 5s infinite ease-in-out;
        }

        .animate-errorPulse {
          animation: errorPulse 2s infinite ease-in-out;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 3s infinite ease-in-out;
        }

        .animate-fadeInScale {
          animation: fadeInScale 0.8s forwards ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.8s forwards ease-out;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.6s forwards ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s forwards ease-out;
        }

        .animate-slideLeft {
          animation: slideLeft 1.5s infinite ease-in-out;
        }

        .animate-particle {
          animation: particle var(--duration, 15s) infinite ease-in-out;
          animation-delay: var(--delay, 0s);
        }
      `}</style>
    </div>
  );
}
