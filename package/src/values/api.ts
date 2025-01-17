import type {
  SkiaAnimation,
  AnimationState,
  SkiaReadonlyValue,
  SkiaClockValue,
  SkiaValue,
} from "./types";

export type CreateDerivedValue = {
  <R, T1>(
    cb: (...v: [T1]) => R,
    deps: [SkiaReadonlyValue<T1>]
  ): SkiaReadonlyValue<R>;
  <R, T1, T2>(
    cb: (...v: [T1, T2]) => R,
    deps: [SkiaReadonlyValue<T1>, SkiaReadonlyValue<T2>]
  ): SkiaReadonlyValue<R>;
  <R, T1, T2, T3>(
    cb: (...v: [T1, T2, T3]) => R,
    deps: [SkiaReadonlyValue<T1>, SkiaReadonlyValue<T2>, SkiaReadonlyValue<T3>]
  ): SkiaReadonlyValue<R>;
  <R, T1, T2, T3, T4>(
    cb: (...v: [T1, T2, T3, T4]) => R,
    deps: [
      SkiaReadonlyValue<T1>,
      SkiaReadonlyValue<T2>,
      SkiaReadonlyValue<T3>,
      SkiaReadonlyValue<T4>
    ]
  ): SkiaReadonlyValue<R>;
  <R, T1, T2, T3, T4, T5>(
    cb: (...v: [T1, T2, T3, T4, T5]) => R,
    deps: [
      SkiaReadonlyValue<T1>,
      SkiaReadonlyValue<T2>,
      SkiaReadonlyValue<T3>,
      SkiaReadonlyValue<T4>,
      SkiaReadonlyValue<T5>
    ]
  ): SkiaReadonlyValue<R>;
  <R, T1, T2, T3, T4, T5, T6>(
    cb: (...v: [T1, T2, T3, T4, T5, T6]) => R,
    deps: [
      SkiaReadonlyValue<T1>,
      SkiaReadonlyValue<T2>,
      SkiaReadonlyValue<T3>,
      SkiaReadonlyValue<T4>,
      SkiaReadonlyValue<T5>,
      SkiaReadonlyValue<T6>
    ]
  ): SkiaReadonlyValue<R>;
  <R>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cb: (...args: Array<any>) => R,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    values: Array<SkiaReadonlyValue<any>>
  ): SkiaReadonlyValue<R>;
};

export interface ISkiaValueApi {
  /**
   * Creates a new value that holds the initial value and that
   * can be changed.
   */
  createValue: <T>(initialValue: T) => SkiaValue<T>;
  /**
   * Creates a derived value. This is a calculated value that returns the result of
   * a function that is called with the values of the dependencies.
   */
  createDerivedValue: CreateDerivedValue;
  /**
   * Creates a clock value where the value is the number of milliseconds elapsed
   * since the clock was created
   */
  createClockValue: () => SkiaClockValue;
  /**
   * Creates an animation that is driven from a clock and updated every frame.
   * @param cb Callback to calculate next value from time.
   * @returns An animation object that can control a value.
   */
  createAnimation: <S extends AnimationState = AnimationState>(
    cb: (t: number, state: S | undefined) => S
  ) => SkiaAnimation;
}

declare global {
  var SkiaValueApi: ISkiaValueApi;
}

export const ValueApi: ISkiaValueApi = {
  createValue: global.SkiaValueApi.createValue,
  createDerivedValue: global.SkiaValueApi.createDerivedValue,
  createClockValue: global.SkiaValueApi.createClockValue,
  createAnimation: global.SkiaValueApi.createAnimation,
};

export const { createValue, createDerivedValue } = ValueApi;
