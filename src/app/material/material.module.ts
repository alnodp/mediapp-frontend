import { NgModule } from '@angular/core';
import {
  MatTableModule,
  MatSortModule,
  MatButtonModule,
  MatPaginatorModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatMenuModule,
  MatDividerModule,
  MatToolbarModule,
  MatDialogModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule, MAT_DATE_LOCALE, MatExpansionModule
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
  MatSnackBarModule,
  MatSidenavModule,
  MatMenuModule,
  MatDividerModule,
  MatToolbarModule,
  MatDialogModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatExpansionModule
];

@NgModule({
  declarations: [],
  imports: myComponents,
  exports: myComponents,
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'}
  ]
})
export class MaterialModule { }
