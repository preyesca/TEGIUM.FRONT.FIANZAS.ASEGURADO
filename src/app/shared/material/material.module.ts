import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatLabelMod } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const arrayModulesMat = [
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatChipsModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatButtonModule,
  MatExpansionModule,
  MatDialogModule,
  MatExpansionModule,
  MatSlideToggleModule,
  MatTooltipModule,
];

@NgModule({
  declarations: [],
  imports: [...arrayModulesMat],
  exports: [...arrayModulesMat],
})
export class MaterialModule {}
