import { create } from "zustand";
import { MessageType, useAuthUserType } from "../types";
import { axiosIntance } from "../lib";
import { errorFunction } from "./useAuthStore"; // Убрал лишний импорт useAuthStore

interface useChatStoreType {
  chatUser: useAuthUserType | null;
  selectedUser: (data: useAuthUserType | null) => void;
  getUsers: () => Promise<void>;
  getMessage: (userId: string) => Promise<void>;
  sendMessage: (messageData: any) => Promise<void>;
  users: useAuthUserType[] | null;
  isUsersLoading: boolean;
  messages: MessageType[] | null;
  isMessagesLoading: boolean;
  // subscribeToMessage: () => void;
  // unsubscribeFromMessages: () => void;
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

  sendMessage: async (messageData) => {
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

  // subscribeToMessage: () => {
  //   // Здесь должна быть логика подписки (например, через WebSocket или Pusher)
  //   console.log("Subscribed to messages");
  // },

  // unsubscribeFromMessages: () => {
  //   // Здесь должна быть логика отписки
  //   console.log("Unsubscribed from messages");
  // },
}));
