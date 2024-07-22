import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule, TranslateModule],
  exports: [MaterialModule, TranslateModule],
})
export class SharedModule {}
