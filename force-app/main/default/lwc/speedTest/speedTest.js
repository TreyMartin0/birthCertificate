import { LightningElement } from 'lwc';

export default class SpeedTest extends LightningElement {
    showSpeedTest = false;
    testUrl = 'https://citynetllc.speedtestcustom.com';
    downloadSpeed = '';
    uploadSpeed = '';

    testResultsBound = this.handleTestResults.bind(this);
    
    handleSpeedTestClick() {
        this.showSpeedTest = true;
        this.attachMessageListener();
    }

    attachMessageListener() {
        window.addEventListener('message', this.testResultsBound);
    }

    handleTestResults(event) {
        const origin = 'https://citynetllc.speedtestcustom.com';
        if (event.origin !== origin ){
            console.warn('Message blocked from incorrect origin')
            return;
        }
        const result = event.data;
        if (result) {
            this.downloadSpeed = result.download || 'n/a'
            this.uploadSpeed = result.upload || 'n/a'
            this.showSpeedTest = false;
        }
        window.removeEventListener('message', this.testResultsBound);
    }
}
