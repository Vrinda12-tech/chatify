// src/components/AnimatedBorder.jsx
const BoaderAnimatedContainer = ({ children, className = "" }) => {
  return (
    <div
      className={`
        rounded-2xl 
        bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 
        p-[2px] 
        animate-border-move 
        bg-[length:300%_300%] 
        shadow-2xl
        ${className}
      `}
    >
      {/* Inner content container with background overlay */}
      <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl">
        {children}
      </div>
    </div>
  );
};

export default BoaderAnimatedContainer;