
export interface FormDataType {
    email: string,
    password: string
}

export interface FormDataTypeSignUp {
    email: string,
    password: string,
    fullName: string
}


export interface useAuthUserType {
    _id: string
    email: string,
    fullName: string,
    password: string,
    profilePic: string,
    createdAt: string,
    updatedAt: string
}

export interface useAuthStoreType {
    authUser: useAuthUserType | null;
    isLoginLoading: boolean;
    isRegisterLoading: boolean;
    imageUploadLoading: boolean;
    signIn: (data: FormDataType) => Promise<void>;
    checkUser: () => Promise<void>;
    signUp: (data: FormDataTypeSignUp) => Promise<void>;
    updatePhoto: (data: any) => Promise<void>;
    logOut: () => Promise<void>
}


export interface MessageType {
    _id: string;
    senderId: string;
    receiverId: string;
    text: string;
    createdAt: string;
    updatedAt: string;
}
