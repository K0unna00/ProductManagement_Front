export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imgName : string
}

export interface ProductDTO{
    id: string;
    name: string;
    price: number;
    description: string;
    image : File;
    imgBase64? : string
}