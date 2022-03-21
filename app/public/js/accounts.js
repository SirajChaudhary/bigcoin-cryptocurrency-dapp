
$(document).ready(function () {
  var curraccount;
  var selectedAccount;
  $.get('/api/accounts', function (response) {
    for(let i = 0; i < response.length; i++){
      curraccount = response[i];
      $('#options').append("<option value='"+curraccount+"'>"+curraccount+"</option>");
    }
  })

  $('#submit').click(function () {
    selectedAccount = $('#options').val();
    console.log(selectedAccount);
    $('.select').removeClass("active");
    $('.send').addClass("active");
    $('#account').text(selectedAccount);
  })

  $('#send').click(function () {
    $('#status').text("Sending...");
    let amount = $('#amount').val();
    let receiver = $('#receiver').val();
    $.post('/api/send/coin', {amount : amount, sender : selectedAccount, receiver : receiver}, function (response) {
      $('#balance').text(response);
      $('#status').text("Sent!!");
    })
  });
})