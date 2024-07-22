import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CountdownComponent, CountdownConfig, CountdownEvent, CountdownStatus } from 'ngx-countdown';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthStorageService } from 'src/app/shared/services/storage/auth-storage.service';
import { AuthService } from '../authentication/services/auth.service';



@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss'],
  providers: [NgbModalConfig, NgbModal],

})
export class AdministracionComponent {

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private router: Router,
    private authStorageService: AuthStorageService,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.centered = true;

    this.authStorageService.isRestartCount$.subscribe((isRestartCount) => {
      if (isRestartCount && this.countdown != undefined) {
        this.countdown.restart()
      }
    });
  }

  authService = inject(AuthService);
  countDown: number = 0;
  timer: any;
  configCountDown: CountdownConfig = { leftTime: 2400 };
  @ViewChild('cdLogout', { static: false }) private countdown!: CountdownComponent;
  @ViewChild('content') content!: TemplateRef<any>;


  ngOnInit(): void {
    this.checkToken();
  }

  countDownFunction(seconds: number) {
    this.countDown = seconds;
    this.timer = setInterval((): any => {
      this.countDown--;
      if (this.countDown == 0) {
        clearInterval(this.timer);
        this.modalService.dismissAll();
        this.logout();
      }
    }, 1000);
  }

  
  logout() {
    this.modalService.dismissAll();
    this.router.navigateByUrl(`/authentication/login`);
  }

  continuar_session() {
    clearInterval(this.timer);
    this.authService.refreshTokenAsegurado().subscribe((response) => {
      sessionStorage.setItem('keyToken', response.data.token);
      this.checkToken();
      this.modalService.dismissAll();
    });
  }

  countEvent(event: CountdownEvent) {
    if (event.status == CountdownStatus.done) {
      this.modalService.open(this.content);
      this.countDownFunction(this.countDown);
    }

  }

  checkToken() {
    this.authService.getTimeExpirationAsegurado().subscribe((response: any) => {
      this.configCountDown = { leftTime: response.data.secondsMessage }
      this.countDown = response.data.secondsCoundDowns
    });
  }

}
