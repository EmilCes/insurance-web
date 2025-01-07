export class NotFoundError extends Error {
    constructor(message?: string) {
        super(message || "Recurso no encontrado");
        this.name = "NotFoundError";
    }
}

export class NetworkError extends Error {
    constructor(message?: string) {
        super(message || "Error de conexión");
        this.name = "NetworkError";
    }
}