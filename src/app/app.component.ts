import { Component, OnInit, OnDestroy } from '@angular/core';
import {WebsocketService} from '@services/websocket.service';
import { EventBusService } from '@services/event-bus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
 
  // 当前用户信息
  // selfData = {
  //   clientId: '',
  //   clientName: '',
  //   sessionId:'',
  //   online:''
  // };
  connection_curruser: any;
  connection_userlist: any;
  
  constructor(private websocketService: WebsocketService,
    private _eventBus: EventBusService) {

  }
  
  ngOnInit(): void {
    this.connection_curruser = this.websocketService.loadCurrentUser().subscribe(data => {
      const _data:any = data;
      this._eventBus.loginUserData.next(_data);
    })
    this.connection_userlist = this.websocketService.loadUserList().subscribe(list => {
      const _userlist:any = list;
      
      this._eventBus.userListData.next(_userlist.data);
    })
  }

  tabType:any = "chat";
  chooseTabType(type: any) {
    this.tabType = type;
  }
  /**
   * 组件注销
   */
  ngOnDestroy() {
    // this.connection_curruser.unsubscribe();
    // this.connection_userlist.unsubscribe();
   }
}
