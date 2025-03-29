export default function LoadingSpinner({ size = "md" }) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div className="flex justify-center items-center py-4">
      <div
        className={`${sizeClasses[size]} rounded-full border-gray-300 border-t-gray-600 animate-spin`}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
