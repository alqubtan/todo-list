const controller = (function() {

    var Item = function(id, content) {
        this.id = id,
        this.content = content
    }
    var allItems = [];

    return {
        addItem: function(content) {
            var item, id;
            if(allItems.length > 0) {
                id = allItems[allItems.length - 1].id + 1;
            } else {
                id = 0;
            }
            // create new item
            item = new Item(id, content);
            // add item to ds
            allItems.push(item)
            return item;
        },
        deleteItem: function(id) {
            var id = allItems.findIndex(obj => obj.id === id)
            allItems.splice(id, 1)
        },
        test: function() {
            console.log(allItems)
        }
    }

})()

const UIcontroller = (function() {
    
    return {
        displayItem: function(obj) {
            var html;
            html = `<li id="item-${obj.id}" class="item-id"><button class="check-btn" title="mark as completed">
            <i class="fa fa-check-square"></i></button>
             <span>${obj.content}</span>
             <button class="delete-btn" title="delete"><i class="fa fa-trash"></i>
             </button></li>`;

             document.querySelector('.list').insertAdjacentHTML("beforeend", html)
        },
        clearInput: function() {
            document.querySelector('.item-cnt').value = '';
        }, 
        deleteItem: function(id) {
            var item = document.getElementById(id);
            item.parentNode.removeChild(item);
        }
    }

})()

const app = (function(ui, ctrl) {
    var setEvents = function() {
        document.querySelector('.add-item').addEventListener('click', ctrAddItem)
        
        document.addEventListener('keypress', function(e) {
            if(e.keyCode === 13) {
                ctrAddItem();
            }
        })
        
        document.querySelector('.list').addEventListener('click', e => {
            const id = e.target.closest('.item-id').id;
            if (id) {
                if (e.target.matches('.check-btn, .check-btn *')) {
                    markAsComplete(id)
                } else if (e.target.matches('.delete-btn , .delete-btn *')) {
                    deleteItem(id)
                }
            }
        } );
    }

    var deleteItem = function(id) {
        
        // check if the element that has been clicked is the delete icon;
        if (id) {
            // 1- delete item from DS

            // split ID
            var splitID = id.split('-');
            var itemId =  parseInt(splitID[1]);
            ctrl.deleteItem(itemId);


            // 2- delete item from UI
            ui.deleteItem(id);

        }
    }
    var markAsComplete = function(id) {
        if (id) {
            var item = document.getElementById(id);
            var switchBtn = item.childNodes[0];
            var text = item.childNodes[2];

            switchBtn.classList.toggle('removeTaskcolor');
            text.classList.toggle('removeTasktext');

        }
    
    }

    var ctrAddItem = function() {
        // get input from user
        var input = document.querySelector('.item-cnt').value;
        if (input) {
            // 1- create new Item
             var newItem = ctrl.addItem(input);
            // 2- display item to the ui
            ui.displayItem(newItem);
            // 3- clear input field
            ui.clearInput();
             
        }
    }
    var setDate = function() {
        var dateLeble, date,year, month, day, months;
        dateLeble = document.querySelector('.date');
        date = new Date();
        day = date.getDate();
        year = date.getFullYear();
        month = date.getMonth();
        months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

        dateLeble.innerHTML = day + ' , ' + months[month] + ' , ' + year;
                
    }

    return {
        init: function() {
            //set day
            setDate();
            // set events
            setEvents();
        }
    }


})(UIcontroller, controller)

app.init()