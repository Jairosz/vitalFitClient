import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../home/components/navbar/navbar.component';
import { FoodsService } from '../services/foods.service';
import { CommonModule } from '@angular/common';
import { FoodResponse } from '../types/foodResponse';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { HttpHeaders } from '@angular/common/http';


declare var bootstrap: any;

@Component({
  selector: 'app-foods',
  standalone: true,
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './foods.component.html',
  styleUrl: './foods.component.css'
})
export class FoodsComponent {
  public editingDiet: FoodResponse | null = null;
  private foodservice = inject(FoodsService);
  private formBuilder = inject(FormBuilder);
  public getFoods$ = new Subject<void>()
  selectedDiet: FoodResponse | null = null;

  dietForm = this.formBuilder.nonNullable.group({
    name: this.formBuilder.nonNullable.control("", { validators: [Validators.required] }),
    description: this.formBuilder.nonNullable.control("", { validators: [Validators.required] }),
    long_description: this.formBuilder.nonNullable.control("", { validators: [Validators.required] }),
    kcal: this.formBuilder.nonNullable.control(0, { validators: [Validators.required, Validators.min(0)] }),
    proteins: this.formBuilder.nonNullable.control(0, { validators: [Validators.required, Validators.min(0)] }),
    carbohydrates: this.formBuilder.nonNullable.control(0, { validators: [Validators.required, Validators.min(0)] }),
    fats: this.formBuilder.nonNullable.control(0, { validators: [Validators.required, Validators.min(0)] }),
    fiber: this.formBuilder.nonNullable.control(0, { validators: [Validators.required, Validators.min(0)] }),
    vitamins: this.formBuilder.nonNullable.control("", { validators: [Validators.required] }),
    minerals: this.formBuilder.nonNullable.control("", { validators: [Validators.required] }),
    image: this.formBuilder.nonNullable.control("", { validators: [Validators.required] }),
    shared: this.formBuilder.nonNullable.control(0),

  });
  public foods: FoodResponse[] = [];

  onCreateButtonClicked() {
    this.dietForm.reset();
    this.editingDiet = null;
  }
  onEditButtonClicked(diet: FoodResponse) {
    this.dietForm.patchValue({
      name: diet.name,
      description: diet.description,
      long_description: diet.long_description,
      kcal: diet.kcal,
      proteins: diet.proteins,
      carbohydrates: diet.carbohydrates,
      fats: diet.fats,
      fiber: diet.fiber,
      vitamins: diet.vitamins,
      minerals: diet.minerals,
      image: diet.image,
      shared: diet.shared,
    });
    this.editingDiet = diet;
  }
  onRemoveButtonClicked(diet: FoodResponse) {
    this.selectedDiet = diet;
    const modal = new bootstrap.Modal(document.getElementById('dietasDeleteModal') as HTMLElement);
    modal.show();
  }
  onCreate() {
    console.log(this.dietForm);
    if (!this.dietForm.valid) {
      this.dietForm.markAllAsTouched();
      return;
    }
    const formValue = {
      ...this.dietForm.getRawValue(), shared: 0, id: 0, user_id: 0,
    }
    this.foodservice.createFood(formValue).subscribe(res => this.getFoods$.next());
  }
  onEdit() {

    if (this.editingDiet && this.dietForm.valid) {
      const food: FoodResponse = { ...this.editingDiet, ...this.dietForm.value };
      this.foodservice.editFood(this.editingDiet.id, food).subscribe({
        next: (response) => {
          this.getFoods$.next();
          this.editingDiet = null;
        },
        error: (error) => {
          console.error('Error al editar la comida:', error);

        }
      });
    } else {
      console.log('El formulario no es válido o no hay dieta en edición');
    }
  }

  confirmRemove() {
    if (this.selectedDiet) {
      this.foodservice.deleteFood(this.selectedDiet.id).subscribe({
        next: () => {
          this.getFoods$.next();
        },
        error: (error) => {
          console.error('Error al borrar la comida:', error);
        }
      });
      this.selectedDiet = null;
      const modal = bootstrap.Modal.getInstance(document.getElementById('dietasDeleteModal') as HTMLElement);
      modal.hide();
    }
  }
  constructor() {
    this.getFoods$.pipe(switchMap(() => this.foodservice.getFood())).subscribe(foods => this.foods = foods);
    this.getFoods$.next();
  }


  // onGenerate() {
  //   console.log(this.dietForm);
  //   if (!this.dietForm.valid) {
  //     this.dietForm.markAllAsTouched();
  //     return;
  //   }

  //     const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `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`
  //   });


  //   const body = {
  //     model: "gpt-3.5-turbo",
  //     messages: [
  //       {
  //         role: "system",
  //         content: "Generate a JSON object representing a detailed meal."
  //       },
  //       {
  //         role: "user",
  //         content: `Generate a JSON object with the following structure: {
  //         "name": "Test Image",
  //         "description": "This is a test meal",
  //         "long_description": "Detailed description of the test meal",
  //         "kcal": 500,
  //         "proteins": 30,
  //         "carbohydrates": 50,
  //         "fats": 20,
  //         "fiber": 5,
  //         "vitamins": "A, B, C",
  //         "minerals": "Calcium, Iron",
  //         "image": "https://t3.ftcdn.net/jpg/04/19/17/68/360_F_419176802_9s4AoYMfzxDt3kaSYV55whCkTB76NsHN.jpg",
  //         "shared": true}`
  //       }
  //     ],
  //     temperature: 0.7
  //   };

  //   this.http.post('https://api.openai.com/v1/chat/completions', body, { headers }).subscribe((response: any) => {
  //     const generatedFood = JSON.parse(response.choices[0].message.content);
  //     const formValue: FoodResponse = {
  //       ...generatedFood,
  //       shared: 0,
  //       id: 0,
  //       user_id: 0,
  //     };
  //     this.foodservice.createFood(formValue).subscribe(res => this.foodservice.notifyFoodsUpdated());
  //   });




  // }
}
