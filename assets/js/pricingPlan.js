const selectPricingPlan = (el) => {
  $('tr.clickable').removeClass('table-primary');
  $(el).addClass('table-primary');

  const parentDiv = el.closest('div');
  const parentTab = document.getElementById(parentDiv.getAttribute("aria-labelledby"));

  const toggleEl = document.getElementById('billingSwitch');
  const tableData = el.querySelectorAll('td');

  if (parentTab.id === 'nav-enterprise-tab') {
      $('#startsFrom').text('Starts from');
      $('#planPrice').text('$2000');
      $('#contract-badge').hide();

      $('#startNow').hide();
      $('#emailUs').show();
  } else if (parentTab.id === 'nav-subs-tab') {
      const planName = el.querySelector('td').textContent.trim();
      $('#planName').text(planName);
      $('#planPeriod').text(toggleEl.checked ? '/ yr' : '/ mo');
      $('#planDesc').text(toggleEl.checked ? '12+2 months credits issued immediately, expire in a year' : 'Credits issued monthly, expire every month');

      $('.planPeriodTable').text(toggleEl.checked ? '/ yr' : '/ mo');
      $('.enterprisePrice').text(toggleEl.checked ? '24,000' : '2,000');

      if (toggleEl.checked) {
          $('.annualDetails').show();
      } else {
          $('.annualDetails').hide();
      }
      $('#contract-badge').show();
  
      const planPrice = tableData[3].querySelector('span');
      const planCredits = tableData[1].querySelector('span');
      const planRate = '$' + tableData[2].querySelector('span').dataset[toggleEl.checked ? 'annual' : 'monthly'] + ' / credit';
  
      const price = document.getElementById('planPrice');
      price.dataset.annual = planPrice.dataset.annual;
      price.dataset.monthly = planPrice.dataset.monthly;
  
      const credit = document.getElementById('planCredit');
      credit.dataset.annual = planCredits.dataset.annual;
      credit.dataset.monthly = planCredits.dataset.monthly;
  
      if (planPrice.textContent.includes('Starts from')) {
          $('#startsFrom').text('Starts from');
          $('#annualGt').text('> ');
          $('#planRate').text('< ' + planRate);
          $('#startNow').hide();
          $('#emailUs').show();
      } else {
          $('#startsFrom').text('');
          $('#annualGt').text('');
          $('#planRate').text(planRate);
          $('#startNow').show();
          $('#emailUs').hide();
      }
  } else if (parentTab.id === 'nav-payg-tab') {
      $('#planName').text('pay-as-you-go');
      $('#planPeriod').text('')
      $('#planDesc').text('Credits do not expire*');
      $('#startNow').show();
      $('#emailUs').hide();
      $('#contract-badge').hide();

      const planPrice = tableData[2].querySelector('span').dataset.payg;
      const planCredits = tableData[0].querySelector('span').dataset.payg;
      const planRate = '$' + tableData[1].querySelector('span').dataset.payg + ' / credit';
  
      const price = document.getElementById('planPrice');
      price.dataset.annual = planPrice;
      price.dataset.monthly = planPrice;

      const credit = document.getElementById('planCredit');
      credit.dataset.annual = planCredits;
      credit.dataset.monthly = planCredits;
  
      $('#planRate').text(planRate);
  }
}

const selectPricingTab = (el) => {
  const control = $(el).attr('aria-controls');
  const selectedPlan = $(`#${control} table tbody tr`)[0];
  console.log('selectedPlan', selectedPlan);
  selectPricingPlan(selectedPlan);
}