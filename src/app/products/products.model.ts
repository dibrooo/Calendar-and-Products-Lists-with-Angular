export class Products {
    public name: string;
    public description: string;
    public price: string;
    public imagePath: string;

    constructor(name: string, description: string, price: string, imagePath: string) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.imagePath = imagePath;
    }
}