import { useUserContext } from "@/context/useUserContext";
import Avatar from "./Avatar";

const UserInfo = ({ background }) => {
  const { userState } = useUserContext();

  return (
    <div
      className={`flex flex-col items-center rounded-md text-center ${
        background ? "bg-[#F6F6FC] py-12" : ""
      }`}
    >
      <div className="mb-6 h-32 w-32 rounded-full border-2 border-primary/30 p-2">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/5">
          <Avatar
            src={userState.users?.image}
            email={userState.users?.email}
            className="object-cover rounded-full size-[110px]"
            height={110}
            width={110}
            alt="user image"
          />
        </div>
      </div>

      <div>
        <p className="text-h4 font-semibold capitalize text-dark">
          {userState.users?.first_name} {userState.users?.last_name}
        </p>
        <span className="text-base text-light">{userState.users?.email}</span>
      </div>
    </div>
  );
};

export default UserInfo;
