"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const channelTypes = ["Web Portal", "WhatsApp", "Email", "SMS"];

export default function ChannelsPage() {
  const [selected, setSelected] = useState("SMS");
  const [sendingPhone, setSendingPhone] = useState("+234 803 9876 543");
  const [receivingPhone, setReceivingPhone] = useState("+234 803 9876 543");

  return (
    <div className="p-6">
      <nav className="text-xs text-gray-400 mb-2 flex items-center gap-2">
        <Link href="/hmos" className="hover:underline cursor-pointer">
          HMOs
        </Link>
        <span>/</span>
        <Link href="/hmos/1" className="hover:underline cursor-pointer">
          Reliance HMO
        </Link>
        <span>/</span>
        <span className="text-gray-700 font-semibold">Channels</span>
      </nav>
      <div className="flex items-center gap-4 mb-6">
        <Image
          src="/Avatar.png"
          alt="HMO Logo"
          width={48}
          height={48}
          className="w-12 h-12 rounded-full"
        />
        <h1 className="text-2xl font-bold text-gray-800">Reliance HMO</h1>
      </div>
      <div className="flex gap-8">
        {/* Channel Type Nav */}
        <div className="flex flex-col gap-2 min-w-[160px]">
          {channelTypes.map((type) => (
            <button
              key={type}
              className={`px-4 py-2 rounded text-left font-medium ${
                selected === type
                  ? "bg-[#027FA31A] text-cyan-700"
                  : "text-[#979797] hover:bg-gray-100"
              }`}
              onClick={() => {
                setSelected(type);
                // Call backend or handler for channel switch here
                // e.g., fetchChannelData(type)
              }}
            >
              {type}
            </button>
          ))}
          <button className="mt-2 px-4 py-2 rounded border text-gray-700 font-medium hover:bg-gray-50">
            Add Channel
          </button>
        </div>
        {/* Channel Form */}
        <div className="flex-1 flex items-center">
          <form className="bg-white rounded-xl border border-gray-200 p-8 w-full max-w-xl flex flex-col gap-6">
            <div>
              <div className="flex flex-row gap-2">
                <label className="block text-sm text-[#344054] mb-1">
                  Sending Phone No.
                </label>
                <div className="flex items-center w-fit border border-[#D0D5DD] px-2 rounded gap-2">
                  <Image
                    src="/Avatar.png"
                    alt="logo"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
                  <input
                    type="text"
                    className="w-full focus:outline-none py-2 text-sm"
                    value={sendingPhone}
                    onChange={(e) => setSendingPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="text-xs text-[#344054] mt-2 ml-[8rem]">
                Your hospital's preferred number to send text messages to HMOs
              </div>
            </div>
            <div>
              <div className="flex flex-row gap-2">
                <label className="block text-sm text-[#344054] mb-1">
                  Receiving Phone No.
                </label>
                <div className="flex items-center w-fit border border-[#D0D5DD] px-2 rounded gap-2">
                  <Image
                    src="/Avatar.png"
                    alt="logo"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
                  <input
                    type="text"
                    className="  py-2 focus:outline-none text-sm"
                    value={receivingPhone}
                    onChange={(e) => setReceivingPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="text-xs text-[#344054] mt-2 ml-[8rem] items-center">
                The HMO's number
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-cyan-700 text-white rounded-lg  hover:bg-cyan-800 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
