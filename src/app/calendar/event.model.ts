export class Events {
    public title: string;
    public description: string;
    public tag: string;
    public date: string;
    public time: string;
    public color: string;

    constructor(title: string, description: string, tag: string, date: string, time: string, color: string) {
        this.title = title;
        this.description = description;
        this.tag = tag;
        this.date = date;
        this.time = time;
        this.color = color;
    }
}