import Event from "../models/event.js"

export const getAllEvents= async(req,res)=>{
    try {

        const filters={};
        if(req.query.category){
            filters.category= req.query.category;

        }
        if(req.query.location){
            filters.location= req.query.location;
        }

        const events = await Event.find(filters);
        res.json(events);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const getEventById= async(req,res)=>{
    try {
        const event = await Event.findById(req.params.id);
        if(!event){
            return res.status(404).json({error: "Event not found"});
        }
        res.json(event)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}


export const createEvent = async (req, res) => {
    const { title, description, date, location, category, totalSeats,ticketPrice, imageUrl } = req.body;
    try {
        const event = await Event.create({
            title,
            description,
            date,
            location,
            category,
            totalSeats: Number(totalSeats),
            availableSeats: Number(totalSeats),
            ticketPrice: Number(ticketPrice) || 0,
            imageUrl: imageUrl || "",
            createdBy: req.user.id
        })
        res.status(201).json(event);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(400).json({ 
            message: error.message || "Failed to create event",
            error: error.errors ? Object.values(error.errors).map(e => e.message) : error.message 
        })
    }
};


export const updateEvent= async(req,res)=>{
    const {title,description,date,location,category,totalSeats,ticketPrice,imageUrl}= req.body;
    try {
        const event=await Event.findByIdAndUpdate(req.params.id,{
            title,
            description,
            date,
            location,
            category,
            totalSeats,
            ticketPrice,
            imageUrl
        },{new:true})

        if(!event){
            return res.status(404).json({error:"Event not found"});
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }

}

export const deleteEvent= async (req,res)=>{
    try {
        const event=await Event.findByIdAndDelete(req.params.id);
        if(!event){
            return res.status(404).json({error:"Event not found"});
        }
        res.json({message:"Event deleted Successfully..."})
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }

}