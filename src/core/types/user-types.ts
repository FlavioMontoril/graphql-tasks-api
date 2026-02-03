export interface UserData {
    id?: string;
    name: string;
    department: string;
    email: string;
    passwordHash: string;
    createdAt?: Date;
    updatedAt?: Date | null;
}

export interface CreateUserProps {
    name: string;
    department: string;
    email: string;
    passwordHash: string
}