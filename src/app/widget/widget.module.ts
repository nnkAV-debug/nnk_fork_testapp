import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from './widget.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [WidgetComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class WidgetModule { }
