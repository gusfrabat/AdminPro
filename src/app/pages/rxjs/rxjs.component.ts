import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
    this.subscription = this.regresarObservable().subscribe(
      numero => console.log('Subs', numero),
      error => console.error('Subs', error),
      () => console.log('El observador termino')
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  regresarObservable(): Observable<number> {
    return new Observable( observer => {
      let contador = 0;
      const intervalo = setInterval( () => {
        contador++;
        const salida = {
          valor: contador
        }
        observer.next(salida);
        // if (contador === 2) {
        //   clearInterval(intervalo);
        //   observer.error('help me');
        // }
        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
      }, 1000);
    }).pipe(
      map((Resp: any) => Resp.valor),
      filter((valor , index) => {
        if (( valor % 2) === 1) {
          // impar
          return true;
        } else {
          // par
          return false;
        }
      }));
  }
}
