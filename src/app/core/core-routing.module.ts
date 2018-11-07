import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const coreRoutes: Routes = [

]

@NgModule({
  declarations: [

  ],
  imports: [
    RouterModule.forChild(coreRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CoreRoutingModule {}
