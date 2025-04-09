import { create } from "zustand";
import { MessageType, useAuthUserType } from "../types";
import { axiosIntance } from "../lib";
import { errorFunction } from "./useAuthStore"; 

interface SendMessageData {
  text: string;
  attachment?: string; 
}

interface useChatStoreType {
  chatUser: useAuthUserType | null;
  selectedUser: (data: useAuthUserType | null) => void;
  getUsers: () => Promise<void>;
  getMessage: (userId: string) => Promise<void>;
  sendMessage: (messageData: SendMessageData) => Promise<void>;
  users: useAuthUserType[] | null;
  isUsersLoading: boolean;
  messages: MessageType[] | null;
  isMessagesLoading: boolean;
}

export const useChatStore = create<useChatStoreType>((set, get) => ({
  chatUser: null,
  users: null,
  messages: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  selectedUser: (data) => {
    set({ chatUser: data });
  },

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosIntance.get("/message/users");
      set({ users: res.data.data });
    } catch (error) {
      errorFunction(error);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessage: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosIntance.get(`/message/${userId}`);
      set({ messages: res.data.data });
    } catch (error) {
      errorFunction(error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData: SendMessageData) => {
    const { chatUser, messages } = get();
    if (!chatUser) return;

    set({ isMessagesLoading: true });
    try {
      const res = await axiosIntance.post(`/message/send/${chatUser._id}`, messageData);
      set({
        messages: [...(messages || []), res.data.data], 
      });
    } catch (error) {
      errorFunction(error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
}));
