import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationService {
    // public Server = 'http://localhost:51013/';
    public Server = 'http://34.205.21.254/';
    public ApiUrl = 'api/';
    public ServerWithApiUrl = this.Server + this.ApiUrl;
    constructor() { }
}
