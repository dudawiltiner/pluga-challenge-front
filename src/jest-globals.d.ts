/// <reference types="jest" />
import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toStrictEqual(expected: unknown): R;
      toEqual(expected: unknown): R;
      toHaveLength(length: number): R;
      toBe(expected: unknown): R;
    }
  }
}

export {};
