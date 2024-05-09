type CollectionType = {
    _id: string;
    title: string;
    description: string;
    image: string;
    products: ProductType[];
}
type ProductType = {
    _id: string;
    title: string;
    description: string;
    image: string;
    media: [string];
    category: string;
    collections: [CollectionType];
    tags: [string];
    sizes: [string];
    colors: [string];
    price: number;
    expense: number;
    createdAt: Date;
    updatedAt: Date;
}
type OrderItemsType = {
    _id: string;
    quantity: number;
    product: string;
}
type OrderColumnType = {
    _id: string;
    customere: string;
    products: number;
    totalAmount: number;
    createdAt: string;
}

type OrderItemType = {
    product: ProductType;
    color: string;
    size: string;
    quantity: number;
}

type CustomerType = {
    clerkId: string;
    name: string;
    email: string;
}