import { useUserContext } from "@/context/useUserContext";
import Axios from "@/lib/axios";
import validateFile from "@/lib/utils/validateFile";
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import UpdateProfileImage from "./UpdateProfileImage";

const UpdateProfile = ({ session }) => {
  const [uploadImage, setUploadImage] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [loader, setLoader] = useState(false);
  const { userState, userDispatch } = useUserContext();
  const [countries, setCountries] = useState([]);
  const fileInputRef = useRef(null);

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

  const updateHandler = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      if (userState?.password !== userState?.confirm_password) {
        throw new Error("Password does not match");
      } else if (userState?.error) {
        throw new Error("Something went wrong");
      } else {
        let location = "";
        if (uploadImage) {
          const formData = new FormData();
          formData.append("permission", "public-read");
          formData.append("folder", "gethugothemes/users");
          formData.append("file", uploadImage);
          formData.append("id", session.user?.id);
          const res = await Axios.post("/bucket/upload", formData);
          if (res.status == 200) {
            location = res?.data?.result?.key;
          }
        }

        const userData = { ...userState?.users, image: session.image };
        if (location) userData.image = location;
        const formData = new FormData();
        formData.append("userData", JSON.stringify());
        const res = await Axios.patch(
          `/user/update/${userState?.users?.id}`,
          {
            userData,
          },
          {
            headers: {
              authorization: `Bearer ${session?.user?.accessToken}`,
            },
          },
        );

        if (res.status === 200) {
          userDispatch({
            type: "ADD_USER",
            payload: res.data.result,
          });

          setSubmitted(true);
          setLoader(false);
        }
      }
    } catch (error) {
      setSubmitted(false);
      setLoader(false);
      if (
        error?.response?.status === 401 ||
        error?.response?.data?.message === "jwt expired"
      ) {
        signOut();
      }
    }
  };

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
        <h3 className="text-h4">Update Profile Info</h3>
      </div>

      <div className="col-12 mb-6 flex items-center">
        <UpdateProfileImage
          ref={fileInputRef}
          handleFileUpload={handleFileUpload}
          image={userState?.users?.image}
        />
      </div>
      <div className="col-12 mb-4 hidden">
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
        <label htmlFor="contry" className="form-label">
          Country
          <span className="lh-1 text-red-600">*</span>
        </label>
        <select
          id="contry"
          name="contry"
          className="form-select"
          value={userState?.users?.country}
          onChange={(e) => handleCountry(e)}
          required
        >
          <option value="" selected disabled>
            Select Country
          </option>
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
          <option value="" selected disabled>
            Select State
          </option>
          {state?.map((state) => (
            <option key={state.state_code} value={state.name}>
              {state.name}
            </option>
          ))}
        </select>
      </div>
      <div className="col-12 text-right mt-4">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={loader || userState?.error}
        >
          {loader ? (
            <>
              Updating
              <svg
                height="25"
                width="25"
                className="ml-2"
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

export default UpdateProfile;
