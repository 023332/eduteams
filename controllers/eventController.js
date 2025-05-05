import { Event } from '../models/event.js';
import { User } from '../models/user.js';
import { EventRegistration } from '../models/eventRegistration.js';


export const createEvent = async (req, res) => {
    try {
        const { title, description, date, location } = req.body;
        const imagePath = req.file.path;

        const event = await Event.create({
            title,
            description,
            date,
            location,
            image: imagePath,
            userId: req.user.id,
        });

        res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { title, description, date, location } = req.body;
        const event = await Event.findByPk(eventId);

        if (!event || event.userId !== req.user.id) {
            return res.status(404).json({ message: 'Event not found or not authorized' });
        }

        if (req.file) {
            event.image = req.file.path;
        }

        event.title = title;
        event.description = description;
        event.date = date;
        event.location = location;

        await event.save();
        res.status(200).json({ message: 'Event updated successfully', event });
    } catch (error) {
        res.status(500).json({ message: 'Error updating event', error });
    }
};


export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.findAll({
            where: {
                date: {
                    [Op.gte]: new Date()
                }
            },
            include: User
        });

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving events', error });
    }
};


export const registerForEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const event = await Event.findByPk(eventId);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        await EventRegistration.create({
            userId: req.user.id,
            eventId
        });

        res.status(200).json({ message: 'Registered for event successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering for event', error });
    }
};


export const getRegisteredEvents = async (req, res) => {
    try {
        const registeredEvents = await EventRegistration.findAll({
            where: { userId: req.user.id },
            include: Event
        });

        res.status(200).json(registeredEvents);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving registered events', error });
    }
};