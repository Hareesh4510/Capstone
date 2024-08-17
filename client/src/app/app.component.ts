import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateY(100%)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
  
})
export class AppComponent {
  IsLoggin:any=false;
  roleName: string | null;
  constructor(private authService: AuthService, private router:Router)
  {
   
    this.IsLoggin=authService.getLoginStatus;
    this.roleName=authService.getRole;
    if(this.IsLoggin==false)
    {
      this.router.navigateByUrl('/login'); 
    
    }
  }
  
  logout()
{
  this.authService.logout();
  window.location.reload();
}
prepareRoute(outlet: RouterOutlet) {
  return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];

}
}
