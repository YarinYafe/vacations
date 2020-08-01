export class SuccessfulLoginServerResponse{
    public constructor(
        public token?:number,       
        public type?:string,
        public id?:number,
    ){}

}