import { ChevronDownIcon } from '@heroicons/react/20/solid';
import type { Channel } from './types';

interface ChannelSectionProps {
  channel: Channel;
  setChannel: (channel: Channel) => void;
}

export function ChannelSection({ channel, setChannel }: ChannelSectionProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="channel" className="block text-sm font-medium text-gray-700">
        Channel
      </label>
      <div className="relative">
        <select
          id="channel"
          className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          value={channel}
          onChange={(e) => setChannel(e.target.value as Channel)}
        >
          <option value="whatsapp">WhatsApp</option>
          <option value="email">Email</option>
          <option value="web">Web Portal</option>
          <option value="sms">SMS</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      </div>
      <p className="mt-1 text-sm text-gray-500">
        The channel you want to communicate with the HMO
      </p>
    </div>
  );
}
