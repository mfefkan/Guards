import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, CanDeactivateFn, CanMatchFn, ResolveFn, Route, RouterStateSnapshot, UrlSegment } from "@angular/router";




export const canActivateGuard : CanActivateFn = (route: ActivatedRouteSnapshot,state:RouterStateSnapshot) => {
    console.log('CanActivate Guard');
    return true; //false döndüğünde products sayfasına erişim sağlayamıyoruz.
    
}


export const canActivateChildGuard : CanActivateChildFn = (childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot)=>{
    console.log("CanActivateChild Guard");
    return true;
    //child'a ulaşmanı önlüyor ya da izin veriyor
}

export const canDeactivateGuard : CanDeactivateFn<any> = (component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot) => {
    console.log("CanDeactivate Guard");
    //diğer sayfalara geçmeni önlüyor
return true;
}
 
export const resolveGuard : ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

    const httpClient = inject(HttpClient);
    return httpClient.get("https://jsonplaceholder.typicode.com/photos"); //veri gelmeden sayfayı vermeyeceğiz verinin gelmesi halinde veriyi döndürecek yoksa zaten sayfaya vermeyeceğiz
    
}

export const isAdminGuard : CanMatchFn =(route: Route, segments: UrlSegment[]) =>{
    return !!localStorage.getItem("admin");
}

export const isUserGuard : CanMatchFn =(route: Route, segments: UrlSegment[]) =>{
    return !localStorage.getItem("admin");
}

//tarayıcının local storage'inde admin adında birşey bulursa admin yoksa user olarak alıcak. örneği pratik yapmak için bu şekilde yapıldı.

//ÇALIŞTIRMA SIRALAMASI
 
//CanMatch ilk sorgulanması gereken guard'dır çünkü sayfaya erişenin statüsü burada belirlenir. (admin mi user mı)

//CanActivate daha sonra bu gelir burada elimizde admin ya da usera vereceğimiz göstereceğimiz sayfaları belirleyip ona göre konfigüre edebiliriz.

//CanActivadeChild kullanılacaksa CanActivate'den sonra gelir. 

//Resolve rotanın yüklenmesi için öncelikle componentteki verilerin yüklenmesi gerekiyorsa bunun için bu guardı devreye almalıyız.

// CanDeactivate ilgili rotadan ayrılma durumu söz konusu olduğunda buna izin verilip verilmeyeceği kontrol edilecek ve bu guard tetiklenecektir.