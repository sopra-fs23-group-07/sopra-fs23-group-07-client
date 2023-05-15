/**
 * User model
 */
class User {
    constructor(data = {}) {
        this.userId = null;
        this.email = null
        this.username = null;
        this.token = null;
        this.status = null;
        this.creationDate = null;
        this.birthdate = null;
        this.bio = null;
        this.hasLockedSelections = null;
        this.avatar = "src/avatars/basketball_m.jpgsrc/avatars/basketball_m.jpg"
        Object.assign(this, data);
    }
}

export default User;
