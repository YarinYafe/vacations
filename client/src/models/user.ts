export class User {
    public constructor(
        public first_name?: string,
        public last_name?: string,
        public user_name?: string,
        public password?: string,
        public id?: number,
        public type?: string,
    ) { }
}