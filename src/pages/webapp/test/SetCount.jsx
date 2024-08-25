import { useQueryClient } from "@tanstack/react-query";
import { useTest } from "../../../states/stores/testStore";

const SetCount = () => {
  const queryClient = useQueryClient();
  const { data: testData, setData: setTestData } = useTest();

  const reset = () => {
    queryClient.removeQueries({ queryKey: ["testStore"] });
  };

  return (
    <>
      <div className="flex flex-col gap-1 pt-20">
        <div>SetCount page...</div>
        <div className="flex flex-col gap-1 pt-20">
          <div className="inline-flex gap-2">
            <div>Value of property in testStore state:</div>
            <div>{testData?.property1 ? testData?.property1 : ""}</div>
          </div>
          <input
            className="w-40"
            id="testData"
            name="testData"
            type="text"
            placeholder="modify testData property in testStore state"
            onChange={(e) => setTestData({ property1: e.target.value })}
            value={testData?.property1 ? testData?.property1 : ""}
          />
        </div>
        <button onClick={() => reset()}>Limpiar</button>
      </div>
    </>
  );
};
export default SetCount;
