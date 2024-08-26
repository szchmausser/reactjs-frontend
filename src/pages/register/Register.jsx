import { useSession } from "../../states/stores/sessionStore";

const Register = () => {
  const { data: contextSessionData } = useSession();
  return (
    <>
      <div className="flex w-full min-h-screen">
        <div className="container flex flex-wrap px-5 py-24 mx-auto break-words">
          <div className="overflow-auto w-full">
            <div>Register page...</div>
            <div className="pt-4">
              Login details: {JSON.stringify(contextSessionData?.login)}
            </div>
            <div className="pt-4">
              Permission list: {JSON.stringify(contextSessionData?.permissions)}
            </div>
            <div className="pt-4">
              Roles list: {JSON.stringify(contextSessionData?.roles)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
