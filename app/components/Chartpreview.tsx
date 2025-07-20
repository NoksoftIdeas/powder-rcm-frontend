export default function ChartPreview() {
  return (
    <div className="flex flex-col items-center w-full max-w-xl">


      <div className="relative bg-white/10 rounded-2xl shadow-lg p-6 w-full max-w-md mb-8 backdrop-blur-md">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Average Claims</p>
            <div className="flex items-end  gap-2">
              <span className="text-3xl font-bold text-white">2,387</span>
              <span className="text-xs text-green-400 font-medium">
                ↑ 20% <span className="text-white/60">vs last month</span>
              </span>
            </div>
          </div>

          {/* Circular Progress (fake) */}
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
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
                stroke="#22d3ee"
                strokeWidth="3"
                fill="none"
                strokeDasharray="88"
                strokeDashoffset="70"
              />
            </svg>
          </div>
        </div>

        {/* Chart Area */}
        <div className="relative w-full h-32 my-2">
          {/* Simple SVG line chart */}
          <svg viewBox="0 0 240 64" className="w-full h-full">
            <polyline
              fill="#38bdf8"
              fillOpacity="0.15"
              stroke="#38bdf8"
              strokeWidth="2"
              points="0,50 40,30 80,20 120,40 160,32 200,60 240,40"
            />
            <circle cx="200" cy="60" r="4" fill="#38bdf8" />
            <text x="205" y="55" fontSize="10" fill="#fff">
              Aug. 23
            </text>
            <text x="200" y="75" fontSize="14" fill="#fff" fontWeight="bold">
              1,390
            </text>
          </svg>
        </div>
        {/* Bottom Card */}
        <div className="absolute bottom-[-38px] left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-md px-6 py-3 flex flex-col items-center w-64 border border-white/30">
          <span className="text-2xl font-bold text-sky-900">₦18,941,144</span>
          <span className="text-xs text-green-600 font-semibold mt-1">
            ₦3,145,264 (+14%)
          </span>
        </div>
      </div>
      {/* Tagline */}
      <div className="mt-16 mb-6">
        <p className="text-lg font-medium text-white text-center drop-shadow">
          Next-generation health insurance claims processing solution
        </p>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-white" />
        <span className="w-3 h-3 rounded-full bg-white/30" />
        <span className="w-3 h-3 rounded-full bg-white/30" />
      </div>
    </div>
  );
}
