import { Camera, Mail, User } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const Profile = () => {
  const { authUser, updatePhoto, imageUploadLoading } = useAuthStore();

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];
    const formData = new FormData();
    formData.append("image", file!);
    updatePhoto(formData)
  };
  return (
    <div className="h-[100%] pt-20">
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your Profile information</p>
          </div>

          <div className="flex flex-col gap-4 items-center">
            <div className="relative">
              <img
                className="size-32 rounded-full object-cover border-4"
                src={
                  authUser?.profilePic ||
                  "https://raw.githubusercontent.com/burakorkmez/fullstack-chat-app/master/frontend/public/avatar.png"
                }
                alt="Profile"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 cursor-pointer bg-base-content hover:scale-105 p-2 rounded-full transition-all duration-200 ${
                  imageUploadLoading ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-base-200 active:scale-105" />
                <input
                  disabled={imageUploadLoading}
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleSubmit}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              Click the camera icon to upload a new profile picture
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Full Name</span>
                </div>
                <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                  {authUser?.fullName}
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>Email Address</span>
                </div>
                <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                  {authUser?.email}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-base-200 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser?.createdAt.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
