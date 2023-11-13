"use client";

const PreLoader = () => {
  return (
    <div
      id="globalLoader"
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center"
    >
      <div className="flex flex-col gap-3">
        <div className="w-20 h-20 border-[4px] border-gray-200 border-t-purple-700 rounded-full animate-spin"></div>
        <div className="text-lg animate-bounce">Loading...</div>
      </div>
    </div>
  );
};

export default PreLoader;
