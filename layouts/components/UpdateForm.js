import { useUserContext } from "@/context/useUserContext";
import validateFile from "@/lib/utils/validateFile";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import Avatar from "./Avatar";

const UpdateForm = ({ updateHandler, setUploadImage, loader, submitted }) => {
  const [countries, setCountries] = useState([]);
  const fileInputRef = useRef(null);
  const { userState, userDispatch } = useUserContext();

  // handle state
  const state = useMemo(() => {
    const filterState = countries.find((state) => {
      return state.name === userState?.users?.country;
    });
    return filterState?.states;
  }, [[countries, userState?.users?.country]]);

  // file upload handler
  const handleFileUpload = async (file) => {
    validateFile(fileInputRef, userDispatch);
    setUploadImage(file);
  };

  // user info handler
  const handleInputChange = (value, field) => {
    userDispatch({
      type: "UPDATE_USER",
      payload: { ...userState.users, [field]: value },
    });
  };

  // country state change
  const handleCountry = (e) => {
    userDispatch({
      type: "UPDATE_USER",
      payload: { ...userState.users, country: e.target.value },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://countriesnow.space/api/v0.1/countries/states",
      );
      setCountries(result.data.data);
    };
    fetchData();
  }, []);

  return !userState.users ? (
    <div>loading...</div>
  ) : (
    <form
      className="row"
      id="service-form"
      method="POST"
      onSubmit={updateHandler}
    >
      <div className="col-12 mb-8">
        <div className="relative flex justify-center after:absolute after:left-0 after:top-3 after:inline-block  after:h-[1px] after:w-full after:bg-light/50 after:px-2 after:content-['']">
          <h2 className="relative z-20 inline-block bg-white px-4 text-center text-h4">
            Update Your Profile
          </h2>
        </div>
      </div>

      <div className="col-12 mb-4">
        <UpdateProfileImage
          ref={fileInputRef}
          handleFileUpload={handleFileUpload}
          image={userState?.users?.image}
        />
        <p className="mt-2 text-red-600" id="validationMessage"></p>
      </div>
      <div className="col-12 mb-4">
        <label htmlFor="email" className="form-label">
          Email
          <span className="lh-1 text-red-600">*</span>
        </label>
        <input
          type="email"
          className="form-input"
          id="email"
          name="email"
          placeholder="johndoe@email.com"
          value={userState?.users?.email}
          readOnly
          required
        />
      </div>
      <div className="md:col-6 mb-4">
        <label htmlFor="first_name" className="form-label">
          First Name
          <span className="lh-1 text-red-600">*</span>
        </label>
        <input
          type="text"
          className="form-input"
          id="first_name"
          name="first_name"
          placeholder="John"
          value={userState?.users?.first_name}
          onChange={(e) => handleInputChange(e.target.value, e.target.name)}
          required
        />
      </div>
      <div className="md:col-6 mb-4">
        <label htmlFor="last_name" className="form-label">
          Last Name
        </label>
        <input
          type="text"
          className="form-input"
          id="last_name"
          name="last_name"
          placeholder="Doe"
          value={userState?.users?.last_name}
          onChange={(e) => handleInputChange(e.target.value, e.target.name)}
        />
      </div>

      <div className="md:col-6 mb-4">
        <label htmlFor="country" className="form-label">
          Country
          <span className="lh-1 text-red-600">*</span>
        </label>
        <select
          id="country"
          name="country"
          className="form-select"
          value={userState?.users?.country}
          onChange={(e) => handleCountry(e)}
          required
        >
          {countries?.map((country) => (
            <option key={country.iso3} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <div className="md:col-6 mb-4">
        <label htmlFor="state" className="form-label">
          State
          <span className="lh-1 text-red-600">*</span>
        </label>
        <select
          id="state"
          name="state"
          className="form-select"
          value={userState?.users?.state}
          onChange={(e) => handleInputChange(e.target.value, e.target.name)}
          required
        >
          {state?.map((state) => (
            <option key={state.state_code} value={state.name}>
              {state.name}
            </option>
          ))}
        </select>
      </div>
      <div className="col-12 mt-8">
        <button
          className="btn btn-primary block w-full text-center"
          type="submit"
          disabled={loader || submitted || userState?.error}
        >
          {loader ? (
            <>
              Updating
              <svg
                height="25"
                width="25"
                className="ms-2"
                viewBox="0 0 100 100"
              >
                <path
                  fill="#fff"
                  d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
                >
                  <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    dur="1s"
                    from="0 50 50"
                    to="360 50 50"
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
            </>
          ) : submitted ? (
            "Updated"
          ) : (
            "Update"
          )}
        </button>
      </div>
    </form>
  );
};

export default UpdateForm;

const UpdateProfileImage = forwardRef(({ handleFileUpload, image }, ref) => {
  const [previewSrc, setPreviewSrc] = useState();
  const { data: session } = useSession();

  return (
    <>
      <div className="flex items-center space-x-3">
        <div className="flex-none">
          {previewSrc ? (
            <Image
              src={previewSrc}
              width={110}
              height={110}
              className="size-[66px] object-cover sm:size-[110px] rounded-full"
              alt="profile picture"
            />
          ) : (
            <Avatar
              src={image}
              email={session.user.email}
              width={110}
              height={110}
              className="size-[66px] sm:size-[110px] rounded-full "
            />
          )}
        </div>
        <div>
          <label
            htmlFor="profile-picture"
            className="form-label mb-4 max-sm:text-sm"
          >
            Update Profile Picture (Max: 100kb)
          </label>
          <input
            type="file"
            name="profile-picture"
            id="profile-picture"
            ref={ref}
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
            className="block w-full text-sm focus:outline-none text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-primary hover:file:bg-primary hover:file:text-white"
          />
        </div>
      </div>
    </>
  );
});
