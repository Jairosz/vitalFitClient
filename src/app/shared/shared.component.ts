import { Component, inject } from '@angular/core';
import { Subject, switchMap } from 'rxjs';
import { FoodsService } from '../services/foods.service';
import { FoodResponse } from '../types/foodResponse';
import { NavbarComponent } from '../home/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FoodSharedResponse } from '../types/foodShareResponse';

@Component({
  selector: 'app-shared',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './shared.component.html',
  styleUrl: './shared.component.css'
})
export class SharedComponent {
  private foodservice = inject(FoodsService);
  public getFoods$ = new Subject<void>();
  public foods: FoodSharedResponse[] = [];
  constructor(){
    this.getFoods$.pipe(switchMap(() => this.foodservice.getSharedFood())).subscribe(foods => this.foods = foods);
    this.getFoods$.next();
  }
 }