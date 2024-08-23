import { defineGlobalState } from "../defineGlobalState";

export const useTest = defineGlobalState("testStore", {
  property1: "value1",
  property2: "value2",
  property3: "value3",
  property4: "value4",
});
