import UpdatePassword from "@/components/UpdatePassword";
import UpdateProfile from "@/components/UpdateProfile";
import Base from "@/layouts/Baseof";
import { getSession } from "next-auth/react";

const ProfileSettings = ({ session }) => {
  return (
    <Base title="Profile Settings">
      <section className="section-sm">
        <div className="container">
          <div className="text-center mb-8">
            <h1 className="h2 mb-3">Profile Settings</h1>
            <p className="text-[#888]">Update your profile information</p>
          </div>
          <div className="row justify-center">
            <div className="xl:col-10">
              <div className="bg-white rounded-lg shadow px-8 py-10 mb-8">
                <UpdateProfile session={session} />
              </div>
              <div className="bg-white rounded-lg shadow px-8 py-10 mb-8">
                <UpdatePassword session={session} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default ProfileSettings;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login?callbackUrl=" + context.resolvedUrl,
        permanent: false,
      },
    };
  }
  return {
    props: {
      session: session,
    },
  };
};
