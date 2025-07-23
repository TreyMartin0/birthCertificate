import { LightningElement } from 'lwc';

export default class SpeedTest extends LightningElement {
    showSpeedTest = false;
    testUrl = '';
    downloadSpeed = '';
    uploadSpeed = '';
    
    handleSpeedTestClick() {
        this.showSpeedTest = true;
        this.attachMessageListener();
    }

    attachMessageListener() {
        window.addEventListener('message', this.handleTestResults.bind(this));
    }

    handleTestResults(event) {
        if (event.origin !== '') {
            return;
        }
        const result = event.data;
        if (results) {
            this.downloadSpeed = results.download || 'n/a'
            this.uploadSpeed = results.upload || 'n/a'
            this.showSpeedTest = false;
        }
        window.removeEventListener('message', this.handleTestResults.bind(this));
    }
}
