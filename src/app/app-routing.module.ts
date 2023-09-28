import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { canActivateChildGuard, canActivateGuard, canDeactivateGuard, isAdminGuard, isUserGuard, resolveGuard } from './guards/guards';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {path:"dashboard",component: AdminComponent, canMatch: [isAdminGuard]},
  {path:"dashboard",component:UserComponent,canMatch: [isUserGuard] }, 
  {
    path: 'product',
    component: ProductComponent,
    canActivate: [canActivateGuard],
    canActivateChild: [canActivateChildGuard],
    canDeactivate: [canDeactivateGuard],
    resolve : {photos : resolveGuard},
    children: [{ path: ':id', component: ProductDetailComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule {}
