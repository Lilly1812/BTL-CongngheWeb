import express from 'express';
import mongoose from 'mongoose';
import User from '../model/user.model.js';
import { getAllUsers } from '../controller/user.controller.js';

const router = express.Router();

// Get all users
router.get('/', getAllUsers);
export default router;