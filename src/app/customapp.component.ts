import { IContextualContact } from './../../node_modules/@amc-technology/ui-library/node_modules/@amc-technology/davinci-api/dist/models/ContextualOperation.d';
import { CHANNEL_TYPES, IAppConfiguration, ISupportedChannel, initializeComplete, registerContextualControls, registerOnPresenceChanged, setAppHeight, setPresence, setSupportedChannels } from '@amc-technology/davinci-api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CustomDaVinciApp';

  appConfig?: IAppConfiguration;

  ngOnInit(): void {
      this.init().then(() => console.log("Done loading app!"));
  }

  async init(): Promise<void> {
    try {
      registerOnPresenceChanged(async (presence, reason, app) => {
        if (app != 'DAVINCI APP FOR SUMMER INTERNSHIP 2025')
        setPresence(presence, reason, '', '');
      });

      let channel: ISupportedChannel = {
        channelType: CHANNEL_TYPES.Telephony,
        idName: "CTI_CHANNEL",
        id: "CTI1"
      };

      setSupportedChannels([
        channel
      ]);

      registerContextualControls(async (contact, channelType) => {
      });

      setPresence('Ready', '', '', '');
      setAppHeight(50);
      initializeComplete().then((config) => this.appConfig = config);
    } catch (error) {
      console.log(error);
    }
  }
}
