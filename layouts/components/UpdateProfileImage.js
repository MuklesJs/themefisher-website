import { useSession } from "next-auth/react";
import Image from "next/image";
import { forwardRef, useState } from "react";
import Avatar from "./Avatar";

const UpdateProfileImage = forwardRef(({ handleFileUpload, image }, ref) => {
  const { data: session } = useSession();
  const [previewSrc, setPreviewSrc] = useState();

  return (
    <>
      {previewSrc ? (
        <Image
          className="object-cover rounded-full border h-[96px] w-[96px]"
          src={previewSrc}
          height={96}
          width={96}
          alt="user image"
        />
      ) : (
        <Avatar
          className="object-cover rounded-full border h-[96px] w-[96px]"
          email={session.user.email}
          src={image}
          height={96}
          width={96}
          alt="user image"
        />
      )}
      <div className="ml-4">
        <p>Update Profile Picture (Max: 100kb)</p>
        <p className="my-2 text-red-600" id="validationMessage" />
        <input
          ref={ref}
          type="file"
          name="profile-picture"
          id="profile-picture"
          accept="image/jpeg, image/png"
          onChange={(e) => {
            const files = e.target.files;
            if (!files) return;
            const fileReader = new FileReader();
            fileReader.onload = (event) => {
              setPreviewSrc(event?.target?.result);
            };
            fileReader.readAsDataURL(files[0]);
            handleFileUpload(files[0]);
          }}
          className="block w-full text-sm focus:outline-none text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-primary file:text-sm file:font-semibold file:bg-white file:text-primary hover:file:bg-primary hover:file:text-white"
        />
      </div>
    </>
  );
});

export default UpdateProfileImage;
