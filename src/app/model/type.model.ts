export interface Account {
    email: string;
    password: string;
    name: string;
}

export class Product {
    id: number;
    name: string;
    description: string;
}

export class Loading {
    loading: boolean;
}

export const rootURL = 'http://localhost:3000';