import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule, MatSnackBarModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';

const myComponents = [
  MatTableModule,
  MatSortModule,
  MatButtonModule,
  MatPaginatorModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [],
  imports: myComponents,
  exports: myComponents
})
export class MaterialModule { }
