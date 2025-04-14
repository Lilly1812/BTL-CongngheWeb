import express from 'express';
import mongoose from 'mongoose';
import User from '../model/user.model.js';
import { getAllUsers } from '../controller/user.controller.js';
import { createUser } from '../controller/user.controller.js';
import { loginUser } from '../controller/user.controller.js';
import { protect } from '../middleware/authMiddleware.js';
import {updateRole} from '../controller/user.controller.js';

// Thêm route

const router = express.Router();

// Get all users
router.get('/', getAllUsers);
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/me", protect, async (req, res) => {
    res.status(200).json({ user: req.user });
  });
router.post("/update-role", protect, updateRole);
  
export default router;