export interface ProductDTO{
    id: string;
    name: string;
    price: number;
    description: string;
    image : File;
    imgName? : string
}