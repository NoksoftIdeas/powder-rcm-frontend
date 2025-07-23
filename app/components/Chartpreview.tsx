export default function ChartPreview() {
  return (
    <div className="flex flex-col items-center w-full max-w-xl">
      <div className="relative bg-gray-300 rounded-2xl shadow-lg p-6 w-full max-w-md mb-8 backdrop-blur-md">
        <div className="flex justify-between items-center mb-4">
          <div className="absolute top-[-20px] left-15 transform -translate-x-1/2 flex bg-white rounded-lg p-2 shadow-lg">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-gray-500">
                Average Claims
              </p>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-black">2,387</span>
                <span className="text-xs text-green-400 font-medium">
                  ↑ 20% <span className="text-gray-500">vs last month</span>
                </span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center">
              <svg width="32" height="32">
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  stroke="#fff"
                  strokeWidth="3"
                  fill="none"
                  opacity="0.2"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  stroke="#fff"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="88"
                  strokeDashoffset="70"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="relative w-full h- my-2">
          <svg viewBox="0 0 240 64" className="w-full h-full">
            <polyline
              fill="#38bdf8"
              fillOpacity="0.15"
              stroke="#38bdf8"
              strokeWidth="1"
              points="0,50 40,30 80,20 120,40 160,32 200,40 240,40"
            />
            <circle cx="160" cy="29" r="4" fill="#38bdf8" />
          </svg>
          <div className="absolute top-0 right-15 flex flex-col rounded-lg p-2 bg-gray-950">
            <span className="text-xs text-white">
              Aug. 23
            </span>
            <span className="text-sm text-white font-bold">
              1,390
            </span>
          </div>
        </div>

        <div className="absolute bottom-[-38px] right-0  bg-white rounded-xl shadow-md px-6 py-3 flex flex-col items-center w-40 border border-white/30">
          <span className="text-2xl font-bold text-sky-900">₦18,941,144</span>
          <span className="text-xs text-green-600 font-semibold mt-1">
            ₦3,145,264 (+14%)
          </span>
        </div>
      </div>
      <div className="mt-16 mb-6">
        <p className="text-lg font-medium text-white text-center drop-shadow">
          Next-generation health insurance <br /> claims processing solution
        </p>
      </div>

      <div className="flex justify-center items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-white/30" />
        <span className="w-3 h-3 rounded-full bg-white/30" />
        <span className="w-3 h-3 rounded-full bg-white/30" />
        <span className="w-3 h-3 rounded-full bg-white" />
      </div>
    </div>
  );
}
