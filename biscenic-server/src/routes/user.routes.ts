import { Router } from "express";
import { UserService } from "../services/user.services";
import { protect, admin } from "../middleware/auth.middleware";
import { Request, Response } from "express";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const user = await UserService.registerUser(req.body);
    res.status(201).json({ 
      message: "User registered successfully",
      data: user
    });
  } catch (error: any) {
    res.status(400).json({ 
      message: error.message 
    });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await UserService.loginUser(email, password);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ 
      message: error.message 
    });
  }
});

router.get("/profile", protect, (req, res) => {
  res.status(200).json({ 
    message: "Profile retrieved successfully",
    data: req.user 
  });
});

router.get("/admin", protect, admin, (req, res) => {
  res.status(200).json({ message: "Welcome Admin!" });
});

router.get("/users", protect, admin, async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json({ 
      message: "Users retrieved successfully",
      data: users 
    });
  } catch (error: any) {
    res.status(500).json({ 
      message: error.message 
    });
  }
});

router.delete("/users/:id", protect, admin, async (req: Request, res: Response) => {
  try {
    await UserService.deleteUser(req.params.id);
    res.status(200).json({ 
      message: "User deleted successfully" 
    });
  } catch (error: any) {
    res.status(500).json({ 
      message: error.message 
    });
  }
});

router.put("/users/:id/role", protect, admin, async (req: Request, res: Response) => {
  try {
    const { role, action } = req.body;
    const user = await UserService.updateUserRole(req.params.id, role, action);
    res.status(200).json({ 
      message: "User role updated successfully",
      data: user 
    });
  } catch (error: any) {
    res.status(500).json({ 
      message: error.message 
    });
  }
});

router.put("/profile", protect, async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }
    
    const updatedUser = await UserService.updateProfile(userId.toString(), req.body);
    res.status(200).json({ 
      message: "Profile updated successfully",
      data: updatedUser 
    });
  } catch (error: any) {
    res.status(400).json({ 
      message: error.message 
    });
  }
});

export default router;
