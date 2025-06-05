import { Validator } from "./Validator";

describe("Validator", () => {
  test("should not throw for valid positive integer", () => {
    expect(() => Validator.validatePositiveInteger(10)).not.toThrow();
    expect(() => Validator.validatePositiveInteger(0)).not.toThrow();
  });

  test("should throw error for non-number input", () => {
    // @ts-ignore
    expect(() => Validator.validatePositiveInteger("abc")).toThrow("Input must be a number");
    // @ts-ignore
    expect(() => Validator.validatePositiveInteger(NaN)).toThrow("Input must be a number");
  });

  test("should throw error for negative numbers", () => {
    expect(() => Validator.validatePositiveInteger(-1)).toThrow("Input must be a non-negative integer");
    expect(() => Validator.validatePositiveInteger(-100)).toThrow("Input must be a non-negative integer");
  });

  test("should throw error for decimal numbers", () => {
    expect(() => Validator.validatePositiveInteger(3.14)).toThrow("Input must be a non-negative integer");
  });
});
