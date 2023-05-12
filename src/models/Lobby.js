/**
 * Lobby model
 */
class Lobby {
    constructor(data = {}) {
        this.lobbyId = null;
        this.lobbyName = null
        this.lobbyMembers = null;
        this.lobbyMaxMembers = null;
        this.lobbyMembersCount = null;
        this.lobbyRegion = null;
        this.lobbyTimeLimit = null;
        this.token = null;
        this.lobbyDecidedLocation = null;
        this.lobbyDecidedSport = null;
        this.lobbyDecidedDate = null;
        this.lobbyLocations = null;
        this.timeRemaining = null;
        this.lobbyChat = null;
        Object.assign(this, data);
    }
}
export default Lobby;
