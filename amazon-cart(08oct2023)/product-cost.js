let dropdown = document.querySelector('#product-quantity');


function totalCost() {
    let qty = document.querySelector('#product-quantity').value;
    let baseCost = document.querySelector('#product-base-cost').innerText;
    let totalCostFields = document.querySelectorAll('.total-cost');
    
    // console.log(dropdown, 'dropdown');
    // console.log(qty, 'qty');
    // console.log(baseCost , 'baseCost');
    // console.log(totalCost, 'totalCost');
    // console.log("inside function");

    if (qty == 'delete') {
        dropdown.remove();
    }
    else {
        totalCostFields.forEach(field => {
            field.innerText = qty * baseCost;
        });
    }

    // implement the 10+ product quantity functionality
    // else if (qty == 'more') {
    //     dropdown.parentElement.innerHTML = '<input type="number" placeholder="Enter the product quantity..."> <button onclick="totalCost()"></button>'
    // }
    console.log('totalCost', totalCost);
}