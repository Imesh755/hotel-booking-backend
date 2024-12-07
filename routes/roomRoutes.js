import express from 'express';
import { createRoom, getRooms, getRoomById, updateRoom, deleteRoom } from '../controllers/roomController';

const roomRouter = express.Router();

// Create a new room
router.post('/rooms', createRoom);

// Get all rooms
router.get('/rooms', getRooms);

// Get a room by ID
router.get('/rooms/:id', getRoomById);

// Update a room
router.put('/rooms/:id', updateRoom);

// Delete a room
router.delete('/rooms/:id', deleteRoom);

export default roomRouter;
