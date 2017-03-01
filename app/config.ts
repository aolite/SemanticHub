export interface Config{
    appPort:number;
    hostname:string;
    bbddSettings: bbddSettings;
}

export interface bbddSettings{
    bdUriPath:string;
    port: number;
    bdName:string;
}