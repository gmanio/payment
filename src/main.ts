declare var IMP;

class Payment {
  public elPayment: HTMLButtonElement

  constructor() {
    IMP.init('imp99591491');
    this.elPayment = document.querySelector('#payment');

    this.attachEventListener();
  }

  private attachEventListener() {
    this.elPayment.addEventListener('click', this.onPaymentProcess);
  }

  private onPaymentProcess() {
    IMP.request_pay({
      pg : 'paypal', // version 1.1.0부터 지원.
      language: 'ko',
      pay_method : 'card',
      merchant_uid : 'merchant_' + new Date().getTime(),
      name : '주문명:결제테스트',
      amount : 1.00,
      currency: 'USD',
      m_redirect_url : 'http://localhost:3000/'
    }, function(rsp) {
      if ( rsp.success ) {
        var msg = '결제가 완료되었습니다.';
        msg += '고유ID : ' + rsp.imp_uid;
        msg += '상점 거래ID : ' + rsp.merchant_uid;
        msg += '결제 금액 : ' + rsp.paid_amount;
        msg += '카드 승인번호 : ' + rsp.apply_num;
      } else {
        var msg = '결제에 실패하였습니다.';
        msg += '에러내용 : ' + rsp.error_msg;
      }
      alert(msg);
    });
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  const oPayment = new Payment();
});
