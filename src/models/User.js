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
        Object.assign(this, data);
    }
}

export default User;
