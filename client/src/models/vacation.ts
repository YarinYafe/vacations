export class Vacation {
    public constructor(
        public destination?: string,
        public description?: string,
        public start_date?: string,
        public end_date?: string,
        public price?: number,
        public v_image?: string,
        public followers?: number,
        public id?: number,
    ) { }
}