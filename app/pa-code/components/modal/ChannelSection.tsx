import type { Channel } from './types';

interface ChannelSectionProps {
  channel: Channel;
  setChannel: (channel: Channel) => void;
}

export function ChannelSection({ channel, setChannel }: ChannelSectionProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="channel" className="block text-[14.93px] leading-[21.33px] font-medium text-[#344054]">
        Channel
      </label>
      <div className="relative">
        <select
          id="channel"
          className="mt-1 block w-full rounded-[8.53px] border-[1.07px] border-[#D0D5DD]  shadow-[#1018280D] px-[14.93px] py-[10.67px] focus:outline-none  sm:text-sm"
          value={channel}
          onChange={(e) => setChannel(e.target.value as Channel)}
        >
          <option value="whatsapp">WhatsApp</option>
          <option value="email">Email</option>
          <option value="web">Web Portal</option>
          <option value="sms">SMS</option>
        </select>
 
      </div>
      <p className="mt-1 text-sm text-[#475467]">
        The channel you want to communicate with the HMO
      </p>
    </div>
  );
}
