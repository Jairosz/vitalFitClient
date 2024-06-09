export interface LoginResponse{
    "token": string,
    "message": string,
    "expiresIn": string,
    "user": {
        "id": number,
        "name": string,
        "email": string,
        "role": string,
        "pfp": string
    }
}