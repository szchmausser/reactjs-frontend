import { useSession } from "../../states/stores/sessionStore";

const UserProfile = () => {
  const { data: sessionData } = useSession();

  if (!sessionData?.login?.access_token) {
    return <p>No estás autenticado</p>;
  }

  return (
    <div>
      <h1>Welcome, {sessionData?.user?.name}</h1>
      <p>Email: {sessionData?.user?.email}</p>
      <p>Your company: {sessionData?.company?.company_id}</p>
    </div>
  );
};

export default UserProfile;
