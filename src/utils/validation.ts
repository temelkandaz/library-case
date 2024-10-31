import { check, param } from "express-validator";

export const validateCreateUserInput = [
  check("name")
    .notEmpty()
    .withMessage("name is required!")
    .isString()
    .withMessage("name must be a string!"),
];

export const validateGetUserOrBookInput = [
  param("id")
    .notEmpty()
    .withMessage("id is required")
    .isInt()
    .withMessage("id must be an integer!"),
];

export const validateBorrowBookInput = [
  param("userId")
    .notEmpty()
    .withMessage("userId is required")
    .isInt()
    .withMessage("userId must be an integer!"),
  param("bookId")
    .notEmpty()
    .withMessage("bookId is required")
    .isInt()
    .withMessage("bookId must be an integer!"),
];

export const validateReturnBookInput = [
  param("userId")
    .notEmpty()
    .withMessage("userId is required")
    .isInt()
    .withMessage("userId must be an integer!"),
  param("bookId")
    .notEmpty()
    .withMessage("bookId is required")
    .isInt()
    .withMessage("bookId must be an integer!"),
  check("score")
    .notEmpty()
    .withMessage("score is required!")
    .isInt({ min: 1, max: 10 })
    .withMessage("score must be an integer between 1 and 10!"),
];

export const validateCreateBookInput = [
  check("name")
    .notEmpty()
    .withMessage("name is required!")
    .isString()
    .withMessage("name must be a string!"),
];
