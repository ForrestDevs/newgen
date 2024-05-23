

import { Request, Response } from 'express';

// Assuming you have an instance of your database connection called 'db'
export const postWaitlist = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        // Check if the email already exists in the waitlist table
        const existingWaitlist = await db('waitlist').where('email', email).first();
        if (existingWaitlist) {
            return res.status(400).json({ message: 'Email already exists in the waitlist' });
        }

        // Create a new waitlist object
        const waitlistObject = {
            userId: uuid(), // Generate a new UUID for the user id
            email,
            approved: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Insert the waitlist object into the waitlist table
        await db('waitlist').insert(waitlistObject);

        return res.status(200).json({ message: 'Waitlist object created successfully' });
    } catch (error) {
        console.error('Error creating waitlist object:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};