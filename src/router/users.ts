import { Router } from "express";
import {
  validateBorrowBookInput,
  validateCreateUserInput,
  validateGetUserOrBookInput,
  validateReturnBookInput,
} from "../validation/validation";
import { validateRequest } from "../middleware/request-validator";
import UserController from "../controller/user-controller";

const router = Router();
const userController = new UserController();

router.post(
  "/",
  validateCreateUserInput,
  validateRequest,
  userController.createUserByName,
);

router.get("/", userController.getUsers);

router.get(
  "/:id",
  validateGetUserOrBookInput,
  validateRequest,
  userController.getUserById,
);

router.post(
  "/:userId/borrow/:bookId",
  validateBorrowBookInput,
  validateRequest,
  userController.borrowBookByUserIdAndBookId,
);

router.post(
  "/:userId/return/:bookId",
  validateReturnBookInput,
  validateRequest,
  userController.returnBookByUserIdAndBookIdAndScore,
);

export default router;
