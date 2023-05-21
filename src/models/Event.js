/**
 * Event model
 */
class Event {
    constructor(data = {}) {
        this.eventId = null;
        this.eventName = null
        this.eventDate = null;
        this.eventSport = null;
        this.eventRegion = null;
        this.eventMaxParticipants = null;
        this.participantDTOs = null;
        this.eventParticipantsCount = null;
        this.eventLocation = null;
        this.isNewEvent = null;
        Object.assign(this, data);
    }
}

export default Event;
