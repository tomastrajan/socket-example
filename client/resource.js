/**
 * Resource implementation following REST approach to CRUD operations
 *
 * More info: https://en.wikipedia.org/wiki/Representational_state_transfer#Relationship_between_URI_and_HTTP_Methods
 */
export default class Resource {
    
    constructor(socket, resource) {
        this.resource = resource;
        this.socket = socket;
    }
    
    find(id, cb) { 
        this._request(this._buildPayload("get", id), cb);
    }
    
    findAll(cb) { 
        this._request(this._buildPayload("get"), cb);
    }
    
    create(item, cb) { 
        this._request(this._buildPayload("post", null, null, item), cb);
    }
    
    update(id, item, cb) { 
        this._request(this._buildPayload("put", id, null, item), cb);
    }
    
    remove(id, cb) { 
        this._request(this._buildPayload("delete", id), cb);
    }

    _request(payload, cb) {
        this.socket.emit("resource", payload, cb);
    }

    _buildPayload(operation, id, query, payload) {
        return {resource: this.resource, operation, id, query, payload};
    }
}