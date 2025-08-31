import { Request, Response } from 'express';

export const subscribeToNewsletter = async (req: Request, res: Response):Promise<void> => {
  try {
    const { email } = req.body;
    
    if (!email) {
       res.status(400).json({
        success: false,
        message: 'Email is required'
      });
      return;
    }
    
    // For now, just return success - you can add database logic later
    console.log('Newsletter subscription:', email);
    
    res.status(200).json({
      success: true,
      message: 'Successfully subscribed to newsletter'
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};