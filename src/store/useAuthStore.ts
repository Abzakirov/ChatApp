import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { axiosIntance } from "../lib";
import { useAuthStoreType } from "../types";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useAuthStore = create<useAuthStoreType>((set, get) => ({
    authUser: null,
    isLoginLoading: false,
    isRegisterLoading: false,
    imageUploadLoading: false,
    socket: null as Socket | null,
    onlineUsers: [],

    checkUser: async () => {
        try {
            const res = await axiosIntance.get("/auth/check");
            set({ authUser: res.data.data });
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.data?.message) {
                    toast.error(error.response.data.message);
                }
            }
            set({ isLoginLoading: false });
        }
    },

    signIn: async (data) => {
        set({ isLoginLoading: true });
        try {
            const res = await axiosIntance.post("/auth/sign-in", data);
            set({ authUser: res.data.data });
            toast.success("Login Successful");
        } catch (error) {
            errorFunction(error);
        } finally {
            set({ isLoginLoading: false });
        }
    },

    signUp: async (data) => {
        set({ isRegisterLoading: true });
        try {
            const res = await axiosIntance.post("/auth/sign-up", data);
            set({ authUser: res.data.data });
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.data?.message) {
                    toast.error(error.response.data.message);
                }
            }
        } finally {
            set({ isRegisterLoading: false });
        }
    },

    updatePhoto: async (data) => {
        set({ imageUploadLoading: true });
        try {
            const res = await axiosIntance.post("/auth/update-photo", data);
            set({ authUser: res.data.data });
        } catch (error) {
            errorFunction(error);
        } finally {
            set({ imageUploadLoading: false });
        }
    },

    logOut: async () => {
        try {
            await axiosIntance.post("/auth/logout");
            toast.success("Logout Successful");
            set({ authUser: null });
        } catch (error) {
            errorFunction(error);
        }
    },

    // connectSocket: () => {
    //     const { authUser } = get();
    //     if (!authUser || get().socket?.connected) return;

    //     const socket = io(BASE_URL, {
    //         query: {
    //             userId: authUser._id,
    //         },
    //     });
    //     socket.connect();

    //     set({ socket: socket });

    //     socket.on("getOnlineUsers", (userIds) => {
    //         set({ onlineUsers: userIds });
    //     });
    // },

    // disconnectSocket: () => {
    //     if (get().socket?.connected) get().socket.disconnect();
    // },
}));

export function errorFunction(error: any) {
    if (error instanceof AxiosError) {
        if (error.response?.data?.message) {
            toast.error(error.response.data.message);
        }
    }
}
