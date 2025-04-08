import { create } from "zustand";
import { axiosIntance } from "../lib";
import { useAuthStoreType } from "../types";
import { AxiosError } from "axios";
import toast from "react-hot-toast";






export const useAuthStore = create<useAuthStoreType>((set) => ({
    authUser: null,
    isLoginLoading: false,
    isRegisterLoading: false,
    imageUploadLoading: false,

    checkUser: async () => {
        try {
            const res = await axiosIntance.get("/auth/check");
            set({ authUser: res.data.data });

        } catch (error) {
            if (error instanceof AxiosError) {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                )
                    toast.error(error.response.data.message)
            }
            set({ isLoginLoading: false });
        }
    },
    signIn: async (data) => {
        set({ isLoginLoading: true });
        try {
            const res = await axiosIntance.post("/auth/sign-in", data);
            set({ authUser: res.data.data });
            toast.success("Login SuccessFull")
        } catch (error) {
            errorFunction(error)
            set({ isLoginLoading: false });
        }

        finally {
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
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                )
                    toast.error(error.response.data.message)
            }
            set({ isRegisterLoading: false });
        }

        finally {
            set({ isRegisterLoading: false });
        }
    },
    updatePhoto: async (data) => {
        set({ imageUploadLoading: true });
        try {
            const res = await axiosIntance.post("/auth/update-photo",data)
            console.log(res);
            
            set({ authUser: res.data.data });
        } catch (error) {
            errorFunction(error)
            set({ imageUploadLoading: false });
        }
        finally {
            set({ imageUploadLoading: false });
        }
    }
}));


function errorFunction(error: any) {
    if (error instanceof AxiosError) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        )
            toast.error(error.response.data.message)
    }
}