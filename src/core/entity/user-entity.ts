import { randomUUID } from "crypto";
import { UserData } from "../types/user-types";

export class User {
    private readonly id: string;
    private name: string;
    private department: string;
    private email: string;
    private passwordHash: string;
    private readonly createdAt: Date;
    private updatedAt: Date | null;

    constructor(data: UserData) {
        this.id = data.id ?? randomUUID();
        this.name = data.name;
        this.department = data.department;
        this.email = data.email;
        this.passwordHash = data.passwordHash;
        this.createdAt = data.createdAt ?? new Date();
        this.updatedAt = data.updatedAt ?? null;
    }

    public static build(data: UserData) {
        return new User(data)
    }

    private touch() {
        this.updatedAt = new Date();
    }

    public getId() { return this.id }
    public getName() { return this.name }
    public getDepartment() { return this.department }
    public getEmail() { return this.email }
    public getPasswordHash() { return this.passwordHash }
    public getCreatedAt() { return this.createdAt }
    public getUpdatedAt() { return this.updatedAt }

    public setName(name: string) { this.name = name; this.touch(); }
    public setEmail(email: string) { this.email = email; this.touch() }
    public setDepartment(department: string) { this.department = department; this.touch() }

}