import { NgModule } from '@angular/core';
import { MatButtonModule,
  MatCardModule,
   MatFormFieldModule,
   MatIconModule,
   MatInputModule,
   MatProgressSpinnerModule,
   MatSelectModule,
   MatSortModule,
   MatTableModule,
   MatToolbarModule } from '@angular/material';

@NgModule({
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ]
})
export class MaterialModule { }
