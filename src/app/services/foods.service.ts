import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FoodResponse } from '../types/foodResponse';
import { Observable } from 'rxjs';
import { FoodSharedResponse } from '../types/foodShareResponse';
import { API_URL } from '../config';

@Injectable({
  providedIn: 'root'
})
export class FoodsService {
  private authservice = inject(AuthService); // Inyecta AuthService para usar la autenticación
  private httpclient = inject(HttpClient); // Inyecta HttpClient para hacer peticiones HTTP

  private apiUrl = API_URL; // URL base de la API

  // Método para obtener las comidas del usuario
  getFood(): Observable<FoodResponse[]> {
    const token = localStorage.getItem("token"); // Obtiene el token del almacenamiento local

    // Hace una petición GET a la API para obtener las comidas del usuario autenticado
    return this.httpclient.get<FoodResponse[]>(API_URL+"/user_meals", { 
      headers: { authorization: "Bearer " + token } // Incluye el token en la cabecera de la petición
    });
  }

  // Método para crear una nueva comida
  createFood(food: FoodResponse): Observable<FoodResponse> {
    const token = localStorage.getItem('token'); // Obtiene el token del almacenamiento local
    const headers = new HttpHeaders({
      'authorization': `Bearer ${token}`, // Incluye el token en la cabecera de la petición
      'Content-Type': 'application/json' // Especifica el tipo de contenido de la petición
    });

    // Hace una petición POST a la API para crear una nueva comida
    return this.httpclient.post<FoodResponse>(`${this.apiUrl}/meals`, food, { headers });
  }

  // Método para eliminar una comida por su ID
  deleteFood(mealId: number): Observable<void> {
    const token = localStorage.getItem('token'); // Obtiene el token del almacenamiento local
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Incluye el token en la cabecera de la petición
    });

    // Hace una petición DELETE a la API para eliminar una comida específica por su ID
    return this.httpclient.delete<void>(`${this.apiUrl}/meals/${mealId}`, { headers });
  }

  // Método para editar una comida por su ID
  editFood(mealId: number, food: FoodResponse): Observable<FoodResponse> {
    const token = localStorage.getItem('token'); // Obtiene el token del almacenamiento local
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Incluye el token en la cabecera de la petición
      'Content-Type': 'application/json' // Especifica el tipo de contenido de la petición
    });

    // Hace una petición PUT a la API para actualizar una comida específica por su ID con los nuevos datos proporcionados
    return this.httpclient.put<FoodResponse>(`${this.apiUrl}/meals/${mealId}`, food, { headers });
  }

  // Método para obtener las comidas compartidas
  getSharedFood(): Observable<FoodSharedResponse[]> {
    const token = localStorage.getItem("token"); // Obtiene el token del almacenamiento local

    // Hace una petición GET a la API para obtener las comidas compartidas
    return this.httpclient.get<FoodSharedResponse[]>(API_URL+"/shared_meals", { 
      headers: { authorization: "Bearer " + token } // Incluye el token en la cabecera de la petición
    });
  }
}
