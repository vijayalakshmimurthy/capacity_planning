import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoaderService } from '../../services/loader.service';

/**
 * This defines genric loader of application.
 * @export
 * @class LoaderComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

  /**
   * Flag for hide show loader.
   * @type {boolean}
   * @memberof LoaderComponent
   */
  public loader: boolean;

  /**
   * This is used to assign subscriptions.
   * @type {Subscription}
   * @memberof LoaderComponent
   */
  public subscription: Subscription;

  /**
   * Creates an instance of LoaderComponent.
   * @param {LoaderService} ls
   * @memberof LoaderComponent
   */
  constructor(private ls: LoaderService) {
    this.subscription = this.ls.subject.subscribe(
      (flag) => {
        this.loader = flag;
      }
    );
   }

  /**
   * Life cycle hook
   * To set loader flag.
   * @memberof LoaderComponent
   */
  ngOnInit() {
  }

  /**
   * Life cycle hook.
   * TO unsuscribe subscription to save from memory leaks.
   * @memberof LoaderComponent
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
