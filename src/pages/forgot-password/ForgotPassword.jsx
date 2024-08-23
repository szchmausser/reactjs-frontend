import { useQueryClient } from "@tanstack/react-query";
import { useTest } from "../../states/stores/testStore";

const ForgotPassword = () => {
  const { data: testData, setData: setTestData } = useTest();

  const queryClient = useQueryClient();
  const reset = () => {
    queryClient.removeQueries({ queryKey: ["testStore"] });
  };
  return (
    <>
      <div className="flex flex-col gap-1 pt-20">
        <div>ForgotPassword page...</div>
        <div className="flex flex-col gap-1 pt-20">
          <div>Value of property in testStore state:</div>
          <div>{testData?.property1}</div>
          <input
            className="w-40"
            id="testData"
            name="testData"
            type="text"
            placeholder="modify testData property in testStore state"
            onChange={(e) => setTestData({ property1: e.target.value })}
            value={testData?.property1 || ""}
          />
        </div>
        <button onClick={() => reset()}>Limpiar</button>
      </div>
    </>
  );
};
export default ForgotPassword;
