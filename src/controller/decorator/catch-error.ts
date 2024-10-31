import { NextFunction } from "express";

export function catchError(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const next: NextFunction = args[args.length - 1];

      try {
        await originalMethod.apply(this, args);
      } catch (error) {
        next(error);
      }
    };
}
