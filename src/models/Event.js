/**
 * User model
 */
class Event {
    constructor(data = {}) {
        this.eventId = null;
        this.eventName = null
        this.eventLocation = null;
        this.eventDate = null;
        this.eventSport = null;
        this.eventRegion = null;
        this.eventMaxParticipants = null;
        this.participantsDTOs = null;
        Object.assign(this, data);
    }
}
export default Event;
