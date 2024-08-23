import { useSession } from "../../states/stores/sessionStore";

const Register = () => {
  const { data: contextSessionData } = useSession();
  return (
    <>
      <div className="flex flex-col gap-4">
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
    </>
  );
};
export default Register;
