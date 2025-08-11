"use client";

import React, { useMemo, useState } from "react";
import { Mail, MessageCircle, Search, ChevronDown, Clock, CheckCircle, AlertCircle, MessageSquare } from "lucide-react";

type Channel = "All" | "WhatsApp" | "Email" | "SMS";
type StatusTab = "All" | "Unread" | "Overdue" | "Resolved";

interface ConversationSummary {
  id: string;
  patientName: string;
  providerName: string;
  patientType: "Principal" | "Spouse" | "Dependent";
  status: "New" | "Read" | "Overdue" | "Resolved";
  channel: Exclude<Channel, "All">;
  timestamp: string;
  lastMessage?: string;
  unreadCount?: number;
  isOverdue?: boolean;
  dueDate?: string; // Optional due date for overdue calculation
}

export default function ConversationListColumn({
  conversations,
  selectedId,
  onSelect,
  onCreateNew,
}: {
  conversations: ConversationSummary[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onCreateNew: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusTab>("All");
  const [channelFilter, setChannelFilter] = useState<Channel>("All");

  // Determine the status to display, considering both status and isOverdue flag
  const getDisplayStatus = (conversation: ConversationSummary): string => {
    if (conversation.status === 'New' || conversation.status === 'Read') {
      return conversation.isOverdue ? 'Overdue' : conversation.status;
    }
    return conversation.status;
  };

  const filteredConversations = useMemo(() => {
    return conversations.filter((conversation) => {
      const displayStatus = getDisplayStatus(conversation);
      const matchesSearch = conversation.patientName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      
      // Handle status filtering based on the selected tab
      let matchesStatus = true;
      if (statusFilter !== 'All') {
        if (statusFilter === 'Unread') {
          matchesStatus = conversation.status === 'New' || Boolean(conversation.unreadCount && conversation.unreadCount > 0);
        } else if (statusFilter === 'Overdue') {
          matchesStatus = displayStatus === 'Overdue';
        } else {
          matchesStatus = displayStatus === statusFilter;
        }
      }

      const matchesChannel =
        channelFilter === 'All' || conversation.channel === channelFilter;
      
      return matchesSearch && matchesStatus && matchesChannel;
    });
  }, [conversations, searchQuery, statusFilter, channelFilter]);

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'WhatsApp':
        return <MessageCircle className="h-5 w-5 text-green-500" />;
      case 'Email':
        return <Mail className="h-5 w-5 text-blue-500" />;
      case 'SMS':
        return <MessageSquare className="h-5 w-5 text-purple-500" />;
      default:
        return <MessageCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <aside className="w-96 border-r border-gray-200 bg-white flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col gap-2 mb-4">
          <button
            onClick={onCreateNew}
            className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            New Request
          </button>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search Interactions"
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="relative inline-block w-full">
            <select
              className="w-full pl-3 pr-8 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value as Channel)}
            >
              <option value="All">All Channels</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Email">Email</option>
              <option value="SMS">SMS</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex space-x-1 mb-4 overflow-x-auto pb-1">
          {['All', 'Unread', 'Overdue', 'Resolved'].map((tab) => {
            // Count conversations for each tab
            const count = tab === 'All' 
              ? conversations.length 
              : conversations.filter(conv => {
                  if (tab === 'Unread') {
                    return conv.status === 'New' || (conv.unreadCount && conv.unreadCount > 0);
                  } else if (tab === 'Overdue') {
                    return conv.isOverdue;
                  } else {
                    return conv.status === tab;
                  }
                }).length;
                
            return (
              <button
                key={tab}
                className={`px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap flex items-center gap-1 ${
                  statusFilter === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setStatusFilter(tab as StatusTab)}
              >
                <span>{tab}</span>
                {count > 0 && (
                  <span className="text-xs bg-gray-100 text-gray-600 rounded-full h-5 w-5 flex items-center justify-center">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4 text-center">
            <MessageCircle className="h-10 w-10 mb-2 opacity-30" />
            <p>No conversations found</p>
            <p className="text-sm text-gray-400 mt-1">
              {searchQuery ? 'Try a different search term' : 'Select a patient to view conversations'}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {filteredConversations.map((conversation) => (
              <li
                key={conversation.id}
                className={`p-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedId === conversation.id ? 'bg-blue-50' : ''
                }`}
                onClick={() => onSelect(conversation.id)}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-0.5">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                      {getChannelIcon(conversation.channel)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {conversation.patientName}
                      </p>
                      <p className="text-xs text-gray-400 ml-2 whitespace-nowrap">
                        {conversation.timestamp}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      {conversation.providerName} • {conversation.patientType}
                    </p>
                    {conversation.lastMessage && (
                      <p className="text-xs text-gray-500 mt-1 truncate">
                        {conversation.lastMessage}
                      </p>
                    )}
                    <div className="flex mt-1.5 space-x-1">
                      {(() => {
                        const displayStatus = getDisplayStatus(conversation);
                        
                        switch (displayStatus) {
                          case 'New':
                            return (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-green-100 text-green-800">
                                New
                              </span>
                            );
                          case 'Overdue':
                            return (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-red-100 text-red-800">
                                <Clock className="h-2.5 w-2.5 mr-1" /> Overdue
                              </span>
                            );
                          case 'Resolved':
                            return (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-800">
                                <CheckCircle className="h-2.5 w-2.5 mr-1" /> Resolved
                              </span>
                            );
                          case 'Read':
                          default:
                            return (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-800">
                                Read
                              </span>
                            );
                        }
                      })()}
                      {conversation.unreadCount && conversation.unreadCount > 0 && (
                        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-600 text-white text-xs font-medium">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
